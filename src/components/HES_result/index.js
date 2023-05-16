import React from 'react'
import { View, Image, ImageBackground, Text } from 'react-native'
import { deviceWidth, deviceHeight, HEScolor } from '../../constants'
import { style, styleForModal } from './style'

const resultStatus = [
    { status: '!', icon: require('../../assets/HESlike.png'), color: HEScolor },
    { status: 'RİSKSİZDİR!', icon: require('../../assets/HESlike.png'), color: HEScolor },
    { status: 'RİSKLİDİR!', icon: require('../../assets/cancel3x.png'), color: '#EA4848' }
]
const HESResult = (props) => {
    return (
        <View style={props.forModal !== undefined ? styleForModal.container : style.container}>

            <View style={props.forModal !== undefined ? styleForModal.iconContainer : style.iconContainer}>
                <ImageBackground style={props.forModal !== undefined ? styleForModal.background : style.background} source={require('../../assets/ellipseForAlert.png')}>
                    <View style={[props.forModal !== undefined ? styleForModal.icon : style.icon, { marginTop: props.result === 1 ? -deviceWidth * 0.015 : null }]}>
                        <Image style={style.defaultImage} source={resultStatus[props.result].icon} />
                    </View>
                </ImageBackground>

                <View style={props.forModal !== undefined ? styleForModal.textContainer : style.textContainer}>
                    <Text style={props.forModal !== undefined ? styleForModal.tcText : style.tcText}> {props.TCKN}</Text>
                    <Text style={props.forModal !== undefined ? styleForModal.nameText : style.nameText}>T.C. Kimlik / Pasaport numaralı {props.fullName} adlı kişi,</Text>
                    <Text style={[props.forModal !== undefined ? styleForModal.resultText : style.resultText, { color: resultStatus[props.result].color }]}>{resultStatus[props.result].status}</Text>
                </View>
            </View>




        </View>
    )
}

export default HESResult