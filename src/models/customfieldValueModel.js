
export default class GuestInfo {
    constructor(){
        this.id = ""
        this.signInFlowCustomFieldId = ""
        this.value = ""
        this.checkInId = ""
      
       
    }
    setid(id){
        this.id=id
    }
    getid(){
    return id
    }

    setsignInFlowCustomFieldId(signInFlowCustomFieldId){
        this.signInFlowCustomFieldId=signInFlowCustomFieldId
    }
    getsignInFlowCustomFieldId(){
    return signInFlowCustomFieldId
    }

    setvalue(value){
        this.value=value
    }
    getvalue(){
    return value
    }

    setcheckInId(checkInId){
        this.checkInId=checkInId
    }
    getcheckInId(){
    return checkInId
    }

    
}