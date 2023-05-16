
const Dimensions = require("Dimensions")
import { Platform } from 'react-native'

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;


export const styles = {
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white"
    },

    iconContainer: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
      
    },

    textContainer: {

        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center'
    },

    emptyContainer: {
        flex: 0.15,
    },

    imageStyle: {
        resizeMode: "contain",
        height: "50%",
        width: "50%"
    },

    textStyle: {
        fontSize: deviceWidth*0.04,
        color: "#313671",
        fontFamily: "Nexa-Heavy",
        textAlign: "center",
        marginTop: Platform.OS === "ios" ? deviceWidth*0.013 : 0
    },

    logoStyle:{
        resizeMode: "contain",
        height: "80%",
        width: "80%"

    }


}