import React, { Component } from 'react'
import { Text, View, TextInput } from 'react-native'

export default class Deneme extends Component {
    render() {
        return (
            <View style={{ flex: 1, }}>

                <View style={{ flex: 0.5, margin:100 }}>
                    <TextInput
                        placeholder="FirstTextInput"
                        returnKeyType={"next"}
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        blurOnSubmit={false}


                    ></TextInput>
                </View>

                <View style={{ flex: 0.5, margin:100 }}>
                    <TextInput
                      ref={(input) => { this.secondTextInput = input; }}
                      placeholder = "secondTextInput" ></TextInput>
                </View>
            </View>
        )
    }
}
