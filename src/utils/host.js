export const getHostInfo = (data, visitorTypeId) => {
    let hostObject = []
    data.SignInFlowSettings.map((value) => {
        if (value.VisitorTypeId === visitorTypeId) {
            hostObject.HostApproval = value.HostApproval

            if (value.HostApproval) {
                hostObject.HostMessage = value.HostApprovalEnableMessage
                hostObject.HostVideo = value.HostApprovalEnableVideoUrl
            } else {
                hostObject.HostMessage = value.HostApprovalDisableMessage
                hostObject.HostVideo = value.HostApprovalDisableVideoUrl
            }
        }
    })
    return hostObject
}

export const getHostName = (data, hostId) => {
    let FullName
    data.HostUsers.map((value) => {
        if (value.Id === hostId) {
            FullName = value.FirstName + " " + value.LastName
        }
    })
 
    return FullName
}