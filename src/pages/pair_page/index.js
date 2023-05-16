import React, { Component } from 'react'
import { View, Text, Image, NativeModules } from 'react-native'
import { Actions } from 'react-native-router-flux'
import DeviceInfo from "react-native-device-info"
import { connect } from 'react-redux';
import { createIpad } from '../../actions/createIpad'
import { validate } from 'validate.js'
import { style } from './style'
import { createConnection, startAndConnectMethod } from '../../utils/signalR_connection'
import { savePairCode } from '../../utils/storage_utils'
import Footer from '../../components/footer'

const locale = NativeModules.SettingsManager.settings.AppleLocale

class PairPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pairCode: null,
            hubConnection: props.signalrConnection ? props.signalrConnection : null,
            show: false
        }
    }

    async componentDidMount() {
        if (this.state.hubConnection) {
            startAndConnectMethod(this.state.hubConnection)
            this.state.hubConnection.on("PairIpad", (settings) => {
                var responsePair = !validate.isEmpty(settings.pairCode) ? settings.pairCode.toUpperCase() : null
                var apiPair = !validate.isEmpty(this.props.createIpadData.PairCode) ? this.props.createIpadData.PairCode.toUpperCase() : null


                if (settings.isPaired & responsePair === apiPair) {
                    savePairCode(this.props.createIpadData.PairCode)
                    Actions.loadingPage()
                }
            });
        }

        DeviceInfo.syncUniqueId().then(uniqueId => {
            var uniqueId = uniqueId
            this.props.createIpad(uniqueId)
        })

        // this.props.createIpad(uniqueId)
    }

    componentWillMount() {
        this.setState({
            hubConnection: createConnection()
        })

    }

    applyLetterSpacing(string, count = 1) {
        return string.split('').join('\u200A' + '\u200A' + '\u200A'.repeat(count));
    }

    componentWillReceiveProps(props) {

        if (!this.state.hubConnection) {
            this.setState({ hubConnection: props.signalrConnection }, () => {
                this.state.hubConnection.on("PairIpad", (settings) => {
                    var responsePair = !validate.isEmpty(settings.pairCode) ? settings.pairCode.toUpperCase() : null
                    var apiPair = !validate.isEmpty(this.props.createIpadData.PairCode) ? this.props.createIpadData.PairCode.toUpperCase() : null


                    if (settings.isPaired & responsePair === apiPair) {
                        savePairCode(this.props.createIpadData.PairCode)
                        Actions.loadingPage()
                    }
                });
            })
        }
        if (!validate.isEmpty(props.createIpadData) && validate.isEmpty(this.state.pairCode)) {
            this.setState({ pairCode: props.createIpadData })
        }
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.pairCodeFieldContainer}>
                    <View style={style.pairCodeField}>
                        {
                            !validate.isEmpty(this.state.pairCode) ?
                                <Text style={style.pairCodeText}>
                                    {this.applyLetterSpacing(this.state.pairCode.PairCode)}
                                </Text> :
                                <Text style={style.pairCodeTextDefault}>******</Text>
                        }


                    </View>

                </View>
                <View style={style.infoContainer}>
                    <View style={style.image}>
                        <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../../assets/pairInfo.png')} />

                    </View>
                    <View style={style.infoTextContainer}>
                        {
                            locale != undefined && locale.includes('en') ?
                                <Text style={style.infoTextNormal}>
                                    {"Enter the code to the field in"}
                                    <Text style={{ fontWeight: '400' }}>
                                        {" Settings > iPad Settings"}
                                    </Text>
                                    {" tab"}
                                </Text>
                                :
                                <Text style={style.infoTextNormal}>
                                    {"Kodu,"}
                                    <Text style={{ fontWeight: '400' }}>
                                        {" Ayarlar > iPad Ayarları"}
                                    </Text> {" sekmesindeki alana giriniz"}
                                </Text>
                        }
                    </View>

                </View>

                <Footer />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const { createIpadData } = state.createIpad
    const { signalrConnection } = state.signalr_connection

    return {
        createIpadData, signalrConnection
    };
}

function bindAction(dispatch) {
    return {
        createIpad: (uniqueId) => dispatch(createIpad(uniqueId)),
    };
}

export default connect(mapStateToProps, bindAction)(PairPage)