const Dimensions = require("Dimensions")
import { Platform } from 'react-native'

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export const style = {

    openContainer: {
        elevation: 5,
        borderColor: 'gray',
        borderRadius: 5,
        backgroundColor: 'rgb(255, 255, 255)',
        width: deviceWidth * 0.6,
        height: deviceHeight * 0.11,
        justifyContent: "center",
        margin: 10,
        paddingLeft:deviceWidth*0.03,
        padding: 20,
        paddingRight: deviceWidth * 0.05,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 1,
    },

    closeContainer: {
        flexDirection: 'column',

        borderColor: 'gray',
        borderRadius: 5,
        backgroundColor: 'rgb(241, 242, 243)',
        width: deviceWidth * 0.5,
        height: deviceHeight * 0.1,
        justifyContent: "center",
        paddingLeft: 15,
        margin: 10,
        paddingLeft:deviceWidth*0.03

    },
    visitorCountNumber: {
        fontFamily: "Nexa-Heavy",
        fontSize: deviceWidth*0.025,
        marginLeft: deviceWidth*0.008,
        marginTop: Platform.OS === "ios" ? deviceWidth*0.013 : 0
    },

    pointStyle: {

        color: "red", marginLeft: deviceWidth * 0.03, fontWeight: "bold"

    },

    textStyle: {

        color: "#313671", marginLeft: deviceWidth * 0.007, 
        // fontFamily: "Nexa-Heavy",
        marginTop: Platform.OS === "ios" ? deviceWidth*0.013 : 0,
        fontWeight:'500'

    },

    textInputStyle: {
        flex: 1, borderBottomColor: "#313671", marginLeft: deviceWidth * 0.03, fontFamily: "Nexa-Regular"
    },
    visitorOperationIcon: {
     
        width: deviceWidth*0.07,
        height:  deviceWidth*0.07,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    plusMinusStyle:{ 
        width: '50%', 
        height: '50%', 
        resizeMode: 'contain' 
    }
}