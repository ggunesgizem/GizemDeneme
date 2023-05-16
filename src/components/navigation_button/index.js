import React, { Component } from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import { style } from './style'
import { connect } from 'react-redux'



class NavigationButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonD: this.props.jsonData
        }
    }
    render() {
        return (
            <TouchableOpacity
                disabled={this.props.opacityControl}
                style={style.container} onPress={this.props.onPress} >
                <View style={
                    this.props.opacityControl
                        ?
                        [style.button, { opacity: 0.5, backgroundColor: this.state.jsonD.Settings.LocationAccountSetting.AccentColor }]
                        :
                        [style.button, { backgroundColor: this.state.jsonD.Settings.LocationAccountSetting.AccentColor }]

                }>
                    <Image style={style.image} source={this.props.image} />

                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    const { jsonData } = state.json_code
    return {
        jsonData
    }
};


export default connect(mapStateToProps)(NavigationButton)
