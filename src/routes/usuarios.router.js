import { Router } from "express";
import * as usuariosController from "../controllers/usuarios.controller.js";
import { autenticarToken } from "../middlewares/auth.middleware.js";

const usuariosRouter = Router();

// Todas as rotas de usuários são protegidas por JWT
usuariosRouter.get("/", autenticarToken, usuariosController.listar);
usuariosRouter.get("/:id", autenticarToken, usuariosController.buscarPorId);
usuariosRouter.post("/", autenticarToken, usuariosController.novoUsuario);

export default usuariosRouter;
