const deviceWidth = require('Dimensions').get("window").width;
const deviceHeight= require('Dimensions').get("window").height
import { Platform } from 'react-native'

export const styles= {
    textStyle: {
        color: "#313671",
        marginLeft: deviceWidth * 0.007,
        // fontFamily: "Nexa-Heavy",
        fontWeight:'500'
        // marginTop: Platform.OS === "ios" ? deviceWidth*0.013 : 0
    },  
    resultStyle:{
        color: "black",
        marginTop:-deviceHeight*0.02,
        paddingBottom: deviceHeight*0.015,
        marginLeft: deviceWidth * 0.045,
        // fontFamily: "Nexa-Heavy",
        fontSize:deviceWidth*0.05,
        marginTop: Platform.OS === "ios" ? deviceWidth*0.013 : 0
    },
    pointStyle: {
        color: "red",
        marginLeft: deviceWidth * 0.03,
        fontFamily: "Nexa-Heavy",
        marginTop: deviceWidth*0.007
    },
}