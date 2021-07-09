import { IBlogState } from "../../utils/interfaces/blogs"
import { IAppointmentState, IContactState } from "../../utils/interfaces/contact"

export const initialStateCountry = {
    error: null,
    data: {},
    status: "IDLE"
}

export const initialStateContact: IContactState = {
    error: null,
    data: {
        contacts: [],
        totalCount: 0,
    },
    status: "IDLE"
}

export const initialStateBlog: IBlogState = {
    error: null,
    data: {
        blogs: [],
        totalCount: 0,
    },
    status: "IDLE"
}

export const initialStateAppointment: IAppointmentState = {
    error: null,
    data: {
        appointments: [],
        totalCount: 0,
    },
    status: "IDLE"
}

export const initialStateAuth = {
    error: null,
    data: {},
    status: "IDLE"
}