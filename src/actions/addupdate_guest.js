import { ADDUPDATE_GUEST, EXIT_VISITORS,GUEST_INFO } from '../constants/reducer_types'
import { URL } from '../constants/endpoints'

export const addUpdateGuest = (guestData, bearerToken) => {
  debugger
    return async dispatch => {
        dispatchaddUpdateGuest(
            dispatch, await fetch(URL + "api/AddUpdateGuests", {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer" + bearerToken,
                    "Content-Type": "application/json-patch+json"
                },
                method: "POST",
                body: JSON.stringify(guestData)

            }).then(response => {
                console.log("res: ", response);
                return response.text()
            }).catch((error) => {
                console.error(error);
            })
        );

    };
};

const dispatchaddUpdateGuest = (dispatch, data) => {
    
    var parseData = JSON.parse(data)

    dispatch({
        type: ADDUPDATE_GUEST,
        payload: parseData
    });

}

export const deleteModalProps = () => {

    return dispatch => {
        dispatch({
            type: GUEST_INFO,
            payload: ""
        });
        dispatch({
            type: EXIT_VISITORS,
            payload: ""
        })
    }
}
