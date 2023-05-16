import { GUEST_INFO, GUEST_NAME } from '../constants/reducer_types'
import { URL } from '../constants/endpoints'
import { getPairCode } from '../utils/storage_utils'

export const fetchAddUpdateGuest = (argJSON, bearerToken) => {
debugger
    var data = argJSON
debugger
    return async dispatch => {
        var pair = await getPairCode().then((value) => { return value })
        console.log("pairrrrr: ", pair)

        dispatchAddUpdateGuest(
            dispatch, await fetch(URL + "api/AddUpdateGuest?pair=" + pair, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + bearerToken,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: data

            }).then(response => {
                return response.text()
            }).catch((error) => {
                console.error(error);

            })
        );

    };
};

export const setNewGuestName = (name) => {

    return dispatch => {
        dispatch({
            type: GUEST_NAME,
            payload: name
        })
    }
}


const dispatchAddUpdateGuest = (dispatch, data) => {
    debugger
    console.log('MYDATA:', data)
    dispatch({
        type: GUEST_INFO,
        payload: data
    });

}