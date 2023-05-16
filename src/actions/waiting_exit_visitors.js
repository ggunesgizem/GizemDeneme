import { EXIT_VISITORS } from '../constants/reducer_types'
import { URL } from '../constants/endpoints'

export const getWaitingExitVisitors = (name, pnrCode, locationId, bearerToken) => {
    
    return async dispatch => {
        dispatchgetWaitingExitVisitors(
            dispatch, await fetch(URL + "api/GetWaitingExitVisitors?name=" + name + "&pnrCode=" + pnrCode + "&locationId=" + locationId, {
                headers: {
                    Accept: "application/json",
                    Authorization: "bearer " + bearerToken
                }
            }).then(response => {
                return response.text()
            }).catch((error) => {
                console.error(error);
            })
        );

    };
};

const dispatchgetWaitingExitVisitors = (dispatch, data) => {

    var parseData = JSON.parse(data)

    dispatch({
        type: EXIT_VISITORS,
        payload: parseData
    });

}