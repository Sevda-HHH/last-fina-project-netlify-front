import { IAppointment } from "./appointment";

export interface IContact {
    _id: string,
    name: string,
    phoneNumber: number,
    message?: string,
    email: string,
    subject?: string,
    date: string,
}
export interface IContactPayload {
    name: string,
    phoneNumber: number,
    message?: string,
    email: string,
    subject?: string,
}

export interface IContactState {
    error: null | string,
    data: {
        contacts: IContact[],
        totalCount: number,
    },
    status: string
}

export interface IAppointmentState {
    error: null | string,
    data: {
        appointments: IAppointment[],
        totalCount: number,
    },
    status: string
}