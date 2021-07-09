import { Dialog, DialogContent } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react'
import * as Yup from 'yup';
import { Transition } from '../Utils/Transirtion';
import './contactForm.scss'
import { addContact, getAllContacts } from '../../redux/actions/contact';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../utils/interfaces/states';

interface IProps {
    hangleCloseContactForm: () => void,
    openContactForm: boolean
}
export const ContactForm: React.FC<IProps> = ({ hangleCloseContactForm, openContactForm }) => {
    const contactsTotal = useSelector((state: IState) => state.contactReducer.data.totalCount)
    const dispatch = useDispatch()
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const ContactSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        message: Yup.string()
            .max(350, 'Too Long!'),
        subject: Yup.string()
            .max(350, 'Too Long!'),
        phoneNumber: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('Required'),

        email: Yup.string().email('Invalid email').required('Required'),
    });

    return (
        <div>
            <Dialog

                open={openContactForm}
                TransitionComponent={Transition}
                keepMounted
                onClose={hangleCloseContactForm}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent className="formContent">
                    <div className="title">
                        <h3>
                            Let’s Conversation
                            with Detox
                        </h3>
                    </div>
                    <div className="w-100 container-fluid">
                        <Formik
                            initialValues={{
                                name: '',
                                message: '',
                                email: '',
                                phoneNumber: 994,
                                subject: ''
                            }}
                            validationSchema={ContactSchema}
                            onSubmit={(values) => {
                                addContact(values)(dispatch).then(() => hangleCloseContactForm())
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
                                                name="email"
                                                placeholder="Your mail *"
                                                className="form-control" />
                                            {errors.email && touched.email ? (
                                                <div className="text-danger">{errors.email}</div>
                                            ) : null}
                                        </div>

                                        <div className="col-lg-6 mt-3">
                                            <Field placeholder="Your Phone *" name="phoneNumber" type="number" className="form-control" />
                                            {errors.phoneNumber && touched.phoneNumber ? (
                                                <div className="text-danger">{errors.phoneNumber}</div>
                                            ) : null}
                                        </div >

                                        <div className="col-lg-6 mt-3">
                                            <Field placeholder="Subject" name="subject" type="text" className="form-control" />
                                            {errors.subject && touched.subject ? <div className="text-danger">{errors.subject}</div> : null}
                                        </div><div className="col-12 mt-3">
                                            <Field component="textarea" placeholder="Message...   " style={{ height: "30vh" }} name="message" id="message" className="w-100 form-control" />
                                            {errors.message && touched.message ? <div className="text-danger">{errors.message}</div> : null}
                                        </div>

                                        <div className="signInBtn ">
                                            <button type="submit" className=" mt-3 btn btn-primary w-100">Sign Up </button>
                                        </div>
                                    </Form>

                                </div>


                            )}
                        </Formik>
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    );
}
