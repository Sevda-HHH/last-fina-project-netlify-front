import { Dispatch } from "redux";
import { contactServices } from "../../services/contact";
import { CONTACT_ACTIONS } from "../../utils/enums/contact";
import { IContactPayload } from "../../utils/interfaces/contact";

export function getAllContacts(pageNo: number, itemCount: number, quo: string) {
    return async function (dispatch: Dispatch) {
        return contactServices.getAllContacts(pageNo, itemCount, quo)
            .then(res => dispatch({
                type: `${CONTACT_ACTIONS.GET_CONTACTS}_SUCCESS`,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: `${CONTACT_ACTIONS.GET_CONTACTS}_ERROR`,
                payload: err
            }))
    }
}
export function addContact(data: IContactPayload) {
    return async function (dispatch: Dispatch) {
        return contactServices.addContact(data)
            .then(res =>
                dispatch({
                    type: `${CONTACT_ACTIONS.ADD_CONTACTS}_SUCCESS`,
                    payload: res.data
                })
            )
            .catch(err => {
                dispatch({
                    type: `${CONTACT_ACTIONS.ADD_CONTACTS}_ERROR`,
                    payload: err
                })
            })


    }
}
export function removeContact(id: string) {
    return async function (dispatch: Dispatch) {
        return contactServices.deleteContact(id)
            .then(() =>
                dispatch({
                    type: `${CONTACT_ACTIONS.DELETE_CONTACTS}_SUCCESS`,
                    id: id
                })
            )
            .catch(err =>
                dispatch({
                    type: `${CONTACT_ACTIONS.DELETE_CONTACTS}_ERROR`,
                    payload: err
                })
            )
    }
}