import { IAction } from "../../utils/interfaces/actions"
import { initialStateCountry } from "./initialStates"

export const countryReducer = (state = initialStateCountry, action: IAction) => {
    switch (action.type) {
        case "GET_STATISTICS_ERROR":
            return {
                ...state,
                data: {},
                status: "ERROR",
                error: action.payload
            }
        case "GET_STATISTICS_SUCCESS":
            return {
                ...state,
                data: action.payload,
                status: "SUCCESS"
            }
        default:
            return state
    }
}