import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './Header';
import SideBar from './SideBar';
// import './css/Home.css';
// import './css/Profile.css';
import '../ClientFolder/css/Home.css';
import '../ClientFolder/css/Profile.css';
import {Button, Card,Modal} from 'react-bootstrap';
import SideBarMobile from './sidebar/Sidebar';
import {Redirect,Link} from 'react-router-dom';
import editIcon from '../ClientFolder/Images/pencil.svg';
class AdminProfile extends Component
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
            shopName : "",
            shopCategory : "",
            gstNo: "",
            address : "",
            city : "",
            uState : "",
            country : "",
            pincode : "",
            description : ""

        }

        let token  = sessionStorage.getItem("emailID");

        if(token ==  null || token == undefined || token == "")
        {
            
            this.state.checkLoginStatus = false;
        }
    }



    componentDidMount = () =>
    {
        axios.post('http://localhost:4000/getAdminDetails',{emailID :  sessionStorage.getItem("emailID")})
        .then((response)=>{
                console.log("res data : ",response.data)
                this.setState({
                    name : response.data[0].uname,
                    email : response.data[0].uEmail ,
                    mobile : response.data[0].uMobile ,
                    gender : response.data[0].uGender,
                    shopName : response.data[0].uShopName,
                    shopCategory : response.data[0].uShopCategory,
                    gstNo : response.data[0].uGstNo,
                    address : response.data[0].uAddress,
                    city : response.data[0].uCity,
                    uState : response.data[0].uState,
                    country : response.data[0].uCountry,
                    pincode : response.data[0].uPinCode,
                    description : response.data[0].uDescription

                });   


        }).catch(error=>{


        })
        
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
    
    editAdminProfile = () =>
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

                <h5 style={{marginTop : "2%"}}>Admin Profile </h5>

                <div className="personalInformationSeller">
                <br/>
                <table className="tableDivInfoSeller">

                <tr className="trPaddingHide">
                    <td colspan="2">
                    <a  href="#passwordChangeDiv" style={{color : "white",textDecoration : "none",width: "100%",}} className="addAddress" onClick={this.changePasswordBox}>Change Password</a>
                    </td>
                    </tr>

                    <tr className="trPaddingHide">
                        <td>Name </td><td><input type="text" name="name" value={this.state.name} onChange={this.handleChangeAll} disabled id="nameID" className="form-control" /></td><td className="editTD"><img src={editIcon} className="editIcon"  onClick={()=>this.editInformation("nameID")} /></td><td id="nameIDSave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("cName")}>Save</button></td>
                    </tr>

                    <tr className="trPaddingHide">
                        <td>Email </td><td><input type="text" name="email" value={this.state.email} onChange={this.handleChangeAll} disabled id="emailID" className="form-control" /></td><td className="editTD"><img src={editIcon} className="editIcon" onClick={()=>this.editInformation("emailID")} /></td><td id="emailIDSave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("cEmail")}>Save</button></td>
                    </tr>

                    <tr className="trPaddingHide">
                        <td>Mobile </td><td><input type="text" name="mobile" value={this.state.mobile} onChange={this.handleChangeAll} disabled id="mobile" className="form-control" /></td><td className="editTD"><img src={editIcon} className="editIcon" onClick={()=>this.editInformation("mobile")} /></td><td id="mobileSave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("cMobile")}>Save</button></td>
                    </tr>

                    <tr className="trPaddingHide">
                        <td>Gender </td><td><input type="text" name="gender" value={this.state.gender} onChange={this.handleChangeAll} disabled id="gender" className="form-control" /></td><td className="editTD"><img src={editIcon} className="editIcon" onClick={()=>this.editInformation("gender")} /></td><td id="genderSave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("cGender")}>Save</button></td>
                    </tr>

                    <tr className="trPaddingHide">
                        <td>Shop name </td><td><input type="text" name="shopName" value={this.state.shopName} onChange={this.handleChangeAll} disabled id="shopName" className="form-control" /></td><td className="editTD"><img src={editIcon} className="editIcon" onClick={()=>this.editInformation("shopName")} /></td><td id="shopNameSave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("cGender")}>Save</button></td>
                    </tr>

                    <tr className="trPaddingHide">
                        <td>GST </td><td><input type="text" name="gstNo" value={this.state.gstNo} onChange={this.handleChangeAll} disabled id="gstNo" className="form-control" /></td><td className="editTD"><img src={editIcon} className="editIcon" onClick={()=>this.editInformation("gstNo")} /></td><td id="gstNoSave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("cGender")}>Save</button></td>
                    </tr>

                    <tr className="trPaddingHide">
                        <td>Address </td><td><textarea style={{border : "none"}} name="address" value={this.state.address} onChange={this.handleChangeAll} id="address" className="form-control"  disabled ></textarea></td><td className="editTD"><img src={editIcon} className="editIcon" onClick={()=>this.editInformation("address")} /></td><td id="addressSave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("cAddress")}>Save</button></td>
                    </tr>

                    <tr className="trPaddingHide">
                        <td>City </td><td><input type="text" name="city" value={this.state.city} disabled id="city" onChange={this.handleChangeAll} className="form-control" /></td><td className="editTD"><img src={editIcon} className="editIcon"  onClick={()=>this.editInformation("city")} /></td><td id="citySave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("cCity")}>Save</button></td>
                    </tr>

                    <tr className="trPaddingHide">
                        <td>State </td><td><input type="text" name="uState" value={this.state.uState} disabled id="state" onChange={this.handleChangeAll} className="form-control" /></td><td className="editTD"><img src={editIcon} className="editIcon" onClick={()=>this.editInformation("state")} /></td><td id="stateSave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("cState")}>Save</button></td>
                    </tr>

                    <tr className="trPaddingHide">
                        <td>Pincode </td><td><input type="text" name="pincode" value={this.state.pincode} disabled id="pincode" onChange={this.handleChangeAll} className="form-control" /></td><td className="editTD"><img src={editIcon} className="editIcon" onClick={()=>this.editInformation("pincode")} /></td><td id="pincodeSave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("cPincode")}>Save</button></td>
                    </tr>
                    <tr className="trPaddingHide">
                        <td>Country </td><td><input type="text" name="country" value={this.state.country} disabled id="country" onChange={this.handleChangeAll} className="form-control" /></td><td className="editTD"><img src={editIcon} className="editIcon" onClick={()=>this.editInformation("country")} /></td><td id="countrySave" className="editSaveButton"><button className="addAddress" onClick={()=>this.editSaveDetails("cCountry")}>Save</button></td>
                    </tr>

                

                </table>



                </div>


                </div>


                </div>
                </div>



     <div id="exampleModal">
          <Modal size="md" show={this.state.show} onHide={()=>this.handleModal()}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Product Details  </Modal.Title>
               </Modal.Header>
              <Modal.Body>
              <div className="container">

                <div className="row">
                  <div className="col-md-6">

                  <label>Company Name</label>

                 

                  </div>

                  <div className="col-md-6">
                  <label>Product Name</label>
               
                  </div>

                </div>



                <div className="row updateModel">
                  <div className="col-md-6">

                  <label>Category</label>
                 

                  </div>

                  <div className="col-md-6">
                  <label>Size</label>
                 
                  </div>

                </div>

                <div className="row updateModel">
  
                <div className="col-md-6">

                <label>Color</label>
               
                </div>

                <div className="col-md-6">


                    <div className="marginClass">
                      <label>Quantity</label>
                      <input
                      type="text"
                      className="form-control"
                      placeholder="Quantity"
                      name="quantity"
                      value={this.state.quantity}   
                      onChange={this.handleChangeAll}                    
                   />
                  </div>
                </div>


                <div className="col-md-6">
                    <div className="marginClass">
                      <label>MRP</label>
                      <input
                      type="text"
                      className="form-control"
                      placeholder="MRP"
                      name="mrp"
                      value={this.state.mrp}   
                      onChange={this.handleChangeAll}                     
                   />
                  </div>
                </div>

                <div className="col-md-6">
                    <div className="marginClass">

                      <label>Price</label>
                      <input
                      type="text"
                      className="form-control"
                      placeholder="Price"
                      name="price"
                      value={this.state.price}   
                      onChange={this.handleChangeAll}                      
                   />
                  </div>
                </div>


                <div className="col-md-12">
                    <div className="marginClass">

                      <label>Description</label>
                      <textarea
                      
                      className="form-control"
                      placeholder="Description"
                      name="description"
                      value={this.state.description}  
                      onChange={this.handleChangeAll}                      
                   ></textarea>
                  </div>
                </div>
              
  
            </div>
            </div>
                         
            
            </Modal.Body>
            <Modal.Footer>
              
              <Button variant="primary" onClick={()=>this.submitModal()}>
                Save Changes
              </Button>
              <Button onClick={()=>this.handleModal()} variant="secondary">Close</Button>
            </Modal.Footer>
          </Modal>
          </div>  



            </div>



        )
    }
}



export default AdminProfile;