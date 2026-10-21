import { Router } from "express";
import * as usuariosController from '../controllers/usuarios.controller.js';

const usuariosRouter = Router();

usuariosRouter.get('/usuarios', usuariosController.listar);
usuariosRouter.get('/usuarios/:id', usuariosController.buscarPorId);
usuariosRouter.post('/usuarios', usuariosController.insert);
usuariosRouter.post('/usuarios/login', usuariosController.login)

module.exports = usuariosRouter;
