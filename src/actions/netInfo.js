import { NET_INFO} from '../constants/reducer_types'


export const setNetInfo = (data) => {
    if(data !== undefined){
        return dispatch => {
            dispatch({
                type: NET_INFO,
                payload: data
            })
        }
    }
}

