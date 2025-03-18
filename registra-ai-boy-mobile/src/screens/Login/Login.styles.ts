import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#042b48',

    },
    loginBox: {
        flexDirection: 'column',
        width: '90%',
        height: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },
    leftSide: {
        flex: 1,
        backgroundColor: '#b7d1e5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        flexDirection: 'row'
    },
    rightSide: {
        flex: 2,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftSideText: {
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
        height: 120,
        marginBottom: 20,
        marginTop: 40
    },
    title: {
        fontSize: 22,
        color: '#042b48',
        marginBottom: 10,
        fontFamily: "Aldrich-Regular",
    },
    description: {
        fontSize: 14,
        color: '#042b48',
        textAlign: 'center',
        fontFamily: "Aldrich-Regular",
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%'
    },
    formGroup: {
        position: 'relative',
        width: '80%',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 2,
        borderColor: '#042B48',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 18,
        color: '#042B48',
        backgroundColor: 'transparent',
        zIndex: 1,
        fontFamily: "Aldrich-Regular",

    },

    label: {
        position: 'absolute',
        left: 10,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        fontFamily: "Aldrich-Regular",
        zIndex: 2

    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
        fontFamily: "Aldrich-Regular",
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
        fontFamily: "Aldrich-Regular",
    },
    forgotPassword: {
        marginTop: 20,
        alignItems: 'flex-end',

    },
    forgotPasswordText: {
        color: '#042b48',
        fontSize: 16,
        fontFamily: "Aldrich-Regular",
    },
});

export default styles;
