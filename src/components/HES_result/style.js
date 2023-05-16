import { deviceWidth, deviceHeight } from "../../constants";

export const style = {
    container: {
        width: deviceWidth * 0.85, height: deviceWidth * 0.4, backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: -0.1,
        },
        shadowOpacity: 0.2,
        shadowColor: '#707070',
        shadowRadius: 20,
        borderColor: 'black',
        marginHorizontal: deviceWidth * 0.07,

        marginBottom: deviceHeight * 0.1, borderRadius: deviceWidth * 0.04, alignItems: 'center',
        padding: deviceWidth * 0.03
    },
    iconContainer: { width: deviceWidth * 0.22, height: deviceWidth * 0.22, marginTop: -deviceWidth * 0.135, alignItems: 'center' },
    background: { width: '100%', height: '100%', resizeMode: 'contain', justifyContent: 'center', alignItems: 'center' },
    defaultImage: { width: '100%', height: '100%', resizeMode: 'contain' },
    textContainer: { width: deviceWidth * 0.5, alignItems: 'center', justifyContent: 'center', marginTop: deviceWidth * 0.035 },
    tcText: { fontFamily: 'Nexa-Heavy', fontSize: deviceWidth * 0.035, textAlign: 'center' },
    nameText: { fontFamily: 'Nexa', fontSize: deviceWidth * 0.03, textAlign: 'center', marginTop: deviceWidth * 0.02 },
    resultText: {fontWeight:'bold', fontSize: deviceWidth * 0.05, textAlign: 'center', marginTop: deviceWidth * 0.02 },
    icon: { width: deviceWidth * 0.1, height: deviceWidth * 0.1, }
}

export const styleForModal = {
    container: {
        width: deviceWidth * 0.55, height: deviceWidth * 0.3, backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: -0.1,
        },
        shadowOpacity: 0.2,
        shadowColor: '#707070',
        shadowRadius: 20,
        borderColor: 'black',
        marginHorizontal: deviceWidth * 0.07,

        borderRadius: deviceWidth * 0.04, alignItems: 'center',
        padding: deviceWidth * 0.03
    },
    iconContainer: { width: deviceWidth * 0.17, height: deviceWidth * 0.17, marginTop: -deviceWidth * 0.11, alignItems: 'center' },
    background: { width: '100%', height: '100%', resizeMode: 'contain', justifyContent: 'center', alignItems: 'center' },
    defaultImage: { width: '100%', height: '100%', resizeMode: 'contain' },
    textContainer: { width: deviceWidth * 0.5, alignItems: 'center', justifyContent: 'center', marginTop: deviceWidth * 0.03, paddingHorizontal: deviceWidth * 0.1 },
    tcText: { fontFamily: 'Nexa-Heavy', fontSize: deviceWidth * 0.022, textAlign: 'center' },
    nameText: { fontFamily: 'Nexa', fontSize: deviceWidth * 0.02, textAlign: 'center', marginTop: deviceWidth * 0.02 },
    resultText: {fontWeight:'bold', fontSize: deviceWidth * 0.03, textAlign: 'center', marginTop: deviceWidth * 0.02 },
    icon: { width: deviceWidth * 0.07, height: deviceWidth * 0.07, }

}