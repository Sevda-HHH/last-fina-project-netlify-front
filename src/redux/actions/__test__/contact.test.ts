import axios from "axios";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CONTACT_ACTIONS } from "../../../utils/enums/contact";
import { IContact, IContactPayload } from "../../../utils/interfaces/contact";
import { initialStateContact } from "../../reducers/initialStates";
import { addContact, getAllContacts, removeContact } from "../contact";

const mockStore = configureMockStore([thunk]);
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('testing appointments actions', () => {
    let store: any;

    const data = {
        contacts:
            [
                {
                    "date": "2021-07-02T15:56:10.423Z",
                    "email": "sevdamh@code.edu.az",
                    "message": "",
                    "name": "Sevda Huseynova",
                    "phoneNumber": 99434567,
                    "subject": "",
                    "_id": "60df371ae50dde730cc681ec"
                }
            ],
        totalCount: 1
    }

    beforeEach(() => {
        store = mockStore({ contactReducer: { ...initialStateContact } });
    });

    test('test loading contacts', async () => {

        (mockedAxios.get.mockImplementationOnce)(() =>
            Promise.resolve({
                data: data
            })
        );

        await store.dispatch(getAllContacts(1, 1000, ''));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: `${CONTACT_ACTIONS.GET_CONTACTS}_SUCCESS`,
            payload: data
        });
    })

    test('test delete contact', async () => {

        (mockedAxios.delete.mockImplementationOnce)

        await store.dispatch(removeContact("60df371ae50dde730cc681ec"));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: `${CONTACT_ACTIONS.DELETE_CONTACTS}_SUCCESS`,
            id: "60df371ae50dde730cc681ec"
        });
    })

    test('test creating contacts', async () => {
        const data: IContact =
        {
            "date": "2021-07-02T15:56:10.423Z",
            "email": "sevdamh@code.edu.az",
            "message": "",
            "name": "Sevda Huseynova",
            "phoneNumber": 99434567,
            "subject": "",
            "_id": "60df371ae50dde730cc681ec"
        };
        const newData: IContactPayload = {
            "email": "sevdamh@code.edu.az",
            "message": "",
            "name": "Sevda Huseynova",
            "phoneNumber": 99434567,
            "subject": "",
        };
        (mockedAxios.post.mockImplementationOnce)(() =>
            Promise.resolve(
                { data: data }
            )
        );

        await store.dispatch(addContact(newData));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: `${CONTACT_ACTIONS.ADD_CONTACTS}_SUCCESS`,
            payload: data
        });
    })

})