import { LANGUAGE_DATA, CHOSEN_LANGUAGE } from '../constants/reducer_types'
import { URL } from '../constants/endpoints'

export const fetchLanguageData = () => {
    debugger
    return async dispatch => {

        dispatchLanguageData(
            dispatch, await fetch(URL + "Resources/iPadResource.json", {
                headers: {
                    "Cache-Control": "no-cache",
                    "Postman-Token": "d87b7fac-69bb-40c4-9a07-516a6d8d2a90",
                    "Content-Type": "application/json"
                },
                method: "GET",
            }).then(response => {
                return response.text()
            }).catch((error) => {
                console.error(error);

            })
        );

    };
};


export const setCurrentLanguage = (data) => {
    return dispatch => {
        dispatch({
            type: CHOSEN_LANGUAGE,
            payload: data
        })
    }
}

export const setLanguageData = (data) => {
    const languageData = JSON.parse(data)
    return dispatch => {
        dispatch({
            type: LANGUAGE_DATA,
            payload: languageData
        })
    }
}

const dispatchLanguageData = (dispatch, data) => {
    debugger
    var JSONdata = JSON.parse(data.trim())
    dispatch({
        type: LANGUAGE_DATA,
        payload: JSONdata
    });

}
