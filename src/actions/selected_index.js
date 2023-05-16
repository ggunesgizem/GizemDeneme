import { SELECTED_INDEX } from '../constants/reducer_types'

export const dispatchIndex = (data) => {

  return dispatch => {
    dispatch({
      type: SELECTED_INDEX,
      payload: data
    });
  }

}
