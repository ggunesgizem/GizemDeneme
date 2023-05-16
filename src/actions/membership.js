import { URL } from "../constants";
import { MEMBERSHIP_INFO } from "../constants/reducer_types";

export const fetchMembershipInfo = (bearerToken) => {
    return async dispatch => {

        dispatchMembership(
            dispatch, await fetch(URL + "api/GetPackageInfo", {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + bearerToken
                }
            }).then(response => response.json()).then((responseJson) => {
                return responseJson
            }).catch((error) => {
                console.error(error);
            })
        );

    };
};


export const dispatchMembership = (dispatch, data) => {

    dispatch({
        type: MEMBERSHIP_INFO,
        payload: data
    });

}