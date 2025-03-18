import { useState } from "react";
import axios from "axios";
import "./Registrar.css";
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import Card from "../../components/Card/Card";



import logo from '../../assets/logo-01.png';
import userIcon from '../../assets/logo-01.png'; // Coloque o ícone do usuário

const Registrar = () => {
    const userName = localStorage.getItem("userName") || "Usuário"; // Valor padrão caso esteja vazio
    const [inputBuscar, setInputBuscar] = useState('');  // Para armazenar o valor do input
    const [contrato, setContrato] = useState('');
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [pontoReferencia, setPontoReferencia] = useState('');
    const [dataAtivacao, setDataAtivacao] = useState('');
    const [telefone01, setTelefone01] = useState('');
    const [telefone02, setTelefone02] = useState('');
    const [formaPagamento, setFormaPagamento] = useState('');
    const [tempoCasa, setTempoCasa] = useState('');
    const [vencAntigo, setVencAntigo] = useState('');
    const [quantParcela, setQuantParcela] = useState('');
    const [totalDebito, setTotalDebito] = useState('');
    const [cardsData, setCardsData] = useState([]);
    const [selectedDescriptions, setSelectedDescriptions] = useState([]);

    const [contratoData, setContratoData] = useState({
        contrato: '',
        nome: '',
        endereco: '',
        bairro: '',
        pontoReferencia: '',
        dataAtivacao: '',
        telefone01: '',
        telefone02: '',
        formaPagamento: '',
        tempoCasa: '',
        vencAntigo: '',
        quantParcela: '',
        totalDebito: '',
    });
    const opcoesDescontos = {
        semDesconto: { desconto: "Sem Desconto", descricao: "Cobrança efetuada sem negociação" },
        descontoNaoOfertado: { desconto: "Desconto não Ofertado", descricao: "Cobrança efetuada, porém não foi feita nenhuma negociação" },
        desconto5: { desconto: "5% de Desconto", descricao: "Ofertado desconto de 5%" },
        desconto10: { desconto: "10% de Desconto", descricao: "Ofertado desconto de 10%" },
        desconto15: { desconto: "15% de Desconto", descricao: "Ofertado desconto de 15%" },
        desconto20: { desconto: "20% de Desconto", descricao: "Ofertado desconto de 20%" },
        desconto25: { desconto: "25% de Desconto", descricao: "Ofertado desconto de 25%" },
        parcelamento2: { desconto: "Parcelamento em 2 Vezes", descricao: "Ofertado parcelamento em 2 vezes" },
        parcelamento3: { desconto: "Parcelamento em 3 Vezes", descricao: "Ofertado parcelamento em 3 vezes" },
        parcelamento4: { desconto: "Parcelamento em 4 Vezes", descricao: "Ofertado parcelamento em 4 vezes" },
        parcelamento6: { desconto: "Parcelamento em 6 Vezes", descricao: "Ofertado parcelamento em 6 vezes" },
        parcelamento8: { desconto: "Parcelamento em 8 Vezes", descricao: "Ofertado parcelamento em 8 vezes" },
        isencao1: { desconto: "Isenção de 1 parcela", descricao: "Ofertado isenção de 1 parcela" },
        isencao2: { desconto: "Isenção de 2 parcelas", descricao: "Ofertado isenção de 2 parcelas" },
        desconto5Parc2: { desconto: "5% de Desconto com Parcelamento em 2 Vezes", descricao: "Ofertado desconto de 5% mais parcelamento em 2 vezes" },
        desconto5Parc3: { desconto: "5% de Desconto com Parcelamento em 3 Vezes", descricao: "Ofertado desconto de 5% mais parcelamento em 3 vezes" },
        desconto5Parc4: { desconto: "5% de Desconto com Parcelamento em 4 Vezes", descricao: "Ofertado desconto de 5% mais parcelamento em 4 vezes" },
    };

    const propostasDescontos = {
        0: { 0: [{ desconto: "Cliente resgatado em menos de 6 meses, verificar se foi ofertado algum desconto.", descricao: 'Cobrança efetuada, sem desconto. Cliente resgatado em menos de 6 meses.' }] },

        2: {
            0: [opcoesDescontos.semDesconto, opcoesDescontos.desconto5, opcoesDescontos.descontoNaoOfertado],
            1: [opcoesDescontos.parcelamento2, opcoesDescontos.desconto5, opcoesDescontos.semDesconto, opcoesDescontos.descontoNaoOfertado],
            2: [opcoesDescontos.parcelamento2, opcoesDescontos.desconto10, opcoesDescontos.semDesconto, opcoesDescontos.descontoNaoOfertado],
            3: [opcoesDescontos.parcelamento4, opcoesDescontos.desconto15, opcoesDescontos.desconto5Parc2, opcoesDescontos.semDesconto, opcoesDescontos.descontoNaoOfertado],
            4: [opcoesDescontos.parcelamento4, opcoesDescontos.desconto20, opcoesDescontos.desconto5Parc2, opcoesDescontos.semDesconto, opcoesDescontos.descontoNaoOfertado],
        },

        3: {
            0: [opcoesDescontos.semDesconto, opcoesDescontos.desconto5, opcoesDescontos.desconto10, opcoesDescontos.descontoNaoOfertado],
            1: [opcoesDescontos.parcelamento3, opcoesDescontos.desconto5, opcoesDescontos.desconto10, opcoesDescontos.semDesconto, opcoesDescontos.descontoNaoOfertado],
            2: [opcoesDescontos.parcelamento3, opcoesDescontos.desconto10, opcoesDescontos.desconto15, opcoesDescontos.desconto5Parc2, opcoesDescontos.semDesconto, opcoesDescontos.descontoNaoOfertado],
            3: [opcoesDescontos.parcelamento6, opcoesDescontos.desconto10, opcoesDescontos.desconto20, opcoesDescontos.desconto5Parc3, opcoesDescontos.isencao1, opcoesDescontos.semDesconto, opcoesDescontos.descontoNaoOfertado],
            4: [opcoesDescontos.parcelamento6, opcoesDescontos.desconto10, opcoesDescontos.desconto25, opcoesDescontos.desconto5Parc3, opcoesDescontos.isencao1, opcoesDescontos.semDesconto, opcoesDescontos.descontoNaoOfertado],
        },

        4: {
            0: [opcoesDescontos.semDesconto, opcoesDescontos.desconto5, opcoesDescontos.desconto10, opcoesDescontos.descontoNaoOfertado],
            1: [opcoesDescontos.parcelamento4, opcoesDescontos.desconto5, opcoesDescontos.desconto10, opcoesDescontos.semDesconto, opcoesDescontos.descontoNaoOfertado],
            2: [opcoesDescontos.parcelamento4, opcoesDescontos.desconto10, opcoesDescontos.desconto20, opcoesDescontos.desconto5Parc4, opcoesDescontos.semDesconto, opcoesDescontos.descontoNaoOfertado],
            3: [opcoesDescontos.parcelamento8, opcoesDescontos.desconto10, opcoesDescontos.desconto25, opcoesDescontos.desconto5Parc4, opcoesDescontos.isencao2, opcoesDescontos.semDesconto, opcoesDescontos.descontoNaoOfertado],
        },
    };



    // Função que será chamada ao clicar no botão de busca
    const handleSearchContrato = async () => {
        try {
            // Fazendo a requisição à API passando o contrato/CPF
            const response = await axios.get(`http://127.0.0.1:3000/contrato/${inputBuscar}`);

            // Exibindo o resultado no console (ou realizando outras ações com a resposta)
            console.log('Contrato encontrado:', response.data);
            setContratoData({

                contrato: response.data.contrato,
                nome: response.data.nome,
                endereco: response.data.endereco,
                bairro: response.data.bairro,
                pontoReferencia: response.data.ponto_referencia,
                dataAtivacao: response.data.data_ativacao,
                telefone01: response.data.telefone,
                telefone02: response.data.telefone2,
                formaPagamento: response.data.forma_pagamento,
                tempoCasa: response.data.tempo_de_casa,
                vencAntigo: response.data.parcela_mais_atrasada,
                quantParcela: response.data.qtd_parcelas_atrasadas,
                totalDebito: response.data.debito_total,
            });
            obterPropostasDesconto(response.data.qtd_parcelas_atrasadas, response.data.tempo_de_casa);

        } catch (error) {
            console.error('Erro ao buscar o contrato:', error);

        }
    };
    const handleSearchCPF = async () => {
        try {
            // Fazendo a requisição à API passando o contrato/CPF
            const response = await axios.get(`http://127.0.0.1:3000/contratos/${inputBuscar}`);

            // Exibindo o resultado no console (ou realizando outras ações com a resposta)
            console.log('Contrato encontrado:', response.data);
        } catch (error) {
            console.error('Erro ao buscar o contrato:', error);
        }
    };
    const obterPropostasDesconto = async (parcelasEmAberto, tempoDeCaso) => {
        // Ajustando os valores conforme as regras
        const parcelasCorrigidas = parcelasEmAberto > 4 ? 4 : parcelasEmAberto;
        const tempoCasoCorrigido = tempoDeCaso > 3 ? 3 : tempoDeCaso;

        // Verificando se existe proposta para os valores ajustados
        if (propostasDescontos[parcelasCorrigidas] && propostasDescontos[parcelasCorrigidas][tempoCasoCorrigido]) {
            setCardsData(propostasDescontos[parcelasCorrigidas][tempoCasoCorrigido]);
        } else {
            setCardsData([{ desconto: "Sem proposta disponível", descricao: "Nenhuma proposta foi encontrada para os critérios fornecidos." }]);
        }
    };
    const handleSelect = (description) => {
        setSelectedDescriptions((prev) => [...prev, description]);
        console.log("Descrições selecionadas:", [...selectedDescriptions, description]);
    };

    const truncateTo255 = (value) => {
        if (typeof value === 'string' && value.length > 255) {
            return value.slice(0, 255);  // Trunca para 255 caracteres
        }
        return value;
    };

    const handleRegistrar = async () => {
        try {
            if (!contratoData.contrato) {
                alert("Por favor, busque um contrato antes de registrar.");
                return;
            }

            const propostas = selectedDescriptions
                .map((desc, index) => `${index + 1}. Proposta: ${desc}`)
                .join("\n");

            const ocorrenciaData = truncateTo255(`
                Cobrança realizada pelo Motoboy ${userName}
                Status do Cliente: Comprometeu-se a ir à loja ou entrar em contato com a Central.
    
                Negociação:
                ${propostas}
    
                Observação: Considerar apenas uma proposta de negociação.
    
                ${userName} - ${contratoData.data}
            `.trim()) || "Nenhuma ocorrência informada";

            const dadosRegistro = {
                data: new Date().toISOString().split("T")[0],
                contrato: contratoData.contrato,
                nome: contratoData.nome,
                endereco: contratoData.endereco,
                bairro: contratoData.bairro,
                telefone: contratoData.telefone01,
                forma_de_pagamento: contratoData.formaPagamento,
                data_de_ativacao: contratoData.dataAtivacao,
                quant_parcelas: contratoData.quantParcela,
                total_debito: contratoData.totalDebito,
                motoboy: "Motoboy Padrão",
                ocorrencia: ocorrenciaData,
                status_registro: "Pendente",
                vencimento_registro: contratoData.vencAntigo,
                status_do_registro: "Ativo",
                status_do_pagamento: "Pendente"
            };

            const response = await axios.post("http://127.0.0.1:3000/registros", dadosRegistro);

            alert(response.status === 201 ? "Registro criado com sucesso!" : "Erro ao criar o registro. Tente novamente.");
        } catch (error) {
            console.error("Erro ao registrar:", error);
            alert("Erro ao processar o registro.");
        }
    };





    return (
        <div className="registrar-container">
            <Header headerTitle="Registrar Cobrança" userName={userName.toUpperCase()} />
            <div className="registrar-main">
                <Menu /> {/* Exibe o menu lateral */}
                <section className="registrar-main-section">
                    <div className="registrar-main-section-search">
                        <div className="form-group" >
                            <input type="text"
                                className="search-input"
                                placeholder="Contrato/CPF"
                                required
                                value={inputBuscar} // Valor do input controlado pelo estado
                                onChange={(e) => setInputBuscar(e.target.value)}>
                            </input>
                            <label className="form-label">Contrato/CPF</label>
                        </div>
                        <button
                            className="button-search"
                            onClick={handleSearchContrato}
                        >
                            Buscar
                        </button>
                    </div>
                    <div className="registrar-main-section-result result-01">

                        <div className="form-group" >
                            <input type="text" className="result-01-01" placeholder="Nome"
                                required value={contratoData.nome} readOnly>
                            </input>
                            <label className="form-label">Nome</label>
                        </div>

                        <div className="form-group" >
                            <input type="text" className="result-01-02" placeholder="Contrato"
                                required value={contratoData.contrato} >
                            </input>
                            <label className="form-label">Contrato</label>
                        </div>
                    </div>
                    <div className="registrar-main-section-result result-02">

                        <div className="form-group" >
                            <input type="text" className="result-02-01" placeholder="Endereço"
                                required value={contratoData.endereco} >
                            </input>
                            <label className="form-label">Endereço</label>
                        </div>

                        <div className="form-group" >
                            <input type="text" className="result-02-02" placeholder="Bairro"
                                required value={contratoData.bairro} >
                            </input >
                            <label className="form-label">Bairro</label>
                        </div>
                    </div>
                    <div className="registrar-main-section-result result-03">

                        <div className="form-group" >
                            <input type="text" className="result-03-01" placeholder="Ponto de Referência"
                                required value={contratoData.pontoReferencia} >
                            </input>
                            <label className="form-label">Ponto de Referência</label>
                        </div>

                        <div className="form-group" >
                            <input type="text" className="result-03-02" placeholder="Data de Ativação"
                                required value={contratoData.dataAtivacao} >
                            </input>
                            <label className="form-label">Data de Ativação</label>
                        </div>
                    </div>
                    <div className="registrar-main-section-result result-04">

                        <div className="form-group" >
                            <input type="text" className="result-04-01" placeholder="Telefone 01"
                                required value={contratoData.telefone01} >
                            </input>
                            <label className="form-label">Telefone 01</label>
                        </div>

                        <div className="form-group" >
                            <input type="text" className="result-04-02" placeholder="Telefone 02"
                                required value={contratoData.telefone02} >
                            </input>
                            <label className="form-label">Telefone 02</label>
                        </div>
                        <div className="form-group" >
                            <input type="text" className="result-04-03" placeholder="F. Pagamento"
                                required value={contratoData.formaPagamento} >
                            </input>
                            <label className="form-label">F. Pagamento</label>
                        </div>
                        <div className="form-group" >
                            <input type="text" className="result-04-04" placeholder="Temp. Casa"
                                required value={contratoData.tempoCasa} >
                            </input>
                            <label className="form-label">Temp. Casa</label>
                        </div>
                    </div>
                    <div className="registrar-main-section-result result-05">

                        <div className="form-group" >
                            <input type="text" className="result-05-01" placeholder="Venc. Antigo"
                                required value={contratoData.vencAntigo} >
                            </input>
                            <label className="form-label">Venc. Antigo</label>
                        </div>

                        <div className="form-group" >
                            <input type="text" className="result-05-02" placeholder="Quant. Parcelas"
                                required value={contratoData.quantParcela} >
                            </input>
                            <label className="form-label">Quant. Parcelas</label>
                        </div>
                        <div className="form-group" >
                            <input type="text" className="result-05-03" placeholder="Total Débito"
                                required value={contratoData.totalDebito} >
                            </input>
                            <label className="form-label">Total Débito</label>
                        </div>
                    </div>
                    <div className="registrar-main-section-result result-06">
                        <div className="card-section">

                            {cardsData.map((card, index) => (
                                <Card
                                    key={index}
                                    title={card.desconto}
                                    description={card.descricao}
                                    onSelect={handleSelect}

                                />
                            ))}
                        </div>
                    </div>
                    <div className="registrar-main-section-button">
                        <button
                            className="button-registrar"
                            onClick={handleRegistrar}>
                            Registrar
                        </button>
                    </div>

                </section>
            </div>

        </div>
    );
};

export default Registrar;
