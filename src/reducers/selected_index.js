import {SELECTED_INDEX} from '../constants/reducer_types'


const INITIAL_STATE = {
    selectedInfo : ""
  };

  export default (state = INITIAL_STATE,action) => {
      switch (action.type) {
          case SELECTED_INDEX:
             return  {...state,selectedInfo:action.payload}
      
          default:
              return {...state};
      }
  } ;