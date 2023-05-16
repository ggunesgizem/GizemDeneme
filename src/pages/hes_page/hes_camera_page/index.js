import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import HESHeader from '../../../components/HES_header'
import Footer from '../../../components/footer'
import NavigationButton from '../../../components/navigation_button'
import { Actions } from 'react-native-router-flux'
import { style } from './style'
import { deviceWidth, deviceHeight, HEScolor, URL } from '../../../constants'
import Modal from 'react-native-modal'
import HESResult from '../../../components/HES_result'
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux'
import { Bubbles } from 'react-native-loader'
import { HesCheck } from '../../../constants/APIs'

let goingBack = null
class HesCameraPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resultModalVisible: false,
            result: 0,
            currentVisitor: props.currentVisitor,
            showIndicator: false,
            fullName: "",
            TCKN: "",
            resultId: 0,
            shouldReadQr: true
        }
    }

    onQrRead(e) {
        this.setState({ shouldReadQr: false })
        let HESCode = e.data.split('|')[1]
        this.examineHes(HESCode.toUpperCase())

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

    nextPage() {
        if (goingBack !== null) {
            clearTimeout(goingBack)
        }
        this.setState({
            result: 0,
            fullName: "",
            TCKN: "",
            resultId: 0,
            shouldReadQr: true
        })
        Actions.phoneAndEmailPage({
            hostNotification: this.props.hostNotification,
            isSignRequired: this.props.isSignRequired,
            visitorTypeId: this.props.visitorTypeId,
            visitorTypeName: this.props.visitorTypeName,
            visitor: this.props.visitor,
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
            visitorPhoto: this.state.visitorPhoto

        })
    }

    componentWillUnmount() {
        this.setState({ shouldReadQr: true })
    }

    examineHes(HESCode) {
        this.setState({ showIndicator: true }, () => {
            // let HESCode = "E4N42833S0"
            // let HESCode = "L9X63948S4"
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
                console.log('RESPONSEJSON', responseJson)
                if (responseJson !== undefined && responseJson !== null && responseJson.data !== undefined && responseJson.data !== null) {
                    const HESResult = {
                        resultId: responseJson.data.health_status,
                        TCKN: responseJson.data.masked_identity_number,
                        fullName: responseJson.data.masked_firstname + " " + responseJson.data.masked_lastname
                    }

                    this.setState({ showIndicator: false, fullName: HESResult.fullName, TCKN: HESResult.TCKN, resultId: HESResult.resultId }, () => {
                        if (HESResult.resultId !== 0) {
                            this.setState({ resultModalVisible: true }, () => {
                                if (this.state.resultId === 1) {
                                    goingBack = setTimeout(() => {
                                        this.setState({ resultModalVisible: false }, () => this.nextPage())
                                    }, 1000);
                                } else {
                                    goingBack = setTimeout(() => {
                                        Actions.loadingPage()
                                    }, 5000);
                                }
                            })
                        } else {
                            this.setState({ showIndicator: false, shouldReadQr: true })
                        }
                    })
                } else {
                    this.setState({ showIndicator: false, shouldReadQr: true })
                }
            })).catch((error) => {
                this.setState({ showIndicator: false, shouldReadQr: true })
                console.log(error)
            })

        })

    }

    render() {
        console.log(this.state.resultId)
        const { shouldReadQr } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                <HESHeader />
                <RNCamera
                    style={{ width: deviceWidth, height: deviceHeight, position: 'absolute', zIndex: -1 }}
                    onBarCodeRead={(e) => {
                        shouldReadQr ? this.onQrRead(e) : null
                    }}
                    type={RNCamera.Constants.Type.front}
                    barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                // googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE}
                />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


                    <View style={{ width: deviceWidth * 0.7, height: deviceWidth * 0.7, justifyContent: 'center', alignItems: 'center', marginBottom: deviceWidth * 0.1 }}>
                        <Image source={require('../../../assets/HESborder.png')} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
                    </View>

                    <View style={[{
                        position: "absolute",
                        zIndex: 1,
                        width: deviceWidth,
                        height: deviceHeight * 0.11,
                        flexDirection: 'row', bottom: deviceWidth * 0.025, zIndex: 1,
                    }]}>
                        <View style={style.leftButtonContainer}>
                            <NavigationButton
                                // opacityControl={this.state.leftOpacity}
                                image={require('../../../../assets/leftArrow.png')}
                                onPress={() => { Actions.pop() }}
                            />
                        </View>
                        <View style={{ flex: 0.76, marginHorizontal: deviceWidth * 0.01 }}>

                        </View>
                        {
                            this.state.resultId === 1 ?
                                <View style={style.rightButtonContainer}>
                                    <NavigationButton
                                        image={require('../../../../assets/rightArrow.png')}
                                        // opacityControl={this.state.opacityControl}
                                        onPress={() => { this.nextPage() }}
                                    />
                                </View> : null
                        }
                    </View>

                    <Modal
                        isVisible={this.state.resultModalVisible}
                        backdropColor="transparent"
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        backdropTransitionOutTiming={0}
                        backdropOpacity={0}
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        onBackdropPress={() => { this.setState({ resultModalVisible: false }) }}>
                        <HESResult
                            fullName={this.state.fullName}
                            TCKN={this.state.TCKN}
                            result={this.state.resultId}
                            forModal={true} />
                    </Modal>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: deviceWidth, height: deviceWidth * 0.2, backgroundColor: 'white', bottom: 0, position: 'absolute' }}>
                        <View style={{ paddingHorizontal: deviceWidth * 0.2, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: deviceWidth * 0.03, textAlign: 'center', fontFamily: 'Nexa' }}>Ekranınızdaki görüntü netleşene kadar, karekodu çerçeve içerisinde tutun.</Text>
                        </View>
                    </View>

                    {this._renderActivityIndicator()}

                    <Footer />
                </View>
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

export default connect(mapStateToProps, {})(HesCameraPage);
