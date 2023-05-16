import { Dimensions, Platform } from 'react-native'

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export const style = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF"
    },

    pairCodeText: {
        fontSize: deviceWidth * 0.05,
        color: '#7548EA',
        marginTop: deviceWidth * 0.013,
        textAlign: 'center',
        fontFamily: 'Nexa',
    },
    pairCodeTextDefault: {
        fontSize: deviceWidth * 0.1,
        color: '#7548EA',
        fontFamily: 'Nexa',
        marginTop: deviceWidth * 0.045
    },
    pairCodeField: {
        height: deviceHeight * 0.09,
        width: deviceWidth * 0.52,
        borderWidth: 4,
        borderColor: "#7548EA",
        borderRadius: deviceWidth * 0.05,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",

    },
    pairCodeFieldContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: deviceHeight * 0.11,
        width: deviceWidth * 0.55,
        // borderWidth: 4,
        // borderColor: "#7548EA",
        borderRadius: deviceWidth * 0.05,
        backgroundColor: 'white',

        shadowOffset: {
            width: 0,
            height: -0.1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 11
    },
    infoContainer: {
        marginTop: deviceWidth * 0.04,
        width: deviceWidth * 0.5,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    image: { width: deviceWidth * 0.035, height: deviceWidth * 0.035, marginTop:deviceWidth*0.002 },
    infoTextNormal: { color: '#7548ea', fontSize: deviceWidth * 0.03, textAlign: 'center', fontWeight: '200' },
    infoTextSpecial: {},
    infoTextContainer: { marginLeft: deviceWidth * 0.02, flexDirection: 'row' }

}