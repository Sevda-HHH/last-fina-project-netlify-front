import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SignUpBackgroun from '../../assets/img/LoginBackground.jpg'
import { useHistory } from 'react-router';
import { userServices } from '../../services/user';
import './register.scss'
import { Link, Redirect } from 'react-router-dom';

export const Register = () => {
    const { push } = useHistory()
    const token = localStorage.getItem('token')
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        surname: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        phoneNumber: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('Required'),

        email: Yup.string().email('Invalid email').required('Required'),
    });
    return token ? <Redirect to="/" /> :
        (<>
            <div>
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-lg-7 loginLeftSideImage   align-content-center"
                            style={{ height: "100vh", backgroundImage: ` url(${SignUpBackgroun})`, backgroundSize: "100%" }} >
                            <div className="w-100 text-dark" style={{ alignSelf: "center", }}>
                                <h2 className="loginTextHead">
                                    Welcome Back!
                                </h2>
                                <div className="row">
                                    <p className="col-lg-7 m-auto loginTextDes" >
                                        Lorem ipsum dolor sit amet,
                                        consectetur adipiscing elit.
                                        Duis tempus eleifend tortor,
                                        vel molestie orci feugiat sit amet.
                                        Donec posuere rhoncus tempus.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 loginForm  ">
                            <div className="heading">
                                Sign In
                            </div>
                            <div className="lilDes">
                                Free access to our dashboard.
                            </div>
                            <div className="w-100">
                                <Formik
                                    initialValues={{
                                        name: '',
                                        surname: '',
                                        email: '',
                                        phoneNumber: 994,
                                        password: ''
                                    }}
                                    validationSchema={SignupSchema}
                                    onSubmit={(values) => {
                                        const user = userServices.register('register', values)
                                        if (user != null) {
                                            push("/login")
                                        }
                                    }}
                                >
                                    {({ errors, touched }) => (
                                        <div className="container">
                                            <div className="row">
                                                <Form style={{ textAlign: "start" }}
                                                    className="col-lg-10 m-auto">

                                                    <label htmlFor="name">Name</label>
                                                    <Field
                                                        placeholder="Code"
                                                        name="name"
                                                        className="form-control" />
                                                    {errors.name && touched.name ? (
                                                        <div className="text-danger">{errors.name}</div>
                                                    ) : null}

                                                    <label htmlFor="surname">Surname</label>
                                                    <Field
                                                        name="surname"
                                                        placeholder="Academy"
                                                        className="form-control" />
                                                    {errors.surname && touched.surname ? (
                                                        <div className="text-danger">{errors.surname}</div>
                                                    ) : null}

                                                    <label htmlFor="password">Password</label>
                                                    <Field name="password" type="password" className="form-control" />
                                                    {errors.password && touched.password ? (
                                                        <div className="text-danger">{errors.password}</div>
                                                    ) : null}

                                                    <label htmlFor="email">Email</label>
                                                    <Field name="email" type="email" className="form-control" />
                                                    {errors.email && touched.email ? <div className="text-danger">{errors.email}</div> : null}

                                                    <label htmlFor="phoneNumber">Phone Number </label>
                                                    <Field name="phoneNumber" type="number" className="form-control" />
                                                    {errors.phoneNumber && touched.phoneNumber ? <div className="text-danger">{errors.phoneNumber}</div> : null}
                                                    <div className="signInBtn">
                                                        <button type="submit" className=" mt-3 btn btn-primary w-100">Sign Up </button>
                                                    </div>
                                                    <div className="mt-3 text-grey">
                                                        Have Already an Account? Then <Link to="/login">Login</Link>
                                                    </div>
                                                </Form>

                                            </div>
                                        </div>


                                    )}
                                </Formik>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
        )
}