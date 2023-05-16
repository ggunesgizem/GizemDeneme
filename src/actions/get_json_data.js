import { JSON_CODE, TOKEN, SETTINGS_SIGNAL } from '../constants/reducer_types'
import { URL } from '../constants/endpoints'
import { getPairCode } from '../utils/storage_utils'
import { Actions } from 'react-native-router-flux';
import { fetchMembershipInfo } from './membership';


const fetchJsonData = (bearerToken) => {
    return async dispatch => {
        var pair = await getPairCode().then((value) => { return value })
        dispatchJsonCode(
            dispatch, await fetch(URL + "api/GetLocationSettingsByPairCode?pair=" + pair, {
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


export const getToken = () => {


    return async dispatch => {
        var pair = await getPairCode().then((value) => { return value })

        dispatchToken(dispatch, await fetch(URL + "api/GetToken?pairCode=" + pair, {
            headers: {
                Accept: "application/json"
            }
        })
        .then(response => response.json())
        .then((responseJson) => {
            if (!responseJson.Status && responseJson.Message === 'Could not verify pairCode.') {
                console.log('ERROR ON TOKEN', responseJson)
                return;
            }
            
            return responseJson
        })
        .catch((error) => {
            console.error(error);
        }));
    }
}


const dispatchToken = (dispatch, data) => {
    if (data !== undefined) {
        dispatch(fetchJsonData(data.Token))
        dispatch(fetchMembershipInfo(data.Token))
        dispatch({
            type: TOKEN,
            payload: data
        });
    } else {
        Actions.pairPage();
    }
}

export const dispatchJsonCode = (dispatch, data) => {

    dispatch({
        type: JSON_CODE,
        payload: data
    });

}

export const setJsonData = (data) => {

    var JSONdata = JSON.parse(data)
    return dispatch => {
        dispatch({
            type: JSON_CODE,
            payload: JSONdata
        })
    }

}

export const setSignalrAlert = (data) => {

    return dispatch => {
        dispatch({
            type: SETTINGS_SIGNAL,
            payload: data
        })
    }

}