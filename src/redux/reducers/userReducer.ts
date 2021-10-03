import { types } from "../saga/types";

const initialState = {
    user: []
}
const userReducer = (
    action: any,
    state = initialState,
) => {
    switch (action?.type) {
        case types.START:
            return {
                ...state,
                user: action.payload
            }
    }
    return state
}

export default userReducer;