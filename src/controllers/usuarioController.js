const express = require("express");
const UsuarioService = require("../services/usuarioService");

class UsuarioController {

    async criarUsuario(req, res) {
        const { usuario, password, acess, status } = req.body;
        const resultado = await UsuarioService.criarUsuario(usuario, password, acess, status);
        return res.status(resultado.success ? 201 : 400).json(resultado);
    }

    async listarUsuarios(req, res) {
        try {
            const usuarios = await UsuarioService.listarUsuarios();
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao listar usuários' });
        }
    }

    async atualizarUsuario(req, res) {
        const { id } = req.params;
        const { usuario, password, acess, status } = req.body;

        try {
            const resultado = await UsuarioService.atualizarUsuario(id, usuario, password, acess, status);
            return res.status(resultado.success ? 200 : 400).json(resultado);
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar usuário' });
        }
    }
    async atualizarNome(req, res) {
        const { id } = req.params;
        const { novoNome } = req.body;

        try {
            const resultado = await UsuarioService.atualizarNome(id, novoNome);
            return res.status(resultado.success ? 200 : 400).json(resultado);
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao alterar nome' });
        }
    }

    async atualizarSenha(req, res) {
        const { id } = req.params;
        const { novaSenha } = req.body;

        try {
            const resultado = await UsuarioService.atualizarSenha(id, novaSenha);
            return res.status(resultado.success ? 200 : 400).json(resultado);
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao alterar senha' });
        }
    }

    async atualizarAcesso(req, res) {
        const { id } = req.params;
        const { novoAcesso } = req.body;

        try {
            const resultado = await UsuarioService.atualizarAcesso(id, novoAcesso);
            return res.status(resultado.success ? 200 : 400).json(resultado);
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao alterar acesso' });
        }
    }
    async atualizarStatus(req, res) {
        const { id } = req.params;
        const { novoStatus } = req.body;

        try {
            const resultado = await UsuarioService.atualizarStatus(id, novoStatus);
            return res.status(resultado.success ? 200 : 400).json(resultado);
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao alterar status' });
        }
    }

    async deletarUsuario(req, res) {
        const { id } = req.params;

        try {
            const resultado = await UsuarioService.deletarUsuario(id);
            return res.status(resultado.success ? 200 : 400).json(resultado);
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao deletar usuário' });
        }
    }

    async deletarProprioUsuario(req, res) {
        const { id } = req.params;
        const usuarioAutenticado = req.usuario.id;

        if (usuarioAutenticado !== parseInt(id)) {
            return res.status(403).json({ success: false, message: 'Você só pode deletar sua própria conta' });
        }

        try {
            const resultado = await UsuarioService.deletarUsuario(id, usuarioAutenticado);
            return res.status(resultado.success ? 200 : 400).json(resultado);
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao deletar usuário' });
        }
    }

    async buscarUsuarioPorId(req, res) {
        const { id } = req.params;  // Obtém o ID da URL

        try {
            const usuario = await UsuarioService.buscarUsuarioPorId(id);
            return res.status(200).json(usuario);  // Retorna o usuário encontrado
        } catch (error) {
            return res.status(400).json({ error: error.message });  // Retorna erro se não encontrar o usuário
        }
    }

    async buscarUsuarioPorNome(req, res) {
        const { usuario } = req.params;
        const resultado = await UsuarioService.buscarUsuarioPorNome(usuario);
        return res.status(resultado.success ? 200 : 404).json(resultado);
    }

    async login(req, res) {
        const { usuario, password } = req.body;

        try {
            const resultado = await UsuarioService.login(usuario, password);
            return res.status(resultado.success ? 200 : 401).json(resultado);
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao fazer login' });
        }
    }
}

module.exports = new UsuarioController();