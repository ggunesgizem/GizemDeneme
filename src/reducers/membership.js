import { MEMBERSHIP_INFO } from '../constants/reducer_types'

const INITIAL_STATE = {
    membershipStatus: null
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case MEMBERSHIP_INFO:
            return { ...state, membershipStatus: action.payload }
        default:
            return { ...state }
    }
}
