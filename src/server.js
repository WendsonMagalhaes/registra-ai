require("dotenv").config(); // Carrega variáveis de ambiente do arquivo .env
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');


// Importa as rotas de usuários
const usuarioRoutes = require("./routes/usuarioRoutes");

// Importa as rotas de contratos
const contratoRoutes = require("./routes/contratoRoutes");

// Importa as rotas de registros
const registroRoutes = require("./routes/registroRoutes");

const app = express();

// Middleware para permitir CORS
app.use(cors());
// Middleware para interpretar requisições com corpo JSON
app.use(express.json());

// Definindo o prefixo '/' para as rotas de usuário
app.use("/", usuarioRoutes);

// Definindo o prefixo '/' para as rotas de contrato
app.use("/", contratoRoutes);

// Definindo o prefixo '/' para as rotas de registro
app.use("/", registroRoutes);

// Definir a porta, preferencialmente a variável de ambiente PORT ou a porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
