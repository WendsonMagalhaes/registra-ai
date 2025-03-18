const express = require("express");
const RegistroController = require("../controllers/registroController"); // Altere o caminho se necessário
const { authMiddleware, authorizeMiddleware } = require("../middlewares/auth");


const router = express.Router();

// Defina as rotas e associe-as ao controlador

// Rotas publicas
// Rota para listar todos os registros
router.get('/registros', RegistroController.listarRegistros);

// Rota para criar um novo registro
router.post("/registros", RegistroController.criarRegistro);
router.patch("/status-registro/:id", RegistroController.atualizarStatusRegistro);
router.patch("/registro/:id/status", RegistroController.atualizarStatus);



//Rotas protegidas
// Rota para listar registros com autenticação
router.get("/list/registros", authMiddleware, authorizeMiddleware(["admin"]), RegistroController.listarRegistros);

// Rota para atualizar um registro pelo ID
router.put("/registros/:id", authMiddleware, RegistroController.atualizarRegistro);

// Rota para deletar um registro por ID
router.delete("/registros/:id", authMiddleware, RegistroController.deletarRegistro);

// Rota para buscar registro por ID
router.get('/registros/:id', authMiddleware, RegistroController.buscarRegistroPorId);



module.exports = router;
