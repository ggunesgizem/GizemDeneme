import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Platform, Keyboard } from 'react-native'
import Footer from '../../../components/footer'
import { style } from './style'
import NavigationButton from '../../../components/navigation_button'
import TextBox from '../../../components/text_box'
import { Actions } from 'react-native-router-flux'
import { HEScolor, deviceWidth, deviceHeight, timeoutSecond, URL } from '../../../constants'
import HESHeader from '../../../components/HES_header'
import { connect } from 'react-redux'
import { Bubbles } from 'react-native-loader'
import { HesCheck } from '../../../constants/APIs'
import validate from 'validate.js'

class HesMainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keyboardHeight: 0,
            currentVisitor: null,
            showIndicator: true,
            HESCode: ""
        }
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.showKeyboard)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.hideKeyboard)
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
        if (this.props.guestInfo !== undefined && this.props.guestInfo !== null && !validate.isEmpty(this.props.guestInfo)) {
            this.setState({ currentVisitor: this.props.guestInfo, showIndicator: false })
        }
    }

    examineHes() {
        this.setState({ showIndicator: true }, () => {
            // let HESCode = "E4N42833S0"
            // let HESCode = "L9X63948S4"
            let HESCode = this.state.HESCode.toUpperCase()
            let guestId = JSON.parse(this.state.currentVisitor).id
            fetch(URL + HesCheck + "?guestId=" + guestId + "&hesCode=" + HESCode, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + this.props.bearerToken,
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: {
                    hesCode: HESCode,
                    guestId: guestId
                }
            }).then(response => response.json().then(responseJson => {
                //1 - risksiz 2 - riskli
                if (responseJson !== undefined && responseJson !== null && responseJson.data !== undefined && responseJson.data !== null) {
                    const HESResult = {
                        resultId: responseJson.data.health_status,
                        TCKN: responseJson.data.masked_identity_number,
                        fullName: responseJson.data.masked_firstname + " " + responseJson.data.masked_lastname
                    }

                    this.setState({ showIndicator: false }, () => {
                        if (HESResult.resultId !== 0) {
                            let currentVisitor = this.props.visitor
                            currentVisitor.id = JSON.parse(this.state.currentVisitor).id

                            Actions.hesResultPage({
                                hostNotification: this.props.hostNotification,
                                isSignRequired: this.props.isSignRequired,
                                visitorTypeId: this.props.visitorTypeId,
                                visitorTypeName: this.props.visitorTypeName,
                                visitor: currentVisitor,
                                hostApproval: this.props.hostApproval,
                                hostMessage: this.props.hostMessage,
                                hostVideoUrl: this.props.currentHostInfo.HostVideo,
                                hostName: this.props.hostName,
                                email: this.props.email,
                                date: this.props.date,
                                currentHostInfo: this.props.currentHostInfo,
                                cameraEnable: this.props.cameraEnable,
                                email: this.props.email,
                                phone: this.props.phone,
                                userInfo: this.props.userInfo,
                                id: this.props.id,
                                hasVisitorPhoto: this.state.hasVisitorPhoto,
                                visitorPhoto: this.state.visitorPhoto,
                                HESResult: HESResult
                            })
                        } else {
                            this.setState({ showIndicator: false })
                        }
                    })
                } else {
                    this.setState({ showIndicator: false })
                }
            })).catch((error) => {
                this.setState({ showIndicator: false })
                console.log(error)
            })

        })

    }

    _renderActivityIndicator() {
        if (this.state.showIndicator) {
            return (
                <View style={{ zIndex: 1, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.5)', width: deviceWidth, height: deviceHeight, justifyContent: 'center', alignItems: 'center' }}>
                    <Bubbles size={15} color="#7548EA" />
                </View>
            )
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
                <HESHeader />
                <View style={{
                    width: deviceWidth * 0.9, height: deviceWidth * 0.53, backgroundColor: 'white',
                    shadowOffset: {
                        width: 0,
                        height: -0.1,
                    },
                    shadowOpacity: 0.2,
                    shadowColor: '#707070',
                    shadowRadius: 20,
                    borderColor: 'black',
                    marginHorizontal: deviceWidth * 0.07,
                    marginTop: deviceHeight * 0.02,
                    marginBottom: deviceHeight * 0.025, borderRadius: deviceWidth * 0.04, alignItems: 'center',
                    padding: deviceWidth * 0.03
                }}>
                    <View style={{ paddingHorizontal: deviceWidth * 0.09, marginTop: deviceWidth * 0.007 }}>
                        <Text style={{ fontFamily: 'Nexa', fontSize: deviceWidth * 0.037, textAlign: 'center' }}>HES Kodunuzu yazarak sorgulayınız.</Text>
                        <Text style={{ fontFamily: 'Nexa', fontSize: deviceWidth * 0.03, marginTop: deviceWidth * 0.03, textAlign: 'center', color: HEScolor }}>Sağlık bakanlığı güvencesinde HES kodunuzu sorgulama güvence altında.</Text>
                    </View>

                    <TextBox
                        onChangeText={(text) => {
                            this.setState({ HESCode: text })
                        }}
                        isEmail={false}
                        required={true}
                        inputName="HES Kodu"
                        selectedInput="HES Kodu"
                        HES={true}
                        onPressTextbox={() => { }}
                        borderColor={HEScolor}
                        value={() => { }}
                    />

                    <TouchableOpacity style={{
                        // position: 'absolute',
                        // bottom: deviceHeight * 0.25,
                        marginTop: deviceWidth * 0.03,
                        justifyContent: 'center',
                        width: deviceWidth * 0.35,
                        height: deviceWidth * 0.1,
                        borderRadius: 10,
                        alignSelf: 'center',
                        backgroundColor: HEScolor
                    }}
                        onPress={() => this.examineHes()}>
                        <Text style={{
                            textAlign: 'center',
                            color: 'white',
                            marginTop: deviceWidth * 0.006,
                            fontSize: deviceWidth * 0.025,
                            fontFamily: "Nexa",
                            fontWeight: 'bold',
                        }}>Sorgula</Text>
                    </TouchableOpacity>

                </View>


                <View style={{
                    width: deviceWidth * 0.9, height: deviceWidth * 0.38, backgroundColor: 'white',
                    shadowOffset: {
                        width: 0,
                        height: -0.1,
                    },
                    shadowOpacity: 0.2,
                    shadowColor: '#707070',
                    shadowRadius: 20,
                    borderColor: 'black',
                    marginHorizontal: deviceWidth * 0.07,

                    marginBottom: deviceHeight * 0.025, borderRadius: deviceWidth * 0.04, alignItems: 'center',
                    padding: deviceWidth * 0.03
                }}>
                    <View style={{ paddingHorizontal: deviceWidth * 0.02, marginTop: deviceWidth * 0.006 }}>
                        <Text style={{ fontFamily: 'Nexa', fontSize: deviceWidth * 0.037, textAlign: 'center' }}>HES Kare Kod ile Sorgulamak Daha Kolay</Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: deviceWidth * 0.07 }}>
                            <Text style={{ fontFamily: 'Nexa', fontSize: deviceWidth * 0.028, marginTop: deviceWidth * 0.035, textAlign: 'center', color: HEScolor }}>Sorgulayacağınız HES kodunun kare kod halini okutarak daha hızlı ve kolay sorgulama yapabilirsiniz</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            let currentVisitor = this.props.visitor
                            currentVisitor.id = JSON.parse(this.state.currentVisitor).id
                            Actions.hesCameraPage({
                                hostNotification: this.props.hostNotification,
                                isSignRequired: this.props.isSignRequired,
                                visitorTypeId: this.props.visitorTypeId,
                                visitorTypeName: this.props.visitorTypeName,
                                visitor: currentVisitor,
                                hostApproval: this.props.hostApproval,
                                hostMessage: this.props.hostMessage,
                                hostVideoUrl: this.props.currentHostInfo.HostVideo,
                                hostName: this.props.hostName,
                                email: this.props.email,
                                date: this.props.date,
                                currentHostInfo: this.props.currentHostInfo,
                                cameraEnable: this.props.cameraEnable,
                                email: this.props.email,
                                phone: this.props.phone,
                                userInfo: this.props.userInfo,
                                id: this.props.id,
                                hasVisitorPhoto: this.state.hasVisitorPhoto,
                                visitorPhoto: this.state.visitorPhoto,
                                currentVisitor: this.state.currentVisitor
                            })
                        }}
                        style={{ backgroundColor: '#5CB400', justifyContent: 'center', alignItems: 'center', width: deviceWidth * 0.13, borderRadius: deviceWidth * 0.13, height: deviceWidth * 0.13, marginTop: deviceWidth * 0.005 }}>
                        <Image style={{ width: '50%', height: '50%' }} resizeMode='contain' source={require('../../../assets/Qr-icon.png')} />
                    </TouchableOpacity>



                </View>

                <View style={[{
                    position: "absolute",
                    zIndex: 0,
                    width: deviceWidth,
                    height: deviceHeight * 0.11,
                    flexDirection: 'row'
                }, { bottom: this.state.keyboardHeight > 0 && Platform.OS === "ios" ? this.state.keyboardHeight : deviceWidth * 0.07, zIndex: 1, }]}>
                    <View style={style.leftButtonContainer}>
                        <NavigationButton
                            // opacityControl={this.state.leftOpacity}
                            image={require('../../../../assets/leftArrow.png')}
                            onPress={() => { Actions.pop() }}
                        />
                    </View>
                    <View style={{ flex: 0.76, marginHorizontal: deviceWidth * 0.01 }}>
                    </View>
                </View>

                {this._renderActivityIndicator()}


                <Footer />
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    const { newGuestName, guestInfo } = state.guest_info
    const { selectedLanguage, languageJson } = state.language
    const { bearerToken } = state.token

    return {
        guestInfo, newGuestName, selectedLanguage, languageJson, bearerToken
    }
};

export default connect(mapStateToProps, {})(HesMainPage);
