import { Dispatch } from "redux";
import { appointmentServices } from "../../services/appointment";
import { APPOITNMENT_ACTIONS } from "../../utils/enums/appointment";
import { IAppointmentPayload } from "../../utils/interfaces/appointment";

export function addAppointment(data: IAppointmentPayload) {
    appointmentServices.addAppointment(data).catch(err => console.log(err))
}
export function getAppointments(pageNo: number, itemCount: number, quo: string) {
    return async function (dispatch: Dispatch) {
        return appointmentServices.getAppointments(pageNo, itemCount, quo).then(res =>
            dispatch({
                type: `${APPOITNMENT_ACTIONS.GET_APPOITNMENT}_SUCCESS`,
                payload: res.data
            })
        )
            .catch(err => dispatch({
                type: `${APPOITNMENT_ACTIONS.GET_APPOITNMENT}_ERROR`,
                payload: err
            }))
    }
}
export function getAppointmentByİd(id: string) {
    appointmentServices.getAppoitmentById(id).catch(err => console.log(err))
}

export function deleteAppointment(id: string) {
    return async function (dispatch: Dispatch) {
        return appointmentServices.deleteAppointment(id)
            .then(() => dispatch({
                type: `${APPOITNMENT_ACTIONS.DELETE_APPOITNMENT}_SUCCESS`,
                id: id
            }))
            .catch((err) => dispatch({
                type: `${APPOITNMENT_ACTIONS.DELETE_APPOITNMENT}_ERROR`,
                payload: err
            }))
    }
}