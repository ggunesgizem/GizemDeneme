import React, { Component } from 'react'
import { AsyncStorage,ImageBackground } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';
import { getToken, fetchLanguageData, setCurrentLanguage, setJsonData, setLanguageData } from '../../actions'
import {
    saveJsonData, getJsonData,
    getPairCode, savePairCode, saveSelectedLanguage, getSelectedLanguage,
    saveLanguageData, getLanguageData, getOfflineVisitor
} from '../../utils/storage_utils'
import NetInfo from '@react-native-community/netinfo'
import Validate from 'validate.js'
const deviceWidth = require('Dimensions').get('window').width
const deviceHeight = require('Dimensions').get('window').height

let currentLanguageData = null
let currentPairData = ""
let selectedLanguage = ""
let connectionInfo = false
let JsonData = ""



class LoadingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hubConnection: null
        }
    }
    async componentDidMount() {
        
        await NetInfo.fetch().then(state => {
            console.log("Is connectedFromLoading?", state.isConnected);
            connectionInfo = state.isConnected

            // console.log('deneme', state.isConnected)
        }).catch((err) => { console.log(err) })
        let asdf = await getOfflineVisitor()

        if (connectionInfo) {
            selectedLanguage = await getSelectedLanguage()
            currentPairData = await getPairCode()
            currentLanguageData = await getLanguageData()
            JsonData = await getJsonData()
            //   console.log('pairdata:', currentPairData)
            if (currentPairData !== "" && currentPairData.length > 0) {
                this.props.fetchLanguageData();
                this.props.getToken();
                //getToken sonucunda çekilen json datası locale kayıt edilecek.
            } else {
                Actions.pairPage();
            }
        } else {
            JsonData = await getJsonData()
            if (JsonData == "") {
                alert("Lütfen internet bağlantınızı kontrol ediniz.")
            } else {
                selectedLanguage = await getSelectedLanguage()
                currentPairData = await getPairCode()
                currentLanguageData = await getLanguageData()
                this.props.setJsonData(JsonData)
                this.props.setLanguageData(currentLanguageData)
            }
            //İnternet yoksa buraya girecek. Locale kayıt edilen json data çekilip redux'a gönderilecek.
        }
    }

    async componentWillReceiveProps(props) {
        //Daha önceden seçilmiş dil varsa onu çeker.
        if (selectedLanguage === "") {
            selectedLanguage = await getSelectedLanguage()
        }

        if (selectedLanguage !== "") {
            if (selectedLanguage === "English") {
                this.props.setCurrentLanguage('EN')
            } else if (selectedLanguage === "TR") {
                this.props.setCurrentLanguage('TR')
            }

        } else {
            //data gelmişse ve uygulama ilk defa açılıyorsa default dili atar.
            if (props.jsonData !== "") {
                var defaultLanguage = props.jsonData.Settings.LocationAccountSetting.Language.Name
                if (defaultLanguage === "English") {
                    this.props.setCurrentLanguage('EN')
                    await saveSelectedLanguage('English')
                } else if (defaultLanguage === "Türkçe") {
                    this.props.setCurrentLanguage('TR')
                    await saveSelectedLanguage('Türkçe')
                }
            }
        }

        if (props.jsonData != "" & JSON.stringify(JsonData) !== JSON.stringify(props.jsonData)) {
            saveJsonData(JSON.stringify(props.jsonData))
        }

        //API'den dil dosyası çekilmişse locale kaydeder.
        if (props.languageJson !== null) {
            if (currentLanguageData !== JSON.stringify(props.languageJson)) {
                this._storeData();
            }
        }

        if (currentPairData === null) {
            this.timeHandle = setTimeout(() => {
                Actions.pairPage()
            }, 1000)
        } else if (props.jsonData !== "" && props.languageJson !== "") {
            this.timeHandle = setTimeout(() => {
                Actions.homePage()
            }, 1000)
        }
    }

    _storeData = async () => {
        AsyncStorage.setItem('noqnoqLanguage', JSON.stringify(this.props.languageJson));
    };

    render() {

        return (
            <ImageBackground style={{ width: deviceWidth, height: deviceHeight }} source={require('../../assets/splash.png')}>

            </ImageBackground>

        )
    }
}
const mapStateToProps = (state) => {
    const { jsonData } = state.json_code
    const { languageJson, selectedLanguage } = state.language
    return {
        jsonData, languageJson, selectedLanguage
    }
};
function bindAction(dispatch) {
    return {
        getToken: () => dispatch(getToken()),
        fetchLanguageData: () => dispatch(fetchLanguageData()),
        setCurrentLanguage: (data) => dispatch(setCurrentLanguage(data)),
        setJsonData: (data) => dispatch(setJsonData(data)),
        setLanguageData: (data) => dispatch(setLanguageData(data))
    }
}
export default connect(mapStateToProps, bindAction)(LoadingPage)

