import { HttpClient } from '../HttpClient'
import { IUser } from '../utils/interfaces/user';

class UserServices extends HttpClient {

    constructor() {
        super("https://server-final-project.herokuapp.com/auth")
    }
    async register(url = 'register', data: IUser) {
        const user = this.post(url, data).then(res => res.data)
        return user
    }
}

export const userServices = new UserServices();
