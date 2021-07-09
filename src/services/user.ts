import { HttpClient } from '../HttpClient'
import { IUser } from '../utils/interfaces/user';

class UserServices extends HttpClient {

    constructor() {
        super("http://localhost:8888/auth")
    }
    async register(url = 'register', data: IUser) {
        const user = this.post(url, data).then(res => res.data)
        return user
    }
}

export const userServices = new UserServices();
