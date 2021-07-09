

import axios from "axios";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { USER_ACTIONS } from "../../../utils/enums/user";
import { initialStateCountry } from "../../reducers/initialStates";
import { login } from "../user";

const mockStore = configureMockStore([thunk]);
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('testing statistics actions', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({ countryReducer: { ...initialStateCountry } });
    });

    test('test login', async () => {
        const userData = {
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGQ5OTdlNjc4MjYxMjVmODRhNDk1M2MiLCJlbWFpbCI6IkFkbWluYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjI1Nzc1NjQzLCJleHAiOjE2MjU3NzU5NDN9.JOPOPw7PQjSbvD-sP85z0_5Kmi6yOzBS_HZbp2xCD9c",
            "user": {
                "_id": "60d997e67826125f84a4953c",
                "email": "Adminadmin@gmail.com",
                "createdAt": "2021-06-28T09:35:34.719Z",
                "name": "Admin",
                "surname": "Adminov",
                "status": "admin"
            }
        };
        const userPayload = {
            "email": "Adminadmin@gmail.com",
            "password": "aaa123"
        };

        (mockedAxios.post.mockImplementationOnce)(() =>
            Promise.resolve(
                { data: userData }
            )
        );

        await store.dispatch(login(userPayload));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: USER_ACTIONS.USER_LOGIN,
            payload: userData
        });
    })

})