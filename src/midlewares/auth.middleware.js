import jwt from "jsonwebtoken";

/**
 * Middleware para proteger rotas validando o token JWT recebido no Header Authorization
 */
export const autenticarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // Espera formato "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      erro: "Acesso negado. Token de autenticação não fornecido.",
    });
  }

  try {
    const usuarioDecodificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = usuarioDecodificado;
    return next();
  } catch (error) {
    return res.status(403).json({
      erro: "Token inválido ou expirado.",
    });
  }
};

