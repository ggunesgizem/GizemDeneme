import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform, Dimensions } from 'react-native';
import Header from '../../components/header'
import { style } from './style'
import NavigationButton from '../../components/navigation_button'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { fetchAddUpdateGuest } from '../../actions'
import SignatureCapture from '../../../lib/react-native-signature-capture'
import { createConnection, startAndConnectMethod } from '../../utils/signalR_connection'
import { checkNetConnection, getOfflineVisitor, saveOfflineVisitor, getSetOfflineVisitors } from '../../utils'
import { validate } from 'validate.js'
import HTML from 'react-native-render-html'
import Footer from '../../components/footer'
import { timeoutSecond } from '../../constants';

const Entities = require('html-entities').XmlEntities;

const entities = new Entities();

let textData = ""
let checkControl = false
const deviceWidth = require('Dimensions').get('window').width
const deviceHeight = require('Dimensions').get('window').height

const companyTag = "{##$_COMPANY_$##}"
const dateTag = "{##$_DATE_$##}"
const locationTag = "{##$_LOCATIONNAME_$##}"
const purposeTag = "{##$_PURPOSEOFVISIT_$##}"
const emailTag = "{##$_EMAIL_$##}"
const hostTag = "{##$_HOST_$##}"

class LegalTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitorTypeId: props.visitorTypeId,
      legalText: [],
      visitorType: props.visitorTypeName,
      email: props.email,
      hostName: props.hostName,
      date: props.date,
      companyName: props.jsonData.Settings.CustomerInfo.Name,
      companyLocation: props.jsonData.Settings.LocationAccountSetting.Name,
      isSignRequired: !props.isSignRequired,
      didSignCreate: props.isSignRequired,
      renderAfterSignature: false,
      didVisitorSignature: false,
      selectedLanguageData: props.selectedLanguage === "EN" ? props.languageJson.EN : props.languageJson.TR,
      hubConnection: null,
      isHeaderLogo: this.props.jsonData.Settings.LocationAccountSetting.LogoPath,
      isHeaderText: this.props.jsonData.Settings.CustomerInfo.Name,
      changePageControl: false,
      hostNotification: this.props.hostNotification,
      userDrawSignatureArea: false,
      hasVisitorPhoto : props.hasVisitorPhoto,
      visitorPhoto : props.visitorPhoto

    };

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

  componentWillMount() {
    this.setState({
      hubConnection: createConnection()
    })
  }

  componentDidMount() {

    startAndConnectMethod(this.state.hubConnection, this.props.visitor.LocationId)

    if (!validate.isEmpty(this.props.jsonData.Settings.SignInFlowSettings)) {
      this.props.jsonData.Settings.SignInFlowSettings.map((visitorType) => {
        console.log('TYPEEE', this.state.visitorTypeId)
        visitorType.VisitorTypeId === this.state.visitorTypeId ?

          textData = visitorType.NdaText.replace("&amp;", "&")
          :
          null
      })
    }

    console.log("json: *** ", this.props.jsonData.Settings)
    this.renderSpecificText()
    this.setState({ legalText: entities.decode(textData) })
  }

  formatDate = (dateTime) => {
    var date = new Date(dateTime)
    var hour = date.getHours().toString();
    var second = date.getMinutes().toString().length === 1 ? "0" + date.getMinutes().toString() : date.getMinutes().toString();
    var newTime = hour + ":" + second;

    date.setMinutes(date.getMinutes() + (date.getTimezoneOffset()))

    var day = date.getDate().toString();
    var mount = (date.getMonth() + 1).toString();
    var year = date.getFullYear().toString();

    var newDay = (day.length === 1 ? "0" + day : day) + "." + (mount.length === 1 ? "0" + mount : mount) + "." + year;

    return newDay + " " + newTime;
  }

  renderSpecificText = () => {

    console.log("specificText: ", this.state.companyName, this.state.date, this.state.companyLocation, this.state.visitorType, this.state.hostName)
    if (textData.includes(companyTag)) {
      textData = textData.replace(companyTag, !validate.isEmpty(this.state.companyName) ? this.state.companyName + "\n" : "")
    }
    if (textData.includes(dateTag)) {
      textData = textData.replace(dateTag, !validate.isEmpty(this.state.date) ? this.formatDate(this.state.date) + "\n" : "")
    }
    if (textData.includes(locationTag)) {
      textData = textData.replace(locationTag, !validate.isEmpty(this.state.companyLocation) ? this.state.companyLocation + "\n" : "")
    }
    if (textData.includes(purposeTag)) {
      textData = textData.replace(purposeTag, !validate.isEmpty(this.state.visitorType) ? this.state.visitorType + "\n" : "")
    }
    if (textData.includes(emailTag)) {
      textData = textData.replace(emailTag, !validate.isEmpty(this.state.email) ? this.props.email + "\n" : "")
    }
    if (textData.includes(hostTag)) {
      textData = textData.replace(hostTag, !validate.isEmpty(this.state.hostName) ? this.state.hostName + "\n" : "")
    }
  }

  saveSign = () => {
    if (!this.state.changePageControl) {
      this.setState({
        changePageControl: true
      })

      if (!this.state.isSignRequired && !this.state.userDrawSignatureArea) {
        this.GoNextPage(this.props.visitor);
      } else {
        this.refs["sign"].saveImage();
      }
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

  async GoNextPage(currentVisitor) {

    let isConnected = await checkNetConnection()

    if (isConnected) {
      this.pushOfflineVisitorsToApi()
    }
    checkControl = true
    if (this.props.cameraEnable) {
      this.setState({
        changePageControl: false
      })
      console.log(currentVisitor)
      Actions.camera({
        hostNotification: this.props.hostNotification,
        visitor: currentVisitor,
        currentHostInfo: this.props.currentHostInfo,
        hasVisitorPhoto : this.state.hasVisitorPhoto,
        visitorPhoto : this.state.visitorPhoto
      })
    }
    else {
      if (isConnected) {
        let JSONdata = JSON.stringify(currentVisitor);
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
        visitor: currentVisitor,
      });
    }
  }

  _onSaveEvent = async (result) => {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    var currentVisitor = this.props.visitor

    if (this.state.didVisitorSignature) {
      currentVisitor.Signature = {
        Image: result.encoded,
        SignedText: textData
      }
    }
    this.refs["sign"].resetImage();
    this.GoNextPage(currentVisitor);
  }

  _onResetEvent=()=>{
    this.refs["sign"].resetImage();
  }

  _onDragEvent = () => {

    if (!this.state.didVisitorSignature) {
      this.setState({
        didVisitorSignature: true
      })
    }

    this.setState({
      userDrawSignatureArea: true
    })

    if (this.state.isSignRequired) {
      this.setState({
        didSignCreate: true
      })
    }
  }

  renderSignatureInfo = () => {
    var date = new Date()
    var dateFormat = date.getDay() + "." + date.getMonth() + "." + date.getFullYear()
    return (
      <View style={{ position: 'absolute', bottom: deviceWidth * 0.013, right: deviceWidth * 0.035, justifyContent: 'center', alignItems: 'flex-end' }}>
        
        
        {
          this.props.visitor.FullName !== null && this.props.visitor.FullName !== undefined ?
            <Text style={{ fontFamily: 'Nexa', fontSize: deviceWidth * 0.025 }}>
              {this.props.visitor.FullName}
            </Text> : null
        }
        <Text style={{ fontFamily: 'Nexa', fontSize: deviceWidth * 0.025 }}>{dateFormat}</Text>
        <Text onPress= {this._onResetEvent} style={{ fontFamily: 'Nexa', fontSize: deviceWidth * 0.025, color:'red' }}>{this.state.selectedLanguageData.clear}</Text>
      </View>
    )
  }

  render() {

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 0.1 }}>
          {/* {this.state.isHeaderLogo ?
            <Header
              logo={true}
              img={this.state.isHeaderLogo}
            ></Header> :
            <Header
              logo={false}
              text={this.state.isHeaderText}
            ></Header>

          } */}
        </View>
        <View style={style.contactText}>
          <Text style={{ color: '#313671', fontFamily: "Nexa-Regular", textAlign: "center", fontSize: 21, marginTop: Platform.OS === "ios" ? deviceWidth * 0.013 : 0 }}>
            {this.state.selectedLanguageData.policy}
          </Text>

          <ScrollView
            contentContainerStyle={{ marginHorizontal: deviceWidth * 0.02 }}
            showsVerticalScrollIndicator={false}
            style={style.scrollStyle}>
            <HTML
              html={this.state.legalText}
              baseFontStyle={{ fontSize: deviceWidth * 0.027, fontFamily: "Nexa", }}
            />
          </ScrollView>

        </View>

        <View style={style.signatureContainer}>
          <SignatureCapture
            ref="sign"
            style={{ flex: 1, overflow: 'hidden', borderRadius: deviceWidth * 0.04 }}
            onSaveEvent={this._onSaveEvent}
            onDragEvent={this._onDragEvent}
            showNativeButtons={false}
            showTitleLabel={false}
            // onSaveEvent={this._onSaveEvent}
            saveImageFileInExtStorage={false}
          />
          {this.renderSignatureInfo()}

        </View>
        <View style={style.navigationButtonsContainer}>
          <View style={style.leftButtonContainer}>
            <NavigationButton
              image={require('../../../assets/leftArrow.png')}
              onPress={() => {
                checkControl = true
                Actions.pop({ valuu: 5 })
              }}
            />
          </View>
          <View style={{ flex: 0.76, alignItems: 'center', justifyContent: 'center' }}>

          </View>

          <View style={style.rightButtonContainer}>
            <NavigationButton
              opacityControl={!this.state.didSignCreate}
              image={require('../../../assets/rightArrow.png')}
              onPress={() => this.saveSign()}
            />
          </View>
        </View>

        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Make sure to add all tags you want to customize
  p: {
    fontFamily: "Nexa-Heavy"
  },
  a: {
    fontFamily: "Nexa-Heavy"
  },
  h1: {
    fontFamily: "Nexa-Heavy"
  },

});

const mapStateToProps = (state) => {
  const { bearerToken } = state.token
  const { jsonData } = state.json_code
  const { selectedLanguage, languageJson } = state.language
  return {
    jsonData, bearerToken, selectedLanguage, languageJson
  }
};

function bindAction(dispatch) {
  return {
    fetchAddUpdateGuest: (data, bearerToken) => dispatch(fetchAddUpdateGuest(data, bearerToken)),
  };
}

export default connect(mapStateToProps, bindAction)(LegalTerm);