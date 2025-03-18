const express = require("express");
const ContratoController = require("../controllers/contratoController"); // Altere o caminho se necessário
const { authMiddleware, authorizeMiddleware } = require("../middlewares/auth");


const router = express.Router();

// Defina as rotas e associe-as ao controlador

// Rotas publicas
// Rota para listar todos os contratos
router.get('/contratos', ContratoController.listarContratos);

// Rota para criar um novo contrato
router.post("/contratos", ContratoController.criarContrato);

//Rotas protegidas
// Rota para listar contratos com autenticação
router.get("/list/contratos", authMiddleware, authorizeMiddleware(["admin"]), ContratoController.listarContratos);

// Rota para atualizar um contrato pelo CONTRATO
router.put("/contratos/:contrato", authMiddleware, ContratoController.atualizarContrato);

// Rota para deletar um contrato pelo CONTRATO
router.delete("/contratos/:contrato", authMiddleware, ContratoController.deletarContrato);

// Rota para buscar contrato pelo CONTRATO
router.get('/contrato/:contrato', ContratoController.buscarContrato);









module.exports = router;
