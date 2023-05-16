import React, { Component } from 'react';
import {
    View,
    LayoutAnimation, UIManager,
    Platform, ScrollView, Dimensions,
    Keyboard, KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux'
import TextBox from '../../components/text_box'
import Dropdown from './dropdown';
import NavigationButton from '../../components/navigation_button'
import { style } from './style'
import { Actions } from 'react-native-router-flux'
import Header from '../../components/header'
import VisitorCount from './visitor_count'
import { fetchAddUpdateGuest } from '../../actions'
import moment from 'moment'
import Footer from '../../components/footer'
import MailContainer from '../../components/mail_container'
import { getHostInfo } from '../../utils/host'
import { createConnection, startAndConnectMethod } from '../../utils/signalR_connection'
import { checkNetConnection, getOfflineVisitor, saveOfflineVisitor, getSetOfflineVisitors } from '../../utils'
import { validate } from 'validate.js'
import { keyMirror } from '../../utils'
import { timeoutSecond } from '../../constants';

const deviceHeight = Dimensions.get("window").height;

let fieldValues = {}

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

let valueOfOptionalFields = []
let currentHostInfo;
let statusArray = []
let checkControl = false;

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

class VisitorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.data === undefined ? props.userInfo.userVisitorTypeId : props.data.Id,
            data: "",
            chosenTextBox: null,
            check: false,
            selectedInput: '',
            currentVisitorType: [],
            visitorName: props.data !== undefined ? props.newGuestName : props.userInfo.userFullName,
            locationId: props.jsonData.Settings.LocationAccountSetting.Id,
            hostList: [],
            visitorInfo: props.userInfo,
            requiredCheck: true,
            opacityControl: true,
            dummyText: "",
            hubConnection: null,
            dummy: true,
            selectedLanguageData: props.selectedLanguage === "EN" ? props.languageJson.EN : props.languageJson.TR,
            hostMessage: "",
            hostVideoUrl: "",
            hostName: "",
            keyboardHeight: 0,
            email: this.props.userInfo !== undefined ? props.userInfo.userEmail : "",
            phone: "",
            emailField: false,
            isHeaderLogo: props.jsonData.Settings.LocationAccountSetting.LogoPath,
            isHeaderText: props.jsonData.Settings.CustomerInfo.Name,
            HostNotification: props.userInfo === undefined ? null : props.userInfo.userHostNotification,
            privateHostMessage: props.userInfo === undefined ? null : props.userInfo.userHostPrivateMessage,
            hasVisitorPhoto: props.userInfo === undefined ? null : props.userInfo.hasVisitorPhoto,
            visitorPhoto: props.userInfo === undefined ? null : props.userInfo.visitorPhoto

        };
        // this.handleInputChange = this.handleInputChange.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onPressHeader = this.onPressHeader.bind(this);
    }

    componentWillUnmount() {
        console.log('willunmount')
        fieldValues = {}
        valueOfOptionalFields = []
    }

    static onStaticEnter = () => {
        checkControl = false
        // setTimeout(() => {
        //     if (!checkControl) {
        //         checkControl = true
        //         Actions.loadingPage()
        //     }
        // }, timeoutSecond);
    }

    static onStaticExit = () => {
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
        this.setState({
            data: this.props.jsonData,
            hostList: this.props.jsonData.Settings.HostUsers
        })
        startAndConnectMethod(this.state.hubConnection, this.props.jsonData.Settings.LocationAccountSetting.Id)
        this.fillFieldValuesByInitialUserInfo()

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)

    }



    componentWillMount() {
        this.setState({
            hubConnection: createConnection()
        })
    }

    isChecked = () => {
        LayoutAnimation.linear();
        this.setState({ check: !this.state.check })
    }

    onPressHeader(check) {

    }

    onChangeText(text) {
        this.setState({
            visitorName: text
        })
    }

    checkRequiredFields() {
        console.log('CURRENTCECKVISITORINFO')
        if (fieldValues === {}) {
            this.fillFieldValuesByInitialUserInfo()
        }
        let controlRequired = true
        if (this.state.data !== "") {
            this.state.data.Settings.SignInFlowSettings.map((visitorType, index) => {
                if (visitorType.VisitorTypeId === this.state.id) {
                    //control for static fields.
                    if (

                        (visitorType.ShowHostField && visitorType.HostFieldRequired && (fieldValues.host === undefined || fieldValues.host === 0)) ||

                        (visitorType.ShowCompanyNameField && visitorType.CompanyNameFieldRequired && (fieldValues.companyName === undefined || fieldValues.companyName === ""))
                    ) {

                        if (this.state.requiredCheck) {
                            controlRequired = false
                        }
                    }
                    //control for dinamic fields.
                    if (controlRequired) {

                        if (!validate.isEmpty(visitorType.SignInFlowCustomFields) && visitorType.SignInFlowCustomFields.length > 0 && visitorType.HasCustomFields) {
                            visitorType.SignInFlowCustomFields.map((value, index1) => {
                                let fieldKey = "Id_" + value.Id
                                if (value.IsRequired && (fieldValues[fieldKey] === undefined || fieldValues[fieldKey] === "" || fieldValues[fieldKey] === null)) {
                                    if (this.state.requiredCheck) {
                                        controlRequired = false
                                    }
                                }
                            })
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

    fillFieldValuesByInitialUserInfo() {
        if (this.props.userInfo !== undefined) {
            fieldValues.name = this.props.userInfo.userFullName
            fieldValues.mail = this.props.userInfo.userEmail
            fieldValues.phone = this.props.userInfo.userTelephone
            fieldValues.hostName = this.props.userInfo.userHostName

            this.props.jsonData.Settings.HostUsers.map((value) => {
                let fullName = value.FirstName + " " + value.LastName
                if (fieldValues.hostName === fullName) {
                    fieldValues.host = value.Id

                }
            })


            fieldValues.HostId =
                fieldValues.companyName = this.props.userInfo.userCompanyName
        } else if (this.props.data !== undefined) {
            fieldValues.name = this.props.newGuestName
        }
        this.setState({ dummy: !this.state.dummy })
    }

    async checkNameFromApi() {

        let isConnected = await checkNetConnection()
        let controlRequired = this.checkRequiredFields()


        if (controlRequired) {
            statusArray = []
            let visitorTypeName = ""

            !validate.isEmpty(this.state.data.Settings.VisitorTypes)
                ?
                this.state.data.Settings.VisitorTypes.map((value, index) => {
                    if (value.Id === this.state.id) {
                        visitorTypeName = value.Name
                    }
                })
                : null
            var date = new Date();
            date = moment(date).format("YYYY-MM-DD HH:mm:ss");

            customFieldValues = []

            for (let i = 0; i < valueOfOptionalFields.length; i++) {

                let key = valueOfOptionalFields[i].id.substring(0, 3)

                if (key !== "Id_") {
                    let customFieldValue = {}
                    customFieldValue["Value"] = valueOfOptionalFields[i].text
                    customFieldValue["SignInFlowCustomFieldId"] = valueOfOptionalFields[i].id

                    customFieldValues.push(customFieldValue)
                }
            }

            for (let i = 0; i < Object.keys(fieldValues).length; i++) {
                let key = Object.keys(fieldValues)[i].substring(0, 3)
                if (key === "Id_") {

                    let value = fieldValues[Object.keys(fieldValues)[i]]

                    let customFieldValue = {}
                    let fieldKey = Object.keys(fieldValues)[i].substring(3, Object.keys(fieldValues)[i].length);
                    let parseKeyToInt = parseInt(fieldKey)
                    customFieldValue["Value"] = value
                    customFieldValue["SignInFlowCustomFieldId"] = parseKeyToInt

                    customFieldValues.push(customFieldValue)
                }
            }

            let currentVisitor =
            {
                FullName: fieldValues.name === undefined ? "" : fieldValues.name,
                Email: fieldValues.mail === undefined ? "" : fieldValues.mail,
                Telephone: fieldValues.phone === undefined ? 0 : fieldValues.phone,
                HostId: fieldValues.host === undefined ? null : fieldValues.host,
                CompanyName: fieldValues.companyName === undefined ? null : fieldValues.companyName,
                VisitorTypeId: this.state.id,
                SignInDateTime: date,
                CustomFieldValues: customFieldValues,
                Signature: null,
                GuestStatus: 3, // default 3 , to sign out 4
                LocationId: this.state.locationId,
                VisitorCount: this.refs["visitorRef"].getVisitorCountInfo(),
                IdentityNumber: fieldValues.TcNumber === undefined ? null : fieldValues.TcNumber,

                FinalScreenHostPrivateMessage: this.state.privateHostMessage
            }
            if (this.props.userInfo !== undefined) {
                currentVisitor.Id = this.props.userInfo.userId
            }

            !validate.isEmpty(this.state.data.Settings.SignInFlowSettings)
                ?
                this.state.data.Settings.SignInFlowSettings.map((visitorType) => {
                    if (visitorType.VisitorTypeId === this.state.id) {
                        currentHostInfo = getHostInfo(this.state.data.Settings, visitorType.VisitorTypeId)
                        currentHostInfo.hostName = this.state.hostName
                        if (this.state.HostNotification === null) {
                            currentVisitor.HostNotification = currentHostInfo.HostApproval
                        } else {
                            currentVisitor.HostNotification = this.state.HostNotification
                        }
                        checkControl = true;

                        if (this.state.data.Settings.LocationAccountSetting.HasHesAccount && this.state.data.Settings.LocationAccountSetting.HesValidation) {
                            let JsonData = JSON.stringify(currentVisitor)
                            this.props.fetchAddUpdateGuest(JsonData, this.props.bearerToken)
                            Actions.hesMainPage(
                                {
                                    hostNotification: currentVisitor.HostNotification,
                                    isSignRequired: visitorType.AllowVisitorsDeclineSigning,
                                    visitorTypeId: this.state.id,
                                    visitorTypeName: visitorTypeName,
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
                                    phone: this.state.phone,
                                    userInfo: this.props.userInfo,
                                    id: this.state.id,
                                    hasVisitorPhoto: this.state.hasVisitorPhoto,
                                    visitorPhoto: this.state.visitorPhoto
                                }
                            )
                        } else {
                            Actions.phoneAndEmailPage(
                                {
                                    hostNotification: currentVisitor.HostNotification,
                                    isSignRequired: visitorType.AllowVisitorsDeclineSigning,
                                    visitorTypeId: this.state.id,
                                    visitorTypeName: visitorTypeName,
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
                                    phone: this.state.phone,
                                    userInfo: this.props.userInfo,
                                    id: this.state.id,
                                    hasVisitorPhoto: this.state.hasVisitorPhoto,
                                    visitorPhoto: this.state.visitorPhoto
                                }
                            )
                        }



                        // if (visitorType.EnableNdaSigning) {
                        //     if (isConnected) {
                        //         this.pushOfflineVisitorsToApi()
                        //     }
                        //     Actions.legalTerm({
                        //         hostNotification: currentVisitor.HostNotification,
                        //         isSignRequired: visitorType.AllowVisitorsDeclineSigning,
                        //         visitorTypeId: this.state.id,
                        //         visitorTypeName: visitorTypeName,
                        //         visitor: currentVisitor,
                        //         hostApproval: currentHostInfo.HostApproval,
                        //         hostMessage: currentHostInfo.HostMessage,
                        //         hostVideoUrl: currentHostInfo.HostVideo,
                        //         hostName: this.state.hostName,
                        //         email: visitorType.SignedNdaReceivingMailAddress,
                        //         date: visitorType.NdaTextDate,
                        //         currentHostInfo: currentHostInfo,
                        //         cameraEnable: visitorType.CaptureVisitorPhoto,
                        //         email:currentVisitor.Email


                        //     })


                        // }
                        // else if (visitorType.CaptureVisitorPhoto) {
                        //     if (isConnected) {
                        //         this.pushOfflineVisitorsToApi()
                        //     }
                        //     Actions.camera({
                        //         hostNotification: currentVisitor.HostNotification,
                        //         visitor: currentVisitor,
                        //         currentHostInfo: currentHostInfo,
                        //         locationId: this.props.jsonData.Settings.LocationAccountSetting.Id,
                        //     })

                        // }
                        // else {
                        //     if (isConnected) {
                        //         this.pushOfflineVisitorsToApi()
                        //         let JSONdata = JSON.stringify(currentVisitor);
                        //         this.props.fetchAddUpdateGuest(JSONdata, this.props.bearerToken)
                        //         this.sendMessage()
                        //     } else {
                        //         getSetOfflineVisitors(currentVisitor)
                        //     }
                        //     Actions.lastPage({
                        //         hostNotification: currentVisitor.HostNotification,
                        //         guestSaved: true,
                        //         hostApp: currentHostInfo.HostApproval,
                        //         hostMessage: currentHostInfo.HostMessage,
                        //         hostVideoUrl: currentHostInfo.HostVideo,
                        //         hostName: this.state.hostName,
                        //         visitor: currentVisitor,
                        //         currentVisitorPrivateMessage: currentVisitor.FinalScreenHostPrivateMessage,

                        //     })

                        // }
                    }
                })
                :
                null
        }

    }

    async pushOfflineVisitorsToApi() {
        let currentSavedVisitors = await getOfflineVisitor()
        if (currentSavedVisitors !== "") {
            let visitorObj = JSON.parse(currentSavedVisitors)
            visitorObj.map((value) => {
                let JSONdata = JSON.stringify(value);
                this.props.fetchAddUpdateGuest(JSONdata, this.props.bearerToken)
            })
            saveOfflineVisitor("")
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

    getOptionalValue(id, text) {
        let currentInputName = "Id_" + id;
        if (fieldValues[currentInputName] !== text) {
            fieldValues[currentInputName] = text;
            this.setState({
                dummyText: ""
            })
        }

        let check = false
        valueOfOptionalFields.map((val) => {
            if (val.id === currentInputName) {
                check = true
            }
        })
        if (check) {
            for (i = 0; i < valueOfOptionalFields.length; i++) {
                if (valueOfOptionalFields[i].id === currentInputName) {
                    valueOfOptionalFields[i].text = text
                }
            }
        } else {
            valueOfOptionalFields.push(
                {
                    id: currentInputName,
                    text: text
                }
            )
        }
        this.setState({
            selectedInput: ''
        })
        LayoutAnimation.configureNext(animationConfigs.get(AnimationType.linear))

    }


    fillFieldForDinamicText(fieldId) {
        let value = ""

        if (this.state.visitorInfo !== undefined) {
            this.state.visitorInfo.userCustomField.map((val) => {
                if (val.Id === fieldId) {
                    value = val.Value

                    if (!statusArray.includes(fieldId)) {
                        let currentInputName = "Id_" + fieldId;
                        fieldValues[currentInputName] = value
                        statusArray.push(fieldId)
                        this.setState({
                            dummyText: ""
                        })
                    }
                }
            })
        }

        return value;
    }

    fillFieldForDinamicDropdown(fieldId, name) {
        let value = ""
        if (this.state.visitorInfo !== undefined) {
            this.state.visitorInfo.userCustomField.map((val) => {
                if (val.Id === fieldId) {
                    value = val.Value
                    this.getOptionalValue(fieldId, name)
                }
            })
        }
        return value;
    }

    changeEmailStatus = () => {
        this.setState({ emailField: true })
    }

    falseEmailStatus = () => {
        this.setState({ emailField: false })
    }

    onExit() {
        checkControl = true
        statusArray = []
        Actions.pop()
    }

    onSubmitEmail = () => {
        if (this.state.selectedInput === this.state.selectedLanguageData.email) {
            this.setState({
                selectedInput: '',
                emailField: false
            })
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>
                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <View style={{ height: deviceHeight * 0.1 }}>
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
                    <ScrollView keyboardShouldPersistTaps={'always'} style={{ marginTop: 20 }}>
                        {
                            this.state.data ?
                                this.state.data.Settings.SignInFlowSettings.map((visitorType, index) => {

                                    return (
                                        visitorType.VisitorTypeId === this.state.id ?
                                            [
                                                visitorType.ShowHostField ?
                                                    [<TextBox
                                                        ref={input => this.secondTextInput = input}
                                                        location={false}
                                                        selectedHost={(id, name) => {
                                                            fieldValues.host = id
                                                            fieldValues.hostName = name
                                                            this.setState({ hostName: name })
                                                            this.setState({ dummy: !this.state.dummy, selectedInput: '' })
                                                            LayoutAnimation.configureNext(animationConfigs.get(AnimationType.linear))
                                                        }}
                                                        forHost={this.state.hostList}
                                                        textBoxType="Host"
                                                        onPressHeader={this.onPressHeader}
                                                        isEmail={false}
                                                        falseEmailStatus={() => this.falseEmailStatus()}
                                                        onChangeText={(text) => { fieldValues.host != undefined ? delete fieldValues.host : null, this.setState({ dummyText: text }) }}
                                                        required={visitorType.HostFieldRequired}
                                                        inputName={visitorType.HostFieldName}
                                                        selectedInput={this.state.selectedInput}
                                                        onPressTextbox={() => { this.setState({ selectedInput: visitorType.HostFieldName }) }}
                                                        borderColor={this.state.data.Settings.LocationAccountSetting.AccentColor}
                                                        value={this.props.userInfo !== undefined && this.props.hostname !== undefined ? this.props.userInfo.userHostName : ""}
                                                        editable={this.props.guestStatus === 6 && this.props.hostname !== undefined ? false : true}
                                                    />]
                                                    : null,

                                                visitorType.ShowCompanyNameField ?
                                                    [<TextBox
                                                        location={false}
                                                        onPressHeader={this.onPressHeader}
                                                        onChangeText={(text) => { fieldValues.companyName = text, this.setState({ dummyText: text }) }}
                                                        required={visitorType.CompanyNameFieldRequired}
                                                        inputName={this.state.selectedLanguageData.companyName}
                                                        selectedInput={this.state.selectedInput}
                                                        isEmail={false}
                                                        falseEmailStatus={() => this.falseEmailStatus()}
                                                        onPressTextbox={() => { this.setState({ selectedInput: this.state.selectedLanguageData.companyName }) }}
                                                        borderColor={this.state.data.Settings.LocationAccountSetting.AccentColor}
                                                        value={this.props.userInfo !== undefined ? this.props.userInfo.userCompanyName : ""}
                                                    />]
                                                    : null,
                                                visitorType.TcIdentity ?
                                                    [<TextBox
                                                        location={false}
                                                        keyboardType={'numeric'}
                                                        onPressHeader={this.onPressHeader}
                                                        onChangeText={(text) => { fieldValues.TcNumber = text, this.setState({ dummyText: text }) }}
                                                        required={false}
                                                        inputName={"TC"}
                                                        maxLength={11}
                                                        falseEmailStatus={() => this.falseEmailStatus()}
                                                        selectedInput={this.state.selectedInput}
                                                        onPressTextbox={() => { this.setState({ selectedInput: "TC" }) }}
                                                        borderColor={this.state.data.Settings.LocationAccountSetting.AccentColor}
                                                        value={this.props.userInfo !== undefined ? this.props.userInfo.userIdentityNumber : ""}
                                                    />]
                                                    : null,
                                                !validate.isEmpty(visitorType.SignInFlowCustomFields) && visitorType.SignInFlowCustomFields.length > 0 && visitorType.HasCustomFields ?
                                                    [

                                                        visitorType.SignInFlowCustomFields.map((value, index1) => {

                                                            return (
                                                                value.HasOptions
                                                                    ?
                                                                    [<Dropdown
                                                                        getDropDownValue={(id, name) => {
                                                                            this.getOptionalValue(value.Id, name)
                                                                        }}
                                                                        falseEmailStatus={() => this.falseEmailStatus()}
                                                                        inputName={value.Name}
                                                                        selectedInput={this.state.selectedInput}
                                                                        onPressDropdown={() => { this.setState({ selectedInput: value.Name, dummyText: "dropdown", emailField: false }) }}
                                                                        requiredFields={value.IsRequired}
                                                                        index={index1 + 100}
                                                                        title={value.Name}
                                                                        customList={value.SignInFlowCustomFieldOptions}
                                                                        value={() => this.fillFieldForDinamicDropdown(value.Id, value.Name)}
                                                                    />]
                                                                    : [<TextBox
                                                                        onChangeText={(text) => {
                                                                            let currentInputName = "Id_" + value.Id;
                                                                            fieldValues[currentInputName] = text;
                                                                            this.setState({ dummyText: text })
                                                                        }}
                                                                        isEmail={false}
                                                                        falseEmailStatus={() => this.falseEmailStatus()}
                                                                        onPressHeader={this.onPressHeader}
                                                                        required={value.IsRequired}
                                                                        inputName={value.Name}
                                                                        selectedInput={this.state.selectedInput}
                                                                        onPressTextbox={() => { this.setState({ selectedInput: value.Name }) }}
                                                                        borderColor={this.state.data.Settings.LocationAccountSetting.AccentColor}
                                                                        value={() => this.fillFieldForDinamicText(value.Id)}
                                                                    />]


                                                            )
                                                        })
                                                    ] : null
                                            ]
                                            :
                                            null


                                    )
                                })
                                : null
                        }
                        <VisitorCount
                            visitorCountName={this.state.selectedLanguageData.counter}
                            ref="visitorRef"
                            falseEmailStatus={() => this.falseEmailStatus()}
                            onPressHeader={this.onPressHeader}
                            onChangeText={this.onChangeText}
                            required={false}
                            inputName={this.state.selectedLanguageData.counter}
                            selectedInput={this.state.selectedInput}
                            onPressTextbox={() => { this.setState({ selectedInput: this.state.selectedLanguageData.counter, emailField: false }) }}
                            backColor={this.props.jsonData.Settings.LocationAccountSetting.AccentColor}

                        />


                    </ScrollView>

                    {
                        this.state.selectedInput === this.state.selectedLanguageData.email ?
                            <MailContainer
                                emailClicked={(value) => this.selectedMail(value)}
                                keyboardHeight={this.state.keyboardHeight} />
                            :
                            null
                    }

                    <View style={[style.navigationButtonsContainer, this.state.emailField === true ? { height: 0 } : { height: deviceHeight * 0.11 }]}>
                        <View style={[style.leftButtonContainer]}>
                            <NavigationButton
                                image={require('../../../assets/leftArrow.png')}
                                onPress={() => this.onExit()}
                            />
                        </View>
                        <View style={{ flex: 0.76, alignItems: "center", justifyContent: 'center' }}>
                            <Footer />
                        </View>

                        <View style={style.rightButtonContainer}>
                            <NavigationButton
                                opacityControl={
                                    this.checkRequiredFields() ? false : true
                                }
                                image={require('../../../assets/rightArrow.png')}
                                onPress={() => this.checkNameFromApi()}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = (state) => {
    const { bearerToken } = state.token
    const { jsonData } = state.json_code
    const { newGuestName } = state.guest_info
    const { selectedLanguage, languageJson } = state.language
    return {
        jsonData, bearerToken, newGuestName, selectedLanguage, languageJson
    }
};

function bindAction(dispatch) {
    return {
        fetchAddUpdateGuest: (data, bearerToken) => dispatch(fetchAddUpdateGuest(data, bearerToken)),
    };
}

export default connect(mapStateToProps, bindAction)(VisitorInfo);

