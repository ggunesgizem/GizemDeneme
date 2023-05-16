
const Dimensions = require("Dimensions")
import { Platform } from 'react-native'

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;


export const style = {
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(117,64,238,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    iconContainer: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 0.75,
        justifyContent: 'flex-end',
    },
    iconView: {
        height: deviceHeight * 0.06,
        width: deviceHeight*0.06,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6A40DE',
        borderRadius: 50
            
    },
    icon: {
        height: '50%',
        width: '50%',
        resizeMode: 'contain'
    },
    text: {
        textAlign: 'left',
        color:'rgb(117,64,238)',
        fontSize: deviceHeight*0.03,
        fontWeight: 'bold',
        // fontFamily: "Nexa-Heavy",
        // marginTop: Platform.OS === "ios" ? deviceWidth*0.013 : 0
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
}