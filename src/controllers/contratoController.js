const ContratoService = require("../services/contratoService");

class ContratoController {

    async criarContrato(req, res) {
        const { contrato, formaPagamento, cobertura, qtdParcelasAtrasadas,
            parcelaMaisAtrasada, nome, cpfCnpj, cidade, ddd, telefone, dddCel, telefone2,
            telefone3, debitoTotal, endereco, bairro, cep, pontoReferencia, codVindi } = req.body;

        const resultado = await ContratoService.criarContrato(contrato, formaPagamento, cobertura, qtdParcelasAtrasadas,
            parcelaMaisAtrasada, nome, cpfCnpj, cidade, ddd, telefone, dddCel, telefone2,
            telefone3, debitoTotal, endereco, bairro, cep, pontoReferencia, codVindi);

        return res.status(resultado.success ? 201 : 400).json(resultado);
    }

    async listarContratos(req, res) {
        try {
            const contratos = await ContratoService.listarContratos();
            return res.status(200).json(contratos);
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao listar contratos' });
        }
    }

    async atualizarContrato(req, res) {
        const { id } = req.params;
        const { contrato, formaPagamento, cobertura, qtdParcelasAtrasadas,
            parcelaMaisAtrasada, nome, cpfCnpj, cidade, ddd, telefone, dddCel, telefone2,
            telefone3, debitoTotal, endereco, bairro, cep, pontoReferencia, codVindi } = req.body;

        try {
            const resultado = await ContratoService.atualizarContrato(contrato, formaPagamento, cobertura, qtdParcelasAtrasadas,
                parcelaMaisAtrasada, nome, cpfCnpj, cidade, ddd, telefone, dddCel, telefone2,
                telefone3, debitoTotal, endereco, bairro, cep, pontoReferencia, codVindi);

            return res.status(resultado.success ? 200 : 400).json(resultado);

        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar contrato' });
        }
    }

    async deletarContrato(req, res) {
        const { contrato } = req.params;

        try {
            const resultado = await ContratoService.deletarContrato(contrato);
            return res.status(resultado.success ? 200 : 400).json(resultado);
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao deletar contrato' });
        }
    }

    async buscarContrato(req, res) {
        const { contrato } = req.params;

        try {
            const contratoEncontrado = await ContratoService.buscarContrato(contrato);
            return res.status(200).json(contratoEncontrado);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }


}

module.exports = new ContratoController();