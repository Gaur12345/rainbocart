import React, { Component } from 'react'
import Stepper from 'react-stepper-horizontal/lib/Stepper';
import WSppiner from '../../common/WSppiner';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import AccountSetup from '../sharedModuls/SignupForm/AccountSetup';
import AddressInfo from '../sharedModuls/SignupForm/AddressInfo';
import Captcha from '../sharedModuls/SignupForm/Captcha';
import ContactInfo from '../sharedModuls/SignupForm/ContactInfo';
import Verification from '../sharedModuls/SignupForm/Verification';
import { GstGuidelines, phoneGuidLines, pinCodeGuideLines } from '../sharedModuls/Utils/GuidLines';
import logo from './Images/rainbow.png';
import ShopDetails from '../sharedModuls/SignupForm/ShopDetails';
import { Toast } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
export default class ShopDetailsStepperForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
            shopdetails: {
                shopname:'',
                gstno:'',
                gstError:false,
                shopcategory:'',
                shopdescription:'',
                imageData :null,
            },
            isLoading: false,
            pageIndex: 0,
            submitStatus: false,
            fileSizeCheck:false,
            redirectStatus:false
        }
    }
    next = async () => {
        this.checkInputValue()
        let x = this.state.pageIndex;
        ++x;
        this.setState({ pageIndex: x });


    }
    back = () => {
        let x = this.state.pageIndex;
        --x;
        this.setState({ pageIndex: x })
    }
    imageHandler = (e) => {
console.log(e);
        const reader = new FileReader();
        // reader.onload = () => {
        //   if (reader.readyState === 2) {
        //     this.setState({ profileImg: reader.result });
        //   }
        // };

        reader.readAsDataURL(e.target.files[0]);

        this.state.shopdetails.imageData = e.target.files[0];

        if(this.state.shopdetails.imageData.size >  10485760)
        {

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
        else
        {
            this.state.fileSizeCheck = true;
        }


    }
    componentDidUpdate() {
        
        if (this.state.submitStatus == false) {
            if (this.state.accountInfo.name != '' && this.state.contactInfo.mobileNumber!='' &&
            this.state.contactInfo.gender!='' && this.state.addressInfo.address!='' && this.state.addressInfo.landmark!=''
            && this.state.addressInfo.city!=''&& this.state.addressInfo.stateIs!=''&& this.state.addressInfo.pinCode!=''&& this.state.addressInfo.country!=''
            && this.state.shopdetails.gstno!=''&& this.state.shopdetails.gstError!= true&& this.state.shopdetails.shopcategory!=''&& this.state.shopdetails.shopdescription!=''
                ) {
                document.getElementById("Submit").disabled = false;
            }
            else {
                document.getElementById("Submit").disabled = true;
            }
            this.checkInputValue()
            console.log(this.state,this.state.pageIndex);
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
        if (event.name == 'shopcategory') {
            this.setState((state, props) => {
                return {
                    shopdetails: {
                        ...state.shopdetails,
                        shopcategory: event.value
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

            {
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
        if (fieldName == 'gstno') {
            let gstStatus = GstGuidelines(event.target.value);
            console.log(gstStatus)
            if(gstStatus == true){
                this.setState((state, props) => {
                    return {
                        shopdetails: {
                            ...state.shopdetails,
                            gstno: event.target.value,
                            gstError: false
                        }
                    }
                })
            }
            else{
                this.setState((state, props) => {
                    return {
                        shopdetails: {
                            ...state.shopdetails,
                            gstno: event.target.value,
                            gstError: true
                        }
                    }
                })
            }
            
        }
        if (fieldName == 'shopdescription') {
            this.setState((state, props) => {
                return {
                    shopdetails: {
                        ...state.shopdetails,
                        shopdescription: event.target.value
                    }
                }
            })
        }


    }
    checkInputValue() {
        if (this.state.pageIndex == 0 && this.state.accountInfo.name != '' &&
            this.state.accountInfo.email != '' && this.state.accountInfo.password != '' &&
            this.state.accountInfo.confirmPassword != ''
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
        else if (this.state.pageIndex == 3 && this.state.shopdetails.gstno!='' && this.state.shopdetails.gstError!=true && this.state.shopdetails.shopcategory!='' 
        && this.state.shopdetails.shopdescription!='') {
            document.getElementById("next").disabled = false;
            console.log("shopdetails")
        }
        else if (this.state.pageIndex == 4) {
            document.getElementById("Submit").disabled = false;
            console.log("validation")
        }
        else {
            document.getElementById("Submit").disabled = true;
            document.getElementById("next").disabled = true;

        }
    }
    editVerificationInformation = (pageId) => {
        this.setState({
            pageIndex: pageId
        })
    }
    fetchDataOfSeller = () => {
        this.setState({ isLoading: true });
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/fetchdataseller`, { uid: sessionStorage.getItem("shopID") }
            , { headers: { 'x-access-token': localStorage.getItem("accessToken") } })
            .then((response) => {
                console.log(response.data[0].uEmail)
                this.setState({ isLoading: false });
                this.setState((state, props) => {
                    return {
                        accountInfo: {
                            ...state.accountInfo,
                            email: response.data[0].uEmail,
                            password: response.data[0].uPassword,
                            confirmPassword: response.data[0].uPassword
                        }
                        ,
                        shopdetails:{
                            ...state.shopdetails,
                            shopname:response.data[0].uShopName,
                        }
                    }
                })

            }).catch(function (error) {
                this.setState({ isLoading: false });
                alert(error);
            })

    }
    componentDidMount() {
        this.fetchDataOfSeller();
        document.getElementById("next").disabled = true;
        document.getElementById("Submit").disabled = true;
        document.getElementById('Submit').style.display = 'none';
        document.getElementById('back').style.display = 'none';


    }
    handleSubmit = (event) => {
        // event.preventDefault();
            this.setState({ isLoading: true })
            const formData = new FormData();
            formData.append("emailID", this.state.accountInfo.email);
            formData.append("name", this.state.accountInfo.name);
            formData.append("password", this.state.accountInfo.password);

            formData.append("gender", this.state.contactInfo.gender);
            formData.append("mobile", this.state.contactInfo.mobileNumber);

            formData.append("address", this.state.addressInfo.address);
            formData.append("landmark", this.state.addressInfo.landmark);
            formData.append("city", this.state.addressInfo.city);
            formData.append("country", this.state.addressInfo.country);
            formData.append("pincode", this.state.addressInfo.pincode);
            formData.append("state", this.state.addressInfo.stateIs);

            formData.append("shopname", this.state.shopdetails.shopname);
            formData.append("gstno", this.state.shopdetails.gstno);
            formData.append("shopcategory", this.state.shopdetails.shopcategory);
            formData.append("shopdescription", this.state.shopdetails.shopdescription);
            formData.append("imagedata", this.state.shopdetails.imageData);
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/completeUserRegistration`, formData
            ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
                .then(response => {
                    if (response.data === "Inserted Successfully") {
                        console.log(response.data);
                        this.setState({ isLoading: false, goForword: true, submitStatus: true,redirectStatus:true });
                    }
                    else {
                        this.setState({ isLoading: false })
                        // let errorMsg = response.data.sqlMessage.split(" ");
                        // Toast.error(errorMsg[2] + " already exist !!!", {
                        //     position: "top-right",
                        //     autoClose: 3000,
                        //     hideProgressBar: false,
                        //     closeOnClick: true,
                        //     pauseOnHover: true,
                        //     draggable: true,
                        //     progress: undefined,
                        // });
                    }

                })
                .catch(error => {
                    this.setState({ isLoading: false })
                    console.log(error)
                })
    }
    bindComponents = () => {

        switch (this.state.pageIndex) {
            case 0: { return (<AccountSetup name={'Name'} accountInfo={this.state.accountInfo} changed={this.handleChangeALl} disableField={true}/>) }
            case 1: { return (<ContactInfo contactInfo={this.state.contactInfo} dropDownChanged={this.handleDropdown} changed={this.handleChangeALl} />) }
            case 2: { return (<AddressInfo addressInfo={this.state.addressInfo} changed={this.handleChangeALl} dropDownChanged={this.handleDropdown} />) }
            case 3: { return (<ShopDetails shopdetails={this.state.shopdetails} changed={this.handleChangeALl} dropDownChanged={this.handleDropdown} imageHandler={this.imageHandler} />) }
            case 4: { return (<Verification info={this.state} changed={this.handleChangeALl} editVerificationInformation={this.editVerificationInformation} hidepassword ={true} showShowDetails={true}/>) }
            
            default: return <h1>No project match</h1>
        }
    }
    render() {
        if(this.state.redirectStatus ===  true)
        {
            return <Redirect  to="/Home" />
        }
        return (
            <div className="regFormColor">
                {this.state.isLoading &&
                    <WSppiner isLoading={this.state.isLoading} />

                }
                <div className="header">



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
                    <Stepper circleFontSize={'6'} activeColor={'#F39C12'} completeColor={'#F39C12'} steps={[{ title: 'Account Setup' }, { title: 'Contact Info' }, { title: 'Address Details' }, { title: 'Shop Details' }, { title: 'Verification' }]} activeStep={this.state.pageIndex} />
                    <div className='d-flex justify-content-center ' style={{ marginTop: '5vh' }}>{this.bindComponents()}</div>
                    <div className='row d-flex justify-content-center mt-3 mb-3'>
                        <div className=''><button className='RegistrationPageButtonRegistration mx-4' id='back' onClick={this.back}>Back</button></div>
                        <div className=''><button className='RegistrationPageButtonRegistration mx-4' id='next' onClick={this.next}>Next</button></div>
                        <div className=''><button className='RegistrationPageButtonRegistration mx-4' id='Submit' onClick={this.handleSubmit}>Submit</button></div>
                    </div>
                </div>
            </div>
        )
    }
}
