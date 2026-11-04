import bcrypt from "bcrypt";
import { PrismaClient } from "../generated/prisma/client.ts";

const prisma = new PrismaClient();

/**
 * Retorna a lista de usuários ativos (sem expor o hash da senha)
 */
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

/**
 * Busca um único usuário pelo ID
 */
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

/**
 * Insere um novo usuário com senha criptografada (bcrypt)
 */
export const insert = async (dados) => {
  const { nome, email, senha, perfil } = dados;

  if (!nome || !email || !senha) {
    throw new Error("Nome, e-mail e senha são obrigatórios.");
  }

  // Verifica se o e-mail já existe
  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email },
  });

  if (usuarioExistente) {
    throw new Error("Este e-mail já está em uso.");
  }

  // Criptografa a senha com bcrypt
  const saltRounds = 10;
  const senhaHash = await bcrypt.hash(senha, saltRounds);

  // Cria o usuário no banco
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

/**
 * Valida as credenciais do usuário para login
 */
export const login = async (email, senha) => {
  if (!email || !senha) {
    throw new Error("E-mail e senha são obrigatórios.");
  }

  // Busca o usuário com a senha para validação
  const usuario = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!usuario || !usuario.ativo) {
    throw new Error("Credenciais inválidas ou usuário inativo.");
  }

  // Compara a senha informada com o hash salvo no banco
  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    throw new Error("Credenciais inválidas.");
  }

  // Retorna os dados do usuário autenticado (sem a senha)
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    perfil: usuario.perfil,
  };
};
