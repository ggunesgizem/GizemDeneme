import { EXIT_VISITORS } from '../constants/reducer_types'

const INITIAL_STATE = {
    exitVisitors: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EXIT_VISITORS:

            return { ...state, exitVisitors: action.payload }

        default:
            return { ...state };
    }
};