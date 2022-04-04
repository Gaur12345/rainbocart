import React, { Component } from 'react';
import './css/HomeCustomer.css';
import HeaderNavBar from './Header';
import SideBar from './sidebar/Sidebar';
import FooterBar from './FooterBar';
import axios from 'axios';
import './css/MyOrders.css';
import WSppiner from '../../common/WSppiner';
import { Redirect, Link } from 'react-router-dom';
import { Button, Card, Modal } from 'react-bootstrap';
import editIcon from '../ClientFolder/Images/pencil.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { encryptData, decryptData } from './../sharedModuls/Utils/Utils';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
const crypto = require('crypto-js');
class CustomerProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {

            checkLoginStatus: true,
            show: false,
            name: "",
            email: "",
            mobile: "",
            address: "",
            city: "",
            stateC: "",
            pincode: "",
            country: "",
            currentPassword: "",
            newPassword: "",
            confirmPasswrd: "",
            isLoading: false
        }


        let token = sessionStorage.getItem("customerEmail");

        if (token == null || token == undefined || token == "") {

            this.state.checkLoginStatus = false;
        }


    }

    changePasswordBox = () => {
        this.setState({ currentPassword: "", newPassword: "", confirmPasswrd: "" });
        document.getElementById("newAndConfirmPass").style.display = "none";
        document.getElementById("passwordCheckStatus").innerHTML = "";
        document.getElementById("currentEmailID").style.display = "block";
    }


    componentDidMount = () => {
        let key = 'password'
        let Cid = encryptData(sessionStorage.getItem("customerID"), key);
        this.setState({isLoading: true});
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/getCustomerInformation`,
        {customerID: Cid}
        ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then(response => {
                let data = [];

                data = decryptData(response.data, key);
                data = JSON.parse(data.toString(crypto.enc.Utf8));

                this.setState({
                    isLoading: false,
                    name: data[0].cName,
                    email: data[0].cEmail,
                    mobile: data[0].cMobile,
                    address: data[0].cAddress,
                    gender: data[0].cGender,
                    city: data[0].cCity,
                    stateC: data[0].cState,
                    pincode: data[0].cPincode,
                    country: data[0].cCountry
                })

                document.getElementById("newAndConfirmPass").style.display = "none";
                document.getElementById("currentEmailID").style.display = "none";

            })
            .catch(error => {
                this.setState({isLoading: false});
                console.log(error)
            })
    }





    handleChangeAll = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }


    handleCloseModel = () => {
        this.setState({ show: !this.state.show })
    }

    editInformation = (tagId) => {
        document.getElementById(tagId).disabled = false;
        document.getElementById(`${tagId}Save`).style.display = "block";
    }

    changePasswordSubmit = (e) => {
        e.preventDefault();
        if (this.state.newPassword != "" && this.state.confirmPasswrd != "" && this.state.newPassword != null && this.state.confirmPasswrd != null) {

            if (this.state.newPassword === this.state.confirmPasswrd) {
                let key = 'password'
                let Cid = encryptData(sessionStorage.getItem("customerID"), key);
                let password = encryptData(this.state.newPassword, key);
                this.setState({isLoading: true});
                axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/forgotCustomerPassword`,
                    {
                        emailID: Cid,
                        password: password

                    },{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
                    .then(response => {

                        if (response.data == "ChnageSuccessfully") {
                            this.setState({isLoading: false});
                            toast.success('🦄 Password Change Successfully !!!', {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                               
                            });
                            this.componentDidMount()
                        }
                    }).catch(error => {
                        this.setState({isLoading: false});
                        console.log("Error Call ", error)
                    })
            }
            else {
                this.setState({isLoading: false});
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
        else {
            this.setState({isLoading: false});
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

    checkPasswordFromSubmit = (e) => {
        e.preventDefault();
        if (this.state.currentPassword != null && this.state.currentPassword != "") {
            let key = 'password';
            let email = encryptData(sessionStorage.getItem("customerEmail"), key);
            let password = encryptData(this.state.currentPassword, key);
            this.setState({isLoading: false});
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/customerLogin`,
                {

                    email: email,
                    password: password
                })

                .then(response => {
                    let data = [];

                    data = decryptData(response.data.userInformation, key);
                    data = JSON.parse(data.toString(crypto.enc.Utf8));

                    if (response.data.loginStatus === "loginSuccessfully") {
                        this.setState({isLoading: false});
                        document.getElementById("passwordCheckStatus").innerHTML = "Password verifyed";
                        document.getElementById("passwordCheckStatus").style.color = "green";
                        document.getElementById("newAndConfirmPass").style.display = "block";
                        // document.getElementById("currentEmailID").style.display = "none";
                    }
                    else {
                        this.setState({isLoading: false});
                        document.getElementById("passwordCheckStatus").innerHTML = "Password not verifyed";
                        document.getElementById("passwordCheckStatus").style.color = "red";
                    }

                })
                .catch(error => {
                    this.setState({isLoading: false});
                    console.log(error)
                })

        }


    }

    editSaveDetails = (filedName) => {
        let formData = new FormData();

        if (filedName == "cName") {
            formData.append("editFiled", this.state.name);
        }
        else if (filedName == "cEmail") {
            formData.append("editFiled", this.state.email);
        }
        else if (filedName == "cMobile") {
            formData.append("editFiled", this.state.mobile);
        }
        else if (filedName == "cGender") {
            formData.append("editFiled", this.state.gender);
        }
        else if (filedName == "cAddress") {
            formData.append("editFiled", this.state.address);
        }
        else if (filedName == "cCity") {
            formData.append("editFiled", this.state.city);
        }
        else if (filedName == "cState") {
            formData.append("editFiled", this.state.stateC);
        }
        else if (filedName == "cPincode") {
            formData.append("editFiled", this.state.pincode);
        }
        else if (filedName == "cCountry") {
            formData.append("editFiled", this.state.country);
        }

        formData.append("filedName", filedName);
        formData.append("customerID", sessionStorage.getItem("customerID"));
        this.setState({isLoading: true});
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/editSaveInformation`, formData
        ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then(response => {

                if (response.data == "updateSuccess") {
                    this.setState({isLoading: false});
                    toast.success('🦄 Profile updated !!!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    this.componentDidMount();

                }

            })
            .catch(error => {
                this.setState({isLoading: false});
                console.log(error);
            })
    }

    render() {

        if (this.state.checkLoginStatus === false) {
            return <Redirect to="/CustomerLogin" />
        }


        return (
            <div className="">
                {this.state.isLoading&& <WSppiner isLoading={this.state.isLoading}/>}

                <HeaderNavBar />

                <SideBar />


                <div className="row pt-5">

                    <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12">


                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 pt-3">

                        <h5 style={{ marginTop: "2%" }}>Profile Information</h5>

                        <div className="personalInformation">

                            <table className="table tableDivInfo">

                                <tr>
                                    <td colspan="2">
                                        <a href="#passwordChangeDiv" style={{ color: "white", textDecoration: "none", width: "100%", }} className="addAddress" onClick={this.changePasswordBox}>Change Password</a>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Name </td><td><input type="text" name="name" value={this.state.name} onChange={this.handleChangeAll} disabled id="nameID" className="form-control" /></td><td><img src={editIcon} className="editIcon" onClick={() => this.editInformation("nameID")} /></td><td id="nameIDSave" className="editSaveButton"><button className="addTocartButton2" onClick={() => this.editSaveDetails("cName")}>Save</button></td>
                                </tr>

                                <tr>
                                    <td>Email </td><td><input type="text" name="email" value={this.state.email} onChange={this.handleChangeAll} disabled id="emailID" className="form-control" /></td><td><img src={editIcon} className="editIcon" onClick={() => this.editInformation("emailID")} /></td><td id="emailIDSave" className="editSaveButton"><button className="addTocartButton2" onClick={() => this.editSaveDetails("cEmail")}>Save</button></td>
                                </tr>

                                <tr>
                                    <td>Mobile </td><td><input type="text" name="mobile" value={this.state.mobile} onChange={this.handleChangeAll} disabled id="mobile" className="form-control" /></td><td><img src={editIcon} className="editIcon" onClick={() => this.editInformation("mobile")} /></td><td id="mobileSave" className="editSaveButton"><button className="addTocartButton2" onClick={() => this.editSaveDetails("cMobile")}>Save</button></td>
                                </tr>

                                <tr>
                                    <td>Gender </td><td><input type="text" name="gender" value={this.state.gender} onChange={this.handleChangeAll} disabled id="gender" className="form-control" /></td><td><img src={editIcon} className="editIcon" onClick={() => this.editInformation("gender")} /></td><td id="genderSave" className="editSaveButton"><button className="addTocartButton2" onClick={() => this.editSaveDetails("cGender")}>Save</button></td>
                                </tr>

                                <tr>
                                    <td>Address </td><td><textarea style={{ border: "none" }} name="address" value={this.state.address} onChange={this.handleChangeAll} id="address" className="form-control" disabled ></textarea></td><td><img src={editIcon} className="editIcon" onClick={() => this.editInformation("address")} /></td><td id="addressSave" className="editSaveButton"><button className="addTocartButton2" onClick={() => this.editSaveDetails("cAddress")}>Save</button></td>
                                </tr>

                                <tr>
                                    <td>City </td><td><input type="text" name="city" value={this.state.city} disabled id="city" onChange={this.handleChangeAll} className="form-control" /></td><td><img src={editIcon} className="editIcon" onClick={() => this.editInformation("city")} /></td><td id="citySave" className="editSaveButton"><button className="addTocartButton2" onClick={() => this.editSaveDetails("cCity")}>Save</button></td>
                                </tr>

                                <tr>
                                    <td>State </td><td><input type="text" name="stateC" value={this.state.stateC} disabled id="state" onChange={this.handleChangeAll} className="form-control" /></td><td><img src={editIcon} className="editIcon" onClick={() => this.editInformation("state")} /></td><td id="stateSave" className="editSaveButton"><button className="addTocartButton2" onClick={() => this.editSaveDetails("cState")}>Save</button></td>
                                </tr>

                                <tr>
                                    <td>Pincode </td><td><input type="text" name="pincode" value={this.state.pincode} disabled id="pincode" onChange={this.handleChangeAll} className="form-control" /></td><td><img src={editIcon} className="editIcon" onClick={() => this.editInformation("pincode")} /></td><td id="pincodeSave" className="editSaveButton"><button className="addTocartButton2" onClick={() => this.editSaveDetails("cPincode")}>Save</button></td>
                                </tr>
                                <tr>
                                    <td>Country </td><td><input type="text" name="country" value={this.state.country} disabled id="country" onChange={this.handleChangeAll} className="form-control" /></td><td><img src={editIcon} className="editIcon" onClick={() => this.editInformation("country")} /></td><td id="countrySave" className="editSaveButton"><button className="addTocartButton2" onClick={() => this.editSaveDetails("cCountry")}>Save</button></td>
                                </tr>



                            </table>



                        </div>

                    </div>

                    <div className="col-xl-4 col-l-4 col-md-12 col-sm-12" id="passwordChangeDiv">

                        <div id="currentEmailID" className="changePasswordInfo">

                            <form style={{ marginTop: "0%", marginLeft: "10%", width: "80%" }} onSubmit={this.checkPasswordFromSubmit}>
                                <h5 style={{ marginTop: "2%" }}>Change Password</h5>
                                <input type="password" name="currentPassword" value={this.state.currentPassword} onChange={this.handleChangeAll} className="form-control" placeholder="Enter current password" />

                                <div className="row">
                                    <div className="col-xl-5">
                                        <input type="submit" value="submit" className="addAddress" style={{ marginTop: "5%" }} />
                                    </div>
                                    <div className="col-xl-7">
                                        <p id="passwordCheckStatus"></p>
                                    </div>

                                </div>

                            </form>


                            <form style={{ marginTop: "0%", marginLeft: "10%", width: "80%" }} onSubmit={this.changePasswordSubmit}>
                                <div className="newAndConfirmPass" id="newAndConfirmPass">
                                    <div style={{ marginTop: "10px" }}>
                                        <input type="password" name="newPassword" value={this.state.newPassword} onChange={this.handleChangeAll} className="form-control" placeholder="Enter new password" />
                                    </div>

                                    <div style={{ marginTop: "10px" }}>
                                        <input type="password" name="confirmPasswrd" value={this.state.confirmPasswrd} onChange={this.handleChangeAll} className="form-control" placeholder="Enter confirm password" />
                                    </div>

                                    <input type="submit" value="submit" className="addAddress" style={{ marginTop: "5%" }} />
                                </div>

                            </form>

                        </div>
                    </div>

                </div>

                <ToastContainer />
            </div>
        )
    }
}


export default CustomerProfile;