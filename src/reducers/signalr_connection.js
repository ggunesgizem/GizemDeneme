import { CONNECTION, PRINTER_GUEST } from '../constants/reducer_types'

const INITIAL_STATE = {
    signalrConnection: null,
    printerGuest: []
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case PRINTER_GUEST:
            {
                return { ...state, printerGuest: action.payload }
            }
        case CONNECTION:
            {
                return { ...state, signalrConnection: action.payload }
            }
        default:
            return { ...state };
    }
};