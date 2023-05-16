import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, TextInput, TouchableHighlight, ScrollView, ImageBackground } from 'react-native'
import { connect } from 'react-redux';
import { style } from './style'
import { Actions } from 'react-native-router-flux'
import { setCurrentLanguage, getWaitingExitVisitors, addUpdateGuest, deleteModalProps, setCurrentPage, setSignalrInfo, fetchAddUpdateGuest, getToken } from '../../actions'
import ImageSlider from 'react-native-image-slider';
import Modal from 'react-native-modal'
import { validate } from 'validate.js';
import { createConnection, startAndConnectMethod, printBadge } from '../../utils/signalR_connection'
import DropDown from './visitor_dropdown'
import { saveSelectedLanguage } from '../../utils/storage_utils'
import { store } from '../../../App'
import HTML from 'react-native-render-html'
import Footer from '../../components/footer'
import InfoModal from '../../components/info_modal_design';

import jwt_decode from "jwt-decode";
import moment from 'moment';

const Dimensions = require("Dimensions")

const outUrl = 'http://31.145.176.136'

const inUrl = 'http://192.168.10.204'

var Color = require('color')

class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text: "",
            jsonD: props.jsonData,
            hubConnection: null,
            messages: [],
            checkReload: false,
            guestInfo: props.guestInfo,
            buttonBackgroundColor: props.jsonData.Settings.LocationAccountSetting.AccentColor,
            selectedLanguage: props.selectedLanguage,
            selectedLanguageData: props.selectedLanguage === "EN" ? props.languageJson.EN : props.languageJson.TR,
            modalVisible: false,
            searchVisitor: "",
            getWaitingExitVisitorsData: [],
            noVisitor: false,
            selectVisitor: {},
            addUpdateGuestData: [],
            visitorExit: false,
            photos: [],
            enableVisitorConsent: props.jsonData.Settings.LocationAccountSetting.EnableVisitorConsent,
            enableDataPolicy: props.jsonData.Settings.LocationAccountSetting.EnableDataPolicy,
            sliderPhotos: props.jsonData.Settings !== undefined ? props.jsonData.Settings.WelcomeScreenSetting.SlideShowImagesPaths : null,
            enableBackgroundColor: props.jsonData.Settings !== undefined ? props.jsonData.Settings.WelcomeScreenSetting.EnableBackgroundColor : null,
            enableSlideShow: props.jsonData.Settings !== undefined ? props.jsonData.Settings.WelcomeScreenSetting.EnableSlideShow : null,
            enableWelcomeImage: props.jsonData.Settings !== undefined ? props.jsonData.Settings.WelcomeScreenSetting.EnableWelcomeImage : null,
            changePageControl: false,
            kvkkModalVisible: false,
            offlineModalVisible: false,
            showOfflineModal: false,
            membershipStatus: true,
            membershipModalVisible: false
        }
    }

    checkMembershipStatus() {
        if (this.props.membershipStatus !== undefined && this.props.membershipStatus !== null) {
            if (this.props.membershipStatus.data !== undefined && this.props.membershipStatus.data !== null) {
                this.props.membershipStatus.data.forEach(element => {
                    if (element.VisitorModuleEnable) {
                        if (!element.HasAccess) {
                            this.setState({ membershipStatus: false, membershipModalVisible: true })
                        }
                    }
                });
            }
        }

    }


    sliderImages() {

        if (this.state.sliderPhotos != null) {

            var photos = this.state.sliderPhotos

            var allPhotos = []

            let newPhoto = null

            let photoArray = photos.split('###')



            for (i = 0; i < photoArray.length; i++) {

                if (photoArray[i].includes(inUrl)) {

                    newPhoto = photoArray[i].replace(inUrl, outUrl)

                } else {

                    newPhoto = photoArray[i]

                }

                allPhotos.push(newPhoto)

                newPhoto = null

            }
            this.state.jsonD.Settings.WelcomeScreenSetting.WelcomeImagePath

            this.setState({ photos: allPhotos })

        }

    }


    componentDidMount() {
        this.checkMembershipStatus()
        if (this.props.currentPage !== "homePage") {
            this.props.setCurrentPage("homePage")
        }
        if (this.props.signalrInfo) {
            this.props.setSignalrInfo(false)
            Actions.loadingPage();
        } else {
            this.sliderImages()

            // this.state.hubConnection.onclose(() => {
            //     console.log('signalr disconnected.')
            //     startAndConnectMethod(this.state.hubConnection)
            // })

            if (this.props.netInfo) {
                // startAndConnectMethod(this.state.hubConnection)
            }

            // this.state.hubConnection.on("GetAllSettings", function (settings) {
            //     const storeFromRedux = store.getState()
            //     const currentLocationId = storeFromRedux.json_code.jsonData.Settings.LocationAccountSetting.Id

            //     if (currentLocationId === settings.devices[0].entrance.locationId) {
            //         const currentPage = storeFromRedux.page.currentPage

            //         if (currentPage === "homePage") {
            //             Actions.loadingPage();

            //         } else {
            //             store.dispatch(setSignalrInfo(true))
            //         }
            //     }
            // });

            this.setState({ jsonD: this.props.jsonData, offlineModalVisible: !this.props.netInfo })
        }

    }



    componentWillMount() {

        // if (!this.state.hubConnection) {
        //     this.setState({
        //         hubConnection: createConnection()
        //     })
        // }
    }

    componentWillReceiveProps(props) {
        if (props.membershipStatus !== this.state.membershipStatus) {
            this.checkMembershipStatus()
            //this.setState({ membershipStatus: props.membershipStatus })
        }
        if (!props.netInfo !== this.state.offlineModalVisible) {
            this.setState({ offlineModalVisible: !props.netInfo })
        }
        if (props.jsonData.Settings) {
            this.setState({
                buttonBackgroundColor: props.jsonData.Settings.LocationAccountSetting.AccentColor,
                sliderPhotos: props.jsonData.Settings.WelcomeScreenSetting.SlideShowImagesPaths,
                enableBackgroundColor: props.jsonData.Settings.WelcomeScreenSetting.EnableBackgroundColor,
                enableSlideShow: props.jsonData.Settings.WelcomeScreenSetting.EnableSlideShow,
                enableWelcomeImage: props.jsonData.Settings.WelcomeScreenSetting.EnableWelcomeImage

            })
        }
        if (props.selectedLanguage === "EN") {
            this.setState({
                selectedLanguage: 'EN',
                selectedLanguageData: props.languageJson.EN,
            })
        } else {
            this.setState({
                selectedLanguage: 'TR',
                selectedLanguageData: props.languageJson.TR
            })
        }

        if (this.state.searchVisitor.length >= 3 && validate.isArray(props.exitVisitors) && props.exitVisitors.length !== 0) {
            this.setState({ noVisitor: false })
            this.setState({ getWaitingExitVisitorsData: props.exitVisitors })
        } else if (this.state.searchVisitor.length >= 3 && props.exitVisitors.length === 0) {
            this.setState({ noVisitor: true })
        }

        if (!validate.isEmpty(props.guestInfo)) {
            debugger
            this.setState({ guestInfo: JSON.parse(props.guestInfo) }, () => {
                this.setState({ visitorExit: true })
            })

            setTimeout(() => {
                this.setState({ modalVisible: false });
                this.setState({
                    searchVisitor: "",
                    getWaitingExitVisitorsData: [],
                    noVisitor: false,
                    selectVisitor: {},
                    addUpdateGuestData: [],
                    visitorExit: false,
                });
                this.props.deleteModalProps()
            }, 2500)
        }

    }

    clickBackDrop = () => {
        this.setState({ modalVisible: false, kvkkModalVisible: false })


        this.setState({
            searchVisitor: "",
            getWaitingExitVisitorsData: [],
            noVisitor: false,
            selectVisitor: {},
            addUpdateGuestData: [],
            visitorExit: false,
        });

    }

    renderVisitorFoundText = () => {
        if (this.state.noVisitor && this.state.searchVisitor.length >= 3) {
            return (
                <View style={style.modalTextContainer}>
                    <Text style={style.userFoundText}>{this.state.selectedLanguageData.noGuest}</Text>
                </View>
            )
        } else {
            return (
                <View style={style.modalTextContainer}>
                    <Text style={style.userFoundText}>{this.state.selectedLanguageData.minLetter}</Text>
                </View>
            )
        }
    }

    searchVisitor = (visitor) => {
        this.setState({ searchVisitor: visitor })
        if (visitor.length >= 3) {
            var locationId = this.state.jsonD.Settings.SignOutSetting.LocationId
            var name = visitor
            var pnrCode = null
            var bearerToken = this.props.bearerToken

            this.props.getWaitingExitVisitors(name, pnrCode, locationId, bearerToken)
        }
    }

    openModal = () => {
        this.setState({ modalVisible: true })
    }

    exitGuest = () => {
        debugger
        var guestData = this.state.selectVisitor
        var bearerToken = this.props.bearerToken

        this.props.fetchAddUpdateGuest(JSON.stringify(guestData), bearerToken)

    }

    selectVisitor = (CustomFieldValues, HasVisitorPhoto, HostId, Id, InviteDate, Email, FullName, VisitorCount, LocationId, VisitorTypeId, SignInDateTime) => {
        var obj = {
            "CustomFieldValues": CustomFieldValues,
            "HasVisitorPhoto": HasVisitorPhoto,
            "HostId": HostId,
            "Id": Id,
            "InviteDate": InviteDate,
            "Email": Email,
            "GuestStatus": 4,
            "FullName": FullName,
            "VisitorCount": VisitorCount,
            "LocationId": LocationId,
            "VisitorTypeId": VisitorTypeId,
            "SignInDateTime": SignInDateTime
        }

        this.setState({ searchVisitor: FullName })
        this.setState({ selectVisitor: obj }, () => {
            this.exitGuest()
        })
    }

    getHostName = (hostId) => {
        var hostname = "";
        if (!validate.isEmpty(this.state.jsonD.Settings.HostUsers)) {
            this.state.jsonD.Settings.HostUsers.map((v, i) => {
                if (v.Id === hostId) {
                    hostname = this.state.selectedLanguageData.host + ": " + v.FirstName + " " + v.LastName
                }
            })
        }
        return hostname
    }

    signIn = () => {

        this.setState({ kvkkModalVisible: false })
        console.log('HOMEPAGE SIGNIN')
        if (!this.state.changePageControl) {
            console.log('HOMEPAGE IF')
            this.setState({
                changePageControl: true
            })
            this.props.setCurrentPage("anothefrPage")
            setTimeout(() => { Actions.userLogin() }, 400)

        }
    }


    signInModal = () => {
        this.setState({ kvkkModalVisible: true })
    }

    backKvkk = () => {
        this.setState({ kvkkModalVisible: false })
        setTimeout(() => { Actions.policypage({ finalMessage: this.props.jsonData.Settings.LocationAccountSetting.FinalScreenMessage }) }, 400)

    }

    changeLanguage = (language) => {
        if (language === 'EN') {
            this.props.setCurrentLanguage('EN')
            saveSelectedLanguage('English')
        } else {
            this.props.setCurrentLanguage('TR')
            saveSelectedLanguage('Türkçe')
        }
        console.log(this.props.currentPage)
    }

    _signInPress = () => {
        if (this.props.netInfo) {
            if (this.props.bearerToken !== "" && this.props.bearerToken !== undefined && this.props.bearerToken !== null) {
                const decodedToken = jwt_decode(this.props.bearerToken)
                const hoursWithPm = moment(decodedToken.exp * 1000)
                const now = moment()

                const isTokenValid = hoursWithPm.isAfter(now)

                if (!isTokenValid) {
                    Actions.loadingPage()
                } else {
                    if (this.state.enableVisitorConsent) {
                        this.signInModal()
                    } else {
                        this.signIn()
                    }
                }
            }else{
                Actions.loadingPage()
            }
        }
    }



    render() {
        const htmlContent = this.props.jsonData.Settings.LocationAccountSetting.DataPolicyText;
        let deviceWidth = Dimensions.get('window').width
        let deviceHeight = Dimensions.get('window').height
        return (
            this.state.jsonD && this.state.jsonD.Status !== false ?

                <View style={
                    this.state.enableSlideShow ?
                        [style.container, {
                            backgroundColor: "white"
                        }] :
                        this.state.enableBackgroundColor ?
                            [style.container, {
                                backgroundColor:
                                    this.state.jsonD.Settings.WelcomeScreenSetting.BackgroundColor,
                            }] :
                            [style.container, {
                                backgroundColor: "white"
                            }]

                }>
                    <View style={this.state.enableSlideShow
                        ? style.containerStyle :
                        [style.containerStyle, { opacity: 0.1 }]
                    } />

                    {/* <StatusBar hidden /> */}
                    <View style={style.bodycontainer}>
                        {this.state.jsonD.Settings.WelcomeScreenSetting.EnableWelcomeImage && this.state.jsonD.Settings.WelcomeScreenSetting.HideCompanyLogoFromWelcome === false
                            ?
                            this.state.jsonD.Settings.WelcomeScreenSetting.WelcomeImagePath !== null
                                ?
                                <View style={style.logo}>
                                    <Image
                                        style={style.stretch}
                                        source={{ uri: this.state.jsonD.Settings.WelcomeScreenSetting.WelcomeImagePath }}
                                    />

                                </View>
                                :
                                <View style={style.companyName}>
                                    <Text style={style.textStyle}>{this.state.jsonD.Settings.CustomerInfo.Name}</Text>
                                    <Text style={style.textStyle}>({this.state.jsonD.Settings.LocationAccountSetting.FullName})</Text>
                                </View>
                            :
                            <View style={style.companyName}>
                                <Text style={style.textStyle}>{this.state.jsonD.Settings.CustomerInfo.Name}</Text>
                                <Text style={style.textStyle}>{this.state.jsonD.Settings.LocationAccountSetting.FullName}</Text>
                            </View>
                        }



                    </View>

                    {this.state.enableSlideShow && this.state.photos !== undefined ?

                        <View style={{ position: "absolute", zIndex: -1, height: deviceHeight, width: deviceWidth }}>
                            <ImageSlider
                                images={this.state.photos}
                                autoPlayWithInterval={3500}
                                customButtons={(position, move) => (
                                    null
                                )}
                            />
                        </View> : null
                    }



                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={
                            !this.state.offlineModalVisible ?
                                this.state.membershipStatus ?
                                    () => this._signInPress()
                                    :
                                    () => this.setState({ membershipModalVisible: true })
                                :
                                () => this.setState({ showOfflineModal: true })
                        }
                        style={[style.buttonStyle, { backgroundColor: this.state.buttonBackgroundColor }]}>

                        <Text
                            style={[style.buttonText, Color(this.state.buttonBackgroundColor).isLight() ? { color: 'black' } : { color: 'white' }]}>
                            {this.state.selectedLanguageData.tapToLogin}
                        </Text>
                    </TouchableOpacity>

                    {
                        this.state.jsonD.Settings.SignOutSetting.SelfSignOut === true
                            ?
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() =>
                                    this.state.membershipStatus ?
                                        this.openModal() : this.setState({ membershipModalVisible: true })}
                                style={style.signOut}>
                                <View style={{ height: deviceWidth * 0.07, opacity: 0.8, width: deviceWidth * 0.4, flexDirection: "row", borderRadius: 10, backgroundColor: "#ffffff", justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={style.signOutText}>{this.state.selectedLanguageData.tapToLogout}</Text>
                                </View>
                            </TouchableOpacity>

                            :
                            null
                    }

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: deviceWidth * 0.15, width: deviceWidth }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.changeLanguage('TR')}>
                                <Text style={[style.languageText, this.props.selectedLanguage === "TR" ? { textDecorationLine: 'underline' } : null]}> Türkçe </Text>
                            </TouchableOpacity>
                            <Text style={{ color: 'white', fontSize: deviceWidth * 0.032, fontFamily: 'Nexa', fontWeight: 'bold' }}>|</Text>
                            <TouchableOpacity onPress={() => this.changeLanguage('EN')}>
                                <Text style={[style.languageText, this.props.selectedLanguage === "EN" ? { textDecorationLine: 'underline' } : null]}>  English</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Footer homepage={true} />


                    <Modal
                        isVisible={this.state.showOfflineModal}
                        backdropColor="transparent"
                        backdropTransitionOutTiming={0}
                        backdropOpacity={0}
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        onBackdropPress={() => { this.setState({ showOfflineModal: false }) }}
                    >
                        <InfoModal
                            icon={require('../../assets/lock.png')}
                            cancelable={true}
                            description={this.state.selectedLanguageData.ipadOfflineMessage}
                            title={this.state.selectedLanguageData.ipadOffline}
                            onCancel={() => { this.setState({ showOfflineModal: false }) }}
                        />

                    </Modal>

                    <Modal
                        isVisible={this.state.modalVisible}
                        backdropColor="#000000"
                        backdropOpacity={0.8}
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        animationInTiming={600}
                        animationOutTiming={600}
                        backdropTransitionInTiming={600}
                        backdropTransitionOutTiming={600}
                        onBackdropPress={() => this.clickBackDrop()}
                    >
                        <View style={style.modalContainer}>
                            {
                                this.state.visitorExit
                                    ?
                                    <View style={style.exitDoneContainer}>
                                        <Text style={style.exitDoneText}>{this.state.guestInfo.data.IsSuccess ? this.state.selectedLanguageData.thanksForVisiting : this.state.selectedLanguageData.unknownError}</Text>
                                    </View>
                                    :
                                    <View>
                                        <View style={style.firstContainerInModal}>
                                            <Text style={style.nameText}>{this.state.selectedLanguageData.fullName}</Text>
                                            <TextInput autoFocus={true} value={this.state.searchVisitor} onChangeText={(v) => this.searchVisitor(v)} style={style.textInputContainer} selectionColor={"#7540ee"} />
                                        </View>
                                        <View style={style.secondContainerInModal}>
                                            {
                                                !validate.isEmpty(this.state.getWaitingExitVisitorsData) &&
                                                    !this.state.noVisitor &&
                                                    this.state.searchVisitor.length >= 3
                                                    ?
                                                    <ScrollView persistentScrollbar={true} style={{ alignSelf: "center", }}>
                                                        {
                                                            this.state.getWaitingExitVisitorsData.map((value, index) => {
                                                                return (
                                                                    <DropDown
                                                                        key={index}
                                                                        name={value.FullName}
                                                                        locationId={value.LocationId}
                                                                        id={value.Id}
                                                                        hostName={this.getHostName(value.HostId)}
                                                                        onPress={() => this.selectVisitor(value.CustomFieldValues,
                                                                            value.HasVisitorPhoto, value.HostId, value.Id, value.InviteDate, value.Email,
                                                                            value.FullName, value.VisitorCount, value.LocationId, value.VisitorTypeId, value.SignInDateTime)}
                                                                    />
                                                                )
                                                            })
                                                        }
                                                    </ScrollView>
                                                    :
                                                    this.renderVisitorFoundText()
                                            }
                                        </View>
                                    </View>
                            }

                        </View>

                    </Modal>

                    <Modal
                        isVisible={this.state.membershipModalVisible}
                        backdropColor="transparent"
                        backdropTransitionOutTiming={0}
                        backdropOpacity={0}
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        onBackdropPress={() => { this.setState({ membershipModalVisible: false }) }}>

                        <InfoModal
                            icon={require('../../assets/lock.png')}
                            cancelable={true}
                            description={this.state.selectedLanguageData.membershipExpiredNoNewRecord}
                            title={this.state.selectedLanguageData.membershipExpired}
                            onCancel={() => { this.setState({ membershipModalVisible: false }) }}
                        />

                    </Modal>

                    <Modal
                        onBackdropPress={() => this.setState({ kvkkModalVisible: false })}
                        isVisible={this.state.kvkkModalVisible}
                        style={{ alignItems: "center", justifyContent: "center", borderRadius: 10 }}>
                        <View underlayColor={'white'} onPress={() => this.setState({ isModalVisible: false })} style={{ width: deviceWidth * 0.8, height: deviceHeight * 0.85, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>

                            <ScrollView style={{ width: deviceWidth * 0.7, borderColor: 'gray', borderWidth: 1, marginTop: deviceHeight * 0.05, }}>
                                <View style={{ alignItems: 'center', justifyContent: "center", height: deviceWidth * 0.05 }}>
                                    <Text >{this.state.selectedLanguageData.clarificationText}</Text>
                                </View>


                                <HTML
                                    html={htmlContent}
                                    containerStyle={{

                                        marginHorizontal: deviceWidth * 0.05,


                                    }}
                                />
                            </ScrollView>

                            <View style={style.buttonsContainer}>
                                <View style={style.buttonContainer}>
                                    <TouchableOpacity onPress={() => this.backKvkk()} style={{ borderRadius: 7, height: '60%', width: '60%', backgroundColor: this.props.jsonData.Settings.LocationAccountSetting.AccentColor, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={style.buttonTextStyle}>
                                            {this.state.selectedLanguageData.disagreeDontSave}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={style.buttonContainer}>
                                    <TouchableOpacity onPress={() => this.signIn()} style={{ borderRadius: 7, backgroundColor: this.props.jsonData.Settings.LocationAccountSetting.AccentColor, height: '60%', width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={style.buttonTextStyle}>{this.state.selectedLanguageData.getItKeepGoing}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                        </View>

                    </Modal>

                </View> : <View style={[style.container, { justifyContent: "center", alignItems: 'center' }]}><Text>Herhangi bir veri bulunamadı. Lütfen daha sonra tekrar deneyiniz.</Text></View>
        )
    }
}
const mapStateToProps = (state) => {
    debugger
    const { jsonData } = state.json_code
    const { languageJson, selectedLanguage } = state.language
    const { exitVisitors } = state.exit_visitors
    const { bearerToken } = state.token
    const { addupdateGuest } = state.addupdate_guest
    const { currentPage, signalrInfo } = state.page
    const { netInfo } = state.netInfo
    const { signalrConnection } = state.signalr_connection
    const { membershipStatus } = state.membership
    const { guestInfo } = state.guest_info

    return {
        jsonData, languageJson, selectedLanguage, exitVisitors, bearerToken, addupdateGuest, currentPage, signalrInfo, netInfo, signalrConnection, membershipStatus, guestInfo
    };
}

function bindAction(dispatch) {
    return {
        setCurrentLanguage: (data) => dispatch(setCurrentLanguage(data)),
        getWaitingExitVisitors: (name, pnrCode, locationId, bearerToken) => dispatch(getWaitingExitVisitors(name, pnrCode, locationId, bearerToken)),
        addUpdateGuest: (guestData, bearerToken) => dispatch(addUpdateGuest(guestData, bearerToken)),
        deleteModalProps: () => dispatch(deleteModalProps()),
        setCurrentPage: (data) => dispatch(setCurrentPage(data)),
        setSignalrInfo: (data) => dispatch(setSignalrInfo(data)),
        fetchAddUpdateGuest: (guestData, bearerToken) => dispatch(fetchAddUpdateGuest(guestData, bearerToken)),
        getToken: () => dispatch(getToken()),
    };
}

export default connect(mapStateToProps, bindAction)(HomePage);

