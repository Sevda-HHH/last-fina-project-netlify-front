import QRCode from "react-qr-code";
import { PagesHeading } from '../Utils/PagesHeading/index';
import { AddAppointmentForm } from './AddAppointmentForm';
import './appointment.scss'
export const OnlineAppointment = () => {
    return (
        <section id="appointment">
            <PagesHeading des="Get an appointment for a vaccination online !" pageName="Online Appointment" />
            <div className="container">
                <div className="row mt-5">
                    <div className="col-lg-6 qrCode text-orange">
                        <h1>Online Appointment</h1>
                        <h3>
                            Get an appointment for a vacbination
                        </h3>
                        <h4>
                            Enter via a QR code
                        </h4>
                        <QRCode value="192.168.28.12:3000/appointment" />
                    </div>
                    <div className="col-lg-6">
                        <AddAppointmentForm />
                    </div>
                </div>
            </div>
        </section >

    )
}

