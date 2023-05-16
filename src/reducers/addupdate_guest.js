import { ADDUPDATE_GUEST } from '../constants/reducer_types'

const INITIAL_STATE = {
    addupdateGuest: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADDUPDATE_GUEST:

            return { ...state, addupdateGuest: action.payload }

        default:
            return { ...state };
    }
};