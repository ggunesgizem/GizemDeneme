import React, { Component } from 'react'
import { Image, Text, View, Dimensions, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Header from '../../components/header'
import NavigationButton from '../../components/navigation_button'
import { style } from './style'
import { Actions } from 'react-native-router-flux'
import YouTube from 'react-native-youtube'
import { setSignalrInfo, setCurrentPage } from '../../actions'
import HTML from 'react-native-render-html'
import { connect } from 'react-redux'
import InfoModal from '../../components/info_modal_design'
import Footer from '../../components/footer'
import Modal from 'react-native-modal'

const Entities = require('html-entities').XmlEntities;

const entities = new Entities();
let checkControl = false

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

class LastPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hostApp: this.props.hostApproval,
            hostMessage: this.props.hostMessage,
            hostVideoUrl: this.props.hostVideoUrl,
            hostName: this.props.hostName,
            videoId: "",
            isHeaderLogo: this.props.jsonData.Settings.LocationAccountSetting.LogoPath,
            isHeaderText: this.props.jsonData.Settings.CustomerInfo.Name,
            selectedLanguageData: props.selectedLanguage === "EN" ? props.languageJson.EN : props.languageJson.TR,
            controlStatus: true,
            hostPrivateMessage: this.props.currentVisitorPrivateMessage,
            hostNotification: this.props.hostNotification,
            dummy: false,
            visitor: this.props.visitor,
            visibleMessage: false

        }
    }



    renderHostMessage() {

        let decodedMessage = entities.decode(this.state.hostMessage)
        return entities.decode(decodedMessage)

    }

    componentDidMount() {
        checkControl = false
        if (this.state.hostVideoUrl !== null) {
            var videoUrl = this.state.hostVideoUrl
            var videoId = videoUrl.replace("https://www.youtube.com/embed/", "")
            this.setState({ videoId: videoId })
        }

        if (this.state.controlStatus) {
            if (this.props.hostMessage === null && this.props.hostVideoUrl === null) {
                this.setState({ controlStatus: false })
                setTimeout(() => {
                    if (!checkControl) {
                        checkControl = true
                        Actions.loadingPage()
                    }
                }, 8000)
            } else if (this.props.hostVideoUrl !== null) {
                null
            } else {
                this.setState({ controlStatus: false })
                setTimeout(() => {
                    if (!checkControl) {
                        checkControl = true
                        Actions.loadingPage()
                    }
                }, 20000)
            }
        }

    }

    exit = () => {
        checkControl = true
        this.props.setCurrentPage("homePage")
        if (this.props.signalrInfo) {
            Actions.loadingPage()
        } else {
            Actions.loadingPage()
        }
    }

    renderHostName = () => {
        if (this.state.hostName !== "" && this.state.hostName !== null && this.state.hostName !== undefined) {
            return this.state.hostName
        } else {
            return "Host"
        }
    }

    render() {
        console.log('dataaaa:', this.state.hostPrivateMessage)
        return (
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
                <Modal
                    isVisible={this.state.visibleMessage}

                    onBackdropPress={() => this.setState({ visibleMessage: false })}
                    backdropColor="transparent"
                    backdropTransitionOutTiming={0}
                    style={{ margin: 0 }}
                    backdropOpacity={0}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                >
                    <TouchableOpacity activeOpacity={1} onPress={() => this.setState({ visibleMessage: false })} style={{ backgroundColor: 'rgba(86,87,110,0.62)', flex: 1, justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }}>
                        <InfoModal
                            icon={require('../../assets/message.png')}
                            cancelable={true}
                            description={this.state.hostPrivateMessage !== null && this.state.hostPrivateMessage !== undefined ? this.state.hostPrivateMessage : ""}
                            title={this.renderHostName()}
                            onCancel={() => { this.setState({ visibleMessage: false }) }}
                            cancelIcon={require('../../assets/cancel2.png')}
                        />
                    </TouchableOpacity>
                </Modal>
                <View style={{ marginTop: deviceWidth * 0.14 }}>
                    <InfoModal
                        cancelable={false}
                        icon={require('../../assets/wait.png')}
                        description={this.state.hostNotification ? this.state.selectedLanguageData.hostNotApproved : this.state.selectedLanguageData.hostApproved}
                        title={this.props.selectedLanguage === "EN" ? "Welcome " + this.state.visitor.FullName : "Hoşgeldin " + this.state.visitor.FullName}
                        forLastPage={true}
                        hostMessagePress={() => { this.setState({ visibleMessage: true }) }}
                        hostMessage={this.state.hostPrivateMessage !== undefined && this.state.hostPrivateMessage !== null && this.state.hostPrivateMessage !== "" ?
                            `${this.state.hostName !== "" && this.state.hostName !== null && this.state.hostName !== undefined ? this.state.hostName : "Host"} ${this.props.selectedLanguage === "EN" ? "left you a message, tap to view." : "sana bir mesaj bıraktı, görüntülemek için dokun."} `
                            :
                            ""
                        }
                    />
                </View>
                {this.state.hostMessage !== null && this.state.hostMessage !== undefined ?

                    <View style={style.hostMessageContainer}>
                        <ScrollView
                            bounces={false}
                            contentContainerStyle={style.hostMessageScrollContentContainer}
                            style={{flex: 1}}>
                            <HTML
                                html={this.renderHostMessage()}
                                containerStyle={{
                                    justifyContent: "center", alignItems: "center", fontFamily: "Nexa-Regular",
                                    fontSize: deviceWidth * 0.03, paddingHorizontal: deviceWidth * 0.05
                                }}
                                baseFontStyle={{ fontSize: deviceWidth * 0.027, fontFamily: "Nexa", }}
                            />
                        </ScrollView>
                    </View> : null
                }
                {this.state.hostVideoUrl ?
                    <View style={{ width: deviceWidth * 0.88, height: deviceWidth * 0.4, marginTop: deviceWidth * 0.03 }}>
                        <YouTube
                            apiKey="YOUR_API_KEY"
                            videoId={this.state.videoId}
                            play={true}
                            resumePlayAndroid={false}
                            loop={false}
                            style={{ alignSelf: 'stretch', flex: 1 }}
                        />
                    </View> : null
                }
                <View style={style.navigationButtonsContainer}>

                    <View style={style.rightButtonContainer}>
                        <NavigationButton
                            image={require('../../../assets/rightArrow.png')}
                            onPress={this.exit}
                        />
                    </View>
                </View>


                <Footer />
            </View>
            // <View style={style.container}>

            //     <View style={style.headerContainer}>
            //         {this.state.isHeaderLogo ?
            //             <Header
            //                 logo={true}
            //                 img={this.state.isHeaderLogo}></Header>
            //             :
            //             <Header
            //                 logo={false}
            //                 text={this.state.isHeaderText}></Header>
            //         }
            //     </View>
            //     <View style={
            //         this.state.hostNotification ?
            //             [style.lastScreenContainer, { backgroundColor: "#FFE2DC" }, { flex: 1 }] :
            //             [style.lastScreenContainer, { backgroundColor: '#D5F5E0' }, { flex: 1 }]
            //     }>

            //         <View style={style.imageContainer}>

            //             {this.props.control?
            //                 <Image style={style.imageStyle} source={require('../../assets/approveIllustration.png')}></Image> :
            //             this.state.hostNotification ?
            //                 <Image style={style.imageStyle} source={require('../../assets/approveIllustration.png')}></Image>
            //                 :
            //                 <Image style={style.imageStyle} source={require('../../assets/successIllustration.png')}></Image>
            //             }

            //         </View>

            //         <View style={[style.textContainer, { padding: deviceWidth * 0.04 }]}>
            //             {this.props.control ?          
            //              <Text style={style.textStyle}>
            //                 {this.state.selectedLanguageData.hostNotApproved}
            //             </Text> :
            //                 this.state.hostNotification ?
            //                     <Text style={style.textStyle}>
            //                         {this.state.selectedLanguageData.hostNotApproved}
            //                     </Text>
            //                     :
            //                     <Text style={style.textStyle}>
            //                         {this.state.selectedLanguageData.hostApproved}
            //                     </Text>
            //             }

            //         </View>

            //     </View>

            //     <View style={style.emptyContainer}>
            //         <View style={style.hostContainer}>
            //             <Text style={{ fontFamily: "Nexa-Regular", marginTop: Platform.OS === "ios" ? deviceWidth * 0.013 : 0 }}>
            //                 {this.state.hostPrivateMessage}
            //             </Text>
            //         </View>
            //         <View style={style.messageContainer}>

            //             {this.state.hostMessage !== null && this.state.hostMessage !== undefined ?
            //                 <HTML
            //                     html={this.renderHostMessage()}
            //                     containerStyle={{
            //                         justifyContent: "center", alignItems: "center", fontFamily: "Nexa-Regular",
            //                         fontSize: deviceWidth * 0.03
            //                     }}
            //                 />
            //                 :
            //                 <Text style={{
            //                     paddingHorizontal: deviceWidth * 0.06, paddingVertical: deviceWidth * 0.04,
            //                     justifyContent: "center", alignItems: "center", fontFamily: "Nexa-Regular",
            //                     fontSize: deviceWidth * 0.03
            //                 }}>
            //                 </Text>

            //             }
            //             {this.state.dummy === false ? this.setState({ dummy: true }) :
            //                 null}
            //         </View>


            //         {this.state.hostVideoUrl ?
            //             <View style={style.videoContainer}>
            //                 <YouTube
            //                     apiKey="YOUR_API_KEY"
            //                     videoId={this.state.videoId}
            //                     play={true}
            //                     resumePlayAndroid={false}
            //                     loop={false}
            //                     style={{ alignSelf: 'stretch', flex: 1 }}
            //                 />
            //             </View> : null
            //         }

            //     </View>

            //     <View style={style.navigationButtonsContainer}>

            //         <View style={style.rightButtonContainer}>
            //             <NavigationButton
            //                 image={require('../../../assets/rightArrow.png')}
            //                 onPress={this.exit}
            //             />
            //         </View>
            //     </View>
            // </View>
        )
    }
}


const mapStateToProps = (state) => {
    const { jsonData } = state.json_code
    const { signalrInfo } = state.page
    const { languageJson, selectedLanguage } = state.language

    return {
        jsonData, signalrInfo, languageJson, selectedLanguage
    }
};

function bindAction(dispatch) {
    return {
        setSignalrInfo: (data) => dispatch(setSignalrInfo(data)),
        setCurrentPage: (data) => dispatch(setCurrentPage(data))
    }
}

export default connect(mapStateToProps, bindAction)(LastPage);
