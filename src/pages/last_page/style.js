const Dimensions = require("Dimensions")
import { Platform } from 'react-native'

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

    lastScreenContainer: {
        minHeight: deviceHeight * 0.16,
        marginRight: deviceWidth * 0.05,
        marginLeft: deviceWidth * 0.05,
        borderRadius: 25
    },

    imageContainer: {
        height: deviceHeight * 0.08,
        alignItems: "center",
        justifyContent: "center"
    },
    imageStyle: {
        width: '35%',
        height: '75%',
        resizeMode: 'contain'
    },

    textContainer: {
        //flex: 0.25,
        alignItems: "center",
        minHeight: deviceWidth * 0.1,
        justifyContent: "center",
        alignItems: "center"

    },
    textStyle: {
        color: 'orange',
        fontFamily: "Nexa-Heavy",
        fontSize: deviceWidth * 0.03,
        marginTop: Platform.OS === "ios" ? deviceWidth * 0.013 : 0,
        textAlign: "center"
    },
    rightButtonContainer: {

        justifyContent: 'center',
        flex: 0.12,
        paddingRight: deviceWidth * 0.03,
        // paddingLeft: deviceWidth * 0.03,
        paddingBottom: deviceWidth * 0.02,
        paddingTop: deviceWidth * 0.02,
    },


    emptyContainer: {
        height: deviceHeight * 0.58,
    },


    navigationButtonsContainer: {
        height: deviceHeight * 0.11,
        width: deviceWidth,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 0
    },

    hostContainer: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    messageContainer: {
        flex: 0.5,

    },
    videoContainer: {
        flex: 0.8,
        margin: deviceWidth * 0.05,
    },

    hostMessageContainer: {
        width: deviceWidth * 0.88, height: deviceWidth * 0.25, backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: -0.1,
        },
        shadowOpacity: 0.2,
        shadowColor: '#707070',
        shadowRadius: 20,
        borderColor: 'black',
        borderRadius: deviceWidth * 0.04,
        marginTop: deviceHeight * 0.02,
        paddingVertical: deviceHeight * 0.01,
        paddingHorizontal: deviceHeight * 0.02,
    },
    hostMessageScrollContentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
}