import { useState, useEffect } from "react";
import axios from "axios";
import "./Painel.css";
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import CardRegistro from "../../components/CardRegistro/CardRegistro";
import CardPainel from "../../components/CardPainel/CardPainel";
import logo from '../../assets/logo-01.png';
import userIcon from '../../assets/logo-01.png'; // Coloque o ícone do usuário

const Painel = () => {
    const userName = localStorage.getItem("userName") || "Usuário"; // Valor padrão caso esteja vazio

    const registrosCardPainel = [
        {
            id: "001",
            data: "07/03/2025",
            contrato: "CT12345",
            nome: "Carlos Almeida",
            formaPagamento: "Cartão de Crédito",
            dataAtivacao: "01/03/2025",
            qtdParcelas: 12,
            totalDebito: "R$ 1.200,00",
            motoboy: "Motoboy 04",
            ocorrencia: "Entrega atrasada",
            statusOcorrencia: "Pendente",
            vencimentoRegistro: "10/03/2025",
            statusRegistro: "Aberto",
            statusPagamento: "Pendente",
        },
        {
            id: "002",
            data: "06/03/2025",
            contrato: "CT67890",
            nome: "Mariana Souza",
            formaPagamento: "Boleto",
            dataAtivacao: "02/03/2025",
            qtdParcelas: 6,
            totalDebito: "R$ 600,00",
            motoboy: "Motoboy 01",
            ocorrencia: "Entrega no prazo",
            statusOcorrencia: "Resolvido",
            vencimentoRegistro: "08/03/2025",
            statusRegistro: "Fechado",
            statusPagamento: "Pago",
        },
        {
            id: "003",
            data: "08/03/2025",
            contrato: "CT54321",
            nome: "Lucas Oliveira",
            formaPagamento: "PIX",
            dataAtivacao: "03/03/2025",
            qtdParcelas: 3,
            totalDebito: "R$ 300,00",
            motoboy: "Motoboy 03",
            ocorrencia: "Falha na entrega",
            statusOcorrencia: "Pendente",
            vencimentoRegistro: "09/03/2025",
            statusRegistro: "Aberto",
            statusPagamento: "Pendente",
        },
        {
            id: "004",
            data: "07/03/2025",
            contrato: "CT11122",
            nome: "Fernanda Lima",
            formaPagamento: "Transferência",
            dataAtivacao: "04/03/2025",
            qtdParcelas: 10,
            totalDebito: "R$ 2.000,00",
            motoboy: "Motoboy 01",
            ocorrencia: "Reagendado",
            statusOcorrencia: "Em análise",
            vencimentoRegistro: "11/03/2025",
            statusRegistro: "Pendente",
            statusPagamento: "Aguardando",
        },
        {
            id: "005",
            data: "07/03/2025",
            contrato: "CT77788",
            nome: "Gabriel Martins",
            formaPagamento: "Débito",
            dataAtivacao: "05/03/2025",
            qtdParcelas: 8,
            totalDebito: "R$ 1.500,00",
            motoboy: "Motoboy 02",
            ocorrencia: "Entrega cancelada",
            statusOcorrencia: "Cancelado",
            vencimentoRegistro: "12/03/2025",
            statusRegistro: "Fechado",
            statusPagamento: "Estornado",
        },
    ];

    // Estados para armazenar os filtros
    const [contrato, setContrato] = useState("");
    const [nome, setNome] = useState("");
    const [motoboy, setMotoboy] = useState("");
    const [status, setStatus] = useState("");
    const [registrosData, setRegistrosData] = useState([]);

    // Função para listar os registros da API
    const listarRegistros = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:3000/registros"); // Ajuste a URL conforme necessário
            setRegistrosData(response.data); // Atualiza o estado com os registros retornados
            console.log(response.data)
        } catch (error) {
            console.error("Erro ao carregar os registros:", error);
        }
    };

    useEffect(() => {
        listarRegistros();

    }, []);

    // Função de filtragem nos registros
    const painelFiltrados = registrosData
        .filter((registro) => {
            return (
                registro.contrato.toLowerCase().includes(contrato.toLowerCase()) &&
                registro.nome.toLowerCase().includes(nome.toLowerCase()) &&
                (motoboy ? registro.motoboy === motoboy : true) &&
                (status ? registro.statusRegistro === status : true) // Corrigir para comparar com o status do registro
            );
        })
        // Ordenando os registros, com "Pendente" vindo primeiro
        .sort((a, b) => {
            if (a.statusRegistro === "Pendente" && b.statusRegistro !== "Pendente") {
                return -1; // "Pendente" vem primeiro
            }
            if (a.statusRegistro !== "Pendente" && b.statusRegistro === "Pendente") {
                return 1; // "Pendente" vem depois
            }
            return 0; // Se ambos tiverem o mesmo status, mantém a ordem
        });

    return (
        <div className="painel-container">
            <Header headerTitle="Painel" userName={userName.toUpperCase()} />
            <div className="painel-main">
                <Menu /> {/* Exibe o menu lateral */}
                <section className="painel-main-section">
                    <div className="painel-main-section-filter">
                        <h3>Filtros</h3>
                        <div className="form-group">
                            <input
                                type="text"
                                className="filter-contrato"
                                placeholder="Contrato"
                                value={contrato}
                                onChange={(e) => setContrato(e.target.value)} // Atualiza o estado de contrato
                                required
                            />
                            <label className="form-label">Contrato</label>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="filter-nome"
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)} // Atualiza o estado de nome
                                required
                            />
                            <label className="form-label">Nome</label>
                        </div>
                        <div className="form-group select-container">
                            <select
                                className="filter-motoboy"
                                value={motoboy}
                                onChange={(e) => setMotoboy(e.target.value)} // Atualiza o estado de motoboy
                                required
                            >
                                <option value="">Selecione um Motoboy</option>
                                <option value="Motoboy 01">Motoboy 01</option>
                                <option value="Motoboy 02">Motoboy 02</option>
                                <option value="Motoboy 03">Motoboy 03</option>
                                <option value="Motoboy 04">Motoboy 04</option>
                            </select>
                            <label className="form-label">Motoboy</label>
                        </div>
                        <div className="form-group select-container">
                            <select
                                className="filter-status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)} // Atualiza o estado de status
                                required
                            >
                                <option value="">Selecione um Status</option>
                                <option value="Pendente">Pendente</option>
                                <option value="Registrado">Registrado</option>
                            </select>
                            <label className="form-label">Status</label>
                        </div>
                    </div>

                    <div className="painel-main-section-painel">
                        <div className="painel-header">
                            <span className="id">ID</span>
                            <span className="data">Data</span>
                            <span className="contrato">Contrato</span>
                            <span className="nome">Nome</span>
                            <span className="motoboy">Motoboy</span>
                            <span className="status-registro">Status Registro</span>
                            <span className="status-pagamento">Status Pagamento</span>
                        </div>
                        <div>
                            {painelFiltrados.map((registro) => (
                                <CardPainel key={registro.id} data={registro} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Painel;
