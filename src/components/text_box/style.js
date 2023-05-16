const Dimensions = require("Dimensions")

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export const style = {

    openContainer: {
        elevation: 5, borderColor: 'gray', borderRadius: 7,
        backgroundColor: 'rgb(255, 255, 255)',
        justifyContent: "center",
        textAlign: 'center',
        flexDirection: 'column',
        margin: 10,
        padding: 20,
        paddingRight: deviceWidth * 0.05,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 3,
        elevation: 1,
    },

    closeContainer: {
        // alignItems: "center",
        borderColor: 'gray',
        borderRadius: 7,
        backgroundColor: 'rgb(241, 242, 243)',
        justifyContent: "flex-start",
        textAlign: 'center',
        flexDirection: 'column',
        margin: deviceWidth * 0.01,
        padding: 10,
        paddingLeft: 0

    },
    closeTextContainer: {
        justifyContent: 'center',
        flex: 0.5,
        marginLeft: deviceWidth * 0.04
    },
    closeTextStyle: {
        fontSize: deviceWidth * 0.03,
        fontFamily: "Nexa-Bold",
        // marginTop: Platform.OS === "ios" ? deviceWidth*0.013 : 0
    },

    pointStyle: {
        color: "red",
        marginLeft: deviceWidth * 0.03,
        fontFamily: "Nexa-Heavy",
        marginTop: Platform.OS === "ios" ? deviceWidth*0.013 : 0
    },

    textStyle: {
        color: "#313671",
        marginLeft: deviceWidth * 0.007,
        // fontFamily: "Nexa-Heavy",
        marginTop: deviceWidth*0.005,
        textAlign:'center',
        fontWeight:'500'

    },
    textStylePnr: {
        color: "red",
        marginLeft: deviceWidth * 0.007,
        // fontFamily: "Nexa-Heavy",
        // marginTop: Platform.OS === "ios" ? deviceWidth*0.013 : 0,
        textAlign:'center',
        fontWeight:'500'


    },

    textInputStyle: {
        flex: 1,
        borderBottomWidth: 1,
        marginLeft: deviceWidth * 0.03,
        fontSize: deviceWidth * 0.03,
        fontFamily: "Nexa-Bold",
      
    }
}