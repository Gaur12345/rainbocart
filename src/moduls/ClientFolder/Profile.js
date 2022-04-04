import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './Header';
import SideBar from './SideBar';
import './css/Home.css';
import './css/Profile.css';
import {Button, Card,Modal} from 'react-bootstrap';
import SideBarMobile from './sidebar/Sidebar';
import {Redirect,Link} from 'react-router-dom';
import editIcon from './Images/pencil.svg';
import WSppiner from '../../common/WSppiner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { encryptData, decryptData } from '../sharedModuls/Utils/Utils';
const crypto = require('crypto-js');
class Profile extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            checkLoginStatus : true, 
            show:false,
            name : "",
            email : "",
            mobile : "",
            gender : "",
            uShopName : "",
            shopCategory : "",
            gstNo: "",
            address : "",
            city : "",
            uState : "",
            country : "",
            pincode : "",
            description : "",
            newPassword:"",
            confirmPasswrd :"",
            currentPassword : "",
            isLoading : false

        }

        let token  = sessionStorage.getItem("emailID");

        if(token ==  null || token == undefined || token == "")
        {
            
            this.state.checkLoginStatus = false;
        }
    }

    editSaveDetails = (filedName)=>
    {
        let formData = new FormData();

        if(filedName == "uname")
        {
            formData.append("editFiled",this.state.name);
        }
        else if(filedName == "uEmail")
        {
            formData.append("editFiled",this.state.email);
        }
        else if(filedName == "uMobile")
        {
            formData.append("editFiled",this.state.mobile);
        }
        else if(filedName == "uGender")
        {
            formData.append("editFiled",this.state.gender);
        }
        else if(filedName == "uAddress")
        {
            formData.append("editFiled",this.state.address);
        }
        else if(filedName == "uCity")
        {
            formData.append("editFiled",this.state.city);
        }
        else if(filedName == "uState")
        {
            formData.append("editFiled",this.state.uState);
        }
        else if(filedName == "uPinCode")
        {
            formData.append("editFiled",this.state.pincode);
        }
        else if(filedName == "uCountry")
        {
            formData.append("editFiled",this.state.country);
        }
        else if(filedName == "uShopName")
        {
            formData.append("editFiled",this.state.uShopName);
        }
        else if(filedName == "uGstNo")
        {
            formData.append("editFiled",this.state.gstNo);
        }

        formData.append("filedName",filedName);
        formData.append("emailID",sessionStorage.getItem("emailID"));
        this.setState({isLoading:true});
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/editSellerProfileInformation`,formData
        ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
        .then(response=>{
            this.setState({isLoading:false});
            if(response.data == "updateSuccess")
            {
                toast.success('?? Profile updated !!!', {
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
        .catch(error=>{
            this.setState({isLoading:false});
            console.log(error);
        })
    }



    changePasswordBox = ()=>
    {
        this.setState({currentPassword : "",newPassword:"",confirmPasswrd:""});
        document.getElementById("newAndConfirmPass").style.display = "none";
        document.getElementById("passwordCheckStatus").innerHTML = "";
        document.getElementById("currentEmailID").style.display = "block";
    }

    componentDidMount = () =>
    {
        this.setState({isLoading:true});
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/getProfileData`,{emailID :  sessionStorage.getItem("emailID")}
        ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
        .then((response)=>{
                console.log("res data : ",response.data)
                this.setState({
                    name : response.data[0].uname,
                    email : response.data[0].uEmail ,
                    mobile : response.data[0].uMobile ,
                    gender : response.data[0].uGender,
                    uShopName : response.data[0].uShopName,
                    shopCategory : response.data[0].uShopCategory,
                    gstNo : response.data[0].uGstNo,
                    address : response.data[0].uAddress,
                    city : response.data[0].uCity,
                    uState : response.data[0].uState,
                    country : response.data[0].uCountry,
                    pincode : response.data[0].uPinCode,
                    description : response.data[0].uDescription,
                    isLoading:false

                });   

                document.getElementById("newAndConfirmPass").style.display = "none";
                document.getElementById("currentEmailID").style.display = "none";


        }).catch(error=>{
            this.setState({isLoading:false});

        })
        
    }

    changePasswordSubmit = (e)=>
    {
        e.preventDefault();
        if(this.state.newPassword !="" && this.state.confirmPasswrd !="" && this.state.newPassword !=null && this.state.confirmPasswrd !=null)
        {

            if(this.state.newPassword  === this.state.confirmPasswrd)
            {
                this.setState({isLoading:true});
              axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/sellerForgotPassword`,
                {
                  emailID : sessionStorage.getItem("emailID"),
                  password  : this.state.newPassword
                
                }).then(response=>{
                    this.setState({isLoading:false});
                  if(response.data == "ChnageSuccessfully")
                  {          
                    toast.success('?? Password Change Successfully !!!', {
                      position: "top-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      });
                  }
              }).catch(error=>{
                this.setState({isLoading:false});
                  console.log("Error Call ",error)
              })  
            }
            else
            {
                toast.error('?? New Password and confirm password must be same !!!', {
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
            toast.error('?? Enter the New password !!!', {
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

    checkPasswordFromSubmit = (e)=>
    {
        e.preventDefault();
        let key = "password";
        if(this.state.currentPassword !=null && this.state.currentPassword!="")
        {this.setState({isLoading:true});
        let emailEnc = encryptData(sessionStorage.getItem("emailID"), key);
        let passwordEnc = encryptData(this.state.currentPassword, key);
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/userLogin`,
            {
            
                 email : emailEnc,
                 password : passwordEnc})
 
             .then(response => {
                this.setState({isLoading:false});
                 if(response.data.loginStatus === "loginSuccessfully")
                 {
                    document.getElementById("passwordCheckStatus").innerHTML = "Password verifyed";
                    document.getElementById("passwordCheckStatus").style.color ="green";
                    document.getElementById("newAndConfirmPass").style.display = "block";
                   // document.getElementById("currentEmailID").style.display = "none";
                 }
                 else
                 {
                    document.getElementById("passwordCheckStatus").innerHTML = "Password not verifyed";
                    document.getElementById("passwordCheckStatus").style.color ="red";
                 }
         
             })
             .catch(error => {
                this.setState({isLoading:false});
                 console.log(error)
             })
 
        }


    }
    
    // editProfile state hete 
    editInformation = (tagId) =>
    {
        document.getElementById(tagId).disabled = false;
        document.getElementById(`${tagId}Save`).style.display = "block";
    }


    handleChangeAll = (event) =>
    {
        this.setState( {  [event.target.name] : event.target.value } );
    }
    
    editProfile = () =>
    {
        this.setState({show : !this.state.show});
        
    }

    handleModal = ()=>
    {
        this.setState({show : !this.state.show});
    }


    render()
    {

        if(this.state.checkLoginStatus ===  false)
        {
            return <Redirect  to="/userLogin" />
        }

        return (

            <div>
{this.state.isLoading&& <WSppiner isLoading={this.state.isLoading}/>}
            <div className="headerBarTop">

            <Header/>
            </div>

            <div className="mobileViewSidebar">
            <SideBarMobile />
            </div>

            <div className="container-fluid">
            <div className="row">
            <div className="col-xl-2 col-md-12 col-sm-12 sideBARColor">

            <SideBar />

            </div> 

                <div className="col-xl-10 col-md-12 col-sm-12  mainBar">

                <h5 style={{marginTop : "2%",textAlign:"left"}}>Profile Information</h5>

                <div className="row">
                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                    <div className="personalInformationSeller">
                <br/>
                <table className="tableDivInfoSeller">

                <tr className="trPaddingHide">
                    <td colspan="2">
                    <a  href="#passwordChangeDiv" style={{color : "white",textDecoration : "none",width: "100%",}} className="changePasswordButton" onClick={this.changePasswordBox}>Change Password</a>
                    </td>
                    </tr>

                    <tr className="trPaddingHide">
                        <td>Name </td><td><input type="text" name="name" value={this.state.name} onChange={this.handleChangeAll} disabled id="nameID" className="form-control" /></td><td className="editTD"><img src={editIcon} className="editIcon"  onClick={()=>this.editInformation("nameID")} /></td><td id="nameIDSave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("uname")}>Save</button></td>
                    </tr>

                    {/* <tr className="trPaddingHide">
                        <td>Email </td><td><input type="text" name="email" value={this.state.email} onChange={this.handleChangeAll} disabled id="emailID" className="form-control" /></td><td className="editTD"><img src={editIcon} className="editIcon" onClick={()=>this.editInformation("emailID")} /></td><td id="emailIDSave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("uEmail")}>Save</button></td>
                    </tr> */}

                    <tr className="trPaddingHide">
                        <td>Mobile </td><td><input type="text" name="mobile" value={this.state.mobile} onChange={this.handleChangeAll} disabled id="mobile" className="form-control" /></td><td className="editTD"><img src={editIcon} className="editIcon" onClick={()=>this.editInformation("mobile")} /></td><td id="mobileSave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("uMobile")}>Save</button></td>
                    </tr>

                    <tr className="trPaddingHide">
                        <td>Gender </td><td><input type="text" name="gender" value={this.state.gender} onChange={this.handleChangeAll} disabled id="gender" className="form-control" /></td><td className="editTD"><img src={editIcon} className="editIcon" onClick={()=>this.editInformation("gender")} /></td><td id="genderSave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("uGender")}>Save</button></td>
                    </tr>

                    <tr className="trPaddingHide">
                        <td>Shop name </td><td><input type="text" name="uShopName" value={this.state.uShopName} onChange={this.handleChangeAll} disabled id="uShopName" className="form-control" /></td><td className="editTD"><img src={editIcon} className="editIcon" onClick={()=>this.editInformation("uShopName")} /></td><td id="uShopNameSave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("uShopName")}>Save</button></td>
                    </tr>

                    <tr className="trPaddingHide">
                        <td>GST </td><td><input type="text" name="gstNo" value={this.state.gstNo} onChange={this.handleChangeAll} disabled id="gstNo" className="form-control" /></td><td className="editTD"><img src={editIcon} className="editIcon" onClick={()=>this.editInformation("gstNo")} /></td><td id="gstNoSave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("uGstNo")}>Save</button></td>
                    </tr>

                    <tr className="trPaddingHide">
                        <td>Address </td><td><textarea style={{border : "none"}} name="address" value={this.state.address} onChange={this.handleChangeAll} id="address" className="form-control"  disabled ></textarea></td><td className="editTD"><img src={editIcon} className="editIcon" onClick={()=>this.editInformation("address")} /></td><td id="addressSave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("uAddress")}>Save</button></td>
                    </tr>

                    <tr className="trPaddingHide">
                        <td>City </td><td><input type="text" name="city" value={this.state.city} disabled id="city" onChange={this.handleChangeAll} className="form-control" /></td><td className="editTD"><img src={editIcon} className="editIcon"  onClick={()=>this.editInformation("city")} /></td><td id="citySave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("uCity")}>Save</button></td>
                    </tr>

                    <tr className="trPaddingHide">
                        <td>State </td><td><input type="text" name="uState" value={this.state.uState} disabled id="state" onChange={this.handleChangeAll} className="form-control" /></td><td className="editTD"><img src={editIcon} className="editIcon" onClick={()=>this.editInformation("state")} /></td><td id="stateSave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("uState")}>Save</button></td>
                    </tr>

                    <tr className="trPaddingHide">
                        <td>Pincode </td><td><input type="text" name="pincode" value={this.state.pincode} disabled id="pincode" onChange={this.handleChangeAll} className="form-control" /></td><td className="editTD"><img src={editIcon} className="editIcon" onClick={()=>this.editInformation("pincode")} /></td><td id="pincodeSave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("uPinCode")}>Save</button></td>
                    </tr>
                    <tr className="trPaddingHide">
                        <td>Country </td><td><input type="text" name="country" value={this.state.country} disabled id="country" onChange={this.handleChangeAll} className="form-control" /></td><td className="editTD"><img src={editIcon} className="editIcon" onClick={()=>this.editInformation("country")} /></td><td id="countrySave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("uCountry")}>Save</button></td>
                    </tr>

                

                </table>



                </div>
                    </div>


                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                    <div id="currentEmailID" className="changePasswordInfoSeller">

                    <form style={{marginTop : "0%",marginLeft: "10%",width:"80%"}} onSubmit={this.checkPasswordFromSubmit}>
                    <h5 style={{marginTop : "2%"}}>Change Password</h5>
                    <input type="password" name="currentPassword" value={this.state.currentPassword} onChange={this.handleChangeAll} className="form-control" placeholder="Enter current password" />

                    <div className="row">
                        <div className="col-xl-5">
                        <input type="submit" value="submit" className="addAddress" style={{marginTop:"5%"}} />
                        </div>
                        <div className="col-xl-7">
                            <p id="passwordCheckStatus"></p>
                        </div>

                    </div>

                    </form>


                    <form style={{marginTop : "0%",marginLeft: "10%",width:"80%"}} onSubmit={this.changePasswordSubmit}>
                    <div className="newAndConfirmPass" id="newAndConfirmPass">
                    <div style={{marginTop : "10px"}}>
                        <input type="password" name="newPassword" value={this.state.newPassword} onChange={this.handleChangeAll} className="form-control" placeholder="Enter new password" />
                        </div>

                        <div style={{marginTop : "10px"}}>
                        <input type="password" name="confirmPasswrd" value={this.state.confirmPasswrd} onChange={this.handleChangeAll} className="form-control" placeholder="Enter confirm password" />
                        </div>

                        <input type="submit" value="submit" className="addAddress"  style={{marginTop:"5%"}} />
                    </div>

                    </form>

                    </div>
                    </div>

                </div>

                </div>
                </div>
                </div>

          <ToastContainer />
            </div>



        )
    }
}



export default Profile;