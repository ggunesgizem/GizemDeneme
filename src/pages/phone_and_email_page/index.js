import React, { Component } from 'react'
import { Text, View, KeyboardAvoidingView, Keyboard } from 'react-native'
import Header from '../../components/header'
import TextBox from '../../components/text_box'
import NavigationButton from '../../components/navigation_button'
import { style } from './style'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { validate } from 'validate.js'
import MailContainer from '../../components/mail_container'
import { getHostInfo } from '../../utils/host'
import { fetchAddUpdateGuest } from '../../actions'
import { createConnection, startAndConnectMethod } from '../../utils/signalR_connection'
import Footer from '../../components/footer'
import { timeoutSecond } from '../../constants'

const Dimensions = require("Dimensions")

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

let fieldValues = {}
let checkControl = false

class PhoneAndEmailPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jsonData: props.jsonData,
            selectedLanguageData: props.selectedLanguage === "EN" ? props.languageJson.EN : props.languageJson.TR,
            selectedInput: '',
            isHeaderLogo: props.jsonData.Settings.LocationAccountSetting.LogoPath,
            isHeaderText: props.jsonData.Settings.CustomerInfo.Name,
            data: props.jsonData,
            emailField: false,
            keyboardHeight: 0,
            email: this.props.email,
            phone: this.props.phone,
            opacity: true,
            requiredCheck: true,
            opacityControl: true,
            hasVisitorPhoto : props.hasVisitorPhoto,
            visitorPhoto : props.visitorPhoto

        }
    }

    static onEnter = () => {
        checkControl = false

        // setTimeout(() => {
        //     if (!checkControl) {
        //         checkControl = true
        //         Actions.loadingPage()
        //     }
        // }, timeoutSecond);
    }

    static onExit = () => {
        checkControl = true
    }


    _keyboardDidHide = () => {

        this.setState({
            keyboardHeight: 0,
        })
        if (this.state.selectedInput === this.state.selectedLanguageData.email && this.state.emailField) {
            this.setState({
                emailField: false
            })
        }
        keyboardMode = false
    }

    _keyboardDidShow = (e) => {
        oldSelected = this.state.selectedInput
        this.setState({
            keyboardHeight: e.endCoordinates.height,
        })
        if (this.state.selectedInput === this.state.selectedLanguageData.email && !this.state.emailField) {

            this.setState({
                emailField: true
            })
        }
        keyboardMode = true
    }



    componentDidMount() {


        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)


        if (this.state.phone === "" && this.state.email === "") {
            this.setState({ opacity: true })
        } else {
            this.setState({ opacity: false })
        }


    }


    selectedMail(value) {

        let mail = fieldValues.mail
        let arrayIfContains;

        if (mail !== undefined && !validate.isEmpty(mail) && mail.length > 0) {
            if (mail.includes('@')) {
                arrayIfContains = mail.split('@')
                fieldValues.mail = arrayIfContains[0] + value
            } else {
                fieldValues.mail = mail + value
            }
        }

        this.setState({
            email: fieldValues.mail
        })
    }

    componentWillUnmount() {
        fieldValues = {}
    }

    changeEmailStatus = () => {
        this.setState({ emailField: true })
    }

    falseEmailStatus = () => {
        this.setState({ emailField: false })
    }

    checkRequiredFields() {
        debugger
        let controlRequired = true
        if (this.state.data !== "") {
            this.state.data.Settings.SignInFlowSettings.map((visitorType, index) => {
                if (visitorType.VisitorTypeId === this.props.id) {

                    if ((visitorType.ShowEmailAddressField && visitorType.EmailAddressFieldRequired && (fieldValues.mail === undefined || fieldValues.mail === "")) ||
                        (visitorType.ShowPhoneField && visitorType.PhoneFieldRequired && (fieldValues.phone === undefined || fieldValues.phone === ""))) {
                        if (this.state.requiredCheck) {
                            controlRequired = false
                        }
                    }

                }
            })
            if (this.state.opacityControl != controlRequired) {
                this.setState({ opacityControl: controlRequired })
            }
            return controlRequired
        } else {
            if (this.state.opacityControl != controlRequired) {
                this.setState({ opacityControl: controlRequired })
            }
            return true;
        }
    }

    checkNamee() {
        checkControl = true;
        this.state.data.Settings.SignInFlowSettings.map((visitorType) => {
            if (visitorType.VisitorTypeId === this.props.id) {
                currentHostInfo = getHostInfo(this.state.data.Settings, visitorType.VisitorTypeId)
                currentHostInfo.hostName = this.state.hostName
                let currentVisitor = this.props.visitor
                currentVisitor.Email = this.state.email
                currentVisitor.Telephone = this.state.phone

                if (visitorType.EnableNdaSigning) {
                    // if (isConnected) {
                    //     this.pushOfflineVisitorsToApi()
                    // }
                    Actions.legalTerm({
                        hostNotification: this.props.visitor.HostNotification,
                        isSignRequired: visitorType.AllowVisitorsDeclineSigning,
                        visitorTypeId: this.props.visitorTypeId,
                        // visitorTypeName: visitorTypeName,
                        visitor: currentVisitor,
                        hostApproval: currentHostInfo.HostApproval,
                        hostMessage: currentHostInfo.HostMessage,
                        hostVideoUrl: currentHostInfo.HostVideo,
                        hostName: this.state.hostName,
                        email: visitorType.SignedNdaReceivingMailAddress,
                        date: visitorType.NdaTextDate,
                        currentHostInfo: currentHostInfo,
                        cameraEnable: visitorType.CaptureVisitorPhoto,
                        email: this.state.email,
                        hasVisitorPhoto : this.state.hasVisitorPhoto,
                        visitorPhoto : this.state.visitorPhoto


                    })


                }
                else if (visitorType.CaptureVisitorPhoto) {
                    // if (isConnected) {
                    //     this.pushOfflineVisitorsToApi()
                    // }
                    Actions.camera({
                        hostNotification: currentVisitor.HostNotification,
                        visitor: currentVisitor,
                        currentHostInfo: currentHostInfo,
                        locationId: this.props.jsonData.Settings.LocationAccountSetting.Id,
                        hasVisitorPhoto : this.state.hasVisitorPhoto,
                        visitorPhoto : this.state.visitorPhoto
                    })

                }
                else {

                    let JSONdata = JSON.stringify(currentVisitor);
                    this.props.fetchAddUpdateGuest(JSONdata, this.props.bearerToken)
                    Actions.lastPage({
                        hostNotification: currentVisitor.HostNotification,
                        guestSaved: true,
                        hostApp: currentHostInfo.HostApproval,
                        hostMessage: currentHostInfo.HostMessage,
                        hostVideoUrl: currentHostInfo.HostVideo,
                        hostName: this.state.hostName,
                        visitor: currentVisitor,
                        currentVisitorPrivateMessage: currentVisitor.FinalScreenHostPrivateMessage,

                    })

                }
            }
        })

    }

    mailChange(text) {

        fieldValues.mail = text,
            this.setState({ email: text })
        if (this.state.email.length > 1) {
            this.setState({ opacity: false })
        } else {
            this.setState({
                opacity: true
            })
        }
    }

    phoneChange(text) {

        fieldValues.phone = text,
            this.setState({ dummyText: text, phone: text })
        if (this.state.phone.length > 1) {
            this.setState({ opacity: false })
        } else {
            this.setState({
                opacity: true
            })
        }

    }
    render() {
        return (
            (
                <KeyboardAvoidingView behavior="padding" style={style.container}>
                    <View style={{ flex: 1 }}>
                        <View style={[style.headerContainer]}>
                            {this.state.isHeaderLogo ?
                                <Header
                                    logo={true}
                                    img={this.state.isHeaderLogo}
                                ></Header> :
                                <Header
                                    logo={false}
                                    text={this.state.isHeaderText}
                                ></Header>

                            }

                        </View>

                        <View style={[style.infoText]}>
                            <Text style={{ marginHorizontal: deviceWidth * 0.2, fontSize: deviceWidth * 0.03, fontFamily: "Nexa-Heavy", textAlign: 'center' }}>{this.state.selectedLanguageData.howToReachYou}</Text>

                        </View>
                        <View style={style.midContainer}>
                            {
                                this.state.data ?
                                    this.state.data.Settings.SignInFlowSettings.map((visitorType, index) => {

                                        return (
                                            visitorType.VisitorTypeId === this.props.id ?
                                                [

                                                    visitorType.ShowEmailAddressField ?
                                                        [<TextBox
                                                            blurOnSubmit={false}
                                                            location={false}
                                                            onPressHeader={this.onPressHeader}
                                                            onChangeText={(text) => { fieldValues.mail = text, this.setState({ email: text }) }}
                                                            required={visitorType.EmailAddressFieldRequired}
                                                            inputName={this.state.selectedLanguageData.email}
                                                            selectedInput={this.state.selectedInput}
                                                            isEmail={true}
                                                            submit={this.secondTextInput}
                                                            changeStatus={() => this.changeEmailStatus()}
                                                            onPressTextbox={() => { this.setState({ selectedInput: this.state.selectedLanguageData.email }) }}
                                                            borderColor={this.state.data.Settings.LocationAccountSetting.AccentColor}
                                                            value={this.state.email} />]
                                                        : null,
                                                    visitorType.ShowPhoneField ?
                                                        [<TextBox
                                                            returnKey={(Platform.OS === 'ios') ? 'done' : 'next'}
                                                            keyboardType={'numeric'}
                                                            location={false}
                                                            maxLength={11}
                                                            isEmail={false}
                                                            falseEmailStatus={() => this.falseEmailStatus()}
                                                            onPressHeader={this.onPressHeader}
                                                            onChangeText={(text) => { fieldValues.phone = text, this.setState({ dummyText: text, phone: text }) }}
                                                            required={visitorType.PhoneFieldRequired}
                                                            inputName={this.state.selectedLanguageData.phone}
                                                            selectedInput={this.state.selectedInput}
                                                            onPressTextbox={() => { this.setState({ selectedInput: this.state.selectedLanguageData.phone }) }}
                                                            borderColor={this.state.data.Settings.LocationAccountSetting.AccentColor}
                                                            value={this.props.userInfo !== undefined ? this.props.userInfo.userTelephone : ""}
                                                        />]
                                                        : null
                                                ]
                                                :
                                                null


                                        )
                                    })
                                    : null
                            }

                        </View>

                        {
                            this.state.emailField ?
                                <MailContainer
                                    emailClicked={(value) => this.selectedMail(value)}
                                    keyboardHeight={this.state.keyboardHeight} />
                                :
                                null
                        }


                        <Footer />
                        <View 
                            pointerEvents={'box-none'}
                            style={[style.navigationButtonsContainer, this.state.emailField === true ? { height: deviceHeight * 0.11, bottom:deviceWidth*0.1 } : { height: deviceHeight * 0.11 }]}>
                            <View style={style.leftButtonContainer}>
                                <NavigationButton
                                    image={require('../../../assets/leftArrow.png')}
                                    onPress={() => {
                                        checkControl = true
                                        Actions.pop()
                                    }}
                                />
                            </View>
                            <View pointerEvents={'box-none'} style={{ flex: 0.76 }}>

                            </View>

                            <View style={style.rightButtonContainer}>
                                <NavigationButton
                                    opacityControl={this.checkRequiredFields() ? false : true}
                                    image={require('../../../assets/rightArrow.png')}
                                    onPress={() => this.checkNamee()}
                                />
                            </View>
                        </View>


                    </View>
                </KeyboardAvoidingView>
            )
        )
    }
}


const mapStateToProps = (state) => {
    const { bearerToken } = state.token
    const { jsonData } = state.json_code
    const { selectedLanguage, languageJson } = state.language

    return {
        jsonData,
        selectedLanguage,
        languageJson,
        bearerToken
    }
};

function bindAction(dispatch) {
    return {
        fetchAddUpdateGuest: (data, bearerToken) => dispatch(fetchAddUpdateGuest(data, bearerToken)),
    };
}


export default connect(mapStateToProps, bindAction)(PhoneAndEmailPage);
