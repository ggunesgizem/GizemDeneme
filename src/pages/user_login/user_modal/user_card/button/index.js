import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { style } from './style'

export default class Button extends Component {
    render() {
        return (
            <TouchableOpacity style={[style.container,{ borderWidth: this.props.yes ? 0 : 0.9, borderColor: this.props.yes ? null : "#25265e",  backgroundColor:this.props.backColor,}]} onPress={this.props.onPress}>
                <Text style={
                    this.props.yes?
                    
                   [ style.textStyle,{color:'white'}]:
                   [style.textStyle,{color:'#313671'}]}> {this.props.text} </Text>
            </TouchableOpacity>
        )
    }
}
