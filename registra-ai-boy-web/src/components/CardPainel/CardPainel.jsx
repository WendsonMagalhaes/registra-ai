import { useState, useEffect } from "react";
import "./CardPainel.css";
import axios from "axios";


const CardPainel = ({ data }) => {
    const [statusDoRegistro, setStatusDoRegistro] = useState(data.status_do_registro);
    const [statusRegistro, setStatusRegistro] = useState(data.status_registro);

    const [statusPagamento, setStatusPagamento] = useState(data.status_do_pagamento);
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };
    useEffect(() => {
        if (data && data.status_registro) {
            setStatusRegistro(data.status_registro); // Define o valor ao carregar a página
        }
    }, [data]); // Executa quando `data` mudar

    // Função para fechar o modal ao clicar fora dele
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    const toggleUpdateStatus = async () => {

        try {

            // Chama a API para atualizar o status para "Registrado"
            const response = await axios.patch(`http://127.0.0.1:3000/registro/${data.id}/status`, { status_registro: statusRegistro, status_do_registro: statusDoRegistro, status_do_pagamento: statusPagamento });

            // Verifica se a resposta da API foi bem-sucedida
            if (response.data.success) {
                alert("Status do registro atualizado para 'Registrado'!");
            } else {
                alert("Erro ao atualizar status.");
            }
        } catch (error) {
            console.error("Erro ao atualizar o status:", error);
            alert("Erro ao atualizar o status do registro.");
        }
    };

    return (
        <div>
            {/* Card Inicial - Exibe apenas alguns campos */}
            <div className="card-painel-modal" onClick={() => setIsOpen(true)}>
                <p className="id"> {data.id}</p>
                <p className="data"> {data.data}</p>
                <p className="contrato"> {data.contrato}</p>
                <p className="nome"> {data.nome}</p>
                <p className="motoboy"> {data.motoboy}</p>
                <p className="status-do-registro"> {statusDoRegistro}</p>
                <p className="status-pagamento"> {statusPagamento}</p>
                <p className="status-registro"> {statusRegistro}</p>

            </div>

            {/* Modal com todos os detalhes */}
            {isOpen && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal">
                        <button className="close-btn" onClick={closeModal}>X</button>

                        <h2>Detalhes do Registro</h2>
                        <div className="card-painel-modal-section">
                            <div className="card-painel-modal-section-left">

                                {/* Linha 1 */}
                                <div className="card-painel-modal-div section-01">

                                    <div className="form-group id">
                                        <input type="text" value={data.id} readOnly />
                                        <label className="form-label">ID</label>
                                    </div>
                                    <div className="form-group contrato">
                                        <input type="text" value={data.contrato} readOnly />
                                        <label className="form-label">Contrato</label>
                                    </div>
                                    <div className="form-group nome">
                                        <input type="text" value={data.nome} readOnly />
                                        <label className="form-label">Nome</label>
                                    </div>
                                    <div className="form-group data">
                                        <input type="text" value={data.data} readOnly />
                                        <label className="form-label">Data</label>
                                    </div>
                                </div>
                                {/* Linha 2 */}
                                <div className="card-painel-modal-div section-02">

                                    <div className="form-group data-ativacao">
                                        <input type="text" value={data.data_de_ativacao} readOnly />
                                        <label className="form-label">Data de Ativação</label>
                                    </div>
                                    <div className="form-group form-pagamento">
                                        <input type="text" value={data.forma_de_pagamento} readOnly />
                                        <label className="form-label">Forma de Pagamento</label>
                                    </div>
                                    <div className="form-group quant-parcelas">
                                        <input type="text" value={data.quant_parcelas} readOnly />
                                        <label className="form-label">Quantidade de Parcelas</label>
                                    </div>
                                    <div className="form-group total-debito">
                                        <input type="text" value={data.total_debito} readOnly />
                                        <label className="form-label">Total do Débito</label>
                                    </div>
                                </div>
                                {/* Linha 3 */}
                                <div className="card-painel-modal-div section-03">

                                    <div className="form-group status-ocorrencia">
                                        <input type="text" value={data.status_registro} readOnly />
                                        <label className="form-label">Status da Ocorrência</label>
                                    </div>
                                    <div className="form-group motoboy">
                                        <input type="text" value={data.motoboy} readOnly />
                                        <label className="form-label">Motoboy</label>
                                    </div>
                                    <div className="form-group vencimento-registro">
                                        <input type="text" value={data.vencimento_registro} readOnly />
                                        <label className="form-label">Vencimento do Registro</label>
                                    </div>
                                </div>
                                {/* Linha 4 */}
                                <div className="card-painel-modal-div section-04">
                                    <div className="form-group select-container">
                                        <select
                                            className="select-status-registro"
                                            value={statusRegistro}
                                            onChange={(e) => setStatusRegistro(e.target.value)}
                                            required
                                        >
                                            <option value="">Status Registro</option>
                                            <option value="Pendente">Pendente</option>
                                            <option value="Registrado">Registrado</option>
                                        </select>
                                        <label className="form-label">Status Registro</label>
                                    </div>
                                    <div className="form-group status-registro">
                                        <input type="text" value={statusDoRegistro} readOnly />
                                        <label className="form-label">Status do Registro</label>
                                    </div>
                                    <div className="form-group status-pagamento">
                                        <input type="text" value={statusPagamento} readOnly />
                                        <label className="form-label">Status do Pagamento</label>
                                    </div>
                                </div>
                            </div>
                            <div className="card-painel-modal-section-right">
                                <div className="form-group ocorrencia">
                                    <textarea type="text" value={data.ocorrencia} readOnly />
                                    <label className="form-label">Ocorrência</label>
                                </div>
                                {/* Botão para fechar o modal */}
                                <button className="button-save" onClick={toggleUpdateStatus}>Salvar</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default CardPainel;
