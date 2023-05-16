import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import Header from "../../components/header"
import NavigationButton from "../../components/navigation_button"
import { style } from "./style"
import { Actions } from "react-native-router-flux"
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux'

let deviceWidth = Dimensions.get("window").width
let deviceHeight = Dimensions.get("window").height

class PolicyPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            finalScreenMessage: this.props.finalMessage,
            isHeaderLogo: this.props.jsonData.Settings.LocationAccountSetting.LogoPath,
            isHeaderText: this.props.jsonData.Settings.CustomerInfo.Name
        }
    }

    render() {
        const htmlContent = `<p>` + this.state.finalScreenMessage + `</p>`;
        return (
            <View style={style.container}>
                <View style={style.headerContainer}>
                
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
                <View style={style.textContainer}>

                    <HTMLView
                        stylesheet={styles}
                        value={htmlContent}
                    />

                </View>


                <View style={style.navContainer}>
                    <View style={style.navgationContainer}>
                        <NavigationButton onPress={() => Actions.homePage()} style={style.buttonContainer} image={require('../../../assets/rightArrow.png')}></NavigationButton>
                    </View>
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    const { jsonData } = state.json_code

    return {
        jsonData,
    }
};

const styles = StyleSheet.create({
    // Make sure to add all tags you want to customize
    p: {
        paddingHorizontal: deviceWidth*0.06, paddingVertical: deviceWidth*0.04,justifyContent: "center", alignItems: "center", fontFamily: "Nexa-Regular",
        fontSize: deviceWidth*0.03 
    }
  });

export default connect(mapStateToProps)(PolicyPage);