import axios from "axios";
import { Dispatch } from "redux";
import { USER_ACTIONS } from "../../utils/enums/user";
import { IAuthUserPayload } from "../../utils/interfaces/user";

export function login(data: IAuthUserPayload) {
    return async function (dispatch: Dispatch) {
        const user = await axios.post('http://localhost:8888/auth/login', data).then(res => res.data);
        if (user) {
            localStorage.setItem('token', JSON.stringify(user))
        }
        dispatch({
            type: USER_ACTIONS.USER_LOGIN,
            payload: user
        })
    }
}