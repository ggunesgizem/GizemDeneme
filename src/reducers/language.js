import { LANGUAGE_DATA, CHOSEN_LANGUAGE } from '../constants/reducer_types'

const INITIAL_STATE = {
    languageJson: null,
    selectedLanguage: ""
}

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case LANGUAGE_DATA:
            return { ...state, languageJson: action.payload }
        case CHOSEN_LANGUAGE:
            return {...state, selectedLanguage:action.payload}
        default:
            return { ...state }
    }
}