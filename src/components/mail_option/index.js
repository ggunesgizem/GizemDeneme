import React, { Component } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { styles } from './style'

const MailOption = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.container}>
            <Text style={styles.textStyle}>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}

export default MailOption