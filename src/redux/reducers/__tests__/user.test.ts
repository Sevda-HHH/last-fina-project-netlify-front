import { USER_ACTIONS } from "../../../utils/enums/user";
import { IAction } from "../../../utils/interfaces/actions";
import { initialStateAuth } from "../initialStates";
import { IUserAction, userReducer } from "../user";

describe('testing appointments reducer', () => {
    let action: IUserAction = {
        type: `${USER_ACTIONS.USER_LOGIN}_IDLE`,
        payload: { email: "hello@gmail.com", password: "aaa123" }
    }
    test('initial state', () => {
        let expected = userReducer(initialStateAuth, action);

        expect(expected).toBe(initialStateAuth);
    })

    test('test idle state', () => {
        action = {
            type: `${USER_ACTIONS.USER_LOGIN}_IDLE`,
            payload: { email: "hello@gmail.com", password: "aaa123" }
        }
        let expected = userReducer(initialStateAuth, action);

        expect(expected).toStrictEqual({
            ...initialStateAuth,
            status: 'IDLE'
        });
    })
})