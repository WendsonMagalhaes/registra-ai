const bcrypt = require('bcryptjs');
const db = require("../database");


class RegistroRepository {
    // Método para criar os registro
    async criarRegistro(data, contrato, nome, endereco, bairro, telefone, formaDePagamento, dataDeAtivacao,
        quantParcelas, totalDebito, motoboy, ocorrencia, statusRegistro, vencimentoRegistro, statusDoRegistro, statusDoPagamento) {

        const query = `
          INSERT INTO registros (
              data, contrato, nome, endereco, bairro, telefone, forma_de_pagamento, 
              data_de_ativacao, quant_parcelas, total_debito, motoboy, ocorrencia, 
              status_registro, vencimento_registro, status_do_registro, status_do_pagamento
          ) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) 
          RETURNING *`;
        const valores = [data, contrato, nome, endereco, bairro, telefone, formaDePagamento, dataDeAtivacao,
            quantParcelas, totalDebito, motoboy, ocorrencia, statusRegistro, vencimentoRegistro, statusDoRegistro, statusDoPagamento];

        const { rows } = await db.query(query, valores);
        return rows[0]; // Retorna o registro criado
    }

    // Método para listar todos os registros
    async listarRegistros() {
        try {
            // Usa db.query() para consultar os registros
            const { rows } = await db.query('SELECT * FROM registros;');  // Usando query ao invés de execute
            return rows;  // Retorna os registros encontrados
        } catch (error) {
            throw new Error('Erro ao consultar registros no banco de dados: ' + error.message);
        }
    }

    // Método para atualizar Registros
    async atualizarRegistro(id, data, contrato, nome, endereco, bairro, telefone, formaDePagamento, dataDeAtivacao,
        quantParcelas, totalDebito, motoboy, ocorrencia, statusRegistro, vencimentoRegistro, statusDoRegistro, statusDoPagamento) {
        try {
            const query = `
               UPDATE registros
                SET 
                    contrato = COALESCE($1, contrato),
                    nome = COALESCE($2, nome),
                    endereco = COALESCE($3, endereco),
                    bairro = COALESCE($4, bairro),
                    telefone = COALESCE($5, telefone),
                    forma_de_pagamento = COALESCE($6, forma_de_pagamento),
                    data_de_ativacao = COALESCE($7, data_de_ativacao),
                    quant_parcelas = COALESCE($8, quant_parcelas),
                    total_debito = COALESCE($9, total_debito),
                    motoboy = COALESCE($10, motoboy),
                    ocorrencia = COALESCE($11, ocorrencia),
                    status_registro = COALESCE($12, status_registro),
                    vencimento_registro = COALESCE($13, vencimento_registro),
                    status_do_registro = COALESCE($14, status_do_registro),
                    status_do_pagamento = COALESCE($15, status_do_pagamento)
                WHERE id = $16
                RETURNING *;

            `;

            const valores = [data, contrato, nome, endereco, bairro, telefone, formaDePagamento, dataDeAtivacao,
                quantParcelas, totalDebito, motoboy, ocorrencia, statusRegistro, vencimentoRegistro, statusDoRegistro, statusDoPagamento];

            const { rows } = await db.query(query, valores);
            return rows[0] || null;
        } catch (error) {
            throw new Error('Erro ao atualizar registro: ' + error.message);
        }
    }

    // Método para atualizar Registros
    async atualizarStatusRegistro(id, statusDoRegistro) {
        try {
            const query = `
            UPDATE registros
            SET 
                status_registro = COALESCE($1, status_registro)
            WHERE id = $2
            RETURNING *;
        `;

            const valores = [statusDoRegistro, id]; // Passando o id como segundo parâmetro
            const { rows } = await db.query(query, valores);
            return rows[0] || null;
        } catch (error) {
            throw new Error('Erro ao atualizar registro: ' + error.message);
        }
    }

    // Método para atualizar Registros
    async atualizarStatus(id, statusRegistro, statusDoRegistro, statusDoPagamento) {
        try {
            const query = `
                UPDATE registros
                SET 
                    status_registro = COALESCE($1, status_registro),
                    status_do_registro = COALESCE($2, status_do_registro),
                    status_do_pagamento = COALESCE($3, status_do_pagamento)

                WHERE id = $4
                RETURNING *;
            `;

            const valores = [statusRegistro, statusDoRegistro, statusDoPagamento, id]; // Passando o id como segundo parâmetro
            const { rows } = await db.query(query, valores);
            return rows[0] || null;
        } catch (error) {
            throw new Error('Erro ao atualizar registro: ' + error.message);
        }
    }


    // Método para deletar registros
    async deletarRegistro(id) {
        try {
            const query = `DELETE FROM registros WHERE id = $1`;
            await db.query(query, [id]);
        } catch (error) {
            throw new Error("Erro ao deletar registro: " + error.message);
        }
    }


    // Método auxiliar para buscar um registro pelo ID
    async buscarRegistroPorId(id) {
        try {
            const query = `SELECT * FROM registros WHERE id = $1`;
            const { rows } = await db.query(query, [id]);

            return rows[0] || null;  // Retorna o Registro ou null se não encontrado
        } catch (error) {
            throw new Error('Erro ao buscar registro: ' + error.message);
        }
    }


}

module.exports = new RegistroRepository();

