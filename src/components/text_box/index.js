import React, { Component } from 'react';
import {
    View, Text, TextInput, Dimensions, Platform,
    LayoutAnimation, TouchableOpacity, UIManager, KeyboardAvoidingView
} from 'react-native';
import { keyMirror } from '../../utils'
import { connect } from 'react-redux'
import DropdownButton from '../../pages/visitor_info_page/dropdown/dropdown_button'

import { dispatchIndex } from '../../actions'

import { style } from "./style"
import { validate } from 'validate.js'


/*
*props
    *onChangeText
    *onPressHeader
    *inputName
    *required
*/


const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
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



class TextBox extends Component {

    constructor(props) {

        super(props)

        this.state = {
            isActive: true,
            check: false,
            text: this.props.value !== undefined ? this.props.value : "",
            needHost: false,
            hostFound: false,
            selectedLanguageData: props.selectedLanguage === "EN" ? props.languageJson.EN : props.languageJson.TR
        }
    }

    _onPress = () => {
        LayoutAnimation.configureNext(animationConfigs.get(AnimationType.linear))
        this.props.onPressTextbox();
    }

    changeText = (text) => {
        this.setState({ text })
        this.props.onChangeText(text)

        if (!validate.isEmpty(text) && text.length === 3 && this.props.forHost !== undefined) {
            if (!this.state.needHost) {
                this.setState({
                    needHost: true
                })
            } else {
                this.setState({

                    needHost: false
                })
            }
        }
    }
    componentWillReceiveProps(props) {
        if (props.selectedInfo === this.props.index)
            this.setState({ check: true })
        else
            this.setState({ check: false })
    }

    selectedHost(id, name) {
        this.setState({
            text: name
        })
        this.props.selectedHost(id, name)
    }

    renderHostName() {
        let currentText = this.state.text
        if (this.props.forHost !== undefined && !validate.isEmpty(currentText) && currentText.length >= 3) {
            let returnElement = this.props.forHost.map((value) => {
                let fullName = value.FirstName + " " + value.LastName
                currentText = currentText.replace(" ", "-")
                currentText = currentText.toLowerCase()
                if (currentText.includes("i̇")) {
                    currentText = currentText.replace("i̇", "i")
                }
                if (currentText.includes("ı")) {
                    currentText = currentText.replace("ı", "i")
                }
                if (currentText.includes("ğ")) {
                    currentText = currentText.replace("ğ", "g")
                }
                if (currentText.includes("ö")) {
                    currentText = currentText.replace("ö", "o")
                }
                if (currentText.includes("ü")) {
                    currentText = currentText.replace("ü", "u")
                }
                if (currentText.includes("ş")) {
                    currentText = currentText.replace("ş", "s")
                }
                if (currentText.includes("ç")) {
                    currentText = currentText.replace("ç", "c")
                }
                if (value.NormalizedFullName !== null) {
                    if (value.NormalizedFullName.includes(currentText)) {
                        if (!this.state.hostFound) {
                            this.setState({ hostFound: true })
                        }
                        return (
                            <DropdownButton
                                buttonType="host"
                                id={value.Id}
                                name={fullName}
                                onPress={() => this.selectedHost(value.Id, fullName)}
                            />
                        )
                    }
                }
            })
            return returnElement;
        }
        else if (this.props.forHost !== undefined && !validate.isEmpty(currentText) && currentText.length < 3 && this.state.hostFound) {
            this.setState({
                hostFound: false
            })
        }
    }

    renderHostMessage() {

        if (this.props.forHost !== undefined) {
            if (this.state.text.length < 3) {
                return (
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontFamily: "Nexa-Regular", marginTop: Platform.OS === "ios" ? deviceWidth * 0.013 : 0 }}>{this.state.selectedLanguageData.minLetter}</Text>
                    </View>
                )
            } else {
                if (!this.state.needHost) {
                    this.setState({ needHost: true })
                }

                if (!this.state.hostFound) {

                    return (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontFamily: "Nexa-Regular", marginTop: Platform.OS === "ios" ? deviceWidth * 0.013 : 0 }}>{this.state.selectedLanguageData.noGuest}</Text>
                        </View>
                    )
                }
            }
        }
    }

    renderTextbox() {
        if (this.props.inputName !== this.props.selectedInput) {
            return (
                <View style={
                    this.props.location ?
                        [style.closeContainer, {
                            width: deviceWidth * 0.6,
                            minHeight: deviceHeight * 0.11,
                        }] :
                        [style.closeContainer, {
                            width: deviceWidth * 0.5,
                            minHeight: deviceHeight * 0.09,
                        }]
                }>
                    <View style={{ flexDirection: "row", flex: this.state.text === "" ? 1 : 0.5, alignItems: 'center' }}>
                        <Text style={style.pointStyle}>{this.props.required ? "•" : null}</Text>
                        <Text style={this.props.pnr !== undefined ? style.textStylePnr : style.textStyle}>{this.props.inputName}</Text>
                    </View>
                    {
                        this.state.text !== "" ?
                            <View style={style.closeTextContainer}>
                                <Text style={style.closeTextStyle}>{this.props.isEmail ? this.props.value : this.state.text}</Text>
                            </View>
                            : null
                    }
                </View>
            )
        } else if (this.props.HES !== undefined && this.props.HES) {
            return (
                <View style={
                    [style.openContainer, {
                        width: deviceWidth * 0.6,
                        minHeight: deviceHeight * 0.11,
                    }]

                }>

                    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", flex: 1, alignItems: "flex-end" }}>
                            <Text style={style.pointStyle}>{this.props.required ? "•" : null}</Text>
                            <Text style={this.props.pnr !== undefined ? style.textStylePnr : style.textStyle}>{this.props.inputName}</Text>
                        </View>
                        <TextInput
                            ref={this.props.ref}
                            // editable={this.props.editable}
                            // onSubmitEditing={this.props.onSubmitEditing}
                            // onFocus={this.props.isEmail === true ? this.props.changeStatus : this.props.falseEmailStatus}
                            returnKeyType={this.props.returnKey}
                            autoCapitalize={this.props.word ? this.props.word : "none"}
                            keyboardType={this.props.keyboardType}
                            value={this.props.isEmail && !validate.isEmpty(this.props.value) ? this.props.value.toLowerCase() : this.state.text}
                            // autoFocus={true}
                            maxLength={this.props.maxLength}
                            style={[style.textInputStyle, { borderBottomColor: this.props.borderColor }]}
                            onChangeText={(text) => this.props.isEmail && !validate.isEmpty(this.props.value) ? this.changeText(text.toLowerCase()) : this.changeText(text)}
                        />
                    </KeyboardAvoidingView>


                </View>
            )
        } else {
            return (
                <View style={
                    this.props.location ?

                        [style.openContainer, {
                            width: deviceWidth * 0.7,
                            minHeight: deviceHeight * 0.13,
                        }] :
                        [style.openContainer, {
                            width: deviceWidth * 0.65,
                            minHeight: deviceHeight * 0.11,
                        }]
                }>

                    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", flex: 1, alignItems: "flex-end" }}>
                            <Text style={style.pointStyle}>{this.props.required ? "•" : null}</Text>
                            <Text style={this.props.pnr !== undefined ? style.textStylePnr : style.textStyle}>{this.props.inputName}</Text>
                        </View>
                        <TextInput
                            ref={this.props.ref}
                            editable={this.props.editable}
                            onSubmitEditing={this.props.onSubmitEditing}
                            onFocus={this.props.isEmail === true ? this.props.changeStatus : this.props.falseEmailStatus}
                            returnKeyType={this.props.returnKey}
                            autoCapitalize={this.props.word ? this.props.word : "none"}
                            keyboardType={this.props.keyboardType}
                            value={this.props.isEmail && !validate.isEmpty(this.props.value) ? this.props.value.toLowerCase() : this.state.text}
                            autoFocus={true}
                            maxLength={this.props.maxLength}
                            style={[style.textInputStyle, { borderBottomColor: this.props.borderColor }]}
                            onChangeText={(text) => this.props.isEmail && !validate.isEmpty(this.props.value) ? this.changeText(text.toLowerCase()) : this.changeText(text)}
                        />
                    </KeyboardAvoidingView>
                    {
                        this.renderHostMessage()
                    }
                    <View style={{ marginLeft: deviceWidth * 0.03 }}>
                        {
                            this.renderHostName()
                        }
                    </View>

                </View>
            )
        }
    }

    render() {
        return (
            <TouchableOpacity
                keyboardShouldPersistTaps={false}
                onPress={() => this._onPress()}
                activeOpacity={0.9}
                style={{ minHeight: deviceHeight * 0.1, justifyContent: 'center', alignItems: "center", marginTop: deviceHeight * 0.01 }}>
                {this.renderTextbox()}
                {/* {this.props.inputName !== this.props.selectedInput ?

                    <View style={
                        this.props.location ?
                            [style.closeContainer, {
                                width: deviceWidth * 0.6,
                                minHeight: deviceHeight * 0.11,
                            }] :
                            [style.closeContainer, {
                                width: deviceWidth * 0.5,
                                minHeight: deviceHeight * 0.09,
                            }]
                    }>
                        <View style={{ flexDirection: "row", flex: this.state.text === "" ? 1 : 0.5, alignItems: 'center' }}>
                            <Text style={style.pointStyle}>{this.props.required ? "•" : null}</Text>
                            <Text style={style.textStyle}>{this.props.inputName}</Text>
                        </View>
                        {
                            this.state.text !== "" ?
                                <View style={style.closeTextContainer}>
                                    <Text style={style.closeTextStyle}>{this.props.isEmail ? this.props.value : this.state.text}</Text>
                                </View>
                                : null
                        }
                    </View>
                    :
                    <View style={
                        this.props.location ?

                            [style.openContainer, {
                                width: deviceWidth * 0.7,
                                minHeight: deviceHeight * 0.13,
                            }] :
                            [style.openContainer, {
                                width: deviceWidth * 0.65,
                                minHeight: deviceHeight * 0.11,
                            }]
                    }>

                        <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
                            <View style={{ flexDirection: "row", flex: 1, alignItems: "flex-end" }}>
                                <Text style={style.pointStyle}>{this.props.required ? "•" : null}</Text>
                                <Text style={style.textStyle}>{this.props.inputName}</Text>
                            </View>
                            <TextInput
                                ref={this.props.ref}
                                editable={this.props.editable}
                                onSubmitEditing={this.props.onSubmitEditing}
                                onFocus={this.props.isEmail === true ? this.props.changeStatus : this.props.falseEmailStatus}
                                returnKeyType={this.props.returnKey}
                                autoCapitalize={this.props.word ? this.props.word : "none"}
                                keyboardType={this.props.keyboardType}
                                value={this.props.isEmail && !validate.isEmpty(this.props.value) ? this.props.value.toLowerCase() : this.state.text}
                                autoFocus={true}
                                maxLength={this.props.maxLength}
                                style={[style.textInputStyle, { borderBottomColor: this.props.borderColor }]}
                                onChangeText={(text) => this.props.isEmail && !validate.isEmpty(this.props.value) ? this.changeText(text.toLowerCase()) : this.changeText(text)}
                            />
                        </KeyboardAvoidingView>
                        {
                            this.renderHostMessage()
                        }
                        <View style={{ marginLeft: deviceWidth * 0.03 }}>
                            {
                                this.renderHostName()
                            }
                        </View>

                    </View>

                } */}



            </TouchableOpacity>
        )
    }
}


const mapStateToProps = (state) => {
    const { selectedInfo } = state.selected_index
    const { selectedLanguage, languageJson } = state.language
    return {
        selectedInfo, selectedLanguage, languageJson
    }
};

function bindAction(dispatch) {
    return {
        dispatchIndex: (index) => dispatch(dispatchIndex(index))
    };
}

export default connect(mapStateToProps, bindAction)(TextBox)


