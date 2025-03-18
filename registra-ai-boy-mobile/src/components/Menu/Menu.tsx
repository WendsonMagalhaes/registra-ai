// FooterMenu.js
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import menuStyles from './Menu.styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Definição das rotas disponíveis
type RootStackParamList = {
    Login: undefined;
    Registrar: undefined;
    Painel: undefined;
};

// Definição do tipo de navegação
type NavigationProps = StackNavigationProp<RootStackParamList>;

const Menu = () => {
    const [selectedMenu, setSelectedMenu] = useState<string>('');
    const navigation = useNavigation<NavigationProps>();

    const handleMenuSelect = (menu: keyof RootStackParamList) => {
        setSelectedMenu(menu);
        navigation.navigate(menu);
        console.log(menu)
    };

    return (
        <View style={menuStyles.footerMenu}>
            <TouchableOpacity onPress={() => handleMenuSelect('Login')} style={menuStyles.menuItem}>
                <Text style={menuStyles.menuText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleMenuSelect('Registrar')} style={menuStyles.menuItem}>
                <Text style={menuStyles.menuText}>Registrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleMenuSelect('Painel')} style={menuStyles.menuItem}>
                <Text style={menuStyles.menuText}>Painel</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Menu;
