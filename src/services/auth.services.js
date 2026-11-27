import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const criarErro = (mensagem, statusCode) => {
    const erro = new Error(mensagem);
    erro.statusCode = statusCode;
    return erro;
};


export const login = async (email, senha) => {
    const emailLimpo = email.trim();
    const usuario = await prisma.usuario.findUnique({
        where: { email: emailLimpo },
    });
    if (!usuario || !usuario.ativo) {
        throw criarErro("Usuário inválido ou usuário inativo.", 401);
    }
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
        throw criarErro("Senha inválida.", 401)
    }
    if (!process.env.JWT_SECRET) {
        throw criarErro("Erro interno no servidor, contate o suporte.", 500);
    }
    const payload = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
    };
    const token = jwt.sign(payload, process.envnJWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "3h"
    });
    return {
        usuario: payload,
        token,
    };
};
export const buscarPerfil = async (id) => {
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
        throw criarErro("Usuário não encontrado.", 404);
    }
    if (!usuario.ativo) {
        throw criarErro("Usuário inativo.", 403);
    }
    return usuario;
};