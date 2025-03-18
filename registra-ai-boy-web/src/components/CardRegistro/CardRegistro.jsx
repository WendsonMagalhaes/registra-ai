import { useState } from "react";
import { FaClipboard, FaClipboardCheck, FaCheck, FaCheckDouble } from "react-icons/fa";
import './CardRegistro.css';
import axios from "axios";

const CardRegistro = ({ id, contrato, nome, ocorrencia, motoboy, status_registro, data }) => {
    const [confirmado, setConfirmado] = useState(false);
    const [copiadoContrato, setCopiadoContrato] = useState(false);
    const [copiadoRegistro, setCopiadoRegistro] = useState(false);

    // Função para copiar texto para a área de transferência
    const copiarTexto = (texto, setCopiado) => {
        navigator.clipboard.writeText(texto);
        setCopiado(true);
    };

    // Função para alternar o estado de confirmação, mas não se o status for "Resolvido"
    const toggleConfirmado = async () => {
        if (status_registro === "Registrado") return; // Não faz nada se o status já for "Registrado"

        try {
            // Atualiza o estado local para refletir a mudança
            setConfirmado(!confirmado);

            // Chama a API para atualizar o status para "Registrado"
            const response = await axios.patch(`http://127.0.0.1:3000/status-registro/${id}`, { status_registro: "Registrado" });

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
        <div className={`card-registro ${status_registro === "Registrado" ? "blocked" : ""} ${confirmado ? "checked" : ""}`}>
            <span className="id">{id}</span>

            <div className="campo contrato">
                <span>{contrato}</span>
                <button
                    onClick={() => copiarTexto(contrato, setCopiadoContrato)}
                    disabled={status_registro === "Registrado"} // Desabilita o botão se o status for "Resolvido"
                >
                    {copiadoContrato ? <FaClipboardCheck size={20} color="#4CAF50" /> : <FaClipboard size={20} />}
                </button>
            </div>

            <span className="nome">{nome}</span>

            <div className="campo registro">
                <span>{ocorrencia}</span>
                <button
                    onClick={() => copiarTexto(ocorrencia, setCopiadoRegistro)}
                    disabled={status_registro === "Registrado"} // Desabilita o botão se o status for "Resolvido"
                >
                    {copiadoRegistro ? <FaClipboardCheck size={20} color="#4CAF50" /> : <FaClipboard size={20} />}
                </button>
            </div>

            <span className="motoboy">{motoboy}</span>
            <span className="status">{status_registro}</span>
            <span className="data">{data}</span>

            <button
                className="confirmar-btn acoes"
                onClick={toggleConfirmado}
                disabled={status_registro === "Registrado"} // Desabilita o botão se o status for "Resolvido"
            >
                {/* Exibe o ícone correto dependendo do status */}
                {status_registro === "Registrado" ? (
                    <FaCheckDouble size={24} color="#4CAF50" /> // Ícone de duplo check se o status for "Registrado"
                ) : confirmado ? (
                    <FaCheckDouble size={24} color="#4CAF50" /> // Ícone de duplo check se confirmado for true
                ) : (
                    <FaCheck size={24} /> // Caso contrário, exibe o ícone de check único
                )}
            </button>
        </div>
    );
};

export default CardRegistro;
