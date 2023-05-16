import { CURRENT_PAGE, SIGNALR_INFO } from '../constants/reducer_types'


//data olarak sayfanın ismi atılacak.
export const setCurrentPage = (data) => {
    return dispatch => {
        dispatch({
            type: CURRENT_PAGE,
            payload: data
        })
    }
}

export const setSignalrInfo = (data) => {
    return dispatch => {
        dispatch({
            type: SIGNALR_INFO,
            payload: data
        })
    }
}