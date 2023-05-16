import { CREATE_IPAD, PAIR_CODE } from '../constants/reducer_types'
import { URL } from '../constants/endpoints'

export const createIpad = (uniqueId) => {
    
    return async dispatch => {
        dispatchCreateIpad(
            dispatch, await fetch(URL + "api/CreateIpad?uid=" + uniqueId, {
                headers: {
                    Accept: "application/json"
                }
            }).then(response => response.json()).then((responseJson) => {
                console.log('PAIR CODE', responseJson)
                return responseJson
            }).catch((error) => {
                console.error(error);
            })
        );

    };
};

const dispatchCreateIpad = (dispatch, data) => {

    dispatch({
        type: CREATE_IPAD,
        payload: data
    });

}

export const setPair = (data) => {
    if(data !== undefined){
        return dispatch => {
            dispatch({
                type: PAIR_CODE,
                payload: data
            })
        }
    }
}