import { USER_ACTIONS } from "../../utils/enums/user"
import { IAuthUserPayload } from "../../utils/interfaces/user"
import { initialStateAuth } from "./initialStates"

export interface IUserAction {
    payload: IAuthUserPayload,
    type: string
}

export const userReducer = (state = initialStateAuth, action: IUserAction) => {
    switch (action.type) {
        case USER_ACTIONS.USER_LOGIN:
            return {
                ...state,
                data: action.payload,
                status: "SUCCESS"
            }
        default:
            return state
    }
}