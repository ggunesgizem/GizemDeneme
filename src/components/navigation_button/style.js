
const Dimensions = require("Dimensions")

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;


export const style = {
    container: {
        // height: deviceWidth*0.09,
        // width: deviceWidth*0.11,
        flex: 1,
        backgroundColor: 'white',
        borderRadius:8
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(117,64,238)',
        borderRadius: 8,
    },
    image: {
        height: '30%',
        width: '30%',
        resizeMode: 'contain'
    }
}