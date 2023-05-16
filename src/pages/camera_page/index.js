import React, { Component } from 'react'
import { Image, View, TouchableOpacity, Text, Platform } from 'react-native'
import { RNCamera } from 'react-native-camera';
import Header from '../../components/header'
import NavigationButton from '../../components/navigation_button'
import { Actions } from 'react-native-router-flux'
import { style } from './style'
import { connect } from 'react-redux'
import { createConnection, startAndConnectMethod } from '../../utils/signalR_connection'
import { fetchAddUpdateGuest } from '../../actions'
import { checkNetConnection, getOfflineVisitor, saveOfflineVisitor, getSetOfflineVisitors } from '../../utils'
import HTMLView from 'react-native-htmlview';
import HTML from 'react-native-render-html'
import { timeoutSecond } from '../../constants';
const Dimensions = require("Dimensions")

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

let checkControl = false

class CameraPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      type: 'front',
      path: null,
      renderCamera: true,
      count: false,
      timer: null,
      jsonD: this.props.jsonData,
      selectedLanguageData: props.selectedLanguage === "EN" ? props.languageJson.EN : props.languageJson.TR,
      isCountdown: false,
      hostApproval: this.props.currentHostInfo.hostApp,
      hostMessage: this.props.currentHostInfo.hostMessage,
      hostVideoUrl: this.props.currentHostInfo.hostVideoUrl,
      hostName: this.props.currentHostInfo.hostName,
      hubConnection: null,
      photo: null,
      isHeaderLogo: this.props.jsonData.Settings.LocationAccountSetting.LogoPath,
      isHeaderText: this.props.jsonData.Settings.CustomerInfo.Name,
      opacityControl: true,
      hostNotification: this.props.hostNotification,
      hasVisitorPhoto : props.hasVisitorPhoto,
      visitorPhoto : props.visitorPhoto

    }
  }

  static onEnter = () => {
    checkControl = false
    // setTimeout(() => {
    //   if (!checkControl) {
    //     checkControl = true
    //     Actions.loadingPage()
    //   }
    // }, timeoutSecond);
  }

  static onExit = () => {
    checkControl = true
  }


  componentDidMount() {
    startAndConnectMethod(this.state.hubConnection, this.props.visitor.LocationId)
    debugger
    console.log(this.state.hasVisitorPhoto,'var mı')
    console.log(this.state.visitorPhoto,'vasrsa bu')

  }

  componentWillMount() {
    this.setState({
      hubConnection: createConnection()
    })
  }

  takePicture2 = async function () {

    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      let data = await this.camera.takePictureAsync(options);
      data.deviceOrientation = 0
      data.pictureOrientation = 0
      this.setState({ path: data.uri, photo: data.base64 })
      this.setState({ opacityControl: false })
    }
  }

  takePicture() {
    this.setState({ timer: 3, opacityControl: true })

    this.setState({ isCountdown: true })

    this.interval = setInterval(
      () => this.setState(() => ({ timer: this.state.timer - 1 })),
      1000
    );

    this.setTİmeout = setTimeout(
      () => this.takePicture2(), 3500
    )

    this.setState({ renderCamera: !this.state.renderCamera, count: !this.state.count })

  };

  componentDidUpdate() {
    if (this.state.timer === -1) {
      clearInterval(this.interval);

    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async lastPage() {
    let isConnected = await checkNetConnection()
    let currentVisitor = this.props.visitor
    currentVisitor.VisitorPhoto = this.state.photo
    checkControl = true
    if (isConnected) {
      this.pushOfflineVisitorsToApi()
      let JSONdata = JSON.stringify(currentVisitor);
      console.log('CAMERAVISITOR', JSONdata)
      this.props.fetchAddUpdateGuest(JSONdata, this.props.bearerToken)
    } else {
      getSetOfflineVisitors(currentVisitor)
    }
    Actions.lastPage({
      hostNotification: this.props.hostNotification,
      currentVisitorPrivateMessage: this.props.visitor.FinalScreenHostPrivateMessage,
      hostApproval: this.props.currentHostInfo.HostApproval,
      hostMessage: this.props.currentHostInfo.HostMessage,
      hostVideoUrl: this.props.currentHostInfo.HostVideo,
      hostName: this.props.currentHostInfo.hostName,
      visitor: this.props.visitor

    })
  }

  leftLastPage = () => {
    checkControl = true
    Actions.lastPage({
      hostNotification: this.props.hostNotification,
      currentVisitorPrivateMessage: this.props.visitor.FinalScreenHostPrivateMessage,
      hostApproval: this.props.currentHostInfo.HostApproval,
      hostMessage: this.props.currentHostInfo.HostMessage,
      hostVideoUrl: this.props.currentHostInfo.HostVideo,
      hostName: this.props.currentHostInfo.hostName,
      control: true,
      visitor: this.props.visitor
    })

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

  renderCamera() {
    return (
      <RNCamera
        fixOrientation={true}
        forceUpOrientation
        ref={ref => {
          this.camera = ref;
        }}
        style={{ flex: 1, backgroundColor: 'red' }}
        type={this.state.type}
      ></RNCamera>
    )
  }

  renderImage() {
    return (
      <Image style={{ height: deviceHeight * 0.58, width: deviceHeight * 0.58, borderRadius: deviceHeight * 0.6 / 2, overflow: "hidden" }} source={{ uri: this.state.path }}></Image>
    )
  }


  renderCountDown() {
    if (this.state.jsonD.Settings.LocationAccountSetting.EnablePhotoOpenConsent) {
      if (this.state.timer > 0)
        return (
          <View style={{ position: "absolute", bottom: deviceHeight * 0.1, right: 0, left: 0, marginRight: 'auto', marginRight: 'auto', justifyContent: "center", alignItems: "center", top: deviceWidth * 0.5 }}>
            <Text style={{ color: 'white', fontSize: deviceWidth * 0.4, fontFamily: "Nexa-Regular", textAlign: "center" }}>{this.state.timer}</Text>
          </View>
        )
      else if (this.state.timer === 0) {
        return (
          <View style={{ position: "absolute", bottom: deviceHeight * 0.35, justifyContent: "center", alignItems: "center", right: 0, left: 0, marginRight: 'auto', marginRight: 'auto' }}>
            <Text style={{ color: 'white', fontSize: deviceWidth * 0.15, fontFamily: "Nexa-Regular", textAlign: "center", marginTop: Platform.OS === "ios" ? deviceWidth * 0.013 : 0 }}>{this.state.selectedLanguageData.smile}</Text>
          </View>
        )

      }
    } else {
      if (this.state.timer > 0)
        return (
          <View style={{ position: "absolute", bottom: deviceHeight * 0.4, right: 0, left: 0, marginRight: 'auto', marginRight: 'auto', justifyContent: "center", alignItems: "center", top: deviceWidth * 0.5 }}>
            <Text style={{ color: 'white', fontSize: deviceWidth * 0.4, fontFamily: "Nexa-Regular", textAlign: "center" }}>{this.state.timer}</Text>
          </View>
        )
      else if (this.state.timer === 0) {
        return (
          <View style={{ position: "absolute", bottom: deviceHeight * 0.4, justifyContent: "center", alignItems: "center", right: 0, left: 0, marginRight: 'auto', marginRight: 'auto' }}>
            <Text style={{ color: 'white', fontSize: deviceWidth * 0.15, fontFamily: "Nexa-Regular", textAlign: "center", marginTop: Platform.OS === "ios" ? deviceWidth * 0.013 : 0 }}>{this.state.selectedLanguageData.smile}</Text>
          </View>
        )

      }
    }

  }


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white", }}>
        <View style={{ height: deviceHeight * 0.1, justifyContent: "flex-start", backgroundColor: 'blue' }}>

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
        {
          this.state.timer == -1 ?
            this.state.jsonD.Settings.LocationAccountSetting.EnablePhotoOpenConsent ?
              <View style={
                Platform.OS === "ios" ?
                  style.renderImageContainer1 :
                  [style.renderImageContainer1, { transform: [{ rotate: '270deg' }] }]}>
                <View style={{ height: deviceHeight * 0.12, width: deviceWidth, alignItems: 'center', justifyContent: 'center' }}>

                <HTML
                    html={this.state.jsonD.Settings.LocationAccountSetting.PhotoOpenConsentText}
                    baseFontStyle={{ fontSize: 19 }}
                    containerStyle={{
                      marginHorizontal: deviceWidth * 0.05,
                    }}
                  /> 

                </View>


                {this.renderImage()}
              </View> :

              <View style={
                Platform.OS === "ios" ?
                  style.renderImageContainer :
                  [style.renderImageContainer, { transform: [{ rotate: '270deg' }] }]}>
                {this.renderImage()}
              </View>

            :
            <View style={{ height: deviceHeight * 0.79, paddingHorizontal: deviceWidth * 0.5, paddingVertical: deviceHeight * 0.3, justifyContent: "center", alignItems: "center" }}>

              {this.state.jsonD.Settings.LocationAccountSetting.EnablePhotoOpenConsent ?

                <View style={{ height: deviceHeight * 0.12, width: deviceWidth, alignItems: 'center', justifyContent: 'center' }}>
                  <HTML
                    html={this.state.jsonD.Settings.LocationAccountSetting.PhotoOpenConsentText}
                    baseFontStyle={{ fontSize: 19 }}
                    containerStyle={{

                      marginHorizontal: deviceWidth * 0.05,


                    }}
                  />

                </View> : null}



              <View style={{ height: deviceHeight * 0.58, width: deviceHeight * 0.57, borderRadius: deviceHeight * 0.6 / 2, overflow: "hidden", backgroundColor: 'red' }}>
                {this.renderCamera()}
              </View>
            </View>
        }

        {this.state.isCountdown ?
          this.renderCountDown() : null
        }


        <View style={style.navigationButtonsContainer}>
          <View style={style.leftButtonContainer}>



            <NavigationButton
              image={require('../../../assets/leftArrow.png')}
              onPress={() => {
                checkControl = true
                Actions.pop()
              }}
            />



          </View>
          <View style={{
            paddingBottom: deviceWidth * 0.04, flexDirection: 'row',
            paddingTop: deviceWidth * 0.04, alignItems: "center", justifyContent: "center", flex: 0.76,
          }}>

            {this.state.jsonD.Settings.LocationAccountSetting.EnablePhotoOpenConsent ?
              <TouchableOpacity style={{ textAlign: 'center', marginRight: 10, borderRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: this.state.jsonD.Settings.LocationAccountSetting.AccentColor, width: deviceWidth * 0.15, height: deviceHeight * 0.08 }} onPress={() => Actions.policypage({finalMessage: this.props.jsonData.Settings.LocationAccountSetting.FinalScreenMessage} )}>
                <Text style={{ color: 'white', fontSize: deviceWidth * 0.02, fontFamily: "Nexa-Heavy", marginTop: Platform.OS === "ios" ? deviceWidth * 0.025 : 0 }}>{this.state.selectedLanguageData.noThanks}</Text>
              </TouchableOpacity> : null
            }

            {this.state.jsonD.Settings.LocationAccountSetting.EnablePhotoOpenConsent ?
              <TouchableOpacity style={{ marginLeft: 10, borderRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: this.state.jsonD.Settings.LocationAccountSetting.AccentColor, width: deviceWidth * 0.15, height: deviceHeight * 0.08 }} onPress={this.takePicture.bind(this)}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: deviceWidth * 0.02, fontFamily: "Nexa-Heavy", marginTop: Platform.OS === "ios" ? deviceWidth * 0.025 : 0 }}>{this.state.selectedLanguageData.takePhotoAllow}</Text>
              </TouchableOpacity> : <TouchableOpacity style={{ borderRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: this.state.jsonD.Settings.LocationAccountSetting.AccentColor, width: deviceWidth * 0.4, height: deviceHeight * 0.08 }} onPress={this.takePicture.bind(this)}>
                <Text style={{ color: 'white', fontSize: deviceWidth * 0.05, fontFamily: "Nexa-Heavy", marginTop: Platform.OS === "ios" ? deviceWidth * 0.025 : 0 }}>{this.state.selectedLanguageData.takePhoto}</Text>
              </TouchableOpacity>
            }


          </View>

          <View style={style.rightButtonContainer}>
            <NavigationButton
              image={require('../../../assets/rightArrow.png')}
              opacityControl={this.state.opacityControl}
              onPress={() => this.lastPage()}
            />
          </View>
        </View>

      </View>




    )
  }
}

const mapStateToProps = (state) => {
  const { jsonData } = state.json_code
  const { bearerToken } = state.token
  const { selectedLanguage, languageJson } = state.language
  return {
    jsonData, selectedLanguage, languageJson, bearerToken
  }
};
function bindAction(dispatch) {
  return {
    fetchAddUpdateGuest: (data, bearerToken) => dispatch(fetchAddUpdateGuest(data, bearerToken)),
  };
}


export default connect(mapStateToProps, bindAction)(CameraPage)
