const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware de autenticação (verifica e decodifica o token)
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Token não fornecido" });
    }

    try {
        // Verifica e decodifica o token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.usuario = decoded; // Armazena os dados do usuário autenticado
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: "Token inválido" });
    }
};

// Middleware de autorização (verifica o nível de acesso do usuário)
const authorizeMiddleware = (rolesPermitidos) => (req, res, next) => {
    if (!req.usuario) {
        return res.status(401).json({ success: false, message: "Usuário não autenticado" });
    }

    console.log("Verificando acesso do usuário:", req.usuario.acess); // Log para depuração

    if (!rolesPermitidos.includes(req.usuario.acess)) {
        return res.status(403).json({ success: false, message: "Acesso negado" });
    }

    next();
};


// Exportando os dois middlewares corretamente
module.exports = { authMiddleware, authorizeMiddleware };
