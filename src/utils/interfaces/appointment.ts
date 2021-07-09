export interface IAppointmentPayload {
    name: string,
    surname?: string,
    email: string,
    phoneNumber: number,
    note?: string,
    date: string

}
export interface IAppointment {
    _id: string,
    name: string,
    surname?: string,
    email: string,
    phoneNumber: number,
    note?: string
    date: string
}
export interface IAppointmentData {
    appointments: IAppointment[],
    totalCount: number
}