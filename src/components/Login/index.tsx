import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './login.scss'
import { useHistory } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IAuthUserPayload } from '../../utils/interfaces/user';
import { login } from '../../redux/actions/user';
import LoginBackground from '../../assets/img/LoginBackground.jpg'

export const Login = () => {
    const token = localStorage.getItem('token')
    const { push } = useHistory()
    const dispatch = useDispatch()
    const SignupSchema = Yup.object().shape({
        email:
            Yup.string().email('Invalid email')
                .required('Please Enter an Email'),
        password:
            Yup.string()
                .required('Please Enter a Password'),
    });
    return token ? <Redirect to="/" /> :
        (
            <div>
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-lg-7 loginLeftSideImage   align-content-center" style={{ height: "100vh", backgroundImage: ` url(${LoginBackground})`, backgroundSize: "100%" }} >
                            <div className="w-100 text-dark" style={{ alignSelf: "center", }}>
                                <h2 className="  loginTextHead"  >
                                    Welcome Back!
                                </h2>
                                <div className="row" >
                                    <p className=" col-lg-7 m-auto loginTextDes"   >
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
                                        email: '',
                                        password: ''
                                    }}
                                    validationSchema={SignupSchema}
                                    onSubmit={(values: IAuthUserPayload) => {
                                        console.log(values)
                                        login(values)(dispatch).then(() => push("/"))
                                    }}
                                >
                                    {({ errors, touched }) => (
                                        <div className="container">
                                            <div className="row">

                                                <Form
                                                    style={{ textAlign: "start" }}
                                                    className="col-lg-10 m-auto"
                                                >
                                                    <label htmlFor="email" className="text-start">Email</label>
                                                    <Field
                                                        name="email"
                                                        type="email"
                                                        className="form-control formLoginEmail"
                                                        id="exampleInputEmail11"
                                                        placeholder="Sevdaaaa@gmail.com" />
                                                    {errors.email && touched.email ? <div className="text-danger">{errors.email}</div> : null}

                                                    <label htmlFor="password" className="mt-4">Password</label>
                                                    <Field
                                                        id="exampleInputPassword"
                                                        name="password"
                                                        type="password"
                                                        className="form-control bg-white" placeholder="aaa123" />
                                                    {errors.password && touched.password ? (
                                                        <div className="text-danger">{errors.password}</div>
                                                    ) : null}
                                                    <div className="signInBtn">
                                                        <button type="submit" className=" mt-3 btn btn-primary w-100">Sign In </button>
                                                    </div>
                                                    <div className="mt-3 text-grey">
                                                        Haven't Registered Yet? Then <Link to="/register">Register</Link>
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

        )
}