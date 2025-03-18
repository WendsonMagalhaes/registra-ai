import { useState, useEffect } from "react";
import axios from "axios";
import "./Registrados.css";
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import CardRegistro from "../../components/CardRegistro/CardRegistro";

import logo from '../../assets/logo-01.png';
import userIcon from '../../assets/logo-01.png'; // Coloque o ícone do usuário

const Registrados = () => {
    const userName = localStorage.getItem("userName") || "Usuário"; // Valor padrão caso esteja vazio
    const registros = [
        { id: "001", contrato: "CT12345", nome: "Carlos Almeida", registro: "RG987654", motoboy: "Motoboy 04", status: "Pendente", data: "07/03/2025" },
        { id: "002", contrato: "CT67890", nome: "Mariana Souza", registro: "RG123456", motoboy: "Motoboy 01", status: "Registrado", data: "06/03/2025" },
        { id: "003", contrato: "CT54321", nome: "Lucas Oliveira", registro: "RG654321", motoboy: "Motoboy 03", status: "Pendente", data: "08/03/2025" },
        { id: "004", contrato: "CT11122", nome: "Fernanda Lima", registro: "RG789012", motoboy: "Motoboy 01", status: "Pendente", data: "07/03/2025" },
        { id: "005", contrato: "CT77788", nome: "Gabriel Martins", registro: "RG555888", motoboy: "Motoboy 02", status: "Registrado", data: "07/03/2025" },
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
        } catch (error) {
            console.error("Erro ao carregar os registros:", error);
        }
    };

    useEffect(() => {
        listarRegistros();
    }, []);


    // Função de filtragem
    const registrosFiltrados = registrosData
        .filter((registro) => {
            return (
                registro.contrato.toLowerCase().includes(contrato.toLowerCase()) &&
                registro.nome.toLowerCase().includes(nome.toLowerCase()) &&
                (motoboy ? registro.motoboy === motoboy : true) &&
                (status ? registro.status === status : true)
            );
        })
        // Ordenando os registros, com "Pendente" vindo primeiro
        .sort((a, b) => {
            if (a.status === "Pendente" && b.status !== "Pendente") {
                return -1; // "Pendente" vem primeiro
            }
            if (a.status !== "Pendente" && b.status === "Pendente") {
                return 1; // "Pendente" vem depois
            }
            return 0; // Se ambos tiverem o mesmo status, mantém a ordem
        });

    return (
        <div className="registrados-container">
            <Header headerTitle="Registrados" userName={userName.toUpperCase()} />
            <div className="registrados-main">
                <Menu /> {/* Exibe o menu lateral */}
                <section className="registrados-main-section">
                    <div className="registrados-main-section-filter">
                        <h3>Filtros</h3>
                        <div className="form-group" >
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
                        <div className="form-group" >
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
                                <option value="" >Selecione um Motoboy</option> {/* Esta opção faz o valor voltar a vazio */}
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
                                <option value="" >Selecione um Status</option>
                                <option value="Pendente">Pendente</option>
                                <option value="Registrado">Registrado</option>
                            </select>
                            <label className="form-label">Status</label>
                        </div>
                    </div>

                    <div className="registrados-main-section-painel">
                        <div className="registrados-header">
                            <span className="id">ID</span>
                            <span className="contrato">Contrato</span>
                            <span className="nome">Nome</span>
                            <span className="registro">Registro</span>
                            <span className="motoboy">Motoboy</span>
                            <span className="status">Status</span>
                            <span className="data">Data</span>
                            <span className="acoes">Ações</span>
                        </div>

                        {registrosFiltrados.map((registro) => (
                            <CardRegistro key={registro.id} {...registro} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Registrados;
