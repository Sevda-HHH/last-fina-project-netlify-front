import axios from "axios";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { APPOITNMENT_ACTIONS } from "../../../utils/enums/appointment";
import { initialStateAppointment } from "../../reducers/initialStates";
import { deleteAppointment, getAppointments } from "../appointment";


const mockStore = configureMockStore([thunk]);

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>
describe('testing appointments actions', () => {
    let store: any;

    const data = {
        appointments: [
            {
                "date": "2021-07-30T19:59:00.000Z",
                "email": "sevdamh@code.edu.az",
                "name": "Sevda",
                "note": "Adding a note for a vaccination appointment ",
                "phoneNumber": 994567890,
                "surname": "Huseynova",
                "_id": "60df36eae50dde730cc681eb"
            }
        ],
        totalCount: 1
    };

    beforeEach(() => {
        store = mockStore({ appoitmentReducer: { ...initialStateAppointment } });
    });

    test('test loading app  ointements', async () => {


        (mockedAxios.get.mockImplementationOnce)(() =>
            Promise.resolve({
                data: data
            })
        );

        await store.dispatch(getAppointments(1, 1000, ''));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: `${APPOITNMENT_ACTIONS.GET_APPOITNMENT}_SUCCESS`,
            payload: data
        });
    })

    test('test delete  appointments', async () => {

        (mockedAxios.delete.mockImplementationOnce)

        await store.dispatch(deleteAppointment("60df36eae50dde730cc681eb"));
        const actions = store.getActions();
        console.log(actions)
        expect(actions[0]).toEqual({
            type: `${APPOITNMENT_ACTIONS.DELETE_APPOITNMENT}_SUCCESS`,
            id: "60df36eae50dde730cc681eb"
        });
    })

})