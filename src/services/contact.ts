import { HttpClient } from '../HttpClient'
import { IContactPayload } from '../utils/interfaces/contact';

class ContactServices extends HttpClient {

    constructor() {
        super("http://localhost:8888");
    }
    getAllContacts(pageNo: number, itemCount: number, quo: string) {
        return this.get(`contact?pageNo=${pageNo}&itemCount=${itemCount}&searchQuery=${quo}`)
    }
    addContact(data: IContactPayload) {
        return this.post('contact', data)
    }
    deleteContact(id: string) {
        return this.delete(`contact`, id)
    }
}

export const contactServices = new ContactServices();
