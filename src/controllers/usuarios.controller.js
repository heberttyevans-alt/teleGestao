import * as usuariosServices from '../services/usuarios.services.js';

export const listar = async (req, res) => {
  return res.json({ message: "Listar usuários" });
};

export const buscarPorId = async (req, res) => {
  const { id } = req.params;
  return res.json({ message: `Buscar usuário por ID: ${id}` });
};

export const novoUsuario = async (req, res) => {
  return res.status(201).json({ message: "Usuário criado com sucesso" });
};

export const login = async (req, res) => {
  return res.json({ message: "Login realizado com sucesso" });
};

