import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: '100%'
    },

    topSide: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%'
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
    title: {
        fontSize: 24,
        color: '#042b48',
        marginBottom: 10,
        fontFamily: "Aldrich-Regular",
    },
    description: {
        fontSize: 16,
        color: '#042b48',
        textAlign: 'center',
        fontFamily: "Aldrich-Regular",

    },
    scrollContainer: {
        flex: 1,
        flexGrow: 1, // Permite que o conteúdo se expanda e role
    },
    filterContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10,
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 5


    },
    formGroup01: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 5,
        marginTop: 5

    },
    formGroup0101: {
        width: '40%'
    },
    formGroup0102: {
        width: '70%',
        marginLeft: -20
    },
    formGroup02: {
        width: '100%',
        alignItems: 'flex-end'

    },
    formGroup0201: {
        width: '70%',
        marginRight: -20
    },

});
export default styles;