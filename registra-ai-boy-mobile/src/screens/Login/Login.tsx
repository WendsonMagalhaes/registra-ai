import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, Animated, Image, ActivityIndicator } from 'react-native';
import stylesLogin from './Login.styles'; // Importe o arquivo de estilos
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


const Login: React.FC = () => {

    // Definição das rotas disponíveis
    type RootStackParamList = {
        Login: undefined;
        Registrar: undefined;
        Painel: undefined;
    };
    type NavigationProps = StackNavigationProp<RootStackParamList>;

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState<string | null>(null);
    const navigation = useNavigation<NavigationProps>();

    // Criação das animações para os labels
    const usuarioLabelAnim = useRef(new Animated.Value(usuario ? 1 : 0)).current;
    const senhaLabelAnim = useRef(new Animated.Value(password ? 1 : 0)).current;

    const handleFocus = (field: Animated.Value) => {
        Animated.timing(field, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = (field: Animated.Value, value: string) => {
        Animated.timing(field, {
            toValue: value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        Animated.timing(usuarioLabelAnim, {
            toValue: usuario ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [usuario]);

    useEffect(() => {
        Animated.timing(senhaLabelAnim, {
            toValue: password ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [password]);

    const handleLogin = async () => {
        setLoading(true);
        setErro(null);

        try {
            const response = await axios.post("http://192.168.18.6:3000/login", { usuario, password });
            const data = response.data;

            console.log("Resposta do backend:", data); // Verifique no console

            if (data.success) {
                await AsyncStorage.setItem("token", data.token); // Salva o token no AsyncStorage
                await AsyncStorage.setItem("userName", data.usuario); // Salva o nome do usuário
                navigation.navigate('Registrar'); // Navega para a tela "Registrar"
            } else {
                setErro(data.message || "Erro ao fazer login");
            }
        } catch (error) {
            const err = error as AxiosError;

            console.error("Erro na requisição:", error);

            if (err.response && err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data) {
                setErro((err.response.data as { message: string }).message);
            } else {
                setErro("Erro ao conectar ao servidor.");
            }
        }

        setLoading(false);
    };

    return (
        <View style={stylesLogin.container}>
            <View style={stylesLogin.loginBox}>
                <View style={stylesLogin.leftSide}>
                    <Image source={require('../../../assets/logo-01.png')} style={stylesLogin.logo} />
                    <View style={stylesLogin.leftSideText}>
                        <Text style={stylesLogin.title}>Bem-vindo</Text>
                        <Text style={stylesLogin.description}>Faça login para acessar sua conta</Text>
                    </View>
                </View>

                <View style={stylesLogin.rightSide}>
                    <View style={stylesLogin.form}>
                        <View style={stylesLogin.formGroup}>
                            <Animated.Text
                                style={[
                                    stylesLogin.label,
                                    {
                                        top: usuarioLabelAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [15, -15],
                                        }),
                                        fontSize: usuarioLabelAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [18, 14],
                                        }),
                                        color: usuario ? '#042B48' : '#acacac',
                                    },
                                ]}
                            >
                                Usuário
                            </Animated.Text>
                            <TextInput
                                style={stylesLogin.input}
                                placeholder=""
                                value={usuario}
                                onChangeText={setUsuario}
                                autoCapitalize="none"
                                onFocus={() => handleFocus(usuarioLabelAnim)}
                                onBlur={() => handleBlur(usuarioLabelAnim, usuario)}
                            />
                        </View>

                        <View style={stylesLogin.formGroup}>
                            <Animated.Text
                                style={[
                                    stylesLogin.label,
                                    {
                                        top: senhaLabelAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [15, -15],
                                        }),
                                        fontSize: senhaLabelAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [18, 14],
                                        }),
                                        color: password ? '#042B48' : '#acacac',
                                    },
                                ]}
                            >
                                Senha
                            </Animated.Text>
                            <TextInput
                                style={stylesLogin.input}
                                placeholder=""
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                onFocus={() => handleFocus(senhaLabelAnim)}
                                onBlur={() => handleBlur(senhaLabelAnim, password)}
                            />
                        </View>

                        {erro ? <Text style={stylesLogin.errorMessage}>{erro}</Text> : null}



                        <TouchableOpacity style={stylesLogin.loginButton} onPress={handleLogin} disabled={loading}>
                            <Text style={stylesLogin.buttonText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={stylesLogin.forgotPassword}>
                        <TouchableOpacity onPress={() => alert('Trocar senha')}>
                            <Text style={stylesLogin.forgotPasswordText}>Trocar Senha</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Login;
