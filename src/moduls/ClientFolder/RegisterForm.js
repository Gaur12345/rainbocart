import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './css/RegistrationForm.css';
import logo from './Images/rainbow.png';
import Select from 'react-select';
import validator from 'validator';
import success from './Images/check.svg';
import wrong from './Images/close.svg';
import capcha from './Images/captcha.png';
import refressCaptch from './Images/refresh.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FooterBar from '../Customer/FooterBar';
import { Button, Card, Modal } from 'react-bootstrap';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { encryptData, decryptData, generateOTP } from '../sharedModuls/Utils/Utils';
import WSppiner from '../../common/WSppiner';
import Header from '../Customer/Header';
import Sidebar from '../Customer/sidebar/Sidebar';
import AccountSetup from '../sharedModuls/SignupForm/AccountSetup';
import Captcha from '../sharedModuls/SignupForm/Captcha';
import { checkPasswordGuidelines } from '../sharedModuls/Utils/GuidLines';
import Stepper from 'react-stepper-horizontal';
import ConfirmationModal from '../../common/ConfirmationModal';
const gender = [

    { name: "gender", value: "Male", label: "Male" },
    { name: "gender", value: "Male", label: "Female" },
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

            accountInfo: {
                email: "",
                emailStatus: "",
                password: "",
                confirmPassword: "",
                shopName: "",
                passwordError: false,
                confirmPasswordErrorMsg: '',
            },
            validation: {
                captchaCode: "",
                showCaptchCode: "",
                otp: "",
                confirmOtp: '',
                termConn: false,
            },
            pageIndex: 0,
            goForword: false,
            shopOwnerName: "",
            mobileNumber: "",
            gender: "",
            shopCategory: "",
            gstNo: "",
            address: "",
            city: "",
            stateIs: "",
            country: "",
            pinCode: "",
            imageData: null,
            title: "",
            description: "",
            profileImg: document,
            descriptionShow: "",
            fileSizeCheck: false,
            show: false,
            modelShow: false,
            isLoading: false,
            submitStatus: false
        }
    }

    handleChnageALl = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleModalOnNext = () => {
        this.setState({ show: !this.state.show });
    }
    selectCompanyType = (selectedOption) => {
        if (selectedOption.value === "Public Limited/Private Limited") {
            document.getElementById('cinLLPNO').placeholder = "CIN NO";
            this.setState({ companyTypeD: selectedOption.value });
        }
        else {
            document.getElementById('cinLLPNO').placeholder = "LLP-IN NO";
            this.setState({ companyTypeD: selectedOption.value });
        }
    }

    handleEmail = () => {
        let emailis = document.getElementById('email').value;

        let competor = ['@Infeedo.', '@Watson.', '@Gallup.'];

        let checkCom = true;
        if (validator.isEmail(emailis)) {
            if (emailis.includes("@gmail.") == false && emailis.includes("@Gmail.") == false && emailis.includes("@yahoo.") == false && emailis.includes("@Yahoo.") == false && emailis.includes("@outlook.") == false && emailis.includes("@Outlook.") == false) {
                for (let i = 0; i < competor.length; i++) {
                    if (emailis.includes(competor[i]) === true) {
                        checkCom = false;
                        break;
                    }
                }

                if (checkCom === true) {
                    this.setState({ emailImage: success });
                    document.getElementById('emailVerified').innerHTML = "Email Verified Successfully...";
                    document.getElementById('emailVerified').style.color = "green";

                    this.setState({ email: emailis });
                    this.setState({ checkEmail: true });
                }
                else {
                    this.setState({ emailImage: wrong });
                    document.getElementById('emailVerified').innerHTML = "Please Enter Company Email";
                    document.getElementById('emailVerified').style.color = "red";
                }
            }
            else {
                this.setState({ emailImage: wrong });
                document.getElementById('emailVerified').innerHTML = "Please Enter Company Email";
                document.getElementById('emailVerified').style.color = "red";
            }
        }
        else {
            this.setState({ emailImage: wrong });
            document.getElementById('emailVerified').innerHTML = "Please Enter Company Email";
            document.getElementById('emailVerified').style.color = "red";
        }
    }



    emailVerification = () => {

        let fdata = new FormData();


        fdata.append("reviverEmail", this.state.email);
        fdata.append("userName", this.state.personName);

        //console.log("Function call email Verification");

        //axios.post('https://clientback.wematter.co.in/registerClient',)
        //axios.post('https://client.wematter.co.in/phpFiles/testmail.php',fdata)

        axios.post('https://client.we-matter.com/phpFiles/testmail.php', fdata)

            .then(response => {

                console.log("Function call email response Sent check ", response.data);
                this.setState({ modelShow: !this.state.modelShow });

            })
            .catch(error => {
                console.log(error)
            })


    }
    sendClientEmail = async () => {
        let otp = generateOTP();
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/sendClientMail`, { sellerEmail: this.state.accountInfo.email, otp: otp })
                .then(response => {

                    if (response.data == "EmailsendSuccessfully") {
                        this.setState((state, props) => {
                            return {
                                validation: {
                                    ...state.validation,
                                    otp: otp
                                }
                            }
                        })
                        return resolve(response)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
    verifyClientEmail = async () => {
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/verifyEmail`,
                {
                    email: this.state.accountInfo.email,
                })
                .then(response => {
                    console.log(response.data.length)
                    if (response.data.length == 0) {
                        console.log("notexist")
                        return resolve(response)
                        // this.setState((state, props) => {
                        //     return {
                        //         accountInfo: {
                        //             ...state.accountInfo,
                        //             emailStatus: "notexist"
                        //         }
                        //     }
                        // })
                    }
                    else {
                        return resolve(response)
                        // console.log("exist")

                    }
                })
                .catch(error => {
                    reject(error)
                })
        })

    }
    handleChangeALl = (event, fieldName) => {

        console.log(this.state.validation)
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
        if (fieldName == 'name') {
            this.setState((state, props) => {
                return {
                    accountInfo: {
                        ...state.accountInfo,
                        shopName: event.target.value
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
        if (fieldName == 'confirmOtp') {
            this.setState((state, props) => {
                return {
                    validation: {
                        ...state.validation,
                        confirmOtp: event.target.value
                    }
                }
            })
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

    handleSubmit = (event) => {
        event.preventDefault();


        let msg = "";

        let checkError = true;
        if (checkError == true) {
            this.setState({ isLoading: true })
            const key = "password";


            // const shopOwnerName = encryptData(this.state.shopOwnerName, key);
            // const mobileNumber = encryptData(this.state.mobileNumber, key);
            // const emailID = encryptData(this.state.emailID, key);
            // const gender = encryptData(this.state.gender.value, key);
            // const shopName = encryptData(this.state.shopName, key);
            // const shopCategory = encryptData(this.state.shopCategory, key);
            // const gstNo = encryptData(this.state.gstNo, key);
            // const address = encryptData(this.state.address, key);
            // const city = encryptData(this.state.city, key);
            // const stateIs = encryptData(this.state.stateIs, key);
            // const country = encryptData(this.state.country, key);
            // const pinCode = encryptData(this.state.pinCode, key);
            // const password = encryptData(this.state.password, key);
            // const descriptionShop = encryptData(this.state.descriptionShop, key);
            // const termCondition = encryptData("done", key);
            // let payLoad = {
            //     shopOwnerName: this.state.shopOwnerName,
            //     mobileNumber: this.state.mobileNumber,
            //     emailID: this.state.email,
            //     gender: this.state.gender.value,
            //     shopName: this.state.shopName,
            //     shopCategory: this.state.shopCategory.value,
            //     gstNo: this.state.gstNo,
            //     address: this.state.address,
            //     city: this.state.city,
            //     stateIs: this.state.stateIs.value,
            //     country: this.state.country.value,
            //     pinCode: this.state.pinCode,
            //     descriptionShop: "shop 123",
            //     termCondition:"done",
            //     password: this.state.password,
            //     shopImage:this.state.imageData,
            // }
            const formData = new FormData();
            // formData.append("shopOwnerName", this.state.shopOwnerName);
            // formData.append("mobileNumber", this.state.mobileNumber);
            formData.append("emailID", this.state.accountInfo.email);
            // formData.append("gender", this.state.gender.value);
            formData.append("shopName", this.state.accountInfo.shopName);
            // formData.append("shopCategory", this.state.shopCategory.value);
            // formData.append("gstNo", this.state.gstNo);
            // formData.append("address", this.state.address);
            // formData.append("city", this.state.city);
            // formData.append("stateIs", this.state.stateIs.value);
            // formData.append("country", this.state.country.value);
            // formData.append("pinCode", this.state.pinCode);
            formData.append("password", this.state.accountInfo.password);
            // formData.append("shopImage", this.state.imageData);
            // formData.append("descriptionShop", this.state.descriptionShow)
            formData.append("termCondition", "done");
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/userRegistration`, formData)
                .then(response => {
                    if (response.data === "Inserted Successfully") {
                        console.log(response.data);
                        this.setState({ isLoading: false, goForword: true, submitStatus: true });
                        
                    }
                    else {
                        this.setState({ isLoading: false })
                        let errorMsg = response.data.sqlMessage.split(" ");
                        toast.error(errorMsg[2] + " already exist !!!", {
                            position: "top-right",
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
                    this.setState({ isLoading: false })
                    console.log(error)
                })

        }
        else {

            this.setState({ isLoading: false })
            toast.error(msg, {
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




    componentDidMount() {
        document.getElementById("next").disabled = true;
        document.getElementById("Submit").disabled = true;
        document.getElementById('Submit').style.display = 'none';
        document.getElementById('back').style.display = 'none';

    }
    bindComponents = () => {

        switch (this.state.pageIndex) {
            case 0: { return (<AccountSetup name={'Shop name'} accountInfo={this.state.accountInfo} changed={this.handleChangeALl} />) }
            case 1: { return (<Captcha capchaInfo={this.state.validation} pageName={'sellerregistration'} changed={this.handleChangeALl} />) }
            default: return <h1>No project match</h1>
        }
    }
    checkInputValue() {
        if (this.state.pageIndex == 0 && this.state.accountInfo.shopName != '' &&
            this.state.accountInfo.email != '' && this.state.accountInfo.password != '' &&
            this.state.accountInfo.confirmPassword != '' && this.state.accountInfo.passwordError != true &&
            this.state.accountInfo.confirmPasswordErrorMsg == 'Password Matched.'
        ) {
            document.getElementById("next").disabled = false;
        }
        else if (this.state.pageIndex == 1 && this.state.validation.termConn == true &&
            this.state.validation.captchaCode != '' && this.state.validation.captchaCode == this.state.validation.showCaptchCode
            && this.state.validation.otp == this.state.validation.confirmOtp && this.state.validation.confirmOtp != '') {
            document.getElementById("Submit").disabled = false;
        }
        else {
            document.getElementById("Submit").disabled = true;
            document.getElementById("next").disabled = true;

        }
    }
    handleProceedButton = () => {
        let x = this.state.pageIndex;
        ++x;
        this.setState((state, props) => {
            return {
                accountInfo: {
                    ...state.accountInfo,
                    emailStatus: "notexist"
                },
                pageIndex: x,
                show: false
            }
        })
    }
    next = async () => {
        this.setState({ isLoading: true })
        const verifyEmailResponse = await this.verifyClientEmail();
        const sendEmailResponse = await this.sendClientEmail();
        console.log(sendEmailResponse)
        this.setState({ isLoading: false })
        if (verifyEmailResponse.data.length == 0 && sendEmailResponse.data == 'EmailsendSuccessfully') {
            this.checkInputValue()
            this.handleModalOnNext()

        }
        else if (verifyEmailResponse.data.length > 0) {
            this.setState((state, props) => {
                return {
                    accountInfo: {
                        ...state.accountInfo,
                        emailStatus: "exist"
                    }
                }
            })
            document.getElementById('next').disabled = true
        }

        console.log("helooo")


    }
    back = () => {
        if (this.state.pageIndex == 1) {
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
    componentDidUpdate() {
        if (this.state.submitStatus == false) {
            if (this.state.accountInfo.name != '' &&
                this.state.accountInfo.email != '' && this.state.accountInfo.password != '' &&
                this.state.accountInfo.confirmPassword != '' && this.state.accountInfo.passwordError != true
                && this.state.accountInfo.confirmPasswordErrorMsg == 'Password Matched.' && this.state.validation.termConn == true && this.state.validation.captchaCode != '' &&
                this.state.validation.captchaCode == this.state.validation.showCaptchCode) {
                document.getElementById("Submit").disabled = false;
            }
            else {
                document.getElementById("Submit").disabled = true;
            }

            this.checkInputValue()
            if (this.state.pageIndex === 1) {
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
            return <Redirect to="/userLogin" />
        }

        const { selectedOption, isLoading } = this.state;
        return (

            <div className="regFormColor">
                {this.state.show &&
                    <ConfirmationModal handleProceedButton={this.handleProceedButton} header={'Email Verification'} message={'OTP sent to your registered EmailId.     Please verify!!!'} />}
                <div className="header">

                    {isLoading &&
                        <WSppiner isLoading={this.state.isLoading} />

                    }
                    <Header />
                    <Sidebar />
                    <div className="loginHeaderDivO pt-4">
                        <div className="row">

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <img src={logo} className="rainbowImage" />
                            </div>
                        </div>

                    </div>

                </div>



                <div className="formDIV card">

                    <h3 className="userbothSign">New Seller Sign up</h3>
                    <Stepper circleFontSize={'6'} activeColor={'#F39C12'} completeColor={'#F39C12'} steps={[{ title: 'Account Setup' }, { title: 'Captcha' }]} activeStep={this.state.pageIndex} />
                    <div className='d-flex justify-content-center ' style={{ marginTop: '5vh' }}>{this.bindComponents()}</div>
                    <div className='row d-flex justify-content-center mt-3 mb-3'>
                        <div className=''><button className='RegistrationPageButtonRegistration mx-4' id='back' onClick={this.back}>Back</button></div>
                        <div className=''><button className='RegistrationPageButtonRegistration mx-4' id='next' onClick={this.next}>Next</button></div>
                        <div className=''><button className='RegistrationPageButtonRegistration mx-4' id='Submit' onClick={this.handleSubmit}>Submit</button></div>
                    </div>
                </div>
                {/* <div className="form-row">
                            <div className="form-group col-md-6">

                                <input type="text" className="form-control" placeholder="Shop Owner Name" name="shopOwnerName" value={this.state.shopOwnerName} onChange={this.handleChnageALl} required />
                            </div>


                            <div className="form-group col-md-6">

                                <input type="text" className="form-control" placeholder="Contact Number" name="mobileNumber" value={this.state.mobileNumber} onChange={this.handleChnageALl} required />

                            </div>


                        </div>



                        <div className="form-row secodnDivForm">
                            <div className="form-group col-md-6">

                                <input type="email" className="form-control" placeholder="Email" id="email" name="email" onChange={this.handleChnageALl} required />
                            </div>


                            <div className="form-group col-md-6">

                                <Select isSearchable value={selectedOption} onChange={e => { this.setState({ gender: e }) }} options={gender} placeholder="Gender" />

                            </div>


                        </div>



                        <div className="form-row secodnDivForm">
                            <div className="form-group col-md-6">

                                <input type="text" className="form-control" placeholder="Shop Name" name="shopName" value={this.state.shopName} onChange={this.handleChnageALl} required />
                            </div>


                            <div className="form-group col-md-6">

                                <Select isSearchable value={selectedOption} onChange={e => { this.setState({ shopCategory: e }) }} options={shopCategory} placeholder="Shop Category" />

                            </div>


                        </div>







                        <div className="form-row">

                            <div className="form-group col-md-6">
                                <input type="text" className="form-control" placeholder="GST NO" name="gstNo" value={this.state.gstNo} onChange={this.handleChnageALl} required />
                                <Link onClick={() => window.open("https://www.knowyourgst.com/gst-number-search/by-name-pan/", "_blank")}>Click Here to find your GST Number</Link>

                            </div>


                            <div className="form-group col-md-6">

                                <input type="text" className="form-control" placeholder="Address" name="address" value={this.state.address} onChange={this.handleChnageALl} required />
                            </div>



                        </div>


                        <div className="form-row">

                            <div className="form-group col-md-6">
                                <input type="text" className="form-control" placeholder="City" name="city" value={this.state.city} onChange={this.handleChnageALl} required />


                            </div>
                            <div className="form-group col-md-6">

                                <Select isSearchable value={selectedOption} options={allState} onChange={e => { this.setState({ stateIs: e }) }} placeholder="State" />
                            </div>



                        </div>



                        <div className="form-row">

                            <div className="form-group col-md-6">



                                <Select isSearchable value={selectedOption} options={allCountry} onChange={e => { this.setState({ country: e }) }} placeholder="Country" />

                            </div>
                            <div className="form-group col-md-6">

                                <input type="text" className="form-control" placeholder="Pin Code" name="pinCode" value={this.state.pinCode} onChange={this.handleChnageALl} required />
                            </div>



                        </div>




                        <div className="form-row">
                            <div className="form-group col-md-6">

                                <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChnageALl} required />
                            </div>

                            <div className="form-group col-md-6">
                                <input type="password" className="form-control" placeholder="Confirm Password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChnageALl} required />
                            </div>
                        </div>


                        <div className="form-row">
                            <div className="form-group col-md-6">


                                <p>Upload Shop Image <input type="file" className="placeOrder" onChange={this.imageHandler} accept=".jpg , .jpge , .png" /> </p>




                            </div>

                            <div className="form-group col-md-6">


                                <textarea name="descriptionShow" value={this.state.descriptionShow} onChange={this.handleChnageALl} className="form-control" placeholder="Description max 200 words (Optional)" maxlength="200"></textarea>

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
                                <button type="submit" className="RegistrationPageButtonRegistration">Register</button> <Link to="/userLogin" style={{ textDecoration: "none" }} className="RegistrationPageButtonLogin">Login</Link>



                            </div>


                        </div> */}











                {/* <Modal size="md" show={this.state.show} onHide={this.handleModalPasss}>
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
                </Modal> */}

                <ToastContainer />
                <FooterBar />
            </div>
        )
    }
}




export default RegisterForm;