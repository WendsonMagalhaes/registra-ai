const express = require("express");
const UsuarioController = require("../controllers/usuarioController"); // Altere o caminho se necessário
const { authMiddleware, authorizeMiddleware } = require("../middlewares/auth");


const router = express.Router();

// Defina as rotas e associe-as ao controlador

// Rotas publicas
// Rota para login de usuário
router.post("/login", UsuarioController.login);

// Rota para listar todos os usuários
router.get('/usuarios', UsuarioController.listarUsuarios);

// Rota para criar um novo usuário
router.post("/usuarios", UsuarioController.criarUsuario);


//Rotas protegidas
// Rota para listar usuários com autenticação
router.get("/list/usuarios", authMiddleware, authorizeMiddleware(["admin"]), UsuarioController.listarUsuarios);

// Rota para atualizar um usuário pelo ID
router.put("/usuarios/:id", authMiddleware, UsuarioController.atualizarUsuario);

// Rota para atualizar um usuário pelo ID
router.patch("/usuarios/:id/nome", authMiddleware, UsuarioController.atualizarNome);
// Rota para atualizar um usuário pelo ID
router.patch("/usuarios/:id/senha", authMiddleware, UsuarioController.atualizarSenha);
// Rota para atualizar um usuário pelo ID
router.patch("/usuarios/:id/acesso", authMiddleware, UsuarioController.atualizarAcesso);
// Rota para atualizar um usuário pelo ID
router.patch("/usuarios/:id/status", authMiddleware, UsuarioController.atualizarStatus);

// Rota para deletar um usuário por ID
router.delete("/usuarios/:id", authMiddleware, UsuarioController.deletarUsuario);
// Rota para deletar um usuário por ID
router.delete("/usuarios/:id/deletar", authMiddleware, UsuarioController.deletarProprioUsuario);

// Rota para buscar usuário por ID
router.get('/usuarios/:id', authMiddleware, UsuarioController.buscarUsuarioPorId);

// Rota para buscar um usuário pelo nome
router.get("/usuarios/user/:usuario", authMiddleware, UsuarioController.buscarUsuarioPorNome);







module.exports = router;
