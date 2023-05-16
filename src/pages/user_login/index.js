import React, { Component } from 'react'
import {
    View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Keyboard, Platform, TouchableHighlight, StyleSheet, ScrollView
} from 'react-native'
import { style } from './style'
import { connect } from 'react-redux'
import { fetchUserList, setNewGuestName, fetchUser, fetchAddUpdateGuest, setCurrentPage } from '../../actions'
import { Actions } from 'react-native-router-flux'
import NavigationButton from '../../components/navigation_button'
import TextBox from "../../components/text_box"
import GuestInfo from '../../models/guestInfo'
import Header from '../../components/header'
import UserModal from '../../pages/user_login/user_modal'
import { getHostInfo, getHostName } from '../../utils/host'
import Modal from "react-native-modal";
import { checkNetConnection, createConnection, startAndConnectMethod } from '../../utils'
import Footer from '../../components/footer'
import HTML from 'react-native-render-html'
import Button from './user_modal/user_card/button'
import { tsMethodSignature } from '@babel/types';
import { timeoutSecond } from '../../constants'
const Dimensions = require("Dimensions")
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

let currentHostInfo;

let checkControl = false

class UserLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            pnrCode: "",
            opacityControl: true,
            leftOpacity: false,
            check: false,
            header: true,
            selectedInput: props.selectedLanguage === "EN" ? props.languageJson.EN.fullName : props.languageJson.TR.fullName,
            modalState: false,
            jsonData: props.jsonData,
            beenHereBefore: props.jsonData.Settings.WelcomeScreenSetting.BeenHereBefore,
            locationId: props.jsonData.Settings.WelcomeScreenSetting.LocationId,
            existUser: true,
            userList: [],
            enableVisitorConsent: props.jsonData.Settings.LocationAccountSetting.EnableVisitorConsent,
            enableDataPolicy: props.jsonData.Settings.LocationAccountSetting.EnableDataPolicy,
            selectedLanguageData: props.selectedLanguage === "EN" ? props.languageJson.EN : props.languageJson.TR,
            isModalVisible: false,
            isHeader: false,
            goingBack: false,
            isHeaderLogo: this.props.jsonData.Settings.LocationAccountSetting.LogoPath,
            isHeaderText: this.props.jsonData.Settings.CustomerInfo.Name,
            keyboardHeight: 0,
            hubConnection: null,
            isAlertModal: false,
            netInfo: props.netInfo
        }

        this.onChangeText = this.onChangeText.bind(this)
        // this.onPressHeader = this.onPressHeader.bind(this)
    }
    checkName = (name) => {
        var index = name.indexOf(' ')

        var lastIndex = name.length
        if (index > 0 && lastIndex > index + 1) {
            this.setState({ opacityControl: false })
        }
        else {
            this.setState({ opacityControl: true })

        }
        this.setState({ name: name })
    }

    toggleModal() {
        this.setState({ isModalVisible: true });
    };

    onChangeText(text) {

        this.setState({ name: text })
        this.props.setNewGuestName(text)
        this.checkName(text)

    }

    static onEnter = () => {
        checkControl = false

        console.log('onEnter', checkControl)
        // setTimeout(() => {
        //     if (!checkControl) {
        //         checkControl = true
        //         Actions.loadingPage()
        //     }
        // }, timeoutSecond);
    }

    static onExit = () => {
        checkControl = true
        console.log('onExit', checkControl)
    }

    showKeyboard = (e) => {

        this.setState({
            keyboardHeight: e.endCoordinates.height
        })

    }

    hideKeyboard = () => {
        this.setState({
            keyboardHeight: 0
        })
    }

    componentWillReceiveProps(props) {
        if (this.state.netInfo !== props.netInfo) {
            this.setState({ netInfo: props.netInfo })
        }
    }


    componentDidMount() {
        startAndConnectMethod(this.state.hubConnection)
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.showKeyboard)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.hideKeyboard)
    }

    componentWillMount() {
        this.setState({
            hubConnection: createConnection()
        })
    }

    componentWillUnmount() {
        this.setState({ modalState: false })

    }

    async checkNameFromApi() {
        Keyboard.dismiss()
        this.setState({ opacityControl: true })
        let isConnected = await checkNetConnection()

        if (isConnected) {
            if (this.state.pnrCode.length === 0) {
                await this.props.fetchUserList(this.state.name, this.state.locationId, this.props.bearerToken)
            }
            else {
                await this.props.fetchUser(this.state.pnrCode, this.state.locationId, this.props.bearerToken)
            }

            if (this.state.pnrCode.length > 0) {
                console.log("pnr", this.state.pnrCode)
                console.log("user", this.props.user[0].FinalScreenHostPrivateMessage)
                if (this.props.user.length === 0) {

                    this.setState({ isAlertModal: true })
                } else {
                    this.createVisitor(this.props.user)

                    Actions.lastPage({
                        currentVisitorPrivateMessage: this.props.user[0].FinalScreenHostPrivateMessage,
                        hostNotification: this.props.user[0].HostNotification,
                        hostApproval: currentHostInfo.HostApproval,
                        hostMessage: currentHostInfo.HostMessage,
                        hostVideoUrl: currentHostInfo.HostVideo,
                        hostName: currentHostInfo.HostName,
                        visitor: {
                            FullName: this.props.user[0].FullName
                        }
                    })
                }
            }
            else {
                this.setState({ userList: this.props.userList })
                if (this.props.userList.length === undefined || this.props.userList.length === 0) {
                    if (!this.state.goingBack) {
                        Actions.visitorType();
                    }
                } else {
                    this.setState({ modalState: true, opacityControl: true, leftOpacity: true })
                    this.setState({ userList: users })
                }
            }
        } else {
            Actions.visitorType()
        }

    }


    checkPnrCode = (pnrCode) => {

        if (pnrCode.length > 0) {
            this.setState({ opacityControl: false })
        }
        else {
            this.setState({ opacityControl: true })
        }

        this.setState({ pnrCode: pnrCode })
    }

    createVisitor(userArray) {

        let userInfo = userArray[0]

        let currentVisitor =
        {
            CustomFieldValues: userInfo.CustomFieldValues,
            HasVisitorPhoto: userInfo.HasVisitorPhoto,
            HostId: userInfo.HostId,
            Id: userInfo.Id,
            InviteDate: userInfo.InviteDate,
            Email: userInfo.Email,
            GuestStatus: 3,
            FullName: userInfo.FullName,
            VisitorCount: userInfo.VisitorCount,
            LocationId: userInfo.LocationId,
            VisitorTypeId: userInfo.VisitorTypeId,
            SignInDateTime: userInfo.SignInDateTime
        }

        let JsonData = JSON.stringify(currentVisitor)
        this.props.fetchAddUpdateGuest(JsonData, this.props.bearerToken)
        currentHostInfo = getHostInfo(this.state.jsonData.Settings, userInfo.VisitorTypeId)
        currentHostInfo.HostName = getHostName(this.state.jsonData.Settings, userInfo.HostId)

    }

    renderDataPolicy() {


        if (this.state.enableVisitorConsent == false && this.state.enableDataPolicy == true) {
            return (
                <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", flex: 0.76, marginHorizontal: deviceWidth * 0.01 }}>
                    <Text style={{ textAlign: "center", fontFamily: "Nexa-Regular", fontSize: deviceWidth * 0.022, marginTop: Platform.OS === "ios" ? deviceWidth * 0.013 : 0 }}>
                        {this.state.selectedLanguageData.visitorConsentUnderstand1}{" "}
                        <Text style={{ fontWeight: 'bold', color: 'red', fontSize: deviceWidth * 0.022, marginTop: Platform.OS === "ios" ? deviceWidth * 0.013 : 0 }} onPress={() => this.toggleModal()}>
                            {this.state.selectedLanguageData.visitorConsentUnderstand2}{" "}
                        </Text>
                        <Text style={{ fontSize: deviceWidth * 0.022, marginTop: Platform.OS === "ios" ? deviceWidth * 0.013 : 0 }} onPress={() => this.toggleModal()}>
                            {this.state.selectedLanguageData.visitorConsentUnderstand3}{" "}
                        </Text>
                        <Text style={{ fontWeight: 'bold', color: 'red', fontSize: deviceWidth * 0.022, marginTop: Platform.OS === "ios" ? deviceWidth * 0.013 : 0 }} onPress={() => Actions.policypage({ finalMessage: this.props.jsonData.Settings.LocationAccountSetting.FinalScreenMessage })}>
                            {this.state.selectedLanguageData.visitorConsentNotApprove}
                        </Text>
                    </Text>
                </View>
            )


        }
        else {
            return (
                [<View style={{ flex: 0.76, marginHorizontal: deviceWidth * 0.01 }}>

                </View>, <Footer />]
            )

        }

    }

    goBack = () => {
        this.setState({ goingBack: true })
        this.props.setCurrentPage("homePage")
        Actions.homePage()
    }

    render() {
        const htmlContent = this.props.jsonData.Settings.LocationAccountSetting.DataPolicyText;
        return (
            <KeyboardAvoidingView behavior="padding" style={style.container}>
                <View style={
                    this.state.modalState ?
                        [style.headerContainer, { opacity: 0.5 }]
                        : [style.headerContainer]
                }>
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

                {this.state.modalState || this.state.isAlertModal ?
                    <View style={{ flex: 1, marginTop: deviceHeight * 0.05 }}>
                    </View> :

                    <View style={style.midContainer}>
                        <KeyboardAvoidingView behavior="padding" style={style.textBoxContainer}>
                            <TextBox
                                word="words"
                                location={true}
                                required={true}
                                onChangeText={this.onChangeText}
                                inputName={this.state.selectedLanguageData.fullName}
                                selectedInput={this.state.selectedInput}
                                onPressTextbox={() => { this.setState({ selectedInput: this.state.selectedLanguageData.fullName }) }}
                                borderColor={this.state.jsonData.Settings.LocationAccountSetting.AccentColor}
                            ></TextBox>
                        </KeyboardAvoidingView>


                        <View style={{ height: deviceHeight * 0.1, alignItems: "center", flexDirection: 'row', justifyContent: "center", width: deviceWidth * 0.55 }}>

                        </View>


                        <KeyboardAvoidingView behavior="padding" style={style.textBoxContainer}>
                            <TextBox
                                keyboardType={'numeric'}
                                location={true}
                                required={false}
                                pnr={true}
                                onChangeText={this.checkPnrCode}
                                inputName={this.state.selectedLanguageData.PNRFastCheckIn}
                                selectedInput={this.state.selectedInput}
                                onPressTextbox={() => { this.setState({ selectedInput: this.state.selectedLanguageData.PNRFastCheckIn }) }}
                                borderColor={this.state.jsonData.Settings.LocationAccountSetting.AccentColor}
                            ></TextBox>
                        </KeyboardAvoidingView>

                        <View style={{ height: deviceHeight * 0.1, alignItems: "center", flexDirection: 'row', justifyContent: "center", width: deviceWidth * 0.55 }}>
                            <View style={{ width: deviceWidth * 0.03, height: deviceWidth * 0.03 }}>
                                <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../../assets/typeInfo.png')} />

                            </View>
                            <Text style={{ marginLeft: deviceWidth * 0.02, fontSize: deviceWidth * 0.017, color: '#ea4848' }}>
                                {this.state.selectedLanguageData.preRegisterPNRDescription}

                            </Text>
                        </View>

                    </View>
                }

                <View style={[style.navigationButtonsContainer, { zIndex: 1, bottom: this.state.keyboardHeight > 0 && Platform.OS === "ios" ? this.state.keyboardHeight : 0 }]}>
                    <View style={style.leftButtonContainer}>
                        <NavigationButton
                            opacityControl={this.state.leftOpacity}
                            image={require('../../../assets/leftArrow.png')}
                            onPress={() => this.goBack()}
                        />
                    </View>
                    {this.renderDataPolicy()}
                    <View style={style.rightButtonContainer}>
                        <NavigationButton
                            image={require('../../../assets/rightArrow.png')}
                            opacityControl={this.state.opacityControl}
                            onPress={() => this.checkNameFromApi()}
                        />
                    </View>
                </View>


                {this.state.modalState ?
                    <UserModal
                        backColor={this.state.jsonData.Settings.LocationAccountSetting.AccentColor} />
                    :
                    null
                }

                {this.state.modalState ?

                    <TouchableOpacity onPress={() => Actions.visitorType()} style={{ position: "absolute", top: deviceHeight * 0.75, left: deviceWidth * 0.3, height: deviceHeight * 0.04, width: deviceWidth * 0.4, backgroundColor: this.state.jsonData.Settings.LocationAccountSetting.AccentColor, borderRadius: 7, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontWeight: "bold", color: 'white', fontFamily: "Nexa-Heavy", marginTop: Platform.OS === "ios" ? deviceWidth * 0.007 : 0 }}>{this.state.selectedLanguageData.continueWithoutSelectBeenHereBefore}</Text>
                    </TouchableOpacity>
                    :
                    null
                }

                {this.state.modalState == false ?
                    <TouchableOpacity style={{ flex: 1, }}>
                        <Modal onBackdropPress={() => this.setState({ isModalVisible: false })} isVisible={this.state.isModalVisible} style={{ alignItems: "center", justifyContent: "center" }}>
                            <ScrollView underlayColor={'white'} onPress={() => this.setState({ isModalVisible: false })} style={{ width: deviceWidth * 0.8, height: deviceHeight * 0.85, backgroundColor: 'white' }}>
                                <HTML
                                    html={htmlContent}
                                    containerStyle={{
                                        marginHorizontal: deviceWidth * 0.05,
                                        marginVertical: deviceWidth * 0.05

                                    }}
                                />


                            </ScrollView>
                        </Modal>
                    </TouchableOpacity>
                    : null}
                {this.state.isAlertModal ?
                    <Modal backdropColor="gray" onBackdropPress={() => this.setState({ isAlertModal: false, pnrCode: "" })} isVisible={this.state.isAlertModal} style={style.alertStyle}>
                        <View style={{ flex: 0.4, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontWeight: "bold" }} >
                                {this.state.selectedLanguageData.warningTitleNoPNR}
                            </Text>
                        </View>
                        <View style={{ flex: 0.4, alignItems: "center", }}>
                            <Text>
                                {this.state.selectedLanguageData.warningTextNoPNR}
                            </Text>
                        </View>

                        <View style={{ flex: 0.2, margin: 30 }}>
                            <Button text={this.state.selectedLanguageData.okay} yes={true} onPress={() => this.setState({ isAlertModal: false, pnrCode: "" })} backColor={this.state.jsonData.Settings.LocationAccountSetting.AccentColor}></Button>
                        </View>
                    </Modal>
                    : null}
            </KeyboardAvoidingView>
        )
    }
}



const mapStateToProps = (state) => {
    const { userList } = state.user_list
    const { bearerToken } = state.token
    const { jsonData } = state.json_code
    const { user } = state.user
    const { languageJson, selectedLanguage } = state.language
    const { netInfo } = state.netInfo

    return {
        userList, bearerToken, jsonData, user, languageJson, selectedLanguage, netInfo
    }
};
function bindAction(dispatch) {
    return {
        fetchUserList: (name, locationId, bearerToken) => dispatch(fetchUserList(name, locationId, bearerToken)),
        setNewGuestName: (name) => dispatch(setNewGuestName(name)),
        fetchUser: (pnrCode, locationId, bearerToken) => dispatch(fetchUser(pnrCode, locationId, bearerToken)),
        fetchAddUpdateGuest: (data, bearerToken) => dispatch(fetchAddUpdateGuest(data, bearerToken)),
        setCurrentPage: (data) => dispatch(setCurrentPage(data))
    };
}

export default connect(mapStateToProps, bindAction)(UserLogin);

