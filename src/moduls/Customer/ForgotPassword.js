import React, { useEffect, useReducer, useRef, useState } from 'react';
import axios from 'axios';
import { Redirect, Link, useHistory } from 'react-router-dom';
import FooterBar from './FooterBar';
import capcha from '../ClientFolder/Images/captcha.png';
import refressCaptch from '../ClientFolder/Images/refresh.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Card, Modal } from 'react-bootstrap';
import WSppiner from '../../common/WSppiner';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from './Header';
import SideBar from './sidebar/Sidebar';
import logo from '../ClientFolder/Images/rainbow.png';
import { decryptData,encryptData} from './../sharedModuls/Utils/Utils';
const ForgotPassword = () => {
  const email = useRef(null);
  const history = useHistory();
  const key = "password";
  const captchaCode = useRef(null);
  const [showCaptchCode, setShowCaptchCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [show, setShow] = useState(false);

  const [clientVerify, setClientVerify] = useState(false);


  const sendEmailToCustomer = () => {
    let resData = encryptData((email.current.value), key);
    setIsLoading(true);
    axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/sendMail`,
      {
        customerEmailid: resData,
        type: "Customer"
      })
      .then(response => {
        setIsLoading(false);
        if (response.data == "EmailsendSuccessfully") {
          console.log(response.data);
          setClientVerify(!clientVerify);
        }


      })
      .catch(error => {
        setIsLoading(false);
        console.log("error ", error);
      })
  }
  const submitForm = (e) => {
    e.preventDefault();
    
    if (captchaCode.current.value === showCaptchCode) {
      if (email.current.value != null && email.current.value != "") {
        let resData = encryptData((email.current.value), key);
        console.log(email.current.value)
        setIsLoading(true);
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/customerEmailCheck`, { customerEmail: resData }).
          then(response => {
            console.log(response.data)
            let data = [];
                  
                  data = decryptData(response.data,key);
                  data = JSON.parse(data.toString());
                  console.log(data)
            
            if (email.current.value === data[0].cEmail) {
              setIsLoading(false);
              localStorage.setItem("customerForgotEmail", email.current.value);
              sendEmailToCustomer();
            }
            else {
              setIsLoading(false);
              toast.error('🦄 Email not exist !!!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }

          }).catch(error => {
            setIsLoading(false);
            console.log("Error hai ", error)
          })

      }
      else {
        setIsLoading(false);
        toast.error('🦄 Please Enter Company Email !!', {
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
      setIsLoading(false);
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
{isLoading && <WSppiner isLoading={isLoading} />}
      <Header />
      <SideBar />

      <div className="loginHeaderDivO pt-4">
        <div className="row">

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <img src={logo} className="rainbowImage" />
          </div>
        </div>

      </div>


      <div className="login card mt-2">
        <h1>Customer Forgot Password</h1>
        <form onSubmit={submitForm}>

          <input type="email" className="form-control col-sm-12" ref={email} placeholder="Register Email" id="email" required /><br />


          <div className="row">

            <div className="col-xl-12 ">

              <img src={capcha} className="captchaImageLogin" />   <h4 className="catchaCodeLogin">{showCaptchCode}</h4><br />

            </div>

            <div className="col-xl-12 ">

              <img src={refressCaptch} className="reFressCaptcha" onClick={handleCaptcha} />

            </div>

            <div className="col-xl-12 mt-2">


              <input type="text" name="captchaCode" ref={captchaCode} required placeholder="Enter CAPTCHA" className="form-control" autoComplete="off" />

            </div>

          </div>

          <div className="row">
            <div className="col-xl-6 col-md-12 col-sm-12">

              <div className="registrationDivMobileSet">
                <p className=""><Link to="/CustomerLogin" className=" LoginButtonNew">Login</Link></p>

              </div>

              <div className="loginDivMobileSet">
                <p className=""><input type="submit" name="commit" value="Submit" className="LoginButtonNew" /></p>

              </div>
            </div>


            <div className="col-xl-6 col-md-12 col-sm-12">

              <div className="loginDivMobileSetTwo">
                <p className=""><input type="submit" name="commit" value="Submit" className="LoginButtonNew" /></p>

              </div>


              <div className="registrationDivMobileSetTwo">
                <p className="registButton"><Link to="/CustomerLogin" className="placeOrder">Login</Link></p>

              </div>
            </div>
          </div>
        </form>
        <button className="supportButton mt-5" style={{ marginTop: "20px" }} onClick={handleModalPasss}><FontAwesomeIcon icon={faPhone} />&nbsp;&nbsp;&nbsp;&nbsp;Support</button>
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

                <h5>Please check your email for forgot Password.</h5>

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


export default ForgotPassword;