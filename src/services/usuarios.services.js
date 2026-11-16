import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const listar = async () => {
    return await prisma.usuario.findMany({
        where: { ativo: true },
        select: {
            id: true,
            nome: true,
            email: true,
            perfil: true,
            ativo: true,
            criadoEm: true,
        },
    });
};

export const buscarPorId = async (id) => {
    const usuario = await prisma.usuario.findUnique({
        where: { id: Number(id) },
        select: {
            id: true,
            nome: true,
            email: true,
            perfil: true,
            ativo: true,
            criadoEm: true,
        },
    });

    if (!usuario) {
        throw new Error("Usuário não encontrado.");
    }

    return usuario;
};


export const insert = async (dados) => {
    const { nome, email, senha, perfil } = dados;

    if (!nome || !email || !senha) {
        throw new Error("Nome, e-mail e senha são obrigatórios.");
    }

    const usuarioExistente = await prisma.usuario.findUnique({
        where: { email },
    });

    if (usuarioExistente) {
        throw new Error("Este e-mail já está em uso.");
    }

    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    const novoUsuario = await prisma.usuario.create({
        data: {
            nome,
            email,
            senha: senhaHash,
            perfil: perfil || "TECNICO",
            ativo: true,
        },
        select: {
            id: true,
            nome: true,
            email: true,
            perfil: true,
            ativo: true,
            criadoEm: true,
        },
    });

    return novoUsuario;
};


export const login = async (email, senha) => {
    if (!email || !senha) {
        throw new Error("E-mail e senha são obrigatórios.");
    }

    const usuario = await prisma.usuario.findUnique({
        where: { email },
    });

    if (!usuario || !usuario.ativo) {
        throw new Error("Credenciais inválidas ou usuário inativo.");
    }


    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
        throw new Error("Credenciais inválidas.");
    }

    const payload = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "8h",
    });

    return {
        usuario: payload,
        token,
    };
};