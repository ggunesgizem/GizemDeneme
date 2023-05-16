import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import MailOption from '../mail_option'


class MailContainer extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            mails: [
                { mail: "@gmail.com" },
                { mail: "@yahoo.com" },
                { mail: "@hotmail.com" },
                { mail: "@outlook.com" },
                { mail: "@mynet.com" }
            ]
        })
    }

    render() {
        let deviceWidth = Dimensions.get('window').width
        let deviceHeight = Dimensions.get('window').height

        return (
            <View style={{ width: deviceWidth, paddingRight: deviceWidth * 0.02, position: 'absolute', bottom: 0, height: deviceHeight * 0.07, backgroundColor: '#f5f6f7', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {
                    this.state.mails.map((value) => {
                        return (<MailOption
                            onPress={() => this.props.emailClicked(value.mail)}
                            text={value.mail} />)
                    })
                }
            </View>
        )
    }
}

export default MailContainer