
export default class GuestInfo {
    constructor(){
        this.id = ""
        this.locationId = ""
        this.visitorTypeId = ""
        this.visitorCount = ""
        this.hostId = ""
        this.inviteDate = ""
        this.signInDateTime = null
        this.fullName = null
        this.email = ""
        this.telephone = null
        this.signature = null
        this.guestStatus = null
        this.pnrCode = null 
        this.customFieldValues = []
       
    }
    setid(id){
        this.id=id
    }
    getid(){
    return id
    }

    setlocationId(locationId){
        this.locationId=locationId
    }
    getlocationId(){
    return locationId
    }

    setvisitorTypeId(visitorTypeId){
        this.visitorTypeId=visitorTypeId
    }
    getvisitorTypeId(){
    return visitorTypeId
    }

    setvisitorCount(visitorCount){
        this.visitorCount=visitorCount
    }
    getvisitorCount(){
    return visitorCount
    }

    sethostId(hostId){
        this.hostId=hostId
    }
    gethostId(){
    return hostId
    }


    setinviteDate(inviteDate){
        this.inviteDate=inviteDate
    }
    getinviteDate(){
    return inviteDate
    }

    setsignInDateTime(signInDateTime){
        this.signInDateTime=signInDateTime
    }
    getsignInDateTime(){
    return signInDateTime
    }

    setfullName(fullName){
        this.fullName=fullName
    }
    getfullName(){
    return fullName
    }

    settelephone(telephone){
        this.telephone=telephone
    }
    gettelephone(){
    return telephone
    }
    
    setsignature(signature){
        this.signature=signature
    }
    getsignature(){
    return signature
    }

    setguestStatus(guestStatus){
        this.guestStatus=guestStatus
    }
    getguestStatus(){
    return guestStatus
    }

    setpnrCode(pnrCode){
        this.pnrCode=pnrCode
    }
    getpnrCode(){
    return pnrCode
    }

    setcustomFieldValues(customFieldValues){
        this.customFieldValues=customFieldValues
    }
    getcustomFieldValues(){
    return customFieldValues
    }
    
    
}