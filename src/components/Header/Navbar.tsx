import React from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CovidLogo from '../../assets/img/CovidLogo.png'
import './navbar.scss'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Box } from '@material-ui/core'
import { ContactForm } from '../Contact'

export const NavBar = () => {
    const token = localStorage.getItem('token')
    let userName = '';
    const [openContactForm, setOpenContactForm] = React.useState(false);
    const handleOpenContactForm = () => {
        setOpenContactForm(true);
    };

    const hangleCloseContactForm = () => {
        setOpenContactForm(false);
    };
    if (token) {
        userName = JSON.parse(token).user.email
    }
    return (
        <>
            <ContactForm
                openContactForm={openContactForm}
                hangleCloseContactForm={hangleCloseContactForm}
            />

            <Navbar bg="light" expand="lg" >
                <Box id="logo" className="col-lg-4 ">
                    <Navbar.Brand  >
                        <Link to="/">
                            <img
                                alt=""
                                src={CovidLogo}
                                width="25%"
                                className=" d-inline-block align-top"
                            />{' '}
                        </Link>
                        {(token && JSON.parse(token).user.status === 'admin') && <h5 className="text-danger ">Admin Panel</h5>}
                    </Navbar.Brand>
                </Box>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <div className="row w-100 btnAndLinks">
                        <div className="col-lg-7  w-100 navLinkss  row justify-content-center">
                            <ul className="d-flex col-lg-6 navLinks list-unstyled justify-content-between">
                                <li>
                                    <Link to="/statistics">Statistics</Link>
                                </li>
                                <li>
                                    {(token && JSON.parse(token).user.status === 'admin') ? <Link to="/admin/blogs">Blogs</Link> : <Link to="/blogs">Blogs</Link>}
                                </li>
                                <li>
                                    <a className="#294e7d" onClick={handleOpenContactForm} >Contact</a>
                                </li>

                                {token ?
                                    <Navbar style={{
                                        zIndex: 19999,
                                        position: "fixed",
                                        left: "61%"
                                    }} expand="lg" >

                                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                                            <Nav className="me-auto">
                                                <NavDropdown title={<AccountCircleIcon className="text-dark " style={{ fontSize: "35px" }} />} id="basic-nav-dropdown">
                                                    <NavDropdown.ItemText  >{userName}</NavDropdown.ItemText>
                                                    {(token && JSON.parse(token).user.status === 'admin')
                                                        ?
                                                        <>
                                                            <NavDropdown.Item  ><Link to="/admin/appointments">Appointments </Link> </NavDropdown.Item>
                                                            <NavDropdown.Item  ><Link to="/admin/contactsInfo">Contacts  </Link></NavDropdown.Item>
                                                            <NavDropdown.Divider />
                                                            <NavDropdown.Item  ><Link to="/logout" className="text-danger ">Logout</Link></NavDropdown.Item>
                                                        </>
                                                        :
                                                        <>
                                                            <NavDropdown.Item  ><Link to="/myBlogs" >My Blogs</Link> </NavDropdown.Item>
                                                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                                            <NavDropdown.Divider />
                                                            <NavDropdown.Item  ><Link to="/logout" className="text-danger ">Logout</Link></NavDropdown.Item>
                                                        </>
                                                    }

                                                </NavDropdown>
                                            </Nav>
                                        </Navbar.Collapse>
                                    </Navbar>
                                    :
                                    <li className="#294e7d w-50"       >
                                        <Link className="text-orange" to="/login">Login</Link>
                                    </li>
                                }

                            </ul>
                        </div>
                        <div className="col-lg-4">
                            <div className="getVaccinatedBtn">
                                <button className="btn btn-primary d-block"><Link to="/appointment" className="text-white text-decoration-none" ><CalendarTodayIcon className="text-white pr-2" /> Online Appointment</Link></button>
                            </div>
                        </div>
                    </div>
                </Navbar.Collapse>
            </Navbar>

        </>
    )
}
