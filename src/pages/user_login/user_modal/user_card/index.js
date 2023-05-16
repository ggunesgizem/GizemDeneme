import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { style } from './style'
import Button from './button'
import { connect } from 'react-redux';

class UserCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLanguageData: props.selectedLanguage === "EN" ? props.languageJson.EN : props.languageJson.TR
        }
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.textContainer}>
                    <Text style={style.upTextStyle}>
                        {this.state.selectedLanguageData.didYouMean}
                    </Text>

                    <Text style={style.downTextStyle}>
                        {this.state.selectedLanguageData.findGuest}
                    </Text>
                </View>

                <View style={style.emptyContainer}>
                    <Text style={style.textStyle}>{this.props.text}</Text>

                    {this.props.hostName==null || this.props.hostName === undefined ?
                      <Text style={style.textStyle}> {this.props.hostName}</Text>:
                      <Text style={style.textStyle}>{this.state.selectedLanguageData.host} : {this.props.hostName}</Text>
                }
                  
                </View>

                <View style={style.buttonContainer}>

                    {/* <View style={style.leftButtonStyle}>
                        <Button backColor={this.props.backColor} onPress={this.props.noPress} yes={false} text={this.state.selectedLanguageData.no}></Button>
                    </View> */}

                    <View style={style.rightButtonStyle}>

                        <Button backColor={this.props.backColor} onPress={this.props.yesPress} yes={true} text={this.state.selectedLanguageData.yes}></Button>

                    </View>


                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    const { selectedLanguage, languageJson } = state.language
    return {
        selectedLanguage, languageJson
    };
}

export default connect(mapStateToProps, {})(UserCard);
