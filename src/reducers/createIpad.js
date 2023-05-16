import { CREATE_IPAD, PAIR_CODE } from '../constants/reducer_types'

const INITIAL_STATE = {
    createIpadData: {},
    pairCode: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_IPAD:

            return { ...state, createIpadData: action.payload }
        case PAIR_CODE:
            return { ...state, pairCode: action.payload }
        default:
            return { ...state };
    }
};