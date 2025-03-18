import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },

    topSide: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%'
    },
    searchContainer: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
        marginTop: 20


    },
    logoContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b7d1e5',
        padding: 20,
        flexDirection: 'row'



    },
    logoContainerText: {
        flex: .8,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 20,
        width: '100%'
    },

    logo: {
        flex: 1,
        width: 150,
        height: 140,

    },
    scrollContainer: {
        flex: 1,
        flexGrow: 1, // Permite que o conteúdo se expanda e role
    },
    containerResult: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    containerResult_1: {
        width: '117%',
        marginLeft: 8,
        marginBottom: 20,
    },
    containerResult_2: {
        width: '56%',
        marginLeft: 5,
        marginBottom: 20,

    },
    containerCard: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        paddingHorizontal: 10,
        marginTop: 20,
        marginLeft: -15
    },

    title: {
        fontSize: 28,
        color: '#042b48',
        marginBottom: 10,
        fontFamily: "Aldrich-Regular",
    },
    formGroup01: {
        width: '75%',
        marginLeft: 20,
        marginBottom: 20,

    },
    formGroup02: {
        width: '40%',
        marginLeft: -55,
        marginBottom: 20,

    },

    formGroup03: {
        width: '56%',
        marginLeft: 25,
        marginBottom: 20,
    }
    ,
    formGroup04: {
        width: '56%',
        marginLeft: -40,
        marginBottom: 20,
    }
    ,
    description: {
        fontSize: 16,
        color: '#042b48',
        textAlign: 'center',
        fontFamily: "Aldrich-Regular",

    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    errorMessage: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        width: '40%',
        backgroundColor: '#042B48',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',

    },
    buttonRegistrar: {
        width: '44%',
        backgroundColor: '#042B48',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 40,
        marginLeft: 100,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: "Aldrich-Regular",
    },
    buttonTextRegistrar: {
        color: '#fff',
        fontSize: 16,
        fontFamily: "Aldrich-Regular",
    },
    footerMenu: {
        padding: 10,
        marginTop: 40, // Ajuste para criar a distância desejada
        width: "100%",

    }
});

export default styles;
