import { CONTACT_ACTIONS } from "../../../utils/enums/contact"
import { IAction } from "../../../utils/interfaces/actions"
import { contactReducer } from "../contact"
import { initialStateContact } from "../initialStates"

describe('testing appointments reducer', () => {
    let action: IAction = {
        type: `${CONTACT_ACTIONS.GET_CONTACTS}_IDLE`,
        payload: null
    }
    test('initial state', () => {
        let expected = contactReducer(initialStateContact, action);
        expect(expected).toBe(initialStateContact);
    })

    test('test idle state', () => {
        action = {
            type: `${CONTACT_ACTIONS.GET_CONTACTS}_IDLE`,
            payload: null,
        }
        let expected = contactReducer(initialStateContact, action);

        expect(expected).toStrictEqual({
            ...initialStateContact,
            status: 'IDLE'
        });
    })

    // get 
    test('test error state get', () => {
        action = {
            type: `${CONTACT_ACTIONS.GET_CONTACTS}_ERROR`,
            payload: "message: something went wrong"
        }
        let expected = contactReducer(initialStateContact, action);

        expect(expected).toStrictEqual({
            ...initialStateContact,
            status: 'ERROR',
            error: action.payload,
            data: {},
        });
    })

    test('test success state get', () => {
        action = {
            type: `${CONTACT_ACTIONS.GET_CONTACTS}_SUCCESS`,
            payload: {
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
            },
        }
        let expected = contactReducer(initialStateContact, action);

        expect(expected).toEqual({
            ...initialStateContact,
            status: 'SUCCESS',
            data: action.payload,
            error: null
        });
    })

    // delete
    test('test error state delete', () => {
        action = {
            type: `${CONTACT_ACTIONS.GET_CONTACTS}_ERROR`,
            payload: { "message": 'something went wrong' }
        }
        let expected = contactReducer(initialStateContact, action);

        expect(expected).toStrictEqual({
            ...initialStateContact,
            status: 'ERROR',
            error: action.payload,
            data: {}
        });
    })

    test('test success state delete', () => {
        action = {
            type: `${CONTACT_ACTIONS.DELETE_CONTACTS}_SUCCESS`,
            id: '60df371ae50dde730cc681ec'
        }
        let newData = {
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

        const removedData = newData.contacts.filter(d => d._id !== action.id)
        let expected = contactReducer(initialStateContact, action);

        expect(expected).toStrictEqual({
            ...initialStateContact,
            error: null,
            data: {
                ...initialStateContact.data,
                contacts: removedData,
                totalCount: initialStateContact.data.totalCount - 1
            },
            status: 'SUCCESS'
        });
    })

    // add
    test('test error state delete', () => {
        action = {
            type: `${CONTACT_ACTIONS.ADD_CONTACTS}_ERROR`,
            payload: { "message": 'something went wrong' }
        }
        let expected = contactReducer(initialStateContact, action);

        expect(expected).toStrictEqual({
            ...initialStateContact,
            status: 'ERROR',
            error: action.payload,
            data: {}
        });
    })

    test('test success state delete', () => {
        let newData =
        {
            "date": "2021-07-02T15:56:10.423Z",
            "email": "sevdamh@code.edu.az",
            "message": "",
            "name": "Sevda Huseynova",
            "phoneNumber": 99434567,
            "subject": "",
            "_id": "60df371ae50dde730cc681ec"
        }

        action = {
            type: `${CONTACT_ACTIONS.ADD_CONTACTS}_SUCCESS`,
            payload: newData
        }

        let expected = contactReducer(initialStateContact, action);

        expect(expected).toStrictEqual({
            ...initialStateContact,
            error: null,
            data: {
                ...initialStateContact.data,
                contacts: [...initialStateContact.data.contacts, action.payload],
                totalCount: initialStateContact.data.totalCount + 1
            },
            status: 'SUCCESS'
        });
    })

})