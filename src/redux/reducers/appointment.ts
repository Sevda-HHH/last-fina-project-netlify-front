import { APPOITNMENT_ACTIONS } from "../../utils/enums/appointment"
import { IAction } from "../../utils/interfaces/actions"
import { IAppointmentState } from "../../utils/interfaces/contact"
import { initialStateAppointment } from "./initialStates"

export const appoitmentReducer = (state = initialStateAppointment, action: IAction) => {
    switch (action.type) {
        case `${APPOITNMENT_ACTIONS.DELETE_APPOITNMENT}_SUCCESS`:
            let newData = [...state.data.appointments]
            const removedData = newData.filter(d => d._id !== action.id)
            return {
                ...state,
                error: null,
                data: { ...state.data, appointments: removedData, totalCount: state.data.totalCount - 1 },
                status: "SUCCESS"
            }
        case `${APPOITNMENT_ACTIONS.DELETE_APPOITNMENT}_ERROR`:
            return {
                ...state,
                data: {},
                error: action.payload,
                status: "ERROR"
            }
        case `${APPOITNMENT_ACTIONS.GET_APPOITNMENT}_SUCCESS`:
            return {
                ...state,
                error: null,
                data: action.payload,
                status: "SUCCESS"
            }
        case `${APPOITNMENT_ACTIONS.GET_APPOITNMENT}_ERROR`:
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