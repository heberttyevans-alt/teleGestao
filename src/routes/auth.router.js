import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { autenticarToken } from "../middlewares/auth.middleware.js";

const authRouter = Router();

//Rota para autenticar o usuário e retornar o token do JWT
authRouter.post("/login", authController.login);

//Rotas protejidas, ou eja, que precisam do header "Authorization: Bearer <token>"
authRouter.get("/me", autenticarToken, authController.me);
authRouther.patch("/alterar-senha", autenticarToken, authController.alterarSenha);

export default authRouter;

