import React, { useRef, useEffect } from "react";
import { View, TextInput, Animated, TextStyle } from "react-native";
import stylesFormGroup from "./FormGroup.styles";

// Defina a interface para as propriedades do componente
interface FormGroupProps {
    label: string; // label será uma string
    value: string; // value será uma string
    onChange: (text: string) => void; // onChange será uma função que recebe um string e não retorna nada
    editableBoolean: boolean;
    style?: TextStyle;
}

const FormGroup: React.FC<FormGroupProps> = ({ label, value, onChange, editableBoolean = false, style }) => {
    const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(labelAnim, {
            toValue: value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [value]);

    const handleFocus = () => {
        Animated.timing(labelAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        Animated.timing(labelAnim, {
            toValue: value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
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
            <TextInput
                style={[stylesFormGroup.output, style]}
                placeholder=""
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                onFocus={handleFocus}
                onBlur={handleBlur}
                editable={editableBoolean}
            />
        </View>
    );
};

export default FormGroup;