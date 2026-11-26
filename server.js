import "dotenv/config";
import express from "express";
import cors from "cors";

import authRouter from './src/routes/auth.router.js';
import orderRouter from './src/routes/order.router.js';
import usuariosRouter from './src/routes/usuarios.router.js';
import clientesRouter from './src/routes/clientes.router.js';
import dashboardRouter from './src/routes/dashboard.router.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    return res.json({
        status: "ok",
        mensagem: "API TeleGestão rodando normalmente",
    });
});

app.use("/api/auth", authRouter);
app.use("/api/ordens", orderRouter);
app.use("/api/usuarios", usuariosRouter);
app.use("/api/clientes", clientesRouter);
app.use("/api/dashboard", dashboardRouter);

app.use((req, res) => {
    return res.status(404).json({
        erro: "Rota não encontrada.",
    });
});

app.use((err, req, res, next) => {
    console.error("Erro na API:", err);
    return res.status(status).json({
        erro: err.message || "Erro interno do servidor.",
    });
});

const PORTA = process.env.PORT || 3000;
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});