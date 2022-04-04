import React, { Component } from 'react';
import {Link , Redirect} from 'react-router-dom';
import './css/HomeCustomer.css';
import 'react-toastify/dist/ReactToastify.css';
import gnnxtechlogo from '../ClientFolder/Images/gnnxtechlogo.jpg';
import * as ImLocation2 from 'react-icons/im';
import * as CgPhone from 'react-icons/cg';
import * as MdEmail from 'react-icons/md';
class FooterBar extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {

           
        }
       
    }

    render()
    {

        return (
            

        <div className="footerBAR">


        <footer className="page-footer font-small indigo">


        <div className="container text-center text-md-left">


        <div className="row">


        <div className="col-md-3 mx-auto">

        <p className="font-weight-bold text-uppercase mt-3 mb-4 text-white">Users</p>

        <ul className="list-unstyled">
        <li >
            <Link to="/CustomerLogin" style={{textDecoration : "none",color : "white"}} >Customer</Link>
        </li>
        <li>
        <Link to="/userLogin" style={{textDecoration : "none",color : "white"}}>Seller</Link>
        </li>
        <li>
        <Link to="/DeliveryBoyLogin" style={{textDecoration : "none",color : "white"}}>Delivery boy</Link>
        </li>
        <li>
        <Link to="/Adminlogin" style={{textDecoration : "none",color : "white"}}>Admin</Link>
        </li>
       
        </ul>

        </div>


        <hr className="clearfix w-100 d-md-none" />


        <div className="col-md-3 mx-auto">


        <p className="font-weight-bold text-uppercase mt-3 mb-4 text-white">Policies</p>

        <ul className="list-unstyled">
        <li>
        <Link to="/returnPolicy" style={{textDecoration : "none",color : "white"}} target='_blank'>Return policy</Link>
        </li>
        <li>
        <Link to="/PrivacyPolicy" style={{textDecoration : "none",color : "white"}} target='_blank'>Privacy policy</Link>
        </li>
        <li>
        <Link to="/CancellationPolicy" style={{textDecoration : "none",color : "white"}} target='_blank'>Cancellation policy</Link>
        </li>
        <li>
        <Link to="/TermCondition" style={{textDecoration : "none",color : "white"}} target='_blank'>Terms & condition</Link>
        </li>
       
        </ul>

        </div>


        <hr className="clearfix w-100 d-md-none" />


        <div className="col-md-3 mx-auto">


        <p className="font-weight-bold text-uppercase mt-3 mb-4 text-white">Social</p>

        <ul className="list-unstyled">
        <li>
        <a style={{color : "white",textDecoration : "none"}} href="https://www.instagram.com/rainbowcart12345/">Instagram</a>
        </li>
        <li>
        <a style={{color : "white",textDecoration : "none"}} href="https://www.facebook.com/Rainbow-Cart-111539391316574/">Facebook</a>
        </li>
        <li>
        <a style={{color : "white",textDecoration : "none"}} href="https://www.youtube.com/channel/UCalIWOUfwq0OKahM62s4X6A">You tube</a>
        </li>
        <li>
        <a style={{color : "white",textDecoration : "none"}} href="https://twitter.com/cart_rainbow">Twitter</a>
        </li>
        </ul>

        </div>


        <hr className="clearfix w-100 d-md-none" />


        <div className="col-md-3 mx-auto">


        <p className="font-weight-bold text-uppercase mt-3 mb-4 text-white">Registered Office Address:</p>
            
            <p className="text-white"><ImLocation2.ImLocation2 /> Road No: 23,Rajiv Nagar, Patna -800024</p>  
            <p className="text-white"><CgPhone.CgPhone /> +91 7209589149</p>  
            <p className="text-white"><MdEmail.MdEmail /> rainbocart@gmail.com</p>  


        </div>


        </div>


        </div>

        <div className="row">

            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">

                <div style={{marginTop : "2%"}}>
                <p style={{color : "white"}}>Powerd by :</p>
                <img src={gnnxtechlogo} className="gnnxtechLogoImage" />
                </div>
               

            </div>

            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8">
            <div style={{marginTop : "7%"}}>
            <div className="footer-copyright text-center py-3 text-white">© {new Date().getFullYear()} Copyright:
                <a href="https://mdbootstrap.com/" className='text-white'> rainbocart.com</a>
                </div>

            </div>
            </div>

        </div>

        </footer>




        </div>

        

            
        
        )
    }
}


export default FooterBar;