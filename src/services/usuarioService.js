const UsuarioRepository = require("../repositories/usuarioRepository");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();


const SECRET_KEY = process.env.SECRET_KEY;

class UsuarioService {

    async criarUsuario(usuario, password, acess, status) {
        try {
            const novoUsuario = await UsuarioRepository.criarUsuario(usuario, password, acess, status);
            return { success: true, message: "Usuário criado com sucesso!", usuario: novoUsuario };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async listarUsuarios() {
        try {
            const usuarios = await UsuarioRepository.listarUsuarios();
            return usuarios;
        } catch (error) {
            throw new Error('Erro ao listar usuários: ' + error.message);
        }
    }

    async atualizarUsuario(id, usuario, password, acess, status) {
        try {
            const usuarioExistente = await UsuarioRepository.buscarUsuarioPorId(id);
            if (!usuarioExistente) {
                return { success: false, message: "Usuário não encontrado." };
            }

            const resultado = await UsuarioRepository.atualizarUsuario(id, usuario, password, acess, status);
            return { success: true, message: "Usuário atualizado com sucesso!", usuario: resultado };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
    // Atualizar apenas o nome do usuário
    async atualizarNome(id, novoNome) {
        try {
            const usuarioExistente = await UsuarioRepository.buscarUsuarioPorId(id);
            if (!usuarioExistente) {
                return { success: false, message: "Usuário não encontrado." };
            }

            const resultado = await UsuarioRepository.atualizarNome(id, novoNome);
            return { success: true, message: "Nome atualizado com sucesso!", usuario: resultado };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // Atualizar apenas a senha do usuário
    async atualizarSenha(id, novaSenha) {
        try {
            const usuarioExistente = await UsuarioRepository.buscarUsuarioPorId(id);
            if (!usuarioExistente) {
                return { success: false, message: "Usuário não encontrado." };
            }
            const resultado = await UsuarioRepository.atualizarSenha(id, novaSenha);
            return { success: true, message: "Senha atualizada com sucesso!" };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // Atualizar apenas o nível de acesso
    async atualizarAcesso(id, novoAcesso) {
        try {
            const usuarioExistente = await UsuarioRepository.buscarUsuarioPorId(id);
            if (!usuarioExistente) {
                return { success: false, message: "Usuário não encontrado." };
            }

            const resultado = await UsuarioRepository.atualizarAcesso(id, novoAcesso);
            return { success: true, message: "Acesso atualizado com sucesso!", usuario: resultado };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // Atualizar apenas o status do usuário
    async atualizarStatus(id, novoStatus) {
        try {
            const usuarioExistente = await UsuarioRepository.buscarUsuarioPorId(id);
            if (!usuarioExistente) {
                return { success: false, message: "Usuário não encontrado." };
            }

            const resultado = await UsuarioRepository.atualizarStatus(id, novoStatus);
            return { success: true, message: "Status atualizado com sucesso!", usuario: resultado };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }


    async deletarUsuario(id) {
        try {
            const usuario = await UsuarioRepository.buscarUsuarioPorId(id);
            if (!usuario) {
                return { success: false, message: "Usuário não encontrado." };
            }

            await UsuarioRepository.deletarUsuario(id);
            return { success: true, message: "Usuário deletado com sucesso!" };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }


    // Permitir que apenas o próprio usuário exclua sua conta
    async deletarUsuario(id, userIdSolicitante) {
        console.log(userIdSolicitante)
        console.log(id)
        console.log(parseInt(id))
        console.log(parseInt(id) !== userIdSolicitante)

        try {
            if (parseInt(id) !== userIdSolicitante) {
                return { success: false, message: "Você só pode excluir sua própria conta." };
            }

            const usuario = await UsuarioRepository.buscarUsuarioPorId(id);
            if (!usuario) {
                return { success: false, message: "Usuário não encontrado." };
            }

            await UsuarioRepository.deletarUsuario(id, userIdSolicitante);
            return { success: true, message: "Usuário deletado com sucesso!" };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async buscarUsuarioPorId(id) {
        try {
            const usuario = await UsuarioRepository.buscarUsuarioPorId(id);
            if (!usuario) {
                throw new Error('Usuário não encontrado!');
            }
            return usuario;
        } catch (error) {
            throw new Error('Erro ao buscar usuário: ' + error.message);
        }
    }

    async buscarUsuarioPorNome(usuario) {
        try {
            const usuarioEncontrado = await UsuarioRepository.buscarUsuarioPorNome(usuario);
            if (!usuarioEncontrado) {
                return { success: false, message: "Usuário não encontrado." };
            }
            return { success: true, usuario: usuarioEncontrado };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async login(usuario, password) {
        try {
            const usuarioEncontrado = await UsuarioRepository.buscarUsuarioPorNome(usuario);
            if (!usuarioEncontrado) {
                return { success: false, message: "Usuário não encontrado" };
            }

            const senhaCorreta = await bcrypt.compare(password, usuarioEncontrado.password);
            console.log(usuarioEncontrado.password)
            console.log(password)
            console.log(senhaCorreta)


            if (!senhaCorreta) {
                return { success: false, message: "Senha incorreta" };
            }

            const token = jwt.sign(
                { id: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario, acess: usuarioEncontrado.acess },
                SECRET_KEY,
                { expiresIn: "2h" }
            );

            return { success: true, message: "Login realizado com sucesso!", token };
        } catch (error) {
            return { success: false, message: "Erro ao fazer login: " + error.message };
        }
    }
}



module.exports = new UsuarioService();
