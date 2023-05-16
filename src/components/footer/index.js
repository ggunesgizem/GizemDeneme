import React, { Component } from 'react'
import { View, Text, Dimensions, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { getPairCode } from '../../utils';
import DeviceInfo from 'react-native-device-info'
import InfoModal from '../info_modal_design'
import NetInfo from "@react-native-community/netinfo"
const deviceWidth = Dimensions.get('window').width
class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            infoModalVisible: false,
            pairCode: null,
            offlineModalVisible: !props.netInfo,
            deviceIp: null,
            selectedLanguageData: props.languageJson !== null ? props.selectedLanguage === "EN" ? props.languageJson.EN : props.languageJson.TR : null,
        }
    }

    async componentDidMount() {
        currentPairData = await getPairCode()
        NetInfo.fetch("wifi").then(state => {
            this.setState({ deviceIp: state.details.ipAddress })

        });
        if (!this.state.pairCode) {
            this.setState({ pairCode: currentPairData })
        }
    }

    componentWillReceiveProps(props) {

        if (props.languageJson !== null) {
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
        }

        if (!props.netInfo !== this.state.offlineModalVisible) {
            this.setState({ offlineModalVisible: !props.netInfo })
        }
    }

    render() {
        if (this.props.homepage === undefined || this.props.homepage === null) {
            return (
                <View style={{ zIndex: -1, position: 'absolute', bottom: 0, width: deviceWidth, height: deviceWidth * 0.09, justifyContent: 'center', alignItems: 'center' }}>
                    <View
                        style={{ width: deviceWidth * 0.18 }}>
                        <Image
                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                            source={require('../../assets/footer.png')}
                        />
                    </View>
                </View >
            )
        } else {
            return (
                <View style={{ width: deviceWidth, backgroundColor: '#212529', height: deviceWidth * 0.09, flexDirection: 'row' }}>
                    <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: deviceWidth * 0.045 }}>
                            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={this.props.netInfo === true ? require('../../assets/online.png') : require('../../assets/offline.png')} />
                        </View>
                        <View style={{ marginLeft: -deviceWidth * 0.011, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[{ fontSize: deviceWidth * 0.016, fontWeight: 'bold' }, this.props.netInfo === true ? { color: '#3fee7c' } : { color: '#ee3f4f' }]}>
                                {this.props.netInfo === true && this.props.languageJson !== null ?
                                    this.state.selectedLanguageData.online : this.state.selectedLanguageData.offline}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: deviceWidth * 0.18, flex: 1 }}>
                            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../../assets/noqnoqWhiteLogo.png')} />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => { this.setState({ infoModalVisible: true }) }} style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: deviceWidth * 0.017, height: deviceWidth * 0.017 }}>
                            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../../assets/homeInfo.png')} />
                        </View>
                        <View style={{ marginLeft: deviceWidth * 0.002, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#FFFFFF', fontSize: deviceWidth * 0.016, fontWeight: 'bold' }}>
                                {this.props.languageJson !== null ? this.state.selectedLanguageData.info : null}
                            </Text>
                        </View>
                    </TouchableOpacity>





                    <Modal backdropColor="transparent" backdropTransitionOutTiming={0} onBackdropPress={() => { this.setState({ infoModalVisible: false }) }} isVisible={this.state.infoModalVisible}>

                        <View style={{ paddingHorizontal: deviceWidth * 0.01, width: deviceWidth * 0.165, paddingTop: deviceWidth * 0.007, height: deviceWidth * 0.13, borderRadius: deviceWidth * 0.01, backgroundColor: '#ffffff', position: 'absolute', bottom: deviceWidth * 0.05, right: -deviceWidth * 0.02 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: deviceWidth * 0.01 }}>
                                <View style={{ width: deviceWidth * 0.025, height: deviceWidth * 0.025 }}>
                                    <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../../assets/tag.png')} />
                                </View>
                                <View style={{ marginLeft: deviceWidth * 0.01 }}>
                                    <Text style={{ fontSize: deviceWidth * 0.016, fontWeight: '600' }}>{!this.state.pairCode ? "Bilinmiyor" : this.state.pairCode}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: deviceWidth * 0.01 }}>
                                <View style={{ width: deviceWidth * 0.025, height: deviceWidth * 0.025 }}>
                                    <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../../assets/share.png')} />
                                </View>
                                <View style={{ marginLeft: deviceWidth * 0.01 }}>
                                    <Text style={{ fontSize: deviceWidth * 0.016, fontWeight: '600' }}>
                                        {
                                            "v." + DeviceInfo.getVersion()
                                        }
                                    </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: deviceWidth * 0.01 }}>
                                <View style={{ width: deviceWidth * 0.025, height: deviceWidth * 0.025 }}>
                                    <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../../assets/link.png')} />
                                </View>
                                <View style={{ marginLeft: deviceWidth * 0.01 }}>
                                    <Text style={{ fontSize: deviceWidth * 0.016, fontWeight: '600' }}>
                                        {
                                            this.state.deviceIp
                                        }
                                    </Text>
                                </View>
                            </View>
                        </View>

                    </Modal>
                </View>
            )
        }
    }
}

const mapStateToProps = (state) => {
    const { languageJson, selectedLanguage } = state.language
    const { signalrInfo } = state.page
    const { netInfo } = state.netInfo
    const { createIpadData } = state.createIpad


    return {
        languageJson, selectedLanguage, signalrInfo, netInfo, createIpadData
    };
}

function bindAction(dispatch) {
    return {

    };
}


export default connect(mapStateToProps, bindAction)(Footer)