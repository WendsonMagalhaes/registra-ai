import React, { useRef, useState, useEffect } from "react";
import { View, Animated, TextStyle } from "react-native";
import stylesFormGroup from "./SelectFormGroup.styles";
import { Picker } from '@react-native-picker/picker';

// Defina a interface para as propriedades do componente
interface SelectFormGroupProps {
    label: string;
    value: string;
    onChange: (text: string) => void;
    editableBoolean: boolean;
    style?: TextStyle;
    options: string[];
}

const SelectFormGroup: React.FC<SelectFormGroupProps> = ({ label, value, onChange, editableBoolean = false, style, options }) => {
    const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(labelAnim, {
            toValue: value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [value]);

    const handleSelectOption = (selectedValue: string) => {
        onChange(selectedValue); // Atualiza o valor ao escolher uma opção
    };

    return (
        <View style={stylesFormGroup.formGroup}>
            <Animated.Text
                style={[
                    stylesFormGroup.label,
                    {
                        top: labelAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [8, -14],
                        }),
                        fontSize: labelAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [15, 14],
                        }),
                        color: value ? "#042B48" : "#acacac",
                    },
                ]}
            >
                {label}
            </Animated.Text>

            {/* Picker diretamente visível */}
            <View style={[stylesFormGroup.output, style]}>
                <Picker
                    selectedValue={value}
                    onValueChange={handleSelectOption}
                    enabled={editableBoolean} // Permite seleção apenas se editableBoolean for true
                    style={stylesFormGroup.picker}
                >
                    {options.map((option, index) => (
                        <Picker.Item key={index} label={option} value={option}
                        />
                    ))}
                </Picker>

            </View>
        </View>
    );
};

export default SelectFormGroup;
