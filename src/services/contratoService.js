const ContratoRepository = require("../repositories/contratoRepository");


class ContratoService {

    async criarContrato(contrato, formaPagamento, cobertura, qtdParcelasAtrasadas,
        parcelaMaisAtrasada, nome, cpfCnpj, cidade, ddd, telefone, dddCel, telefone2,
        telefone3, debitoTotal, endereco, bairro, cep, pontoReferencia, codVindi) {
        try {
            const novoContrato = await ContratoRepository.criarContrato(contrato, formaPagamento, cobertura, qtdParcelasAtrasadas,
                parcelaMaisAtrasada, nome, cpfCnpj, cidade, ddd, telefone, dddCel, telefone2,
                telefone3, debitoTotal, endereco, bairro, cep, pontoReferencia, codVindi);
            return { success: true, message: "Contrato criado com sucesso!", contrato: novoContrato };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async listarContratos() {
        try {
            const contratos = await ContratoRepository.listarContratos();
            return contratos;
        } catch (error) {
            throw new Error('Erro ao listar contratos: ' + error.message);
        }
    }

    async atualizarContrato(contrato, formaPagamento, cobertura, qtdParcelasAtrasadas,
        parcelaMaisAtrasada, nome, cpfCnpj, cidade, ddd, telefone, dddCel, telefone2,
        telefone3, debitoTotal, endereco, bairro, cep, pontoReferencia, codVindi) {
        try {
            const contratoExistente = await ContratoRepository.buscarContrato(contrato);
            if (!contratoExistente) {
                return { success: false, message: "Contrato não encontrado." };
            }

            const resultado = await ContratoRepository.atualizarContrato(contrato, formaPagamento, cobertura, qtdParcelasAtrasadas,
                parcelaMaisAtrasada, nome, cpfCnpj, cidade, ddd, telefone, dddCel, telefone2,
                telefone3, debitoTotal, endereco, bairro, cep, pontoReferencia, codVindi);
            return { success: true, message: "Contrato atualizado com sucesso!", contrato: resultado };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async deletarContrato(contrato) {
        try {
            const contrato = await ContratoRepository.buscarContrato(contrato);
            if (!contrato) {
                return { success: false, message: "Contrato não encontrado." };
            }

            await ContratoRepository.deletarContrato(contrato);
            return { success: true, message: "Contrato deletado com sucesso!" };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async buscarContrato(contrato) {
        try {
            const contratoEncontrado = await ContratoRepository.buscarContrato(contrato);
            if (!contratoEncontrado) {
                throw new Error('Contrato não encontrado!');
            }
            return contratoEncontrado;
        } catch (error) {
            throw new Error('Erro ao buscar contrato: ' + error.message);
        }
    }

}



module.exports = new ContratoService();
