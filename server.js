import express from "express";

import authRouter from './src/routes/auth.router.js';
import orderRouter from './src/routes/order.router.js';
import usuariosRouter from './src/routes/usuarios.router.js';

const app = express();

app.use(express.json());

app.use(authRouter);
app.use(orderRouter);
app.use(usuariosRouter);

const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});