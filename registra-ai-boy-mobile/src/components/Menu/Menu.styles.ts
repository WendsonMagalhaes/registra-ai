
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    footerMenu: {
        flexDirection: "row", // Coloca os itens do menu lado a lado
        justifyContent: "space-around", // Distribui igualmente os itens
        padding: 10,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        position: "absolute", // Fixa o menu na parte inferior
        bottom: 0,
        left: 0,
        right: 0,
    },
    menuItem: {
        padding: 10,
    },
    menuText: {
        fontSize: 16,
        color: "#007BFF",
        fontFamily: "Aldrich-Regular",
    },
})
export default styles;
