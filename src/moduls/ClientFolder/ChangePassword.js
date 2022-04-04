import React, { useEffect, useReducer, useRef, useState } from 'react';
//import './css/ClientLogin.css';
import axios from 'axios';
import { Redirect ,Link,useHistory} from 'react-router-dom';
import capcha from '../ClientFolder/Images/captcha.png';
import refressCaptch from '../ClientFolder/Images/refresh.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, Card,Modal} from 'react-bootstrap';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../ClientFolder/Images/rainbow.png';
import Header from './../Customer/Header';
import SideBar from './sidebar/Sidebar';
import FooterBar from './../Customer/FooterBar';
import WSppiner from '../../common/WSppiner';
import {encryptData,decryptData} from '../sharedModuls/Utils/Utils';
const crypto =require('crypto-js');

const ChnagePassword = (props)=>
{

    // const [email ,setEmail] = useState("");
    // const [password , setPassword] = useState("");

    const newPassword = useRef(null);
    const confirPassword = useRef(null);
    const history = useHistory();

    const  captchaCode = useRef(null);
    const [showCaptchCode, setShowCaptchCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [show , setShow] = useState(false);

    const [clientVerify , setClientVerify] = useState(false);


 
    let token = localStorage.getItem("customerForgotEmail");

   // console.log("Chnage Password page ",token);

    if(token == null || token == "")
    {
        history.push("/SellerForgotPassword");
    }


   // console.log("Data Props is ",props.codeNumber);

    const submitForm = (e)=>
    {
        e.preventDefault();


        if(captchaCode.current.value === showCaptchCode)
        {
            if(newPassword.current.value !="" &&  confirPassword.current.value !="" && newPassword.current.value !=null &&  confirPassword.current.value !=null)
            {

                if(newPassword.current.value  === confirPassword.current.value)
                {
                  let key="password";
                  let emailEnc = encryptData(token,key);
                  let passwordEnc = encryptData(newPassword.current.value,key);
                  console.log("call area");
                  setIsLoading(true);
                  axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/sellerForgotPassword`,
                    {
                      emailID : emailEnc,
                      password  : passwordEnc
                    
                    }).then(response=>{
      
                      if(response.data == "ChnageSuccessfully")
                      {
              
                        setIsLoading(false);
                        toast.success('🦄 Password Change Successfully !!!', {
                          position: "top-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          });


                          setTimeout(()=>{

                            history.push("/userLogin");

                          },3000);


                      }
                     
              
                  }).catch(error=>{
                    setIsLoading(false);
                      console.log("Error Call ",error)
                  })  
                }
                else
                {
                  setIsLoading(false);
                    toast.error('🦄 New Password and confirm password must be same !!!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }

                              
    
            }
            else
            {
                toast.error('🦄 Enter the New password !!!', {
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
        else
        {
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

        
    const handleModalPasss = ()=>
    {
      setShow(!show);
    }


    const handleClientVerify = ()=>
    {
      setClientVerify(!clientVerify);
    }
 
 


    useEffect(()=>{


        let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 7;
	    var randomstring = '';

        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }

        setShowCaptchCode(randomstring);

    },[])



    const handleCaptcha = () =>
    {
       
        let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 7;
	    var randomstring = '';

        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }

        setShowCaptchCode(randomstring);
    }





    return(

        <div className="regFormColor">
{isLoading && <WSppiner isLoading={isLoading} />}
      <Header />
        <SideBar />

        <div className="loginHeaderDivO pt-5">
            <div className="row">
            
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <img src={logo}  className="rainbowImage" />
              </div>
            </div>

            </div>


<div className="login card">
  <h1>Change Password</h1>
  <form onSubmit={submitForm}>

  <input type="password" className="form-control col-sm-12" ref={newPassword} placeholder="New Password" id="newpassword"   required /><br />
  <input type="password" className="form-control col-sm-12" ref={confirPassword} placeholder="Confirm Password" id="confirmpassword"   required /><br />



  <div className="row">

        <div className="col-xl-5 col-md-12 col-sm-12">
        
        <img src={capcha} className="captchaImageLogin" />   <h4 className="catchaCode">{showCaptchCode}</h4><br />

        </div>

        <div className="col-xl-2 col-md-2 col-sm-2">

        <img src={refressCaptch} className="reFressCaptcha"  onClick={handleCaptcha} />

        </div>

        <div className="col-xl-5 col-md-5 col-sm-5">

            
        <input type="text" name="captchaCode"  ref={captchaCode}  required placeholder="Enter CAPTCHA code" className="form-control" autoComplete="off" />

        </div>





  </div>

 

  <div className="row">
        <div className="col-xl-6 col-md-12 col-sm-12">

        <div className="registrationDivMobileSet">
        <p className="registButton"><Link to="/CustomerLogin"  className="btn btn-primary">Login</Link></p>
          
        </div>

        <div className="loginDivMobileSet">
        <p className="LoginButton"><input type="submit" name="commit" value="Submit"  className="btn btn-primary"/></p>

        </div>
        </div>


        <div className="col-xl-6 col-md-12 col-sm-12">

        <div className="loginDivMobileSetTwo">
        <p className="LoginButton"><input type="submit" name="commit" value="Submit"  className="btn btn-primary"/></p>

        </div>

        
        <div className="registrationDivMobileSetTwo">
        <p className="registButton"><Link to="/CustomerLogin"  className="btn btn-primary">Login</Link></p>
          
        </div>
        </div>
    </div>

    {/* <p className="remember_me">

   
    <p className="registButton"><Link to="/"  className="btn btn-primary">New Registration</Link>
    </p>

    </p> */}

   



  
        
  </form>
  <button className="btn btn-primary" style={{marginTop : "20px"}} onClick={handleModalPasss}><FontAwesomeIcon icon={faPhone} />&nbsp;&nbsp;&nbsp;&nbsp;Support</button>
</div>

<FooterBar/>
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
                     

                     <p>Saurabh Jain</p>
                     <p>saurabh.jain@theother2thirds.com</p>
                     <p>+919820642246</p>
                     <p>+918080579009</p>

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


export default ChnagePassword;