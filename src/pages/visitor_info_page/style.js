const Dimensions = require("Dimensions")

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export const style = {
    imageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
    buttonView: {
        flex: 0.1,
        marginTop: 10,
    },
    buttonStyle: {
        flex: 1
    },
    leftButtonContainer: {
       
        justifyContent: 'center',
        flex: 0.12,
        zIndex:1,
        // paddingRight: deviceWidth * 0.01,
        paddingLeft: deviceWidth * 0.03,
        paddingBottom: deviceWidth * 0.02,
        paddingTop:  deviceWidth * 0.02,
 
    },
    rightButtonContainer: {
    
        justifyContent: 'center',
        flex: 0.12,
        paddingRight: deviceWidth * 0.03,
        // paddingLeft: deviceWidth * 0.03,
        paddingBottom: deviceWidth * 0.02,
        paddingTop:  deviceWidth * 0.02,



    },
    buttonContainer: {
        flex: 0.26,
        borderRadius: 5
    },

    navigationButtonsContainer: {
        height: deviceHeight*0.11,
        backgroundColor: 'white',
        flexDirection: 'row'
    }
}
