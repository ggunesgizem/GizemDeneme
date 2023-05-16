


const INITIAL_STATE = {
    bearerToken: ""
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case "TOKEN":
            {
                return { ...state, bearerToken: action.payload.Token }
            }


        default:
            return { ...state };
    }
};