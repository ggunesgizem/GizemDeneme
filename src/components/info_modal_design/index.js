import React, { Component } from 'react'
import { View, Text, Dimensions, Image, TouchableOpacity, ImageBackground } from 'react-native'

const deviceWidth = Dimensions.get('window').width
class InfoModal extends Component {

    render() {

        return (
            <View style={{
                alignSelf: 'center', shadowOffset: {
                    width: 0,
                    height: -0.1,
                },
                shadowOpacity: 0.2,
                shadowColor: '#707070',
                shadowRadius: 20, width: deviceWidth * 0.88, backgroundColor: 'white', minHeight: deviceWidth * 0.27, borderRadius: deviceWidth * 0.04, alignItems: 'center', paddingBottom: deviceWidth * 0.025
            }}>
                <View style={{ width: deviceWidth * 0.22, height: deviceWidth * 0.22, marginTop: -deviceWidth * 0.11 }}>
                    <ImageBackground style={{ width: '100%', height: '100%', resizeMode: 'contain', justifyContent: 'center', alignItems: 'center' }} source={require('../../assets/ellipseForAlert.png')}>
                        <View style={{ width: deviceWidth * 0.1, height: deviceWidth * 0.1, marginTop: -deviceWidth * 0.01 }}>
                            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={this.props.icon} />
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: deviceWidth * 0.02, paddingHorizontal: deviceWidth * 0.05 }}>
                    <Text style={{ fontFamily: 'Nexa', fontSize: deviceWidth * 0.027 }}>{this.props.title}</Text>
                    <Text style={{ fontFamily: 'Nexa', fontSize: deviceWidth * 0.027, marginTop: deviceWidth * 0.02 }}>
                        {this.props.description + " "}
                        {
                            this.props.hostMessage ?
                                <Text style={{ color: '#7548EA', textDecorationLine: 'underline' }} onPress={this.props.hostMessagePress}>{this.props.hostMessage}</Text>
                                : null
                        }
                    </Text>
                </View>
                {
                    this.props.cancelable ?
                        <TouchableOpacity onPress={() => this.props.onCancel()} activeOpacity={1} style={{ width: deviceWidth * 0.1, height: deviceWidth * 0.1, marginTop: -deviceWidth * 0.12, position: 'absolute', right: -deviceWidth * 0.035, top: deviceWidth * 0.075 }}>
                            <ImageBackground style={{ width: '100%', height: '100%', resizeMode: 'contain', justifyContent: 'center', alignItems: 'center' }} source={require('../../assets/ellipseForCancel.png')}>
                                <View style={{ width: deviceWidth * 0.045, height: deviceWidth * 0.045, marginTop: -deviceWidth * 0.01 }}>
                                    <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={this.props.cancelIcon ? this.props.cancelIcon : require('../../assets/cancel.png')} />
                                </View>
                            </ImageBackground>
                        </TouchableOpacity> : null
                }
            </View>
        )

    }
}

export default InfoModal