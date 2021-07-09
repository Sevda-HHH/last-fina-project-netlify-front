import BackgroundImage from '../../../assets/img/BackgroundMainPage.png'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import IntroImage from '../../../assets/img/IntroImage.png'
import PhoneIcon from '@material-ui/icons/Phone';
import '../home.scss';
import { useState } from 'react';
import { ContactForm } from '../../Contact';
import { Link } from 'react-router-dom';

export const HomeIntro = () => {
    const [openContactForm, setOpenContactForm] = useState(false);

    const handleOpenContactForm = () => {
        setOpenContactForm(true);
    };
    const hangleCloseContactForm = () => {
        setOpenContactForm(false);
    };

    return (
        <>
            <ContactForm
                openContactForm={openContactForm}
                hangleCloseContactForm={hangleCloseContactForm}
            />
            <div className="container-fluid introMain" style={{ backgroundImage: ` url(${BackgroundImage})` }}>
                <div className="row introRow">
                    <div className="col-lg-6 mt-5 row justify-content-end">
                        <div className="col-lg-9">
                            <div className="preHead">
                                <h5>
                                    Stay Home, Stay Safe
                                </h5>
                            </div>
                            <div className="head">
                                Protect Yourself From Coronavirus (COVID-19)
                            </div>
                            <div className="des">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </div>
                            <div className="buttons  row justify-content-center">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-12 p-0">
                                    <div className="getVaccinatedBtn">
                                        <button className="btn btn-primary m-auto d-block">
                                            <Link to="/appointment" className="text-white text-decoration-none" >  <CalendarTodayIcon className="text-white" /> Appointment</Link></button>
                                    </div>
                                </div>
                                <div className="col-lg-6  col-md-6 col-sm-12 col-12 p-0">
                                    <div className="contactUsBtn">
                                        <button onClick={handleOpenContactForm} className=" btn btn-primary m-auto d-block"> <PhoneIcon className="phoneIcon" /> Contact Us </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="introPeopleImage col-lg-6">
                        <img
                            src={IntroImage}
                            alt="Intro , People with masks" />
                    </div>
                </div>
            </div>
        </>
    )
}
