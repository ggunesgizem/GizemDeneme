const Dimensions = require("Dimensions")

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export const style = {

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    textStyle: {   
        fontSize: deviceHeight*0.025,
        fontFamily: "Nexa-Heavy",
        marginTop: Platform.OS === "ios" ? deviceWidth*0.013 : 0
    }

}
