import { TextField } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import moment from 'moment'
import { useState } from 'react'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { appointmentServices } from '../../services/appointment'
import { IAppointment } from '../../utils/interfaces/appointment'
export const AddAppointmentForm = () => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const [chosenDate, setChosenDate] = useState('')

    const ContactSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        note: Yup.string()
            .max(350, 'Too Long!'),
        surname: Yup.string(),
        phoneNumber: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        date: Yup.string()
    });

    return (
        <div className="formContent bg-light">
            <div className="title">
                <h3>
                    Get An Appointment
                </h3>
            </div>
            <div className="w-100 container-fluid">
                <Formik
                    initialValues={{
                        name: '',
                        note: '',
                        email: '',
                        phoneNumber: 994,
                        surname: '',
                        date: ''
                    }}

                    validationSchema={ContactSchema}
                    onSubmit={async (values) => {

                        const appointments = await appointmentServices.getAppointments(1, 10000, "").then(res => res.data.appointments)
                        const warnRequired = document.querySelector('.dateWarningRequired')
                        const warnNotAvailable = document.querySelector('.dateWarningUnavailable')
                        const warnHasPast = document.querySelector('.dateWarningHasPast')
                        const now = moment(Date.now())

                        values.date = chosenDate
                        if (chosenDate === '') {
                            warnRequired!.classList.remove("d-none")
                            warnNotAvailable!.classList.add("d-none")
                        } else {
                            if (moment(values.date).diff(now) <= 0) {
                                warnRequired!.classList.add("d-none")
                                warnNotAvailable!.classList.add("d-none")
                                warnHasPast!.classList.remove("d-none")

                            } else {
                                warnHasPast!.classList.add("d-none")
                                let count = 0
                                await appointments.map((appoint: IAppointment) => {
                                    if (moment(values.date).diff(appoint.date) < 0) {
                                        if (moment(values.date).diff(appoint.date) * (-1) <= 1795471) {
                                            count = count + 1
                                        }
                                    }
                                    else {
                                        if (moment(values.date).diff(appoint.date) <= 1795471) {
                                            count = count + 1
                                        }
                                    }
                                })
                                if (count <= 0) {
                                    await warnNotAvailable!.classList.add("d-none")
                                    await appointmentServices.addAppointment(values)
                                    Swal.fire(
                                        'Success!',
                                        `You have successfully got an appointment for ${moment(values.date).format("DD/MM/yy")} at  ${moment(values.date).format("HH:mm")} `,
                                        'success'
                                    )
                                }
                                else {
                                    warnRequired!.classList.add("d-none")
                                    warnNotAvailable!.classList.remove("d-none")
                                }
                            }
                        }
                    }}
                >
                    {({ errors, touched }) => (
                        <div className="row">
                            <Form style={{ textAlign: "start" }}
                                className=" m-auto row">
                                <div className="col-lg-6 mt-3">
                                    <Field
                                        placeholder="First name *"
                                        name="name"
                                        className="form-control" />
                                    {errors.name && touched.name ? (
                                        <div className="text-danger">{errors.name}</div>
                                    ) : null}
                                </div>

                                <div className="col-lg-6 mt-3">
                                    <Field
                                        name="surname"
                                        placeholder="Your surname *"
                                        className="form-control" />
                                    {errors.surname && touched.surname ? (
                                        <div className="text-danger">{errors.surname}</div>
                                    ) : null}
                                </div>

                                <div className="col-lg-6 mt-3">
                                    <Field placeholder="Your Phone *" name="phoneNumber" type="number" className="form-control" />
                                    {errors.phoneNumber && touched.phoneNumber ? (
                                        <div className="text-danger">{errors.phoneNumber}</div>
                                    ) : null}
                                </div >

                                <div className="col-lg-6 mt-3">
                                    <Field
                                        name="email"
                                        placeholder="Your mail *"
                                        className="form-control" />
                                    {errors.email && touched.email ? (
                                        <div className="text-danger">{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="col-12 mt-3">
                                    <TextField
                                        id="datetime-local"
                                        name="date"
                                        label="Pick up a date and time "
                                        type="datetime-local"
                                        value={chosenDate}
                                        onChange={(evt) => setChosenDate(evt.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                    <div className="text-danger d-none dateWarningRequired">
                                        Please pick date and time
                                    </div>
                                    <div className="text-danger d-none dateWarningUnavailable">
                                        This date/time is full .Please pick another time
                                    </div>
                                    <div className="text-danger d-none dateWarningHasPast">
                                        This date/time has passed
                                    </div>

                                </div>
                                <div className="col-12 mt-3">
                                    <Field component="textarea" placeholder="Note to add...   " style={{ height: "30vh" }} name="note" id="note" className="w-100 form-control" />
                                    {errors.note && touched.note ? <div className="text-danger">{errors.note}</div> : null}
                                </div>

                                <div className="signInBtn ">
                                    <button type="submit" className=" mt-3 btn btn-primary w-100">Sign Up </button>
                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>
            </div >

        </div >
    )
}
