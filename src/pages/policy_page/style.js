const Dimensions = require("Dimensions")

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export const style = {

    container: {
        flex: 1,
        backgroundColor: "white"
    },

    headerContainer: {
        height: deviceHeight * 0.1
    },

    navgationContainer: {

        justifyContent: 'center',
        flex: 0.12,
        paddingRight: deviceWidth * 0.03,
        // paddingLeft: deviceWidth * 0.03,
      
        paddingTop: deviceWidth * 0.02,
    },

    navContainer: {
        height: deviceHeight * 0.11 ,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    
    },

    textContainer: {
        height: deviceHeight * 0.77,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white"
    },

    textStyle: {
        fontFamily: "Nexa-Heavy",
        fontSize: deviceWidth * 0.025
    }
}