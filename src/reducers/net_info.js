import { NET_INFO } from '../constants/reducer_types'

const INITIAL_STATE = {
    netInfo: null
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case NET_INFO:
            return { ...state, netInfo: action.payload }
        default:
            return { ...state }
    }
}
