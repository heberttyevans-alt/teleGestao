import { Router } from "express";
import * as usuariosController from '../controllers/usuarios.controller.js';
import { autenticarToken } from '../middlewares/auth.middleware.js';

const usuariosRouter = Router();

// Rota pública para autenticação (obter token)
usuariosRouter.post('/usuarios/login', usuariosController.login);

// Rotas protegidas por JWT
usuariosRouter.get('/usuarios', autenticarToken, usuariosController.listar);
usuariosRouter.get('/usuarios/:id', autenticarToken, usuariosController.buscarPorId);
usuariosRouter.post('/usuarios', autenticarToken, usuariosController.novoUsuario || usuariosController.insert);

export default usuariosRouter;
