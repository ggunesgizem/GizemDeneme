import {JSON_CODE, SETTINGS_SIGNAL} from '../constants/reducer_types'

const INITIAL_STATE = {
    jsonData : "",
    settingsSignal:false
  };

  export default (state = INITIAL_STATE,action) => {
      switch (action.type) {
          case JSON_CODE:
             return  {...state,jsonData:action.payload}
            case SETTINGS_SIGNAL:
                return {...state, settingsSignal:action.payload}
          default:
              return {...state};
      }
  } ;