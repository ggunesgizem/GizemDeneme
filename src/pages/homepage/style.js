import { Dimensions, Platform } from 'react-native'

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export const style = {
    container: {
        flex: 1,

    },
    bodycontainer: {
        flex: 1,

    },

    containerStyle: {
        width: deviceWidth,
        backgroundColor: "black",
        // marginTop: deviceHeight * 0.746,
        position: 'absolute',
        bottom: 0,
        height: deviceHeight * 0.3,
        opacity: 0
    },

    stretch: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    logo: {
        flex: 1,
        marginBottom: deviceHeight * 0.233,
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    buttonStyle: {
        position: 'absolute',
        bottom: deviceHeight * 0.25,
        justifyContent: 'center',
        width: deviceWidth * 0.4,
        height: deviceHeight * 0.09,
        borderRadius: 10,
        alignSelf: 'center',
        //marginBottom: deviceWidth * 0.2
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        //fontWeight: 'bold',
        fontSize: deviceWidth * 0.03,
        fontFamily: "Nexa",
        fontWeight: 'bold',
        // marginTop: Platform.OS === "ios" ? deviceWidth * 0.010 : 0
    },

    companyName: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: deviceWidth * 0.07,
        fontFamily: "Nexa-Heavy",
        color: 'black',
        marginTop: Platform.OS === "ios" ? deviceWidth * 0.013 : 0
    },
    languageContainer: {
        flex: 0.1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginTop: deviceHeight * 0.01,
        marginRight: deviceWidth * 0.05
    },
    languageButtonContainer: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    languageImage: {
        width: deviceWidth * 0.07,
        height: deviceWidth * 0.05
    },
    signOut: {
        position: 'absolute',

        alignSelf: 'center',
        justifyContent: 'flex-start',
        height: deviceWidth * 0.07,
        width: deviceWidth * 0.4,
        bottom: deviceWidth * 0.23
    },
    signOutText: {
        color: '#56576e',
        fontSize: deviceWidth * 0.027,
        fontFamily: "Nexa-Heavy",
        marginTop: Platform.OS === "ios" ? deviceWidth * 0.013 : 0
    },

    modalContainer: {
        backgroundColor: "#FFF",
        minHeight: deviceHeight * 0.1,
        maxHeight: deviceHeight * 0.45,
        marginHorizontal: deviceWidth * 0.05,
        borderRadius: 7
    },

    kvkkModalContainer: {
        backgroundColor: "#FFF",
        height: deviceHeight * 0.8,

        marginHorizontal: deviceWidth * 0.05,
        borderRadius: 7

    },

    firstContainerInModal: {
        height: deviceHeight * 0.1,
        justifyContent: "center",
        paddingTop: deviceWidth * 0.05,
        paddingHorizontal: deviceWidth * 0.05
    },

    nameText: {
        fontSize: deviceWidth * 0.02,
        color: "#9c9c9c",
        fontFamily: "Nexa-Regular",
        marginTop: Platform.OS === "ios" ? deviceWidth * 0.013 : 0
    },

    textInputContainer: {
        fontSize: deviceHeight * 0.027,
        color: "#25265e",
        fontFamily: "Nexa-Regular",

    },

    secondContainerInModal: {
        minHeight: deviceHeight * 0.1,
        maxHeight: deviceHeight * 0.35,
        paddingTop: deviceHeight * 0.015,
        paddingBottom: deviceHeight * 0.015
    },

    userFoundText: {
        fontSize: deviceHeight * 0.027,
        color: "#25265e",
        fontFamily: "Nexa-Regular",
        marginTop: Platform.OS === "ios" ? deviceWidth * 0.013 : 0
    },

    modalTextContainer: {
        justifyContent: "flex-start",
        alignItems: "center"
    },

    textContainer: {
        flex: 0.85,

    },

    buttonsContainer: {
        height: deviceHeight * 0.15,
        width: deviceWidth * 0.8,
        flexDirection: 'row',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        height: deviceHeight * 0.1,
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },

    buttonTextStyle: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',

    },

    signupBtn: {
        justifyContent: "flex-start",
        alignSelf: "center",
        width: '100%',
        height: '50%',
    },

    signupTouchable: {
        width: '90%',
        height: '100%',
        justifyContent: "center",
        alignSelf: "center",
        borderWidth: 0.6,
        borderColor: "gray",
        borderRadius: 5
    },

    exitDoneContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    exitDoneText: {
        fontSize: deviceHeight * 0.032,
        color: "#25265e",
        fontFamily: "Nexa-Regular",
        marginTop: Platform.OS === "ios" ? deviceWidth * 0.013 : 0
    },

    languageText: {
        textShadowOffset: {
            width: deviceWidth * 0.0015,
            height: deviceWidth * 0.0015,
        },
        textShadowColor: 'rgba(0,0,0,0.6)',
        textShadowRadius: deviceWidth * 0.005,
        color: 'white',
        fontSize: deviceWidth * 0.032,
        fontFamily: 'Nexa',
        fontWeight: 'bold'
    },
}