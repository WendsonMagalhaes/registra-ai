const bcrypt = require('bcryptjs');
const db = require("../database");


class UsuarioRepository {
    // Método para criar os usuários
    async criarUsuario(usuario, password, acess, status) {
        // Verifica se o usuário já existe
        const usuarioExistente = await this.buscarUsuarioPorNome(usuario);
        if (usuarioExistente) {
            throw new Error('Usuário já existe!');
        }

        // Gera um hash seguro da senha
        const salt = await bcrypt.genSalt(10); // Gera um "sal" para fortalecer a criptografia
        const senhaCriptografada = await bcrypt.hash(password, salt);

        const query = `
          INSERT INTO usuarios (usuario, password, acess, status) 
          VALUES ($1, $2, $3, $4) RETURNING *`;
        const valores = [usuario, senhaCriptografada, acess, status];

        const { rows } = await db.query(query, valores);
        return rows[0]; // Retorna o usuário criado
    }

    // Método para listar todos os usuários
    async listarUsuarios() {
        try {
            // Usa db.query() para consultar os usuários
            const { rows } = await db.query('SELECT * FROM usuarios;');  // Usando query ao invés de execute
            return rows;  // Retorna os usuários encontrados
        } catch (error) {
            throw new Error('Erro ao consultar usuários no banco de dados: ' + error.message);
        }
    }

    // Método para atualizar usuários
    async atualizarUsuario(id, usuario, password, acess, status) {
        try {
            // Se uma nova senha for fornecida, criptografa antes de atualizar
            let senhaCriptografada = null;
            if (password) {
                const salt = await bcrypt.genSalt(10);
                senhaCriptografada = await bcrypt.hash(password, salt);
            }

            const query = `
                UPDATE usuarios
                SET usuario = $1, password = COALESCE($2, password), acess = $3, status = $4
                WHERE id = $5
                RETURNING *;
            `;

            const valores = [usuario, senhaCriptografada, acess, status, id];

            const { rows } = await db.query(query, valores);
            return rows[0] || null;
        } catch (error) {
            throw new Error('Erro ao atualizar usuário: ' + error.message);
        }
    }
    // Método para atualizar apenas o nome do usuário
    async atualizarNome(id, novoNome) {
        try {
            const query = `UPDATE usuarios SET usuario = $1 WHERE id = $2 RETURNING *;`;
            const { rows } = await db.query(query, [novoNome, id]);
            return rows[0] || null;
        } catch (error) {
            throw new Error('Erro ao atualizar nome: ' + error.message);
        }
    }

    // Método para atualizar apenas a senha do usuário
    async atualizarSenha(id, novaSenha) {
        try {
            // Gera um hash seguro da senha
            const salt = await bcrypt.genSalt(10); // Gera um "sal" para fortalecer a criptografia
            const senhaCriptografada = await bcrypt.hash(novaSenha, salt);

            const query = `UPDATE usuarios SET password = $1 WHERE id = $2 RETURNING *;`;
            const { rows } = await db.query(query, [senhaCriptografada, id]);
            return rows[0] || null;
        } catch (error) {
            throw new Error('Erro ao atualizar senha: ' + error.message);
        }
    }

    // Método para atualizar apenas o nível de acesso do usuário
    async atualizarAcesso(id, novoAcesso) {
        try {
            const query = `UPDATE usuarios SET acess = $1 WHERE id = $2 RETURNING *;`;
            const { rows } = await db.query(query, [novoAcesso, id]);
            return rows[0] || null;
        } catch (error) {
            throw new Error('Erro ao atualizar nível de acesso: ' + error.message);
        }
    }

    // Método para atualizar apenas o status do usuário
    async atualizarStatus(id, novoStatus) {
        try {
            const query = `UPDATE usuarios SET status = $1 WHERE id = $2 RETURNING *;`;
            const { rows } = await db.query(query, [novoStatus, id]);
            return rows[0] || null;
        } catch (error) {
            throw new Error('Erro ao atualizar status: ' + error.message);
        }
    }


    // Método para deletar usuários
    async deletarUsuario(id) {
        try {
            const query = `DELETE FROM usuarios WHERE id = $1`;
            await db.query(query, [id]);
        } catch (error) {
            throw new Error("Erro ao deletar usuário: " + error.message);
        }
    }

    // Método para deletar usuário (somente o próprio usuário pode se deletar)
    async deletarUsuario(id, usuarioIdSolicitante) {
        try {
            if (parseInt(id) !== usuarioIdSolicitante) {
                throw new Error('Você só pode deletar sua própria conta.');
            }

            const query = `DELETE FROM usuarios WHERE id = $1 RETURNING *;`;
            const { rows } = await db.query(query, [id]);

            if (!rows[0]) {
                throw new Error('Usuário não encontrado.');
            }

            return { message: "Usuário deletado com sucesso." };
        } catch (error) {
            throw new Error('Erro ao deletar usuário: ' + error.message);
        }
    }

    // Método auxiliar para para buscar o usuário pelo nome
    async buscarUsuarioPorNome(usuario) {
        const query = `SELECT * FROM usuarios WHERE usuario = $1`;
        const { rows } = await db.query(query, [usuario]);

        return rows[0] || null; // Retorna o usuário ou null se não existir
    }
    // Método auxiliar para buscar um usuário pelo ID
    async buscarUsuarioPorId(id) {
        try {
            const query = `SELECT * FROM usuarios WHERE id = $1`;
            const { rows } = await db.query(query, [id]);

            return rows[0] || null;  // Retorna o usuário ou null se não encontrado
        } catch (error) {
            throw new Error('Erro ao buscar usuário: ' + error.message);
        }
    }


}

module.exports = new UsuarioRepository();

