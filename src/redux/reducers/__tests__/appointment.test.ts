import { APPOITNMENT_ACTIONS } from '../../../utils/enums/appointment';
import { IAction } from '../../../utils/interfaces/actions';
import { appoitmentReducer } from '../appointment';
import { initialStateAppointment } from '../initialStates';


describe('testing appointments reducer', () => {
    let action: IAction = {
        type: `${APPOITNMENT_ACTIONS.GET_APPOITNMENT}_IDLE`,
        payload: null
    }
    test('initial state', () => {
        let expected = appoitmentReducer(initialStateAppointment, action);
        expect(expected).toBe(initialStateAppointment);
    })

    test('test idle state', () => {
        action = {
            type: `${APPOITNMENT_ACTIONS.GET_APPOITNMENT}_IDLE`,
            payload: null,
        }
        let expected = appoitmentReducer(initialStateAppointment, action);

        expect(expected).toStrictEqual({
            ...initialStateAppointment,
            status: 'IDLE'
        });
    })

    // get 
    test('test error state get', () => {
        action = {
            type: `${APPOITNMENT_ACTIONS.GET_APPOITNMENT}_ERROR`,
            payload: "message: something went wrong"
        }
        let expected = appoitmentReducer(initialStateAppointment, action);

        expect(expected).toStrictEqual({
            ...initialStateAppointment,
            status: 'ERROR',
            error: action.payload,
            data: {},
        });
    })

    test('test success state get', () => {
        action = {
            type: `${APPOITNMENT_ACTIONS.GET_APPOITNMENT}_SUCCESS`,
            payload: {
                appointments:
                    [
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
            },
        }
        let expected = appoitmentReducer(initialStateAppointment, action);

        expect(expected).toEqual({
            ...initialStateAppointment,
            status: 'SUCCESS',
            data: action.payload,
            error: null
        });
    })

    // delete
    test('test error state delete', () => {
        action = {
            type: `${APPOITNMENT_ACTIONS.DELETE_APPOITNMENT}_ERROR`,
            payload: { "message": 'something went wrong' }
        }
        let expected = appoitmentReducer(initialStateAppointment, action);

        expect(expected).toStrictEqual({
            ...initialStateAppointment,
            status: 'ERROR',
            error: action.payload,
            data: {}
        });
    })

    test('test success state delete', () => {


        action = {
            type: `${APPOITNMENT_ACTIONS.DELETE_APPOITNMENT}_SUCCESS`,
            id: '60df36eae50dde730cc681eb'
        }
        let newData = {
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
        }
        const removedData = newData.appointments.filter(d => d._id !== action.id)

        let expected = appoitmentReducer(initialStateAppointment, action);

        expect(expected).toStrictEqual({
            ...initialStateAppointment,
            error: null,
            data: {
                ...initialStateAppointment.data,
                appointments: removedData,
                totalCount: initialStateAppointment.data.totalCount - 1
            },
            status: 'SUCCESS'
        });
    })

})
