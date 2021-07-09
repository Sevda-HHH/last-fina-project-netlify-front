import { CONTACT_ACTIONS } from "../../utils/enums/contact"
import { IAction } from "../../utils/interfaces/actions"
import { IContact, IContactState } from "../../utils/interfaces/contact"
import { initialStateContact } from "./initialStates"

export const contactReducer = (state = initialStateContact, action: IAction) => {
    switch (action.type) {
        case `${CONTACT_ACTIONS.GET_CONTACTS}_ERROR`:
            return {
                ...state,
                data: {},
                status: "ERROR",
                error: action.payload
            }
        case `${CONTACT_ACTIONS.GET_CONTACTS}_SUCCESS`:
            return {
                ...state,
                data: action.payload,
                error: null,
                status: "SUCCESS"
            }

        case `${CONTACT_ACTIONS.ADD_CONTACTS}_ERROR`:
            return {
                ...state,
                data: {},
                status: "ERROR",
                error: action.payload
            }
        case `${CONTACT_ACTIONS.ADD_CONTACTS}_SUCCESS`:
            return {
                ...state,
                error: null,
                data: { ...state.data, contacts: [...state.data.contacts, action.payload], totalCount: state.data.totalCount + 1 },
                status: "SUCCESS"
            }

        case `${CONTACT_ACTIONS.DELETE_CONTACTS}_SUCCESS`:
            let newData = [...state.data.contacts]
            const removedData = newData.filter(d => d._id !== action.id)
            return {
                ...state,
                error: null,
                data: { ...state.data, contacts: removedData, totalCount: state.data.totalCount - 1 },
                status: "SUCCESS"
            }
        case `${CONTACT_ACTIONS.DELETE_CONTACTS}_ERROR`:
            return {
                ...state,
                data: {},
                error: action.payload,
                status: "ERROR"
            }
        default:
            return state
    }
}