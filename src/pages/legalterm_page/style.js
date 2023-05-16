const deviceWidth = require('Dimensions').get('window').width
const deviceHeight = require('Dimensions').get('window').height

import { Platform } from 'react-native'

export const style = {
    navigationButtonsContainer: {
        height: deviceHeight * 0.11,
        flexDirection: 'row'
    },
    leftButtonContainer: {
        justifyContent: 'center',
        flex: 0.12,
        // paddingRight: deviceWidth * 0.01,
        paddingLeft: deviceWidth * 0.03,
        paddingBottom: deviceWidth * 0.02,
        paddingTop: deviceWidth * 0.02,
    },
    rightButtonContainer: {
        justifyContent: 'center',
        flex: 0.12,
        paddingRight: deviceWidth * 0.03,
        // paddingLeft: deviceWidth * 0.03,
        paddingBottom: deviceWidth * 0.02,
        paddingTop: deviceWidth * 0.02,
    },
    contactText: {
        flex: 0.65,
        marginHorizontal: deviceWidth * 0.07,
        marginTop: deviceHeight * 0.02,
        marginBottom: deviceHeight * 0.01,
        borderRadius: deviceWidth * 0.04,
        shadowOffset: {
            width: 0,
            height: -0.1,
        },
        shadowOpacity: 0.2,
        shadowColor: '#707070',
        shadowRadius: 20,
        backgroundColor: 'white'
    },
    scrollStyle: {
        marginTop: deviceHeight * 0.01,
    },
    mainText: {
        fontSize: 25,
        color: '#313671',
        fontFamily: "Nexa-Heavy",
        marginTop: Platform.OS === "ios" ? deviceWidth * 0.013 : 0
    },
    signatureContainer: {

        flex: 0.25, backgroundColor: 'white',
            shadowOffset: {
              width: 0,
              height: -0.1,
            },
            shadowOpacity: 0.2,
            shadowColor: '#707070',
            shadowRadius: 20,
            borderColor: 'black',
            marginHorizontal: deviceWidth * 0.07,
            marginTop: deviceHeight * 0.03,
            marginBottom: deviceHeight * 0.025, borderRadius: deviceWidth * 0.04,

    },
    sendAgreement: {
        marginLeft: deviceWidth * 0.08,
        marginRight: deviceWidth * 0.08,
        textAlign: 'center',
        fontSize: deviceWidth * 0.022,
        color: '#313671',
        fontFamily: "Nexa-Heavy",
        marginTop: Platform.OS === "ios" ? deviceWidth * 0.013 : 0
    }
}