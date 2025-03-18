// App.tsx ou seu arquivo principal de navegação
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../src/screens/Login/Login';  // Caminho para o componente de Login
import Registrar from '../src/screens/Registrar/Registrar';  // Caminho para a tela de Registrar
import Painel from '../src/screens/Painel/Painel'
import { useCustomFonts } from "./hooks/useFonts";


const Stack = createStackNavigator();

const App = () => {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return null; // Aguarda o carregamento da fonte
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registrar">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registrar" component={Registrar} />
        <Stack.Screen name="Painel" component={Painel} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
