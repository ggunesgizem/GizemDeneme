import React, { Component } from 'react'
import {
    View, Text, TextInput, Dimensions, NativeModules,
    LayoutAnimation, TouchableOpacity, UIManager, Keyboard, Image
} from 'react-native'
import { style } from './style'
import { keyMirror } from '../../../utils'


const deviceWidth = Dimensions.get('window').width
const deviceHeigth = Dimensions.get('window').height
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);


const AnimationTypeEnum = {
    spring: true,
}
const AnimationType = keyMirror(AnimationTypeEnum)
const animationConfigs = new Map([
    [AnimationType.linear, {
        duration: 175,
        update: {
            type: LayoutAnimation.Types.linear
        }
    }]
]);


class VisitorCount extends Component {

    constructor(props) {
  
        super(props)

        this.state = {
            isActive: true,
            check: false,
            text: "",
            visitorCount: 0
        }
    }

    _onPress = () => {
        LayoutAnimation.configureNext(animationConfigs.get(AnimationType.linear))
        this.props.onPressTextbox();
    }

    changeText = (text) => {
        this.setState({ text })
    }

    getVisitorCountInfo() {
        return this.state.visitorCount
    }

    render() {
        return (


            <TouchableOpacity 
            keyboardShouldPersistTaps={false} 
            onPress={() => { this._onPress(); this.props.falseEmailStatus}} 
            activeOpacity={0.9} 
            style={{ justifyContent: 'center', alignItems: "center", marginVertical:deviceHeigth*0.01 }}>

                {
                    this.props.inputName !== this.props.selectedInput ?
                        <View style={style.closeContainer}>
                            <Text style={style.textStyle}>{this.props.visitorCountName}</Text>
                            <Text style={style.visitorCountNumber}>{this.state.visitorCount}</Text>
                        </View>
                        :
                        <View style={style.openContainer}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={style.textStyle}>{this.props.visitorCountName}</Text>
                                    <Text style={style.visitorCountNumber}>{this.state.visitorCount}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.state.visitorCount === 0 ? null : this.setState({ visitorCount: this.state.visitorCount - 1 })
                                        }}
                                        style={[style.visitorOperationIcon, { backgroundColor:this.props.backColor}]}>
                                        <Image
                                            source={require('../../../assets/minusIconWhite.png')}
                                            style={style.plusMinusStyle} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.state.visitorCount === 5 ? null : this.setState({ visitorCount: this.state.visitorCount + 1 })
                                        }}
                                        style={[style.visitorOperationIcon, { marginLeft: 10 , backgroundColor:this.props.backColor}]}>
                                        <Image
                                            source={require('../../../assets/plusIconWhite.png')}
                                            style={style.plusMinusStyle} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                }

            </TouchableOpacity>
        )
    }
}

export default VisitorCount;