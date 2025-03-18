import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Image, Animated, TouchableOpacity } from "react-native";
import axios from "axios";
import stylesPainel from "./Painel.styles"
import { Picker } from '@react-native-picker/picker';

import FormGroup from "../../components/FormGroup/FormGroup";
import stylesFormGroup from "../../components/FormGroup/FormGroup.styles"
import SelectFormGroup from "../../components/SelectFormGroup/SelectFormGroup";



const Painel: React.FC = () => {

    const [filterContrato, setFilterContrato] = useState("");
    const [filterNome, setFilterNome] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [selectedMotoboy, setSelectedMotoboy] = useState("");
    const [selectedOption, setSelectedOption] = useState(""); // Define o estado para a opção selecionada

    const motoboyOptions = [
        { label: "Motoboy 01", value: "Motoboy 01" },
        { label: "Motoboy 02", value: "Motoboy 02" },
        { label: "Motoboy 03", value: "Motoboy 03" },
        { label: "Motoboy 04", value: "Motoboy 04" },
    ];

    return (
        <View style={stylesPainel.container}>
            <ScrollView style={stylesPainel.scrollContainer} keyboardShouldPersistTaps="handled">
                <View style={stylesPainel.topSide}>
                    <View style={stylesPainel.logoContainer}>

                        <Image source={require("../../../assets/logo-01.png")} style={stylesPainel.logo} />
                        <View style={stylesPainel.logoContainerText}>
                            <Text style={stylesPainel.title}>Registrados</Text>
                            <Text style={stylesPainel.description}>Consulte aqui as negociações feitas</Text>

                        </View>
                    </View>
                </View>
                <View style={stylesPainel.filterContainer}>
                    <Text>Filtros</Text>
                    <View style={stylesPainel.formGroup01}>
                        <View style={stylesPainel.formGroup0101}>
                            <FormGroup
                                label="Contrato"
                                value={filterContrato}
                                onChange={(text) => setFilterContrato(text)}
                                editableBoolean={true}
                                style={stylesFormGroup.input}

                            />
                        </View>
                        <View style={stylesPainel.formGroup0102}>
                            <FormGroup
                                label="Nome"
                                value={filterNome}
                                onChange={(text) => setFilterNome(text)}
                                editableBoolean={true}
                                style={stylesFormGroup.input}

                            />
                        </View>

                    </View>
                    <View style={stylesPainel.formGroup02}>
                        <View style={stylesPainel.formGroup0201}>
                            <SelectFormGroup
                                label="Status"
                                value={selectedOption}
                                onChange={setSelectedOption}
                                editableBoolean={true}
                                options={["", "Opção 1", "Opção 2", "Opção 3"]}
                            />
                        </View>


                    </View>

                </View>
            </ScrollView>
        </View>
    );
};


export default Painel;