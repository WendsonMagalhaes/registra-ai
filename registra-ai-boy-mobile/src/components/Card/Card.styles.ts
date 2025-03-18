import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#042b48",
        borderWidth: 5,
        borderColor: "#3399FF",
        padding: 15,
        margin: 10,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'justify',
        elevation: 3, // Sombra no Android
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        width: 170,
        height: 170,
    },
    cardSelected: {
        backgroundColor: "#B7D1E5", // Cor quando selecionado
        borderColor: "#3399ff",
    },
    cardHover: {
        backgroundColor: "#055a8c", // Cor ao passar o mouse ou pressionar
        borderColor: "#66ccff",
        transform: [{ scale: 1.05 }], // Leve aumento no tamanho
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        fontFamily: "Aldrich-Regular",
    },
});

export default styles;
