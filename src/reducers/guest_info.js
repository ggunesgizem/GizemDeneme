import { GUEST_INFO, GUEST_NAME } from '../constants/reducer_types'

const INITIAL_STATE = {
    guestInfo: "",
    newGuestName: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GUEST_INFO:
            return { ...state, guestInfo: action.payload }
        case GUEST_NAME: {
            return { ...state, newGuestName: action.payload }
        }
        default:
            return { ...state };
    }
};