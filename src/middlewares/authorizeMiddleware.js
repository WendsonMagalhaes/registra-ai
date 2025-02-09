const authorizeMiddleware = (rolesPermitidos) => {
    return (req, res, next) => {
        const usuario = req.usuario; // Usuário autenticado no `authMiddleware`

        if (!usuario) {
            return res.status(401).json({ success: false, message: "Usuário não autenticado" });
        }

        if (!rolesPermitidos.includes(usuario.acess)) {
            return res.status(403).json({ success: false, message: "Acesso negado" });
        }

        next();
    };
};

module.exports = authorizeMiddleware;
