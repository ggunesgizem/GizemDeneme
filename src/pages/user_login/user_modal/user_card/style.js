const Dimensions = require("Dimensions")

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export const style = {

    container: {
        flex: 1,
   
    },

    headerContainer: {
        height: deviceHeight * 0.1

    },

    textContainer: {
        flex: 0.45,
        alignItems: 'center',
        justifyContent: 'center',
    },

    upTextStyle: {
        fontFamily: "Nexa-Heavy",
        color: '#313671',
        fontSize: deviceHeight * 0.02,
        marginTop: Platform.OS === "ios" ? deviceWidth*0.013 : 0
    },

    downTextStyle: {
        padding: 15,
        marginLeft: 20,
        marginRight: 20,
        color: '#313671',
        fontSize: deviceHeight * 0.015,
        fontFamily: "Nexa-Regular",
        marginTop: Platform.OS === "ios" ? deviceWidth*0.013 : 0
    },

    emptyContainer: {
        flex: 0.3,
        alignItems: 'center',
    },

    textStyle: {
        fontSize: deviceHeight * 0.02,
        color: '#313671',
        fontFamily: "Nexa-Regular",
        marginTop: Platform.OS === "ios" ? deviceWidth*0.013 : 0
    },

    buttonContainer: {
        flex: 0.23,
        flexDirection: 'row',
        marginLeft: deviceWidth*0.05,
        marginRight: deviceWidth*0.05,
        alignItems: 'center',
        justifyContent: 'center',
    },

    rightButtonStyle: {
         flex: 0.5,
        // marginLeft: deviceWidth*0.03,
        height: deviceHeight * 0.068

    },

    leftButtonStyle: {
        flex: 0.5,
        marginRight: deviceWidth*0.03,
        // marginLeft: 
        height: deviceHeight * 0.068

    }

}