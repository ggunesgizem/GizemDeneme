import React from 'react'
import { Text, TouchableOpacity, Dimensions, Platform } from 'react-native'

const DropdownButton = (props) => {
    const deviceWidth = Dimensions.get('window').width
    const deviceHeight = Dimensions.get('window').height
    return (
        <TouchableOpacity style={{
            flex: 1,
            alignItems: "center", borderColor: 'gray', borderRadius: 10,
            backgroundColor: 'rgb(241, 242, 243)',
            height: deviceHeight * 0.05, paddingLeft: 15, justifyContent: "flex-start", textAlign:
                'center', flexDirection: 'row', margin: 5
        }}
            onPress={props.onPress}
        >
            <Text style={{ color: 'black', fontSize: deviceWidth * 0.04, 
            fontFamily: "Nexa-Heavy", 
            marginTop: Platform.OS === "ios" ? deviceWidth * 0.013 : 0 }}> {props.name}</Text>
        </TouchableOpacity>
    )

}

export default DropdownButton
