const Dimensions = require("Dimensions")
import { Platform } from 'react-native'

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export const style = {

    container: {
        flex: 1,
        backgroundColor: "white"
    },

    headerContainer: {
        height: deviceHeight * 0.14,

    },
    navgationContainer: {
        justifyContent: 'center',
        flex: 0.12,
        // paddingRight: deviceWidth * 0.01,
        paddingLeft: deviceWidth * 0.03,
        paddingBottom: deviceWidth * 0.02,
        paddingTop: deviceWidth * 0.02,
    },

    textContainer: {
        height: deviceHeight * 0.1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    textStyle: {
        marginBottom: deviceHeight * 0.022,
        color: "#313671",
        fontSize: deviceHeight * 0.02,
        fontFamily: "Nexa-Heavy",
        marginTop: Platform.OS === "ios" ? deviceWidth * 0.013 : 0
    },
    navigationButtonsContainer: {
        height: deviceHeight * 0.11,
        flexDirection: 'row'
    }
    ,
    infoContainer: {
        alignItems: 'center',
        width: deviceWidth * 0.52,
        justifyContent: 'flex-end',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    image: { width: deviceWidth * 0.03, height: deviceWidth * 0.03 },
    infoTextNormal: { color: '#ea4848', fontWeight: '300', fontSize: deviceWidth * 0.025, textAlign: 'center' },
    infoTextSpecial: {},
    infoTextContainer: { marginLeft: deviceWidth * 0.02, flexDirection: 'row' }

}