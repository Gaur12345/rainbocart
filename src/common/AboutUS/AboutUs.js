import react from 'react';
import aboutUs from '../../assets/rainbocartIcon.png';
import './AboutUs.css';
import sanatImage from '../../assets/sanatImage.jpg';
import kishorImage from '../../assets/kishorImage.jpg';
import ApurvaImage from '../../assets/ApurvaImage.jpg';
import GauravImage from '../../assets/GauravImage.jpg';
import ashan from '../../assets/ashan.png';
import ramImage from '../../assets/Ram.jpg';
import HeaderNavBar from '../../moduls/Customer/Header.js';
import FooterBar from '../../moduls/Customer/FooterBar';
import SideBar from '../../moduls/Customer/sidebar/Sidebar';

const AboutUS = ()=>
{
    return(
        <>
       <div className="setHeaderPositionFixed">
            <HeaderNavBar />
            <SideBar />
        </div>
        <div className='container aboutUSMainDiv '>
            <div className='row' style={{backgroundColor: "white"}}>
            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12 '>
                 <img src={aboutUs} className="konwAboutImage" />
            </div>

            <div className='col-xl-8 col-lg-8 col-md-12 col-sm-12'>
                <div className='aboutUsTextHeading'>
                    <h4 className='aboutUSHeadingText'><b>Who we are</b></h4>
                    <p className='aboutUSTextDescription'>The idea of rainbocart is taken from the colors of rainbow , 
                    how all the color comes together and make it a beautiful view,like that we bring seller and customer together here,
                     where anyone can be a seller and anyone can be a customer. the platform is open for anyone who meets the customers needs and need a platform to interactive 
                     and sell and also we provide customer a new experience of online shopping.
                    </p>
                    
                </div>
            </div>
            </div> 
        </div>
        <div className='container meetTeamTitle2'>
                <div className='row'>
                    <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
                        <div>
                            <b>Unique E-Shopping Experience</b>
                        </div>
                        <div className='teamDetails'>
                            We Provide our Customer a new and unique experience of online shopping.
                        </div>
                    </div>
                    <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
                        <div>
                            <b>Bringing our Seller and Customer Together</b>
                        </div>
                        <div className='teamDetails'>
                            We are removing the barrier between the seller and customer and making the E-shopping more interactive and easy.
                        </div>
                    </div>
                    <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
                        <div>
                            <b>Made In India</b>
                        </div>
                        <div className='teamDetails'>
                            Design in India is as important as Make in India.
                        </div>
                    </div>

                </div> 
        </div>


        <div className='container meetTeamTitle'>
            <div className='row'>
            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                <div className='meetTeamTitleSecond'>
                    <div>
                        <h4><u>Meet our Parent Company</u></h4>
                    </div>
                    <div>
                        <p><b>Rainbocart</b> is one of the product of <b>Glosly Needble Next Technology Private Limited (GnnxTech)</b>.</p>
                        <button className='companylink'><a href='https://www.gnnxtech.com/' target='blank' style={{textDecoration:'none',color:'white'}}>Click Here</a></button>
                    </div>
                </div>
            </div>
            </div> 
        </div>

            

        <FooterBar/>
        </>
    )
}

export default AboutUS;