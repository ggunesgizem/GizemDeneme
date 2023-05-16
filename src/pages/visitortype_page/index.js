import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import TypeButton from './type_button'
import Header from '../../components/header'
import NavigationButton from '../../components/navigation_button'
import { validate } from 'validate.js'
import { style } from './style'
import Footer from '../../components/footer'
import { timeoutSecond } from '../../constants'

let checkControl = false;
class VisitorType extends Component {
    constructor(props) {


        super(props)
        this.state = {
            jsonD: this.props.jsonData,
            userInfo: this.props.userInfo,
            selectedLanguageData: props.selectedLanguage === "EN" ? props.languageJson.EN : props.languageJson.TR,
            isHeaderLogo: this.props.jsonData.Settings.LocationAccountSetting.LogoPath,
            isHeaderText: this.props.jsonData.Settings.CustomerInfo.Name
        }
    }
    componentDidMount() {
        this.setState({ jsonD: this.props.jsonData })

    }

    static onEnter = () => {
        checkControl = false
        // setTimeout(() => {
        //     if (!checkControl) {
        //         checkControl = true
        //         Actions.loadingPage()
        //     }
        // }, timeoutSecond);
    }

    static onExit = () => {
        checkControl = true
    }

    render() {
        const deviceHeight = Dimensions.get('window').height
        const deviceWidth = Dimensions.get('window').width
        return (

            <View style={style.container}>

                <View style={style.headerContainer}>
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

                {/* <View style={style.textContainer}>
                    <Text style={style.textStyle}>{this.state.selectedLanguageData.visitorReason}</Text>
                </View> */}

                <View style={style.infoContainer}>
                    <View style={style.image}>
                        <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../../assets/typeInfo.png')} />

                    </View>
                    <View style={style.infoTextContainer}>
                        <Text style={style.infoTextNormal}>{this.state.selectedLanguageData.reasonOfVisit}</Text>
                    </View>

                </View>

                {this.state.jsonD !== "" && !validate.isEmpty(this.state.jsonD) ?

                    <ScrollView
                        style={{ flex: 1, marginTop: deviceWidth * 0.01 }}
                        contentContainerStyle={{ alignItems: 'center', marginTop: -deviceWidth * 0.04 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            this.state.jsonD.Settings.VisitorTypes.map((value, index) => {
                                if (!value.ForOutlook && value.IsActive) {
                                    return (
                                        <View style={{ marginTop: deviceWidth * 0.05 }}>
                                            <TypeButton
                                                onPress={() => {
                                                    checkControl = true;
                                                    Actions.visitorInfo(
                                                        {
                                                            userInfo: this.state.userInfo,
                                                            data: value,
                                                            guest: this.props.guest,
                                                        })

                                                }
                                                }
                                                key={index}
                                                color={this.props.jsonData.Settings.LocationAccountSetting.AccentColor}
                                                text={value.Name}
                                                image={require('../../../assets/messageIcon.png')} />
                                        </View>
                                    )
                                }
                            })
                        }
                    </ScrollView> : null
                }

                <View style={style.navigationButtonsContainer}>
                    <View style={style.navgationContainer}>
                        <NavigationButton onPress={() => {
                            checkControl = true;

                            Actions.userLogin()
                        }} style={style.buttonContainer} image={require('../../../assets/leftArrow.png')}></NavigationButton>
                    </View>
                </View>
                <Footer />
            </View>



        )
    }
}
const mapStateToProps = (state) => {
    const { jsonData } = state.json_code
    const { selectedLanguage, languageJson } = state.language
    return {
        jsonData, selectedLanguage, languageJson
    }
};
function bindAction(dispatch) {
    return {

    };
}
export default connect(mapStateToProps, bindAction)(VisitorType)
