import {USER_LIST} from '../constants/reducer_types'

const INITIAL_STATE = {
    userList : {}  
  };

  export default (state = INITIAL_STATE,action) => {
      switch (action.type) {
          case USER_LIST:
  
             return  {...state,userList:action.payload}
      
          default:
              return {...state};
      }
  } ;