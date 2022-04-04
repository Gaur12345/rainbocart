import react from 'react';
import ContactForm from '../ContactForm/ContactForm';
import mobileIcon from '../../assets/telephone.png';
import addressIcon from '../../assets/address.png';
import emailIcon from '../../assets/email.png';
import contactUSImage from '../../assets/contactUSImage.jpg';
import './ContectUS.css';
import HeaderNavBar from '../../moduls/Customer/Header.js';
import FooterBar from '../../moduls/Customer/FooterBar';
import SideBar from '../../moduls/Customer/sidebar/Sidebar';
//import './Mission.css';

const ContactUS = ()=>
{
    return(
        <div className="">
       
       <div className="setHeaderPositionFixed">
            <HeaderNavBar />
            <SideBar />
        </div>
        <div className='container aboutUSMainDiv'>
            <div className='row'>
            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
                <div>
                    <div>
                        <img src={mobileIcon} className="contectUSIcon" />
                    </div>
                    <div>
                        <h4>Call us</h4>
                    </div>
                    <div>
                        <p>+91 7209589149</p>
                    </div>
                </div>
            </div>
            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
            <div>
                    <div>
                    <img src={addressIcon} className="contectUSIcon" />
                    </div>
                    <div>
                        <h4>Address</h4>
                    </div>
                    <div>
                        <p className='contactUSText'>Road no:23, Rajiv nagar</p>
                        <p className='contactUSText'>Patna,Bihar</p>
                        <p className='contactUSText'>India,800024</p>
                    </div>
                </div>
            </div>

            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
             <div>
                    <div>
                    <img src={emailIcon} className="contectUSIcon" />
                    </div>
                    <div>
                        <h4>Email</h4>
                    </div>
                    <div>
                        <p>rainbocart@gmail.com</p>
                    </div>
                </div>
            </div>

          

            </div> 

            <hr />
            <div className='row contactUSmainDiv'>
            <div className='col-xl-5 col-lg-5 col-md-12 col-sm-12'>
                <div>
                <img src={contactUSImage} className="contactUSImage"/>
                </div>
            </div>
            <div className='col-xl-7 col-lg-7 col-md-12 col-sm-12'>
            <div>
                <p>INTERESTED IN DISCUSSING?</p>
                <ContactForm />
            </div>
            </div>
            </div> 

        </div>
        <FooterBar />
        </div>
    )
}

export default ContactUS;