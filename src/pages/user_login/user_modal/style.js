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

    cardContainer: {
        height: deviceHeight * 0.38,
        width: deviceWidth * 0.6,
        shadowColor: 'black',
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
        margin:deviceHeight*0.028
    }
}