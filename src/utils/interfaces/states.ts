import { ICountryData } from '../../components/Statistics';
import { countryReducer } from './../../redux/reducers/country';
import { userReducer } from './../../redux/reducers/user';
import { IAppointmentData } from './appointment';
import { IBlogData } from './blogs';
import { IContact } from './contact';

interface IContactDAta {
    contacts: IContact[],
    totalCount: number
}

export interface IState {
    userReducer: {
        data: {}
        error: null
        status: string
    },
    countryReducer: {
        data: ICountryData,
        error: null
        status: string
    }
    contactReducer: {
        data: IContactDAta,
        error: null,
        status: string
    }
    blogReducer: {
        data: IBlogData,
        error: null,
        status: string
    }
    appoitmentReducer: {
        data: IAppointmentData,
        error: null,
        status: string
    }
}
