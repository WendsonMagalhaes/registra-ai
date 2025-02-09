const bcrypt = require('bcryptjs');
const db = require("../database");


class ContratoRepository {
    // Método para criar os contratos
    async criarContrato(contrato, formaPagamento, cobertura, qtdParcelasAtrasadas,
        parcelaMaisAtrasada, nome, cpfCnpj, cidade, ddd, telefone, dddCel, telefone2,
        telefone3, debitoTotal, endereco, bairro, cep, pontoReferencia, codVindi) {
        // Verifica se o contrato já existe
        const contratoExistente = await this.buscarContrato(contrato);
        if (contratoExistente) {
            throw new Error('Contrato já existe!');
        }

        const query = `
          INSERT INTO base_clientes 
          (contrato, forma_pagamento, cobertura, qtd_parcelas_atrasadas, parcela_mais_atrasada, nome, cpf_cnpj, cidade, ddd, telefone, ddd_cel, telefone2, telefone3, debito_total, endereco, bairro, cep, ponto_referencia, cod_vindi) 
          VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) 
          RETURNING *`;
        const valores = [contrato, formaPagamento, cobertura, qtdParcelasAtrasadas, parcelaMaisAtrasada, nome, cpfCnpj, cidade, ddd, telefone, dddCel, telefone2, telefone3, debitoTotal, endereco, bairro, cep, pontoReferencia, codVindi];

        const { rows } = await db.query(query, valores);
        return rows[0]; // Retorna o contrato criado
    }

    // Método para listar todos os contratos
    async listarContratos() {
        try {
            // Usa db.query() para consultar os contratos
            const { rows } = await db.query('SELECT * FROM base_clientes;');  // Usando query ao invés de execute
            return rows;  // Retorna os contratos encontrados
        } catch (error) {
            throw new Error('Erro ao consultar contratos no banco de dados: ' + error.message);
        }
    }

    // Método para atualizar usuários
    async atualizarContrato(contratoId, formaPagamento, cobertura, qtdParcelasAtrasadas, parcelaMaisAtrasada, nome, cpfCnpj, cidade, ddd, telefone, dddCel, telefone2, telefone3, debitoTotal, endereco, bairro, cep, pontoReferencia, codVindi) {
        try {
            const query = `
                UPDATE base_clientes
                SET 
                    forma_pagamento = COALESCE($1, forma_pagamento),
                    cobertura = COALESCE($2, cobertura),
                    qtd_parcelas_atrasadas = COALESCE($3, qtd_parcelas_atrasadas),
                    parcela_mais_atrasada = COALESCE($4, parcela_mais_atrasada),
                    nome = COALESCE($5, nome),
                    cpf_cnpj = COALESCE($6, cpf_cnpj),
                    cidade = COALESCE($7, cidade),
                    ddd = COALESCE($8, ddd),
                    telefone = COALESCE($9, telefone),
                    ddd_cel = COALESCE($10, ddd_cel),
                    telefone2 = COALESCE($11, telefone2),
                    telefone3 = COALESCE($12, telefone3),
                    debito_total = COALESCE($13, debito_total),
                    endereco = COALESCE($14, endereco),
                    bairro = COALESCE($15, bairro),
                    cep = COALESCE($16, cep),
                    ponto_referencia = COALESCE($17, ponto_referencia),
                    cod_vindi = COALESCE($18, cod_vindi)
                WHERE contrato = $19
                RETURNING *;
            `;

            const valores = [
                formaPagamento, cobertura, qtdParcelasAtrasadas, parcelaMaisAtrasada, nome, cpfCnpj, cidade,
                ddd, telefone, dddCel, telefone2, telefone3, debitoTotal, endereco, bairro, cep, pontoReferencia,
                codVindi, contratoId
            ];
            const { rows } = await db.query(query, valores);
            return rows[0] || null;
        } catch (error) {
            throw new Error('Erro ao atualizar contrato: ' + error.message);
        }
    }

    // Método para deletar contratos
    async deletarContrato(contrato) {
        try {
            const query = `DELETE FROM base_clientes WHERE contrato = $1`;
            await db.query(query, [contrato]);
        } catch (error) {
            throw new Error("Erro ao deletar contrato: " + error.message);
        }
    }

    // Método auxiliar para para buscar contrato
    async buscarContrato(contrato) {
        const query = `SELECT * FROM base_clientes WHERE contrato = $1`;
        const { rows } = await db.query(query, [contrato]);

        return rows[0] || null; // Retorna o contrato ou null se não existir
    }

}

module.exports = new ContratoRepository();

