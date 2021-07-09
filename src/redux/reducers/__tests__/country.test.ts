import { IAction } from "../../../utils/interfaces/actions"
import { countryReducer } from "../country"
import { initialStateContact, initialStateCountry } from "../initialStates"

describe('testing appointments reducer', () => {
    let action: IAction = {
        type: `GET_STATISTICS_IDLE`,
        payload: null
    }
    test('initial state', () => {
        let expected = countryReducer(initialStateCountry, action);
        expect(expected).toBe(initialStateCountry);
    })

    test('test idle state', () => {
        action = {
            type: `GET_STATISTICS_IDLE`,
            payload: null,
        }
        let expected = countryReducer(initialStateCountry, action);

        expect(expected).toStrictEqual({
            ...initialStateCountry,
            status: 'IDLE',
            error: null
        });
    })

    // get 
    test('test error state get', () => {
        action = {
            type: `GET_STATISTICS_ERROR`,
            payload: "message: something went wrong"
        }
        let expected = countryReducer(initialStateCountry, action);

        expect(expected).toStrictEqual({
            ...initialStateContact,
            status: 'ERROR',
            error: action.payload,
            data: {},
        });
    })

    test('test success state get', () => {
        action = {
            type: `GET_STATISTICS_SUCCESS`,
            payload:
            {
                "ID": "96e9d461-0b8a-4f46-ba53-3efead718616",
                "Countries":
                    [
                        {
                            "Country": "Afghanistan",
                            "CountryCode": "AF",
                            "Date": "2021-06-20T03:54:45.82Z",
                            "ID": "6efd8a46-dba3-4537-98a1-b15f996df3a1",
                            "NewConfirmed": 0,
                            "NewDeaths": 0,
                            "NewRecovered": 449,
                            "Premium": {},
                            "Slug": "afghanistan",
                            "TotalConfirmed": 98734,
                            "TotalDeaths": 3934,
                            "TotalRecovered": 63875
                        },
                    ],
                "Date": "2021-06-20T03:54:45.82Z",
                "Global":
                {
                    "Date": "2021-06-20T03:54:45.82Z",
                    "NewConfirmed": 366160,
                    "NewDeaths": 8916,
                    "NewRecovered": 306386,
                    "TotalConfirmed": 177682872,
                    "TotalDeaths": 3851268,
                    "TotalRecovered": 115937280
                },
                "Message": "",
            },
        }
        let expected = countryReducer(initialStateCountry, action);

        expect(expected).toStrictEqual({
            ...initialStateContact,
            status: 'SUCCESS',
            data: action.payload,
            error: null
        });
    })
}
)