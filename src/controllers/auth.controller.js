import * as authServices from "../services/auth.services.js";

// Autentica o usuário e devolve os dados básicos + token JWT
export const login = async (req, res) => {
    const { email, senha } = req.body || {};

    // Validação rápida de entrada antes de chamar a regra de negócio
    if (!email || !senha) {
        return res.status(400).json({
            erro: "E-mail e senha são obrigatórios.",
        });
    }

    const resultado = await authServices.login(email, senha);
    return res.status(200).json(resultado);
};