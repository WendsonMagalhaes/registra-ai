const express = require("express");
const RegistroService = require("../services/registroService");

class RegistroController {

    async criarRegistro(req, res) {
        const { data, contrato, nome, endereco, bairro, telefone, forma_de_pagamento,
            data_de_ativacao, quant_parcelas, total_debito, motoboy, ocorrencia,
            status_registro, vencimento_registro, status_do_registro, status_do_pagamento
        } = req.body;
        const resultado = await RegistroService.criarRegistro(data, contrato, nome, endereco, bairro, telefone, forma_de_pagamento,
            data_de_ativacao, quant_parcelas, total_debito, motoboy, ocorrencia,
            status_registro, vencimento_registro, status_do_registro, status_do_pagamento
        );
        return res.status(resultado.success ? 201 : 400).json(resultado);
    }

    async listarRegistros(req, res) {
        try {
            const registros = await RegistroService.listarRegistros();
            return res.status(200).json(registros);
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao listar registros' });
        }
    }

    async atualizarRegistro(req, res) {
        const { id } = req.params;
        const { data, contrato, nome, endereço, bairro, telefone, forma_de_pagamento,
            data_de_ativação, quant_parcelas, total_debito, motoboy, ocorrencia,
            status_registro, vencimento_registro, status_do_registro, status_do_pagamento
        } = req.body;

        try {
            const resultado = await RegistroService.atualizarRegistro(id, data, contrato, nome, endereço, bairro, telefone, forma_de_pagamento,
                data_de_ativação, quant_parcelas, total_debito, motoboy, ocorrencia,
                status_registro, vencimento_registro, status_do_registro, status_do_pagamento
            );
            return res.status(resultado.success ? 200 : 400).json(resultado);
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar registro' });
        }
    }
    async atualizarStatusRegistro(req, res) {
        const { id } = req.params;
        const { status_do_registro } = req.body;

        try {
            const resultado = await RegistroService.atualizarStatusRegistro(id, status_do_registro);
            return res.status(resultado.success ? 200 : 400).json(resultado);
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar registro: ' + error.message });
        }
    }
    async atualizarStatus(req, res) {
        const { id } = req.params;
        const { status_registro, status_do_registro, status_do_pagamento } = req.body;

        try {
            const resultado = await RegistroService.atualizarStatus(id, status_registro, status_do_registro, status_do_pagamento);
            return res.status(resultado.success ? 200 : 400).json(resultado);
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar registro: ' + error.message });
        }
    }

    async deletarRegistro(req, res) {
        const { id } = req.params;

        try {
            const resultado = await RegistroService.deletarRegistro(id);
            return res.status(resultado.success ? 200 : 400).json(resultado);
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao deletar registro' });
        }
    }

    async buscarRegistroPorId(req, res) {
        const { id } = req.params;  // Obtém o ID da URL

        try {
            const registro = await RegistroService.buscarregistroPorId(id);
            return res.status(200).json(registro);  // Retorna o registro encontrado
        } catch (error) {
            return res.status(400).json({ error: error.message });  // Retorna erro se não encontrar o registro
        }
    }

}

module.exports = new RegistroController();