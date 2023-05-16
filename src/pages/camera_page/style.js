const Dimensions = require("Dimensions")

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export const style = {
    imageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
    navigationButtonsContainer: {
        height: deviceHeight*0.11,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    leftButtonContainer: {
       
      
        justifyContent: 'center',
        flex: 0.12,
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

    renderImageContainer:{
        height: deviceHeight * 0.79, 
        paddingHorizontal: deviceWidth * 0.5, 
        paddingVertical: deviceHeight * 0.3, 
        justifyContent: "center", 
        alignItems: "center",
  

    },

    renderImageContainer1:{
        height: deviceHeight * 0.79, 
        paddingHorizontal: deviceWidth * 0.5, 
        paddingVertical: deviceHeight * 0.3, 
        justifyContent: "center", 
        alignItems: "center",
     

    }

}