export const listar = async (req, res) => {
  return res.json({ message: "Listar usuários" });
};

export const buscarPorId = async (req, res) => {
  const { id } = req.params;
  return res.json({ message: `Buscar usuário por ID: ${id}` });
};

export const insert = async (req, res) => {
  return res.status(201).json({ message: "Inserir usuário", data: req.body });
};

export const login = async (req, res) => {
  return res.json({ message: "Login realizado com sucesso" });
};

