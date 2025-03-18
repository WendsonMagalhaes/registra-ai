import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Image, Animated, TouchableOpacity } from "react-native";
import axios from "axios";
import stylesRegistrar from './Registrar.styles'; // Importe o arquivo de estilos
import FormGroup from "../../components/FormGroup/FormGroup";
import stylesFormGroup from "../../components/FormGroup/FormGroup.styles"
import Card from "../../components/Card/Card"
import Menu from "../../components/Menu/Menu"
import AsyncStorage from "@react-native-async-storage/async-storage";



const Registrar: React.FC = () => {
    const [userName, setUserName] = useState("Usuário");
    const [inputBuscar, setInputBuscar] = useState("");
    const [outputNome, setOutputNome] = useState("");
    const [outputContrato, setOutputContrato] = useState("");
    const [outputEndereco, setOutputEndereco] = useState("");
    const [outputBairro, setOutputBairro] = useState("");
    const [outputDataAtivacao, setOutputDataAtivacao] = useState("");
    const [outputPontoReferencia, setOutputPontoReferencia] = useState("");
    const [outputTelefone01, setOutputTelefone01] = useState("");
    const [outputTelefone02, setOutputTelefone02] = useState("");
    const [outputFormaPagamento, setOutputFormaPagamento] = useState("");
    const [outputTempoCasa, setOutputTempoCasa] = useState("");
    const [outputVencAntigo, setOutputVencAntigo] = useState("");
    const [outputQuantParcelas, setOutputQuantParcelas] = useState("");
    const [outputTotalDebito, setOutputTotalDebito] = useState("");
    const [loading, setLoading] = useState(false);

    const [cardsData, setCardsData] = useState<PropostaDesconto[]>([]);
    const [selectedDescriptions, setSelectedDescriptions] = useState<string[]>([]);


    const [contratoData, setContratoData] = useState({
        contrato: "",
        nome: "",
        endereco: "",
        bairro: "",
        pontoReferencia: "",
        dataAtivacao: "",
        telefone01: "",
        telefone02: "",
        formaPagamento: "",
        tempoCasa: "",
        vencAntigo: "",
        quantParcela: "",
        totalDebito: "",
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
    interface PropostaDesconto {
        desconto: string;
        descricao: string;
    }

    type PropostasDescontos = {
        [key: number]: {
            [key: number]: PropostaDesconto[];
        };
    };
    const propostasDescontos: PropostasDescontos = {
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
    useEffect(() => {
        const loadUserName = async () => {
            try {
                const storedUserName = await AsyncStorage.getItem("userName");
                if (storedUserName) {
                    setUserName(storedUserName);
                }
            } catch (error) {
                console.error("Erro ao recuperar userName:", error);
            }
        };

        loadUserName();
    }, []);
    const handleSearchContrato = async () => {
        try {
            const response = await axios.get(`http://192.168.18.6:3000/contrato/${inputBuscar}`);
            console.log(response.data)
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
            console.error("Erro ao buscar contrato", error);
        }
    };

    const obterPropostasDesconto = async (parcelasEmAberto: number, tempoDeCaso: number) => {
        // Garantir que os valores são numéricos
        const parcelas = Number(parcelasEmAberto) || 0;
        const tempo = Number(tempoDeCaso) || 0;

        // Ajustando os valores conforme as regras
        const parcelasCorrigidas = parcelas > 4 ? 4 : parcelas;
        const tempoCasoCorrigido = tempo > 3 ? 3 : tempo;

        // Verifica se `propostasDescontos` está definido e possui a estrutura esperada
        if (propostasDescontos && propostasDescontos[parcelasCorrigidas] && propostasDescontos[parcelasCorrigidas][tempoCasoCorrigido]) {
            setCardsData(propostasDescontos[parcelasCorrigidas][tempoCasoCorrigido]);
        } else {
            setCardsData([{ desconto: "Sem proposta disponível", descricao: "Nenhuma proposta foi encontrada para os critérios fornecidos." }]);
        }
    };


    const handleSelect = (description: string) => {
        setSelectedDescriptions((prev) => [...prev, description]);
        console.log("Descrições selecionadas:", [...selectedDescriptions, description]);
    };

    const truncateTo255 = (value: string) => {
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
    
                ${userName} - ${new Date().toISOString().split("T")[0]}
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

            const response = await axios.post("http://192.168.18.6:3000/registros", dadosRegistro);

            alert(response.status === 201 ? "Registro criado com sucesso!" : "Erro ao criar o registro. Tente novamente.");
        } catch (error) {
            console.error("Erro ao registrar:", error);
            alert("Erro ao processar o registro.");
        }
    };

    return (
        <View style={stylesRegistrar.container}>
            <ScrollView style={stylesRegistrar.scrollContainer} keyboardShouldPersistTaps="handled">

                <View style={stylesRegistrar.topSide}>
                    <View style={stylesRegistrar.logoContainer}>

                        <Image source={require("../../../assets/logo-01.png")} style={stylesRegistrar.logo} />
                        <View style={stylesRegistrar.logoContainerText}>
                            <Text style={stylesRegistrar.title}>Registrar</Text>
                            <Text style={stylesRegistrar.description}>Registre aqui sua negociação</Text>

                        </View>
                    </View>
                    <View style={stylesRegistrar.searchContainer}>

                        <FormGroup
                            label="Contrato/CPF"
                            value={inputBuscar}
                            onChange={(text) => setInputBuscar(text)}
                            editableBoolean={true}
                            style={stylesFormGroup.input}

                        />
                        <TouchableOpacity style={stylesRegistrar.button} onPress={handleSearchContrato} disabled={loading}>
                            <Text style={stylesRegistrar.buttonText}>{loading ? 'Buscando...' : 'Buscar'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={stylesRegistrar.containerResult}>
                    <View style={stylesRegistrar.formGroup01}>
                        <FormGroup
                            label="Nome"
                            value={contratoData.nome}
                            onChange={(text) => setOutputNome(text)}
                            editableBoolean={false}

                        />
                    </View>
                    <View style={stylesRegistrar.formGroup02}>
                        <FormGroup
                            label="Contrato"
                            value={contratoData.contrato}
                            onChange={(text) => setOutputContrato(text)}
                            editableBoolean={false}

                        />
                    </View>
                </View>
                <View style={stylesRegistrar.containerResult_1}>
                    <FormGroup
                        label="Endereco"
                        value={contratoData.endereco}
                        onChange={(text) => setOutputEndereco(text)}
                        editableBoolean={false}

                    />

                </View>
                <View style={stylesRegistrar.containerResult}>
                    <View style={stylesRegistrar.formGroup03}>

                        <FormGroup
                            label="Bairro"
                            value={contratoData.bairro}
                            onChange={(text) => setOutputBairro(text)}
                            editableBoolean={false}

                        />
                    </View>
                    <View style={stylesRegistrar.formGroup04}>

                        <FormGroup
                            label="Data Ativação"
                            value={contratoData.dataAtivacao}
                            onChange={(text) => setOutputDataAtivacao(text)}
                            editableBoolean={false}

                        />
                    </View>
                </View>
                <View style={stylesRegistrar.containerResult_1}>
                    <FormGroup
                        label="Ponto de Referência"
                        value={contratoData.pontoReferencia}
                        onChange={(text) => setOutputPontoReferencia(text)}
                        editableBoolean={false}

                    />
                </View>
                <View style={stylesRegistrar.containerResult}>
                    <View style={stylesRegistrar.formGroup03}>

                        <FormGroup
                            label="Telefone 01"
                            value={contratoData.telefone01}
                            onChange={(text) => setOutputTelefone01(text)}
                            editableBoolean={false}

                        />
                    </View>
                    <View style={stylesRegistrar.formGroup04}>

                        <FormGroup
                            label="Telefone 02"
                            value={contratoData.telefone02}
                            onChange={(text) => setOutputTelefone02(text)}
                            editableBoolean={false}

                        />
                    </View>
                </View>
                <View style={stylesRegistrar.containerResult}>
                    <View style={stylesRegistrar.formGroup03}>

                        <FormGroup
                            label="Form Pagamento"
                            value={contratoData.formaPagamento}
                            onChange={(text) => setOutputFormaPagamento(text)}
                            editableBoolean={false}


                        />
                    </View>
                    <View style={stylesRegistrar.formGroup04}>

                        <FormGroup
                            label="Tempo Casa"
                            value={contratoData.tempoCasa}
                            onChange={(text) => setOutputTempoCasa(text)}
                            editableBoolean={false}

                        />
                    </View>
                </View>
                <View style={stylesRegistrar.containerResult}>
                    <View style={stylesRegistrar.formGroup03}>

                        <FormGroup
                            label="Venc Antigo"
                            value={contratoData.vencAntigo}
                            onChange={(text) => setOutputVencAntigo(text)}
                            editableBoolean={false}

                        />
                    </View>
                    <View style={stylesRegistrar.formGroup04}>

                        <FormGroup
                            label="Quant Parcelas"
                            value={contratoData.quantParcela}
                            onChange={(text) => setOutputQuantParcelas(text)}
                            editableBoolean={false}

                        />
                    </View>
                </View>
                <View style={stylesRegistrar.containerResult_2}>
                    <FormGroup
                        label="Débito Total"
                        value={contratoData.totalDebito}
                        onChange={(text) => setOutputTotalDebito(text)}
                        editableBoolean={false}
                    />

                </View>

                <View style={stylesRegistrar.containerCard}>
                    {cardsData.map((card, index) => (
                        <Card
                            key={index}
                            title={card.desconto}
                            description={card.descricao}
                            onSelect={handleSelect}

                        />
                    ))}


                </View>
                <TouchableOpacity style={stylesRegistrar.buttonRegistrar} onPress={handleRegistrar} disabled={loading}>
                    <Text style={stylesRegistrar.buttonTextRegistrar}>{loading ? 'Registrando...' : 'Registrar'}</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Menu Inferior */}
            <View style={stylesRegistrar.footerMenu}>
                <Menu />
            </View>

        </View >
    );
};


export default Registrar;
