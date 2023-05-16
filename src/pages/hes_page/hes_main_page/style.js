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
        // paddingRight: deviceWidth * 0.01,
        paddingLeft: deviceWidth * 0.03,
        paddingBottom: deviceWidth * 0.02,
        paddingTop: deviceWidth * 0.02,

    },
    rightButtonContainer: {

        justifyContent: 'center',
        flex: 0.12,
        paddingRight: deviceWidth * 0.03,
        // paddingLeft: deviceWidth * 0.03,
        paddingBottom: deviceWidth * 0.02,
        paddingTop: deviceWidth * 0.02,
    },

    textBoxContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: deviceHeight * 0.1

    },

    midContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: deviceHeight * 0.6

    },

    buttonContainer: {
        flex: 0.26,
        borderRadius: 5,

    },

    navigationButtonsContainer: {
        position: "absolute",
        zIndex: 1,
        width: deviceWidth,
        height: deviceHeight * 0.11,
        flexDirection: 'row'
    },

    alertStyle: {
        marginLeft: deviceWidth * 0.25,
        marginTop: deviceHeight * 0.3,
        flex: 0.5,
        width: deviceWidth * 0.5,
        borderRadius: 10,
        backgroundColor: 'white',

        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        elevation: 1,
    }
}