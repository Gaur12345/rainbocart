import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
// import './css/RegistrationForm.css';
import '../sharedModuls/SignupForm/signupformcss.css';
import logo from '../ClientFolder/Images/rainbow.png';
import Select from 'react-select';
import validator from 'validator';
import success from '../ClientFolder/Images/check.svg';
import wrong from '../ClientFolder/Images/close.svg';
import capcha from '../ClientFolder/Images/captcha.png';
import refressCaptch from '../ClientFolder/Images/refresh.png';
import axios from 'axios';
import WSppiner from '../../common/WSppiner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FooterBar from '../Customer/FooterBar';
import { Button, Card, Modal } from 'react-bootstrap';
import { faCommentsDollar, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from './Header';
import SideBar from './sidebar/Sidebar';
import { getCaptcha, encryptData, decryptData } from '../sharedModuls/Utils/Utils';
import PasswordGuidLines from '../sharedModuls/PasswordGuidLines/PasswordGuidLines';
import AccountSetup from '../sharedModuls/SignupForm/AccountSetup';
import addressInfo from '../sharedModuls/SignupForm/AddressInfo';
import contactInfo from '../sharedModuls/SignupForm/ContactInfo';
import Captcha from '../sharedModuls/SignupForm/Captcha';
import Stepper from 'react-stepper-horizontal';
import { checkPasswordGuidelines, phoneGuidLines, pinCodeGuideLines } from '../sharedModuls/Utils/GuidLines';
import ContactInfo from '../sharedModuls/SignupForm/ContactInfo';
import AddressInfo from '../sharedModuls/SignupForm/AddressInfo';
import Verification from '../sharedModuls/SignupForm/Verification';
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
            submitStatus: false,
            accountInfo: {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                passwordError: false,
                confirmPasswordErrorMsg: '',

            },
            contactInfo: {
                gender: "",
                mobileNumber: "",
                phoneNumberError: false
            },
            addressInfo: {
                landmark: "",
                address: "",
                city: "",
                pinCode: "",
                pinCodeError: false,
                stateIs: "",
                country: "",
            },
            validation: {
                captchaCode: "",
                showCaptchCode: "",
                termConn: false,
            },
            show: false,
            modelShow: false,
            isLoading: false,
            pageIndex: 0,
            msg: null
        }
    }
    checkInputValue = () => {
        console.log(this.state.pageIndex)
        if (this.state.submitStatus == false) {
            if (this.state.pageIndex == 0 && this.state.accountInfo.name != '' &&
                this.state.accountInfo.email != '' && this.state.accountInfo.password != '' &&
                this.state.accountInfo.confirmPassword != '' && this.state.accountInfo.passwordError != true
                && this.state.accountInfo.confirmPasswordErrorMsg == 'Password Matched.'
            ) {
                document.getElementById("next").disabled = false;
                console.log("account")
            }
            else if (this.state.pageIndex == 1 && this.state.contactInfo.gender != '' && this.state.contactInfo.mobileNumber != '' &&
                this.state.contactInfo.phoneNumberError == false) {
                document.getElementById("next").disabled = false;
                console.log("contact")
            }
            else if (this.state.pageIndex == 2 && this.state.addressInfo.address != '' && this.state.addressInfo.landmark != '' &&
                this.state.addressInfo.city != '' && this.state.addressInfo.stateIs != '' &&
                this.state.addressInfo.pinCode != '' && this.state.addressInfo.pinCodeError == false && this.state.addressInfo.country != '') {
                document.getElementById("next").disabled = false;
                console.log("address")
            }
            else if (this.state.pageIndex == 3) {
                document.getElementById("next").disabled = false;
            }
            else if (this.state.pageIndex == 4 && this.state.validation.termConn == true && this.state.validation.captchaCode != '' && this.state.validation.captchaCode == this.state.validation.showCaptchCode) {
                document.getElementById("Submit").disabled = false;
                console.log("validation")
            }
            else {
                document.getElementById("Submit").disabled = true;
                document.getElementById("next").disabled = true;

            }
        }
    }
    next = () => {
        this.checkInputValue()
        let x = this.state.pageIndex;
        ++x;
        this.setState({ pageIndex: x });

    }
    back = () => {
        if (this.state.pageIndex == 4) {
            this.setState((state, props) => {
                return {
                    validation: {
                        ...state.validation,
                        termConn: false
                    }
                }
            })
        }
        let x = this.state.pageIndex;
        --x;
        this.setState({ pageIndex: x })
    }
    componentDidUpdate = () => {
        this.checkInputValue()
        if (this.state.submitStatus == false) {
        if (this.state.pageIndex === 4) {
            document.getElementById('next').style.display = 'none';
            document.getElementById('Submit').style.display = 'block';
        }
        else {
            document.getElementById('next').style.display = 'block';
            document.getElementById('Submit').style.display = 'none';
        }
        if (this.state.pageIndex === 0) {
            document.getElementById('back').style.display = 'none';
            document.getElementById('Submit').style.display = 'none';
        }
        else {
            document.getElementById('back').style.display = 'block';
        }
    }

    }
    handleDropdown = (event) => {
        if (event.name == 'gender') {
            this.setState((state, props) => {
                return {
                    contactInfo: {
                        ...state.contactInfo,
                        gender: event.value
                    }
                }
            })
        }
        if (event.name == 'State') {
            this.setState((state, props) => {
                return {
                    addressInfo: {
                        ...state.addressInfo,
                        stateIs: event.value
                    }
                }
            })
        }
        if (event.name == 'Country') {
            this.setState((state, props) => {
                return {
                    addressInfo: {
                        ...state.addressInfo,
                        country: event.value
                    }
                }
            })
        }

    }
    handleChangeALl = (event, fieldName) => {

        if (fieldName == 'city') {
            this.setState((state, props) => {
                return {
                    addressInfo: {
                        ...state.addressInfo,
                        city: event.target.value
                    }
                }
            })
        }
        if (fieldName == 'landmark') {
            this.setState((state, props) => {
                return {
                    addressInfo: {
                        ...state.addressInfo,
                        landmark: event.target.value
                    }
                }
            })
        }
        if (fieldName == 'locality') {
            this.setState((state, props) => {
                return {
                    addressInfo: {
                        ...state.addressInfo,
                        address: event.target.value
                    }
                }
            })
        }
        if (fieldName == 'pinCode') {
            let pinCodeStatus = pinCodeGuideLines(event.target.value);
            if (pinCodeStatus.returnLengthNumber == true) {
                this.setState((state, props) => {
                    return {
                        addressInfo: {
                            ...state.addressInfo,
                            pinCode: event.target.value,
                            pinCodeError: false,
                            address: this.state.addressInfo.city
                        }
                    }
                })
            }
            else {
                this.setState((state, props) => {
                    return {
                        addressInfo: {
                            ...state.addressInfo,
                            pinCode: event.target.value,
                            pinCodeError: true,
                        }
                    }
                })
            }
        }
        if (fieldName == 'name') {
            this.setState((state, props) => {
                return {
                    accountInfo: {
                        ...state.accountInfo,
                        name: event.target.value
                    }
                }
            })
        }
        if (fieldName == 'password') {
            let passwordStatus = checkPasswordGuidelines(event.target.value);
            if (passwordStatus.returnErrorMsg != null) {
                this.setState((state, props) => {
                    return {
                        accountInfo: {
                            ...state.accountInfo,
                            password: event.target.value,
                            passwordError: true
                        }
                    }
                })
            }
            else {
                this.setState((state, props) => {
                    return {
                        accountInfo: {
                            ...state.accountInfo,
                            password: event.target.value,
                            passwordError: false,

                        }
                    }
                })

            }
        }
        if (fieldName == 'phone') {
            console.log("phone", event.target.value);
            let mobileStatus = phoneGuidLines(event.target.value)
            console.log(mobileStatus)
            if (mobileStatus.returnStartNumber == false && mobileStatus.returnLengthNumber == false || mobileStatus.returnErrorMsg != null) {
                this.setState((state, props) => {
                    return {
                        contactInfo: {
                            ...state.contactInfo,
                            phoneNumberError: true,
                            mobileNumber: event.target.value,

                        }
                    }
                })
            }
            else {
                this.setState((state, props) => {
                    return {
                        contactInfo: {
                            ...state.contactInfo,
                            mobileNumber: event.target.value,
                            phoneNumberError: false
                        }
                    }
                })
            }
        }
        if (fieldName == 'email') {
            this.setState((state, props) => {
                return {
                    accountInfo: {
                        ...state.accountInfo,
                        email: event.target.value
                    }
                }
            })
        }

        if (fieldName == 'confirmPassword') {
            if (this.state.accountInfo.password == '') {
                this.setState((state, props) => {
                    return {
                        accountInfo: {
                            ...state.accountInfo,
                            confirmPassword: event.target.value,
                            confirmPasswordErrorMsg: "Please enter the password first."
                        }
                    }
                })
            }
            else {
                this.setState((state, props) => {
                    return {
                        accountInfo: {
                            ...state.accountInfo,
                            confirmPassword: event.target.value,

                        }
                    }
                })
                if (this.state.accountInfo.password != event.target.value) {
                    this.setState((state, props) => {
                        return {
                            accountInfo: {
                                ...state.accountInfo,
                                confirmPassword: event.target.value,
                                confirmPasswordErrorMsg: "Confirm password not matched."
                            }
                        }
                    })
                }
                else {
                    this.setState((state, props) => {
                        return {
                            accountInfo: {
                                ...state.accountInfo,
                                confirmPasswordErrorMsg: "Password Matched."
                            }
                        }
                    })
                }
            }
        }
        if (fieldName == 'termConn') {
            this.setState((state, props) => {
                return {
                    validation: {
                        ...state.validation,
                        termConn: !this.state.validation.termConn
                    }
                }
            })
        }
        if (fieldName == 'captchaCode') {
            this.setState((state, props) => {
                return {
                    validation: {
                        ...state.validation,
                        captchaCode: event.target.value
                    }
                }
            })
        }
        if (fieldName == 'showCaptchCode') {
            console.log(event)
            this.setState((state, props) => {
                return {
                    validation: {
                        ...state.validation,
                        showCaptchCode: event
                    }
                }
            })
        }


    }
    editVerificationInformation = (pageId) => {
        this.setState({
            pageIndex: pageId
        })
    }
    handleModalPasss = () => {
        this.setState({ show: !this.state.show });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const key = "password";
        const name = encryptData((this.state.accountInfo.name), key);
        const mobileNumber = encryptData((this.state.contactInfo.mobileNumber), key);
        const email = encryptData((this.state.accountInfo.email), key);
        const gender = encryptData((this.state.contactInfo.gender), key);
        const address = encryptData((this.state.addressInfo.address), key);
        const landmark = encryptData((this.state.addressInfo.landmark), key);
        const city = encryptData((this.state.addressInfo.city), key);
        const stateIs = encryptData((this.state.addressInfo.stateIs), key);
        const country = encryptData((this.state.addressInfo.country), key);
        const pinCode = encryptData((this.state.addressInfo.pinCode), key);
        const password = encryptData((this.state.accountInfo.password), key);
        let payLoad = {
            name: name,
            mobileNumber: mobileNumber,
            email: email,
            gender: gender,
            address: address,
            landmark: landmark,
            city: city,
            stateIs: stateIs,
            country: country,
            pinCode: pinCode,
            password: password
        }
        this.setState({ isLoading: true });
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/customerRegistration`, payLoad)
            .then(response => {
                if (response.data === "customerregister") {
                    this.setState({ goForword: true, isLoading: false,submitStatus: true  });
                }
                else {
                    this.setState({ isLoading: false });
                    let errorMsg = response.data.sqlMessage.split(" ");
                    toast.error(name + " already exist !!!", {
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
                this.setState({ isLoading: false });
                console.log(error)
            })
    }
    bindComponents = () => {

        switch (this.state.pageIndex) {

            case 0: { return (<AccountSetup name={'Name'} accountInfo={this.state.accountInfo} changed={this.handleChangeALl} />) }
            case 1: { return (<ContactInfo contactInfo={this.state.contactInfo} dropDownChanged={this.handleDropdown} changed={this.handleChangeALl} />) }
            case 2: { return (<AddressInfo addressInfo={this.state.addressInfo} changed={this.handleChangeALl} dropDownChanged={this.handleDropdown} />) }
            case 3: { return (<Verification info={this.state} changed={this.handleChangeALl} editVerificationInformation={this.editVerificationInformation} />) }
            case 4: { return (<Captcha capchaInfo={this.state.validation} pageName={'customerregistration'} changed={this.handleChangeALl} />) }
            default: return <h1>No project match</h1>
        }
    }
    componentDidMount() {
        document.getElementById("next").disabled = true;
        document.getElementById("Submit").disabled = true;
        document.getElementById('Submit').style.display = 'none';
        document.getElementById('back').style.display = 'none';
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
            return <Redirect to="/CustomerLogin" />
        }

        const { selectedOption } = this.state;
        return (

            <div className="regFormColor">

                {this.state.isLoading && <WSppiner isLoading={this.state.isLoading} />}
                <Header />
                <SideBar />

                <div className="header pt-4">

                    <div className="loginHeaderDivO">
                        <div className="row">


                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <img src={logo} className="rainbowImage" />
                            </div>
                        </div>

                    </div>

                </div>

                <div className="formDIV card">
                    <h3 className="userbothSign mt-3">Customer Sign up</h3>
                    <Stepper circleFontSize={'6'} activeColor={'#F39C12'} completeColor={'#F39C12'} steps={[{ title: 'Account Setup' }, { title: 'Contact Info' }, { title: 'Address Details' }, { title: 'Verification' }, { title: 'Captcha' }]} activeStep={this.state.pageIndex} />
                    <div className='d-flex justify-content-center ' style={{ marginTop: '5vh' }}>{this.bindComponents()}</div>
                    <div className='row d-flex justify-content-center mt-3 mb-3'>
                        <div className=''><button className='RegistrationPageButtonRegistration mx-4' id='back' onClick={this.back}>Back</button></div>
                        <div className=''><button className='RegistrationPageButtonRegistration mx-4' id='next' onClick={this.next}>Next</button></div>
                        <div className=''><button className='RegistrationPageButtonRegistration mx-4' id='Submit' onClick={this.handleSubmit}>Submit</button></div>
                    </div>

                    {/* <form className="formDataFiled" onSubmit={this.handleSubmit}>




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
                                <button type="submit" className="RegistrationPageButtonRegistration">Register</button> <Link to="/CustomerLogin" style={{ textDecoration: "none" }} className="RegistrationPageButtonLogin">Login</Link>



                            </div>


                        </div>


                    </form> */}



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