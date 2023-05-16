import React from 'react'
import { View, Image } from 'react-native'
import { deviceWidth, HEScolor } from '../../constants'

const HESHeader = (props) => {
    return (
        <View style={{ width: deviceWidth, justifyContent: 'center', alignItems: 'center', height: deviceWidth * 0.13, backgroundColor: HEScolor }}>
            <View style={{ width: deviceWidth * 0.35 }}>
                <Image style={{ width: '100%', height: '100%' }} resizeMode='contain' source={require('../../assets/HESbanner.png')} />
            </View>
        </View>
    )
}

export default HESHeader