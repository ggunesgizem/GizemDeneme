import React, { Component } from 'react'
import { Animated, Text, TouchableOpacity, View, Alert, ScrollView } from 'react-native'
const Dimensions = require("Dimensions")

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import { connect } from 'react-redux'
import { style } from './style'
import UserCard from './user_card'
import { Actions } from 'react-native-router-flux'
import * as Animatable from 'react-native-animatable';
import { getHostName } from '../../../utils/host'
import moment from 'moment'


class UserModal extends Component {

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0)
        this.state = {
            users: [],
        }
    }

    yesPress(Id, guestStatus, eMail, telephone, fullName, VisitorTypeId, plate, customFields, companyName, identityNumber, HostNotification, privateHostMessage, hostName, HasVisitorPhoto, VisitorPhoto) {

        if (guestStatus === 6) {

            let user = {
                userId: Id,
                userGuestStatus: guestStatus,
                userEmail: eMail,
                userTelephone: telephone,
                userFullName: fullName,
                userVisitorTypeId: VisitorTypeId,
                userPlate: plate,
                userCustomField: customFields,
                userCompanyName: companyName,
                userIdentityNumber: identityNumber,
                userHostNotification: HostNotification,
                userHostPrivateMessage: privateHostMessage,
                userHostName: hostName,
                hasVisitorPhoto : HasVisitorPhoto,
                visitorPhoto : VisitorPhoto
            }
            Actions.visitorInfo({ userInfo: user, guestStatus: 6, hostname: hostName })

        } else if (guestStatus === 4 || guestStatus === 5) {
            let user = {
                userGuestStatus: guestStatus,
                userEmail: eMail,
                userTelephone: telephone,
                userFullName: fullName,
                userVisitorTypeId: VisitorTypeId,
                userPlate: plate,
                userCustomField: customFields,
                userCompanyName: companyName,
                userIdentityNumber: identityNumber,
                userHostNotification: HostNotification
            }

            Actions.visitorInfo({ userInfo: user, guestStatus: 4 })


        }

    }

    getCustomValues(value) {

        let customValues = value.CustomFieldValues
        let customValuesToSendVisitorInfo = []
        if (customValues !== []) {
            let customValueIds = []
            customValues.map((value) => {
                let customValueObj = []
                customValueObj.Id = value.SignInFlowCustomFieldId
                customValueObj.Value = value.Value
                customValueIds.push(customValueObj)
            })
            this.props.jsonData.Settings.SignInFlowSettings.map((val) => {
                if (val.VisitorTypeId === value.VisitorTypeId) {
                    if (val.SignInFlowCustomFields !== []) {
                        val.SignInFlowCustomFields.map((field) => {
                            customValueIds.map((customVals) => {
                                if (customVals.Id === field.Id) {
                                    let sendingValue = []
                                    sendingValue.Name = field.Name
                                    sendingValue.Value = customVals.Value
                                    sendingValue.Id = customVals.Id
                                    customValuesToSendVisitorInfo.push(sendingValue)
                                }
                            })
                        })
                    }
                }
            })
        }
        return customValuesToSendVisitorInfo;
    }

    render() {


        return (
            <Animatable.View duration={500} animation="fadeInUp" style={{ borderTop: 5, flexDirection: "row", flex: 0.5, marginTop: deviceHeight * 0.28, position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>

                    <View style={{ flexDirection: "row", marginLeft: deviceWidth * 0.165, marginRight: deviceWidth * 0.1 }}>
                        {this.props.userList.map((value, index) => {
                            debugger
                            let customValues = this.getCustomValues(value)

                            if (value.Email !== null && value.Email !== "" && value.Email !== undefined) {
                                var email = value.Email
                                var lastIndex = email.length
                                var first = email.substring(0, 1)
                                var firstIndex = email.indexOf("@")
                                var last = email.substring(firstIndex, lastIndex)
                                var newEmail = first + "***" + last
                                var hostName = getHostName(this.props.jsonData.Settings, value.HostId)
                                if (hostName !== null && hostName !== undefined) {
                                    var index = hostName.indexOf(" ")
                                    var first = hostName.substring(0, 1);
                                    var last = hostName.substring(index + 1, index + 2)

                                    var newHostname = first + "***" + " " + last + "***"
                                }

                            } else {
                                var hostName = getHostName(this.props.jsonData.Settings, value.HostId)
                                if (hostName != null) {
                                    var index = hostName.indexOf(" ")
                                    var first = hostName.substring(0, 1);
                                    var last = hostName.substring(index + 1, index + 2)

                                    var newHostname = first + "***" + " " + last + "***"
                                }

                                var date = value.SignInDateTime
                                if (date != null) {
                                    var newEmail = moment(date).format("DD-MM-YYYY");
                                }
                            }
                            return (
                                <View style={style.cardContainer}>
                                    {
                                        newHostname !== undefined ?
                                            <UserCard
                                                key={index}
                                                text={newEmail}
                                                yesPress={() => this.yesPress(value.Id, value.GuestStatus, value.Email, value.Telephone, value.FullName, value.VisitorTypeId, value.Plate, customValues, value.CompanyName, value.IdentityNumber, value.HostNotification, value.FinalScreenHostPrivateMessage, hostName, value.HasVisitorPhoto,value.VisitorPhoto)}
                                                hostName={newHostname}
                                                backColor={this.props.backColor}
                                            ></UserCard>
                                            :
                                            <UserCard
                                                key={index}
                                                text={newEmail}
                                                yesPress={() => this.yesPress(value.Id, value.GuestStatus, value.Email, value.Telephone, value.FullName, value.VisitorTypeId, value.Plate, customValues, value.CompanyName, value.IdentityNumber, value.HostNotification, value.FinalScreenHostPrivateMessage, hostName,value.HasVisitorPhoto,value.VisitorPhoto)}
                                                backColor={this.props.backColor}
                                            ></UserCard>
                                    }

                                </View>
                            )
                        })}

                    </View>



                </ScrollView>
            </Animatable.View>

        )
    }
}

const mapStateToProps = (state) => {

    const { userList } = state.user_list
    const { jsonData } = state.json_code
    return {
        userList, jsonData
    }
};

export default connect(mapStateToProps)(UserModal);