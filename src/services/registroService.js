const RegistroRepository = require("../repositories/registroRepository");

class RegistroService {

    async criarRegistro(data, contrato, nome, endereço, bairro, telefone, forma_de_pagamento,
        data_de_ativação, quant_parcelas, total_debito, motoboy, ocorrencia,
        status_registro, vencimento_registro, status_do_registro, status_do_pagamento
    ) {
        try {
            const novoRegistro = await RegistroRepository.criarRegistro(data, contrato, nome, endereço, bairro, telefone, forma_de_pagamento,
                data_de_ativação, quant_parcelas, total_debito, motoboy, ocorrencia,
                status_registro, vencimento_registro, status_do_registro, status_do_pagamento
            );
            return { success: true, message: "Registro criado com sucesso!", registro: novoRegistro };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async listarRegistros() {
        try {
            const registros = await RegistroRepository.listarRegistros();
            return registros;
        } catch (error) {
            throw new Error('Erro ao listar registros: ' + error.message);
        }
    }

    async atualizarRegistro(id, data, contrato, nome, endereço, bairro, telefone, forma_de_pagamento,
        data_de_ativação, quant_parcelas, total_debito, motoboy, ocorrencia,
        status_registro, vencimento_registro, status_do_registro, status_do_pagamento
    ) {
        try {
            const registroExistente = await RegistroRepository.buscarRegistroPorId(id);
            if (!registroExistente) {
                return { success: false, message: "Registro não encontrado." };
            }

            const resultado = await RegistroRepository.atualizarRegistro(id, data, contrato, nome, endereço, bairro, telefone, forma_de_pagamento,
                data_de_ativação, quant_parcelas, total_debito, motoboy, ocorrencia,
                status_registro, vencimento_registro, status_do_registro, status_do_pagamento
            );
            return { success: true, message: "Registro atualizado com sucesso!", registro: resultado };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async deletarRegistro(id) {
        try {
            const registro = await RegistroRepository.buscarRegistroPorId(id);
            if (!registro) {
                return { success: false, message: "Registro não encontrado." };
            }

            await RegistroRepository.deletarRegistro(id);
            return { success: true, message: "Registro deletado com sucesso!" };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async buscarRegistroPorId(id) {
        try {
            const registro = await RegistroRepository.buscarRegistroPorId(id);
            if (!registro) {
                throw new Error('Registro não encontrado!');
            }
            return registro;
        } catch (error) {
            throw new Error('Erro ao buscar registro: ' + error.message);
        }
    }

}



module.exports = new RegistroService();
