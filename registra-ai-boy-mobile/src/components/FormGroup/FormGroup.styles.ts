import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },

    topSide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%'
    },
    searchContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20,

    },
    logoContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b7d1e5',


    },
    logo: {
        width: 150,
        height: 120,
    },
    containerResult01: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        fontSize: 22,
        color: '#042b48',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#042b48',
        textAlign: 'justify'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    formGroup: {
        position: 'relative',
        width: '80%',
        marginBottom: 0,

    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 2,
        borderColor: '#042B48',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 14,
        color: '#042B48',
        backgroundColor: 'transparent',
        zIndex: 1,
        fontFamily: "Aldrich-Regular",
    },
    output: {
        width: '100%',
        height: 40,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: '#042B48',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        paddingHorizontal: 10,
        fontSize: 14,
        color: '#042B48',
        backgroundColor: 'transparent',
        zIndex: 1,
        fontFamily: "Aldrich-Regular",
    },
    label: {
        position: 'absolute',
        left: 2,
        fontSize: 14,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        fontFamily: "Aldrich-Regular",
        zIndex: 2

    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
    },
    loginButton: {
        width: '80%',
        backgroundColor: '#042B48',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    forgotPassword: {
        marginTop: 20,
        alignItems: 'flex-end',
    },
    forgotPasswordText: {
        color: '#042b48',
        fontSize: 16,
    },
});

export default styles;
