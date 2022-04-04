import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
// import './css/RegistrationForm.css';
import logo from '../ClientFolder/Images/rainbow.png';
import Select from 'react-select';
import validator from 'validator';
import success from '../ClientFolder/Images/check.svg';
import wrong from '../ClientFolder/Images/close.svg';
import capcha from '../ClientFolder/Images/captcha.png';
import refressCaptch from '../ClientFolder/Images/refresh.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FooterBar from '../Customer/FooterBar';
import { Button, Card, Modal } from 'react-bootstrap';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../Customer/Header';
import SideBar from './sidebar/Sidebar';
import { encryptData, decryptData } from '../sharedModuls/Utils/Utils';
const gender = [

    { name: "gender", value: "Male", label: "Male" },
    { name: "gender", value: "Female", label: "Female" },
    { name: "gender", value: "Transgender", label: "Transgender" },
]


const shopCategory = [

    { name: "shopCategory", value: "Cloth", label: "Cloth" }
]


const allState = [

    { name: "State", value: "Bihar", label: "Bihar" }
]

const allCountry = [

    { name: "Country", value: "India", label: "India" }
]



class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {

            goForword: false,
            name: "",
            mobileNumber: "",
            email: "",
            gender: "",
            address: "",
            city: "",
            stateIs: "",
            country: "",
            pinCode: "",
            title: "",
            termConn: false,
            password: "",
            confirmPassword: "",
            captchaCode: "",
            showCaptchCode: "",
            aadhaarNo: "",
            panNo: "",
            show: false,
            modelShow: false
        }
    }

    handleChnageALl = (event) => {

        this.setState({ [event.target.name]: event.target.value });

    }


    handleModalPasss = () => {
        this.setState({ show: !this.state.show });
    }






    handleSubmit = (event) => {
        event.preventDefault();


        let msg = "";

        let checkError = true;

        let panRgex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        let aadharRgex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;

        if (this.state.panNo == null || this.state.panNo == "" || this.state.panNo == undefined) {
            if (msg == "") {
                msg = "Please Fill Gender !!!";
            }
            checkError = false;

        }

        if (panRgex.test(this.state.panNo) == false) {
            if (msg == "") {
                msg = "Please Enter Valid PAN Number";
            }
            checkError = false;
        }


        if (this.state.aadhaarNo == null || this.state.aadhaarNo == "" || this.state.aadhaarNo == undefined) {
            if (msg == "") {
                msg = "Please Fill Aadhaar no !!!";
            }
            checkError = false;

        }

        if (aadharRgex.test(this.state.aadhaarNo) == false) {
            alert(this.state.aadhaarNo)
            if (msg == "") {
                msg = "Please Enter Valid Aadhaar Number";
            }
            checkError = false;
        }






        if (this.state.gender == null || this.state.gender == "" || this.state.gender == undefined) {

            if (msg == "") {
                msg = "Please Fill Gender !!!";
            }
            checkError = false;

        }


        if (this.state.stateIs == null || this.state.stateIs == "" || this.state.stateIs == undefined) {
            if (msg == "") {
                msg = "Please select state Option !!!";
            }
            checkError = false;

        }


        if (this.state.country == null || this.state.country == "" || this.state.country == undefined) {
            if (msg == "") {
                msg = "Please Select country option !!!";
            }
            checkError = false;

        }

        if (this.state.password != this.state.confirmPassword) {

            if (msg == "") {
                msg = "🦄 Password and Confirm Password must be same !!!";
            }
            checkError = false;

        }


        if (this.state.captchaCode != this.state.showCaptchCode) {
            if (msg == "") {
                msg = "🦄 Please Enter Valid Captcha Number !!!";
            }
            checkError = false;

        }


        if (checkError == true) {
            const key = "password";
            const name = encryptData((this.state.name), key);
            const mobileNumber = encryptData((this.state.mobileNumber), key);
            const email = encryptData((this.state.email), key);
            const gender = encryptData((this.state.gender.value), key);
            const address = encryptData((this.state.address), key);
            const city = encryptData((this.state.city), key);
            const stateIs = encryptData((this.state.stateIs.value), key);
            const country = encryptData((this.state.country.value), key);
            const pinCode = encryptData((this.state.pinCode), key);
            const password = encryptData((this.state.password), key);
            const panNo = encryptData((this.state.panNo), key);
            const aadharNo = encryptData((this.state.aadhaarNo), key);

            
            let payLoad = {
                name: name,
                mobileNumber: mobileNumber,
                email: email,
                gender: gender,
                address: address,
                city: city,
                stateIs: stateIs,
                country: country,
                pinCode: pinCode,
                password: password,
                aadharNo:aadharNo,
                panNo:panNo
            }

            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/deliveryBoySignUp`, payLoad)
                .then(response => {


                    if (response.data === "deliveryboyRegister") {

                        this.setState({ goForword: true });

                    }
                    else {

                        let errorMsg = response.data.sqlMessage.split(" ");
                        toast.error(errorMsg[2] + " already exist !!!", {
                            position: "bottom-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }

                })
                .catch(error => {
                    console.log(error)
                })

        }
        else {

            toast.error(msg, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }

    }


    handleCaptcha = () => {

        let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 7;
        var randomstring = '';

        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }

        this.setState({ showCaptchCode: randomstring });
    }

    componentDidMount() {

        // sessionStorage.clear();
        // localStorage.clear();


        let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 7;
        var randomstring = '';

        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }

        this.setState({ showCaptchCode: randomstring });

    }


    reloadWebPage = () => {
        window.location.reload();


    }


    handleClientVerify = () => {
        this.setState({ modelShow: !this.state.modelShow });


    }


    reloadFunction = () => {
        window.location.reload()
    }

    imageHandler = e => {

        const reader = new FileReader();
        // reader.onload = () => {
        //   if (reader.readyState === 2) {
        //     this.setState({ profileImg: reader.result });
        //   }
        // };

        reader.readAsDataURL(e.target.files[0]);

        this.state.imageData = e.target.files[0];

        if (this.state.imageData.size > 10485760) {

            this.state.fileSizeCheck = false;

            toast.error('🦄 Selected file size must be less then 10 MB !!!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }
        else {
            this.state.fileSizeCheck = true;
        }


    };



    render() {

        if (this.state.goForword === true) {
            return <Redirect to="/DeliveryBoyLogin" />
        }

        const { selectedOption } = this.state;
        return (

            <div className="regFormColor">


                <Header />
                <SideBar />

                <div className="header">

                    <div className="loginHeaderDivO">
                        <div className="row">


                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <img src={logo} className="rainbowImage" />
                            </div>
                        </div>

                    </div>

                </div>

                <div className="formDIV card">
                    <h3 className="userbothSign">Delivery Boy Sign up</h3>
                    <form className="formDataFiled" onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-6">

                                <input type="text" className="form-control" placeholder="Name" name="name" value={this.state.name} onChange={this.handleChnageALl} required />
                            </div>


                            <div className="form-group col-md-6">
                                <input type="text" className="form-control" placeholder="Mobile Number" name="mobileNumber" value={this.state.mobileNumber} onChange={this.handleChnageALl} required />
                            </div>
                        </div>



                        <div className="form-row secodnDivForm">
                            <div className="form-group col-md-6">

                                <input type="email" className="form-control" placeholder="Email" id="email" name="email" value={this.state.email} onChange={this.handleChnageALl} required />
                            </div>


                            <div className="form-group col-md-6">

                                <Select isSearchable value={selectedOption} onChange={e => { this.setState({ gender: e }) }} options={gender} placeholder="Gender" />

                            </div>


                        </div>

                        <div className="form-row secodnDivForm">
                            <div className="form-group col-md-6">

                                <input type="text" className="form-control" placeholder="Adhar no" id="Aadhaar no" name="aadhaarNo" value={this.state.aadhaarNo} onChange={this.handleChnageALl} required />
                            </div>


                            <div className="form-group col-md-6">

                                <input type="text" className="form-control" placeholder="Pan no" id="adhar" name="panNo" value={this.state.panNo} onChange={this.handleChnageALl} required />

                            </div>


                        </div>



                        <div className="form-row">

                            <div className="form-group col-md-6">

                                <input type="text" className="form-control" placeholder="Address" name="address" value={this.state.address} onChange={this.handleChnageALl} required />
                            </div>


                            <div className="form-group col-md-6">
                                <input type="text" className="form-control" placeholder="District" name="city" value={this.state.city} onChange={this.handleChnageALl} required />


                            </div>



                        </div>


                        <div className="form-row">

                            <div className="form-group col-md-6">

                                <Select isSearchable value={selectedOption} options={allState} onChange={e => { this.setState({ stateIs: e }) }} placeholder="State" />
                            </div>
                            <div className="form-group col-md-6">

                                <Select isSearchable value={selectedOption} options={allCountry} onChange={e => { this.setState({ country: e }) }} placeholder="Country" />
                            </div>



                        </div>



                        <div className="form-row">

                            <div className="form-group col-md-6">


                                <input type="text" className="form-control" placeholder="Pin Code" name="pinCode" value={this.state.pinCode} onChange={this.handleChnageALl} required />

                            </div>
                            <div className="form-group col-md-6">
                                <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChnageALl} required />

                            </div>



                        </div>




                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <input type="password" className="form-control" placeholder="Confirm Password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChnageALl} required />

                            </div>

                            <div className="form-group col-md-6">

                            </div>
                        </div>



                        <div className="form-row">


                            <div className="form-group col-md-3">

                                <img src={capcha} className="captchaImage" />

                                <h4 className="catchaCode">{this.state.showCaptchCode}</h4>

                            </div>


                            <div className="form-group col-md-1">

                                <img src={refressCaptch} className="reFressCaptcha" onClick={this.handleCaptcha} />



                            </div>



                            <div className="form-group col-md-4">


                                <input type="text" name="captchaCode" value={this.state.captchaCode} onChange={this.handleChnageALl} required placeholder="Enter CAPTCHA code" className="form-control" autoComplete="off" />


                            </div>



                            <div className="form-group col-md-4">

                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" name="termConn" value={this.state.termConn} onChange={e => { this.setState({ termConn: true }) }} required />
                                    <label className="form-check-label" htmlFor="gridCheck">

                                        <Link onClick={() => window.open("/termCondition", "_blank")}>I accept Terms & Condition</Link>

                                    </label>
                                </div>
                                <button type="submit" className="RegistrationPageButtonRegistration">Register</button> <Link to="/DeliveryBoyLogin" style={{ textDecoration: "none" }} className="RegistrationPageButtonLogin">Login</Link>



                            </div>


                        </div>


                    </form>



                </div>


                <Modal size="md" show={this.state.show} onHide={this.handleModalPasss}>
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

                        <Button variant="primary" onClick={this.handleModalPasss}>
                            OK
                        </Button>

                    </Modal.Footer>
                </Modal>






                <Modal size="md" show={this.state.modelShow} onHide={this.reloadWebPage}>
                    <Modal.Header closeButton>
                        <Modal.Title>  </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">

                                <div className="col-xl-12 col-md-12 col-sm-12">

                                    <h5>
                                        Thank you for registering. Please check your email to verify your email address before login.
                                    </h5>

                                </div>
                            </div>
                        </div>


                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="primary" onClick={this.reloadWebPage}>
                            OK
                        </Button>

                    </Modal.Footer>
                </Modal>



                <FooterBar />
                <ToastContainer />
            </div>
        )
    }
}




export default RegisterForm;