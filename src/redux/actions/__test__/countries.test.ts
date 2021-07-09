import axios from "axios";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialStateCountry } from "../../reducers/initialStates";
import { getAllCountriesSummary } from "../countries";

const mockStore = configureMockStore([thunk]);
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('testing statistics actions', () => {
    let store: any;

    const data = {
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
    };

    beforeEach(() => {
        store = mockStore({ countryReducer: { ...initialStateCountry } });
    });

    test('test loading statistics', async () => {

        (mockedAxios.get.mockImplementationOnce)(() =>
            Promise.resolve({
                data: data
            })
        );

        await store.dispatch(getAllCountriesSummary());
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'GET_STATISTICS_SUCCESS',
            payload: data
        });
    })
})
