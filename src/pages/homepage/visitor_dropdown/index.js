import React, { Component } from 'react'
import { Text, TouchableOpacity, Dimensions, Platform } from 'react-native'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

class DropdownButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            locationId: this.props.locationId,
            id: this.props.id,
            hostName: this.props.hostName
        }

        console.log("host: ", this.props.hostName)
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{
               
                width: deviceWidth * 0.7,
                height: deviceWidth * 0.08, justifyContent: "flex-start", 
                marginBottom: 15,
                borderBottomColor: "gray", borderBottomWidth: 0.5
            }}>
                <Text style={{alignItems:'center' , justifyContent:'center',  height: deviceWidth * 0.04,color: '#25265e', fontSize: deviceWidth * 0.033, fontFamily: "Nexa-Heavy",  }}>{this.props.name}</Text>
                <Text style={{alignItems:'center' , justifyContent:'center', height: deviceWidth * 0.04,color: 'gray', fontSize: deviceWidth * 0.027, fontFamily: "Nexa-Regular" }}>{this.props.hostName}</Text>
            </TouchableOpacity>
        )
    }
}

export default DropdownButton
