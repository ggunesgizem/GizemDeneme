
const Dimensions=require("Dimensions")
import { Platform } from 'react-native'

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;


export const styles={
button:{
    backgroundColor:'turquoise',
    height:40,
    width:80,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center'
},
text:{
    alignSelf:'center',
    color:'white',
    fontFamily: "Nexa-Regular",
    marginTop: Platform.OS === "ios" ? deviceWidth*0.013 : 0
}



}