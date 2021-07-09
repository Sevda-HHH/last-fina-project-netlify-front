export interface IUser {
    _id?: string,
    name: string,
    surname: string,
    email: string,
    phoneNumber: number,
    createdAt?: Date
    status?: 'admin' | 'user'

}
export interface IAuthUserPayload {
    email: string,
    password: string

}