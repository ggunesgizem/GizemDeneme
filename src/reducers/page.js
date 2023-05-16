import { CURRENT_PAGE, SIGNALR_INFO } from '../constants/reducer_types'

const INITIAL_STATE = {
    currentPage: "homePage",
    signalrInfo: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CURRENT_PAGE:
            return { ...state, currentPage: action.payload }
        case SIGNALR_INFO:
            return { ...state, signalrInfo: action.payload }
        default:
            return { ...state }
    }
}