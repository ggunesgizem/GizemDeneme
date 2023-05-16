let deviceWidth = require('Dimensions').get('window').width
let deviceHeight = require('Dimensions').get('window').height

import { Platform } from 'react-native'

export const styles = {
    container: {
        flex: 0.2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        height: deviceHeight*0.04,
        borderRadius: 5,
        marginLeft: deviceWidth*0.02
    },
    textStyle: {
        fontSize: deviceWidth*0.023,
        fontFamily: "Nexa-Regular",
        marginTop: Platform.OS === "ios" ? deviceWidth*0.013 : 0
    }
}