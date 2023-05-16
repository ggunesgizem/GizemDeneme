import { USER_LIST, USER } from '../constants/reducer_types'
import { URL } from '../constants/endpoints'

export const fetchUserList = (name, locationId, bearerToken) => {
debugger
    return async dispatch => {

        dispatchUserList(
            dispatch, await fetch(URL + "api/GetGuestsWithCustomFieldsAndValues?name=" + name + "&isFullSearch=false&locationId=" + locationId, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + bearerToken
                }
            }).then(response => response.json()).then((responseJson) => {
                return responseJson
            }).catch((error) => {
                console.error(error);

            })
        );

    };
};



export const fetchUser = (pnrCode, locationId, bearerToken) => {
    return async dispatch => {
        dispatchUser(
            dispatch, await fetch(URL + "api/GetGuestsWithCustomFieldsAndValues?pnrCode=" + pnrCode + "&locationId=" + locationId, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + bearerToken
                }
            }).then(response => response.json()).then((responseJson) => {
                return responseJson
            }).catch((error) => {
                console.error(error);

            })
        );

    };

}

const dispatchUser = (dispatch, user) => {
    dispatch({
        type: USER,
        payload: user
    });

}

const dispatchUserList = (dispatch, userList) => {
    dispatch({
        type: USER_LIST,
        payload: userList
    });

}