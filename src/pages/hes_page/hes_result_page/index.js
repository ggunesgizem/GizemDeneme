import React, { Component } from 'react'
import { View, Text, ImageBackground, Image } from 'react-native'
import Footer from '../../../components/footer'
import NavigationButton from '../../../components/navigation_button'
import { deviceWidth, deviceHeight } from '../../../constants'
import { style } from './style'
import HESHeader from '../../../components/HES_header'
import { Actions } from 'react-native-router-flux'
import HESResult from '../../../components/HES_result'
import { connect } from 'react-redux'

let goingBack = null
let check = false
class HesResultPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            result: props.HESResult.resultId,

        }
    }

    nextPage() {
        clearTimeout(goingBack)
        goingBack = null
        if(!check){
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
        check = true
        
    }

    componentDidMount() {
        check = false
        if(this.props.currentPage !== "homePage"){
            if (this.state.result === 1) {
                goingBack = setTimeout(() => {
                    this.nextPage()
                }, 1000);
            } else {
                goingBack = setTimeout(() => {
                    Actions.loadingPage()
    
                }, 5000);
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', }}>
                <HESHeader />

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    <HESResult
                        fullName={this.props.HESResult.fullName}
                        TCKN={this.props.HESResult.TCKN}
                        result={this.props.HESResult.resultId} />

                    <View style={[{
                        position: "absolute",
                        zIndex: 1,
                        width: deviceWidth,
                        height: deviceHeight * 0.11,
                        flexDirection: 'row'
                    }, { bottom: this.state.keyboardHeight > 0 && Platform.OS === "ios" ? this.state.keyboardHeight : deviceWidth * 0.07, zIndex: 1, }]}>
                        <View style={style.leftButtonContainer}>
                            <NavigationButton
                                image={require('../../../../assets/leftArrow.png')}
                                onPress={() => {
                                    clearTimeout(goingBack)
                                    Actions.pop()
                                }}
                            />
                        </View>
                        <View style={{ flex: 0.76, marginHorizontal: deviceWidth * 0.01 }}>

                        </View>
                        {
                            this.state.result === 0 ?
                                <View style={style.rightButtonContainer}>
                                    <NavigationButton
                                        image={require('../../../../assets/rightArrow.png')}
                                        onPress={() => this.nextPage()}
                                    />
                                </View> : null
                        }
                    </View>



                    <Footer />
                </View>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const { currentPage } = state.page

    return {
       currentPage
    };
}

export default connect(mapStateToProps, {})(HesResultPage);
