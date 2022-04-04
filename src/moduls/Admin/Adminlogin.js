import React, { useEffect, useReducer, useRef, useState } from 'react';
// import './css/ClientLogin.css';
import axios from 'axios';
import { Redirect, Link, useHistory } from 'react-router-dom';

import logo from '../ClientFolder/Images/rainbow.png';
import success from '../ClientFolder/Images/check.svg';
import wrong from '../ClientFolder/Images/close.svg';
import capcha from '../ClientFolder/Images/captcha.png';
import refressCaptch from '../ClientFolder/Images/refresh.png';
import SideBar from './sidebar/Sidebar';
import FooterBar from '../Customer/FooterBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Card, Modal } from 'react-bootstrap';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../Customer/Header';


const Adminlogin = () => {
  const email = useRef(null);
  const password = useRef(null);
  const history = useHistory();

  const captchaCode = useRef(null);
  const [showCaptchCode, setShowCaptchCode] = useState("");


  const [show, setShow] = useState(false);

  const [clientVerify, setClientVerify] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();


    if (captchaCode.current.value === showCaptchCode) {
      if (email.current.value != null && email.current.value != "" && password.current.value != null && password.current.value != "") {


        axios.post('http://localhost:4000/adminLogin',
          {

            email: email.current.value,
            password: password.current.value
          })

          .then(response => {

            if (response.data[1] === "loginSuccessfully") {

              sessionStorage.setItem("admiId", response.data[0].Id);
              sessionStorage.setItem("adminEmail", response.data[0].aEmail);
              sessionStorage.setItem("adminMobile", response.data[0].aMobile);
              sessionStorage.setItem("adminName", response.data[0].aName)

              history.push("/adminHome")
            }
            else {
              toast.error('🦄 Email or Password Invalid !!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              // NotificationManager.error('Email or Password Invalid !!', 'Error Message !', 3000);

            }

          })
          .catch(error => {
            console.log(error)
          })

      }
      else {
        toast.error('🦄 Email or Password Invalid !!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        //  NotificationManager.error('Email or Password Invalid !!', 'Error Message !', 2000);
      }

    }
    else {
      toast.error('🦄 Please Enter Valid Captcha Code !!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      //  NotificationManager.error('Email or Password Invalid !!', 'Error Message !', 2000);
    }




  }


  const handleModalPasss = () => {
    setShow(!show);
  }


  const handleClientVerify = () => {
    setClientVerify(!clientVerify);
  }




  useEffect(() => {


    sessionStorage.clear();
    localStorage.clear();

    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 7;
    var randomstring = '';

    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }

    setShowCaptchCode(randomstring);

  }, [])



  const handleCaptcha = () => {

    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 7;
    var randomstring = '';

    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }

    setShowCaptchCode(randomstring);
  }





  return (

    <div className="regFormColor">

      <Header />
      <SideBar />


      <div className="loginHeaderDivO pt-1">
        <div className="row mt-3">

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <img src={logo} className="rainbowImage" />
          </div>
        </div>

      </div>




      <div className="login card">
        <h1>Admin Login to</h1>
        <form onSubmit={submitForm}>

          <input type="text" className="form-control col-sm-12" ref={email} placeholder="Enter email or mobile" id="email" required /><br />
          <input type="password" className="form-control col-sm-12" ref={password} placeholder="Password" id="password" required /><br />



          <div className="row">

            <div className="col-xl-12">
              <img src={capcha} className="captchaImageLogin" />   <h4 className="catchaCodeLogin">{showCaptchCode}</h4><br />
            </div>

            <div className="col-xl-12 ">
              <img onClick={handleCaptcha} className="reFressCaptcha" src="https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/64/000000/external-refresh-arrow-kmg-design-detailed-outline-kmg-design.png" />
              {/* <img src={refressCaptch} className="reFressCaptcha" onClick={handleCaptcha} /> */}
            </div>

            <div className="col-xl-12 mt-2">
              <input type="text" name="captchaCode" ref={captchaCode} required placeholder="Enter CAPTCHA " className="form-control col-sm-12" autoComplete="off" />
            </div>

          </div>



          <div className="row  mt-2" style={{ justifyContent: "center"  }}>
            <div className="col-xl-6 col-md-12 col-sm-12">

              <p className=""><input type="submit" name="commit" value="Login" className="LoginButtonNew" /></p>



            </div>
          </div>

          {/* <p className="remember_me">

   
    <p className="registButton"><Link to="/"  className="placeOrder">New Registration</Link>
    </p>

    </p> */}





          <div className="login-help">
            <p style={{ color: "black" }}>Forgot your password?  <Link to="/DeliveryForgotPassword"   ><span className="forgotPass">Click here to reset it.</span></Link></p>

          </div>


        </form>
        <button className="supportButton" style={{ marginBottom: "3px" }} onClick={handleModalPasss}><FontAwesomeIcon icon={faPhone} />&nbsp;&nbsp;&nbsp;&nbsp;Support</button>
      </div>

      <FooterBar />
      <ToastContainer />


      <Modal size="md" show={clientVerify} onHide={handleClientVerify}>
        <Modal.Header closeButton>
          <Modal.Title>  </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">

              <div className="col-xl-12 col-md-12 col-sm-12">

                <h5>Please check your email to verify your email address before login.</h5>

              </div>
            </div>
          </div>


        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" onClick={handleClientVerify}>
            OK
          </Button>

        </Modal.Footer>
      </Modal>





      <Modal size="md" show={show} onHide={handleModalPasss}>
        <Modal.Header closeButton>
          <Modal.Title> Support </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">

              <div className="col-xl-12 col-md-12 col-sm-12">


                <div>

                  <p>Rainbow Cart Support</p>
                  <p>rainbocart12345@gmail.com</p>
                  <p>+91 7209589149</p>
                </div>

              </div>
            </div>
          </div>


        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" onClick={handleModalPasss}>
            OK
          </Button>

        </Modal.Footer>
      </Modal>




    </div>
  )
}


export default Adminlogin;