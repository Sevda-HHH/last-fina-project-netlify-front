import { HttpClient } from '../HttpClient'

class AppointmentServices extends HttpClient {

    constructor() {
        super("http://localhost:8888");
    }
    getAppointments(pageNo: number, itemCount: number, quo: string) {
        return this.get(`appointment?pageNo=${pageNo}&itemCount=${itemCount}&searchQuery=${quo}`)
    }
    getAppoitmentById(id: string) {
        return this.get(`appointment/${id}`)
    }
    addAppointment(data: any) {
        return this.post('appointment', data)
    }
    updateAppointment(id: string, data: any) {
        return this.put('appointment', id, data)
    }
    deleteAppointment(id: string) {
        return this.delete(`appointment`, id)
    }
}

export const appointmentServices = new AppointmentServices();
