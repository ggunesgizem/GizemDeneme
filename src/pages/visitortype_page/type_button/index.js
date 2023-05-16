import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { style } from './style'
import { convertHexToRgb } from '../../../utils'

const TypeButton = (props) => {
    const color = convertHexToRgb(props.color)
    const rgba = "rgba(" + color.r + "," + color.g + "," + color.b + ",0.2)"
    const rgb = "rgb(" + color.r + "," + color.g + "," + color.b + ")"
    return (
        // <TouchableOpacity
        //     onPress={props.onPress}
        //     style={[style.container, { backgroundColor: rgba }]}>
        //     <View style={style.iconContainer}>
        //         <View style={[style.iconView, { backgroundColor: rgb }]}>
        //             <Image source={props.image} style={style.icon} />
        //         </View>
        //     </View>
        //     <View style={style.textContainer}>
        //         <Text style={[style.text, { color: rgb }]}>{props.text}</Text>
        //     </View>
        // </TouchableOpacity>
        <TouchableOpacity onPress={props.onPress} style={style.pairCodeFieldContainer}>
            <View style={[style.pairCodeField, {borderColor:rgb}]}>
                <Text style={[style.text, { color: rgb }]}>{props.text}</Text>
            </View>

        </TouchableOpacity>
    )
}


export default TypeButton;
