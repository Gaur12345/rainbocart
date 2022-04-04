import React, { Component } from 'react';
import {Link , Redirect} from 'react-router-dom';
import axios from 'axios';
import './css/HomeCustomer.css';
import './css/AddToCart.css';
import Select from 'react-select';
import HeaderNavBar from './Header';
import SideBar from './sidebar/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FooterBar from './FooterBar';
import minus from './Images/minus.png';
import plus from './Images/plus.png';
import WSppiner from '../../common/WSppiner';
import addDeliveryAdd from './Images/add.png';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Accordion,Card,Button,Modal} from 'react-bootstrap';
import RozePay from './RozePay';
import ReactStars from "react-rating-stars-component";
import { sendBuyNowData } from './ShowShopProduct';
import { sendBuyNowData1 } from './ProductInfo';
const firstExample = {
  size: 20,
  value: 4.5,
  edit: false
};


const allState = [

    {name : "State",value : "Bihar",label : "Bihar"}
]

const allCountry = [

    {name : "Country",value : "India",label : "India"}
]



class BuyNowCheckOut extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {

            productDetails : [],
            data : [],
            priceData : [],
            shopName : "",
            shopAddress : "",
            shopOwnerName : "",
            checkLoginStatus : true,
            productTable : "",
            quentityValue : 1,
            totalPrice : 0,
            mobileNumber : "",
            altMobileNumber : "",
            locality : "",
            landmark : "",
            city : "",
            stateIs : "",
            country : "",
            pinCode : "",
            setDeliveryAddessID : "",
            addressAvalible : true,
            isLoading: false,
            show: false,
        }

        
        let token  = sessionStorage.getItem("customerEmail");

        if(token ==  null || token == undefined || token == "")
        {
            this.state.checkLoginStatus = false;
        }
    }




    componentDidMount = ()=>
    {

        if(JSON.parse(sessionStorage.getItem("productDataForBoyNow")) != null && JSON.parse(sessionStorage.getItem("productDataForBoyNow")) != undefined && JSON.parse(sessionStorage.getItem("productDataForBoyNow")) !="")
        {  
            this.setState({
                productDetails : JSON.parse(sessionStorage.getItem("productDataForBoyNow")).productInformation,
                totalPrice : JSON.parse(sessionStorage.getItem("productDataForBoyNow")).productInformation[0].pPrice
            })
        }
        else
        {
            this.setState({checkLoginStatus: false})
        }

        // console.log("data1",sendBuyNowData1());
        // console.log("data2",sendBuyNowData());
        // console.log("location ",this.props.history);
        // if(sendBuyNowData1().length >0  ||  sendBuyNowData().length >0)
        // {
        //     console.log("sess ",JSON.parse(sessionStorage.getItem("loginStatus")))
        //     if(JSON.parse(sessionStorage.getItem("loginStatus")) == true &&  this.props.history.location.state.propetries.afterLogin == false)
        //     {
        //         sessionStorage.setItem("buyNowData",
        //         (this.props.location.state.propetries.pageName == "ShowShopProduct") ?
        //         JSON.stringify(sendBuyNowData())
        //         :JSON.stringify(sendBuyNowData1()));
        //     }
        //     else
        //     {
        //         sessionStorage.setItem("buyNowData",
        //         (this.props.location.propetries.afterLogin == true && 
        //         this.props.location.propetries.pageName == "ShowShopProduct") ?
        //         JSON.stringify(sendBuyNowData())
        //         :JSON.stringify(sendBuyNowData1()));
        //     }
        // }
        // this.setState({
        // productDetails : JSON.parse(sessionStorage.getItem("buyNowData")),
        // totalPrice : JSON.parse(sessionStorage.getItem("buyNowData"))[0].pPrice})
  
        if(this.state.checkLoginStatus === true)
        {
            document.getElementById('newAddressAdding').style.display = "none";
            document.getElementById('newAddressAddingSec').style.display = "none";
            document.getElementById('orderSummary').style.display = "none";
            //document.getElementById("continouSection").style.display="none";
            document.getElementById('forNewDeliveryAddress').style.height = "50px";
            document.getElementById('forNewDeliveryAddressID3').style.height = "50px";        
           let formData = new FormData();
    
           formData.append("customerID",sessionStorage.getItem("customerID"));
           this.setState({isLoading: true});
           axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/customerAddress`,formData
           ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
           .then(response=>{           
            if(response.data.length > 0)
            {
                this.setState({data : response.data,isLoading: false});
            }
            else
            {
                this.setState({addressAvalible : false,isLoading: false});
            }
    
    
           })
           .catch(error=>{
            this.setState({isLoading: false});
            console.log(error)
    
           })
    
        }

      
    }
    saveEditDeliverAddress = () => {
        let formData = new FormData();
        formData.append("name", this.state.eName);
        formData.append("locality", this.state.eLocality);
        formData.append("landmark", this.state.eLandmark);
        formData.append("city", this.state.eCity);
        formData.append("state", this.state.eState);
        formData.append("pincode", this.state.ePincode);
        formData.append("mobile", this.state.eMobile);
        formData.append("altMobile", this.state.eAltMobile);
        formData.append("deliveryAddID", this.state.deliveryAddressIDEdit);
        formData.append("customerID", sessionStorage.getItem("customerID"))
        this.setState({isLoading:true});
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/editDeliveryAddress1`, formData
        ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then(response => {

                console.log(response.data)
                if (response.data == "updateSuccessfully") {
                    this.setState({isLoading:false});
                    toast.success("Delivery Address updated !!!", {
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
                else {
                    this.setState({isLoading:false});
                    toast.error(" Delivery Address not updated !!!", {
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
                this.setState({isLoading:false});
            })
    }
    showAddressEditModel = (data) => {
        this.setState({
            eName: data.name,
            eLocality: data.locality,
            eLandmark: data.landmark,
            eCity: data.city,
            eState: data.state,
            ePincode: data.pincode,
            eCountry: data.country,
            eMobile: data.mobile,
            eAltMobile: data.altmobile,
            deliveryAddressIDEdit: data.delID,
            show: !this.state.show
        })
    }


    addNewAdelAddress = (typeCheck)=>
    {
        if(typeCheck === "oldAdd")
        {
            document.getElementById('newAddressAdding').style.display = "block";
        }
        else if(typeCheck == "newAddress")
        {
            document.getElementById('newAddressAddingSec').style.display = "block";
            document.getElementById('forNewDeliveryAddress').style.height = "fit-content";
           // document.getElementById('newAddressAdding').style.height = "35%";
            this.setState({});
        }
        else if(typeCheck === "removeAddressNew")
        {
            document.getElementById('newAddressAddingSec').style.display = "none";
            document.getElementById('forNewDeliveryAddress').style.height = "8%";
        }
        else if(typeCheck === "removeAddressOld")
        {
            document.getElementById('newAddressAdding').style.display = "block";
        }
    }
    handleChnageALl = (event) =>{

		this.setState( {  [event.target.name] : event.target.value } );

	}
    handleCloseModel = () => {
        this.setState({ show: !this.state.show })
    }
    handleSubmit = (event)=>
    {
        event.preventDefault();
        let msg  = "";
        let checkError = true;

        if(this.state.stateIs ==null || this.state.stateIs == "" || this.state.stateIs == undefined)
        {
            if(msg=="")
            {
                msg = "Please select state Option !!!";
            }
            checkError = false;   
        }
        if(this.state.country ==null || this.state.country == "" || this.state.country == undefined)
        {
            if(msg =="")
            {
                msg = "Please Select country option !!!";
            }
            checkError = false;           
        }
        if(checkError == true)
        {
            const formData = new FormData();
            formData.append("mobileNumber",this.state.mobileNumber);
            formData.append("altMobile",this.state.altMobileNumber);
            formData.append("locality",this.state.locality);
            formData.append("landmark",this.state.landmark);
            formData.append("city",this.state.city);
            formData.append("stateIs",this.state.stateIs.value);
            formData.append("country",this.state.country.value);
            formData.append("pinCode",this.state.pinCode);
            formData.append("customerID",sessionStorage.getItem("customerID"));            
            

            this.setState({isLoading: true});
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/addDeliveryAddress1`,formData
            ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
           .then(response => {
                 if(response.data == "addressAddress")
                 {
                    this.setState({isLoading: false});
                    toast.success(" Delivery Address Added !!!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });

                        this.componentDidCatch();
                    
                                    
                }
                 else
                 {
                    this.setState({isLoading: false});
                     let errorMsg = response.data.sqlMessage.split(" ");
                     toast.error(errorMsg[2]+" already exist !!!", {
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
                this.setState({isLoading: false});
                 console.log(error)
             })
                        
        }
        else
        {
            this.setState({isLoading: false});
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

    paymentOption = ()=>
    {
        document.getElementById('forNewDeliveryAddressID3').style.height = "100px";
        document.getElementById('paymentButton').style.display = "block";
    }

    orderSummary = (delAddID)=>
    {
        
        this.setState({setDeliveryAddessID : delAddID});
        document.getElementById('orderSummary').style.display = "block";
        //document.getElementById('continouSection').style.display="block";
        //document.getElementById('forNewDeliveryAddressID2').style.height = "150px";
        //document.getElementById('paymentButton').style.display = "block";
       
    }


    onlinePayment = ()=>
    {
       
    }
    minusDrc = (tagID, proID) => {
        document.getElementById('orderSummary').style.display = "block";
        let val = document.getElementById(`${tagID}`).value;
        val = parseInt(val);
        if (val > 1) {
            let val = document.getElementById(`${tagID}`).value;
            val--;
            let fData = new FormData();
            fData.append("cid", sessionStorage.getItem("customerID"));
            fData.append("quantity", val);
            fData.append("proID", proID);
            this.setState({ isLoading: true });
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/incrementDecrementItembuynow`, fData
                , { headers: { 'x-access-token': localStorage.getItem("accessToken") } })
                .then(response => {

                    console.log(response.data)
                    if (response.data == "updateItems") {
                        this.setState({ isLoading: false });
                        this.componentDidMount();
                        this.setState({ totalPrice: parseInt(this.state.totalPrice)/val  });
                        document.getElementById('orderSummary').style.display = "block";
                        document.getElementById(`${tagID}`).value = val;
                        toast.success('🦄 Quantity decremented by 1 !!!', {
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
                    this.setState({ isLoading: false });
                    console.log("error ", error)
                })
        }
    }

    plusIncr = (tagID, proID) => {
        let val = document.getElementById(`${tagID}`).value;
        val++;
        let fData = new FormData();
        fData.append("cid",sessionStorage.getItem("customerID"));
        fData.append("quantity", val);
        fData.append("proID", proID);
        this.setState({ isLoading: true });
        console.log("response");
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/incrementDecrementItembuynow`, fData
            , { headers: { 'x-access-token': localStorage.getItem("accessToken") } })
            .then(response => {
                if (response.data == "updateItems") {
                    this.setState({ isLoading: false  });
                    
                    this.componentDidMount();
                    this.setState({ totalPrice: parseInt(this.state.totalPrice)*val  });
                    document.getElementById('orderSummary').style.display = "block";
                    document.getElementById(`${tagID}`).value = val;
                    toast.success('🦄 Quantity incremented by 1 !!!', {
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
                this.setState({ isLoading: false });
                console.log("error ", error)
            })
            console.log("response1");

    }
    updatePriceOnChange = (tagID, proID) => {

        let val = document.getElementById(`${tagID}`).value;
        
        if (parseInt(val) > 0) {

            let fData = new FormData();
            fData.append("cid", sessionStorage.getItem("customerID"));
            fData.append("quantity", val);
            fData.append("proID", proID);
            this.setState({ isLoading: true });
            // axios.post("http://localhost:4000/incrementDecrementItembuynow", fData
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/incrementDecrementItembuynow`, fData
                , { headers: { 'x-access-token': localStorage.getItem("accessToken") } })
                .then(response => {

                    console.log(response.data)
                    if (response.data == "updateItems") {
                        this.setState({ isLoading: false });
                        this.componentDidMount();
                        document.getElementById('orderSummary').style.display = "block";
                        this.setState({ totalPrice: parseInt(this.state.totalPrice)*val  });
                        toast.success('🦄 Item updated !!!', {
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
                    this.setState({ isLoading: false });
                    console.log("error ", error)
                })
        }
        else {
            this.setState({ isLoading: false });
            document.getElementById(`${tagID}`).value = 1;
        }

    }

    render()
    {
        if(this.state.checkLoginStatus ===  false)
        {
            return <Redirect to={"/CustomerLogin"}/>
        }

        const { selectedOption } = this.state;


        return (
          <div className="">
{this.state.isLoading&& <WSppiner isLoading={this.state.isLoading}/>}
              <HeaderNavBar />

              <SideBar />
               
              <u className='pt-5'><h5 style={{fontSize : '200%' }}>Check Out</h5></u>


              <div className="row mt-5">

              <div className="col-xl-1 col-lg-1 col-md-12 col-sm-12">

                
              </div>

                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12  priceDetailsDIV">

                    <div className="deliveryDIVBox1">

                        <div className="deliveryAddress">

                            <h5 style={{marginLeft : "2%"}}>DELIVERY ADDRESS</h5>
                        </div>

                        <div>

                        {this.state.addressAvalible ? (

                            <div>  
                            <Accordion defaultActiveKey="0">

                            <table style={{width : "100%"}}>
                                {this.state.data.map((user,index)=>(

                                    <Card>
                                        <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey={`${index}`} style={{textDecoration : "none"}} className="toggleTagAdd">
                                        
                                        <tr key={index}>
                        
                                            <td>
                                        <p className="deliAddreSele">Name : {user.cName} ,  Mobile : {user.mobile} , <span>Alt Mobile : {user.altmobile}</span></p>
                                        <p className="deliAddreSele"> 
                                        {user.locality} ,  {user.landmark} ,
                                         {user.city} ,  {user.state} , 
                                         {user.country} , 
                                         {user.pincode}  </p><br />
                                         
                                         </td>

                                            <td className=""> <button onClick={() => { this.showAddressEditModel(user) }}className="editTB">Edit</button></td>
                                        </tr>

                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={`${index}`}>
                                        <Card.Body>

                                        <div>

                                        <a href="#orderSummary" style={{textDecoration : "none"}}  className="deliverhere" onClick={()=>this.orderSummary(user.delID)} >DELIVER HERE</a>
                                    </div>

                                        </Card.Body>
                                        </Accordion.Collapse>
                                       
                                    </Card>   
                                    

                                ))}

                                </table>
                                </Accordion>
                               

                            </div>
                            ) : (

                            <div>

                                <button className="addDeveliryAddress" onClick={()=>this.addNewAdelAddress("oldAdd")}>Add Delivery Address </button>

                            </div>
                            ) 


                            }
                            

                        </div>


                        <div>


                        </div>

                        <div className="newAddressAdding" id="newAddressAdding">

                            <form className="formDataFiled"  onSubmit={this.handleSubmit}>

                                <div className="row">

                                    <div className="col-xl-12 col-md-12 col-sm-12">
                                    <h6 className="text-center">Add New Address </h6>
                                    </div>

                                

                                </div>


                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                
                                    <input type="text" className="form-control"  placeholder="Mobile"   name="mobileNumber" value={this.state.mobileNumber} onChange={this.handleChnageALl} required  maxLength="10" />
                                    </div>


                                <div className="form-group col-md-6">
                                
                                <input type="text" className="form-control"  placeholder="Alt Mobile Number"  name="altMobileNumber" value={this.state.altMobileNumber} onChange={this.handleChnageALl} maxLength="10" />
                                
                                </div>


                                </div>



                                <div className="form-row secodnDivForm">
                                    <div className="form-group col-md-6">
                                
                                    <input type="text" className="form-control"  placeholder="locality" id="email" name="locality" value={this.state.locality} onChange={this.handleChnageALl} required />
                                    </div>

                                    <div className="form-group col-md-6">
                                
                                    <input type="text" className="form-control"  placeholder="Landmard" id="landmard" name="landmark" value={this.state.landmark} onChange={this.handleChnageALl} required />
                                    </div>


                                </div>



                                <div className="form-row">
                                    
                                <div className="form-group col-md-6">
                                
                                <input type="text" className="form-control"  placeholder="City"  name="city" value={this.state.city}  onChange={this.handleChnageALl} required  />
                                    </div>


                                    <div className="form-group col-md-6">

                                    <Select isSearchable value={selectedOption} options={allState} onChange={e=>{this.setState({stateIs : e})}} placeholder="State" />
                                    </div>

                                    
                                
                                </div>


                                <div className="form-row">
                                    

                                <div className="form-group col-md-6">

                                <Select isSearchable value={selectedOption} options={allCountry} onChange={e=>{this.setState({country : e})}} placeholder="Country" />
                                </div>


                                <div className="form-group col-md-6">


                                <input type="text" className="form-control"  placeholder="Pin Code"  name="pinCode" value={this.state.pinCode}  onChange={this.handleChnageALl} required  />

                                </div>


                                </div>

                                <div className="form-row">

                                    <div className="form-group col-md-4">


                                    <div className="row">

                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                        <button className="addAddress" type="submit">Add Address</button>

                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                        <button className="addAddress" type="button" onClick={()=>this.addNewAdelAddress("removeAddressOld")} >Cancle</button>

                                        </div>


                                    </div>

                                    </div>


                                </div>


                                </form>  

                            </div>
                    </div>




                    <div className="forNewDeliveryAddress" id="forNewDeliveryAddress">
                            

                          <button className="addNewDeliveryAddButton" onClick={()=>this.addNewAdelAddress("newAddress")}><img src={addDeliveryAdd} className="addDeliveryAddreeImage" /><span className="textforNewAddress"> Add a new address</span></button>

                          <div className="newAddressAdding" id="newAddressAddingSec">

                        <form className="formDataFiled"  onSubmit={this.handleSubmit}>

                            <div className="row">

                            <br />

                                <div className="col-xl-12 col-md-12 col-sm-12">
                                <h6 className="text-center">Add New Address </h6>
                                </div>

                            </div>


                            <div className="form-row">
                                <div className="form-group col-md-6">
                            
                                <input type="text" className="form-control"  placeholder="Mobile"   name="mobileNumber" value={this.state.mobileNumber} onChange={this.handleChnageALl} required  maxLength="10" />
                                </div>


                            <div className="form-group col-md-6">
                            
                            <input type="text" className="form-control"  placeholder="Alt Mobile Number"  name="altMobileNumber" value={this.state.altMobileNumber} onChange={this.handleChnageALl} maxLength="10" />
                            
                            </div>


                            </div>



                            <div className="form-row secodnDivForm">
                                <div className="form-group col-md-6">
                            
                                <input type="text" className="form-control"  placeholder="locality" id="email" name="locality" value={this.state.locality} onChange={this.handleChnageALl} required />
                                </div>

                                <div className="form-group col-md-6">
                            
                                <input type="text" className="form-control"  placeholder="Landmard" id="landmard" name="landmark" value={this.state.landmark} onChange={this.handleChnageALl} required />
                                </div>


                            </div>



                            <div className="form-row">
                                
                            <div className="form-group col-md-6">
                            
                            <input type="text" className="form-control"  placeholder="City"  name="city" value={this.state.city}  onChange={this.handleChnageALl} required  />
                                </div>


                                <div className="form-group col-md-6">

                                <Select isSearchable value={selectedOption} options={allState} onChange={e=>{this.setState({stateIs : e})}} placeholder="State" />
                                </div>

                                
                            
                            </div>


                            <div className="form-row">
                                
                        
                            <div className="form-group col-md-6">

                            <Select isSearchable value={selectedOption} options={allCountry} onChange={e=>{this.setState({country : e})}} placeholder="Country" />
                            </div>


                            <div className="form-group col-md-6">


                            <input type="text" className="form-control"  placeholder="Pin Code"  name="pinCode" value={this.state.pinCode}  onChange={this.handleChnageALl} required  />

                            </div>


                            </div>



                            <div className="form-row">

                                <div className="form-group col-xl-12 col-lg-12  col-md-12">

                                    <div className="row">

                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                        <button className="addAddress" type="submit">Add Address</button>

                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                        <button className="addAddress" type="button" onClick={()=>this.addNewAdelAddress("removeAddressNew")} >Cancle</button>

                                        </div>


                                    </div>

                                </div>


                            </div>


                            </form>

                        </div>

                    </div>


                    <div className="forNewDeliveryAddress" id="forNewDeliveryAddressID2">
                            
                    <div className="row">
                            <div className="col-xl-12">
                            <button className="addNewDeliveryAddButton" ><img src={addDeliveryAdd} className="addDeliveryAddreeImage" /><span className="textforNewAddress"> ORDER SUMMARY</span></button>
                            </div>
                    </div>
                   

                        <div className="row" id="orderSummary">
                            <div className="col-xl-12">

                            <div className="addToCartBoxBuyNow">                                                    
                        {this.state.productDetails.map((user,index)=>(
                                
                        <div className="row addToCartCart" key={index}>

                            <div className="col-xl-3 col-lg-3 col-md-7 col-sm-7 imageCartMobile">
                                <img className="imageOnCart" src={user.imagePath} alt="Card image cap" />
                                <div className="divMinusPlus">
                                            <input type="hidden" id={`hiddenID${index}`} name="custId" value={user.pPrice} />
                                            <p><img src={minus} onClick={() => this.minusDrc(`idIndex${index}`, user.proID)} className="minusPlus" />
                                                <input type="text" className="incrementDecrement" id={`idIndex${index}`} defaultValue={user.pQuantity} onBlur={() => this.updatePriceOnChange(`idIndex${index}`, user.proID)} />
                                                <img src={plus} className="minusPlus" onClick={() => this.plusIncr(`idIndex${index}`, user.proID)} />
                                            </p>
                                        </div>
                        </div>


                    <div className="col-xl-9 col-lg-9 col-md-7 col-sm-7 informationCartMobile">

                            <div className="">
                                <p className="card-title" style={{textAlign : "left"}}>{user.pCompanyName} {user.productName}</p>
                                <p className="text-left shopInformation2">Color: {user.pCategory}, Size: {user.pSize}</p>
                                <p className="text-left shopInformation2">About Product: {user.pDescription}</p>
                                <p className="text-left shopInformation2">Seller: {user.uShopName}</p>
                                <p className="text-left shopInformation2">Shop Owner: {user.uname}</p>
                                <p className="text-left shopInformation2">Address: {user.uAddress} {user.uArea} {user.uCity}</p>
                                <p className="card-text shopInformation">Price: <b> &#8377;{user.pPrice} </b> &#8377;<s>{parseInt(user.pPrice) +  (parseInt(user.pPrice) * (30/100))}</s> <span style={{color:"green",fontSize:"90%"}} >30% off</span> </p>
                                <ReactStars {...firstExample} />
                            </div>
                       
                            </div>

                            </div>
                            ))}
                        </div>


                                
                         <div className="row continouSection" id="continouSection">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 orderSummeryPrice" >
                                    <p className="orderSummTotdalAmt"><b>Total Amount : &#8377;{this.state.totalPrice}</b></p>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 orderSummButton">
                                <div className="ancherTagOnConSha">
                                <a href="#forNewDeliveryAddressID3" style={{textDecoration : "none"}} className="CONTINUEButton" onClick={this.paymentOption}>CONTINUE SHOPPING</a>
                                </div>
                               
                            </div>
                   
                             </div>  
                            </div>

                        </div> 
                    </div>


                    <div className="forNewDeliveryAddress" id="forNewDeliveryAddressID3">
                            <button className="addNewDeliveryAddButton" ><img src={addDeliveryAdd} className="addDeliveryAddreeImage" /><span className="textforNewAddress"> PAYMENT OPTIONS</span></button>
                            <div className="newAddressAdding" id="newAddressAddingSecPayment">
                            <div className="paymentButton" id="paymentButton">

                            <br /><br />
                            <div className="row" id="PaymentTab">

                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 onlinePaymentDiv">
                                    {console.log("data",this.state.productDetails)}
                                    <RozePay 
                                    amount = {parseInt(this.state.totalPrice) + 60} 
                                    mobile={sessionStorage.getItem("customerMobile")}  
                                    email={sessionStorage.getItem("customerEmail")}  
                                    allData={this.state.productDetails}
                                    delAddressID = {this.state.setDeliveryAddessID}  
                                    customerID = {sessionStorage.getItem("customerID")}
                                    deliveryDate = {this.state.productDetails.deliveryData}  />

                                </div>


                                {/* <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 codDiv">
                                        <button className="deliverhere">Cash On Delivery</button>
                                </div> */}

                            </div>

                            </div>
                           
  
                          </div>
  
                      </div>

                </div>


                <div className="col-xl-1 col-lg-1 col-md-12 col-sm-12">


                </div>

                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 deliveryDIVBox">

                    
                    <div className="priceCartItem">

                        <h3 className="text-center">Price Details</h3>

                    </div>

                    <hr/>

                    <div className="priceDivDisDel">

                       
                        <p className="text-left">Discount: <span>0</span></p>
                        <p className="text-left" >Delivery Charges:  <span>60</span> </p>
                        <p className="text-left" >Delivery date:  <span>{this.state.productDetails.deliveryData}</span> </p>


                    </div>

                    <hr/>

                    <div className="priceDivDisDel">
                        <h3 className="text-left">Total Amount : {parseInt(this.state.totalPrice) + 60}</h3>

                    </div>
                    <hr/>


                </div>


                <div className="col-xl-1 col-lg-1 col-md-12 col-sm-12">


                </div>



              </div>

            



              <Modal size="md" show={this.state.show} onHide={this.handleCloseModel}>
                    <Modal.Header closeButton>
                        <Modal.Title> Edit delivery address </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">

                            <div className="row">
                                <div className="col-md-6">

                                    <label>Name</label>

                                    <input text="text"
                                        className="form-control"
                                        placeholder="Name"
                                        name="eName"
                                        value={this.state.eName}
                                        onChange={this.handleChangeAll}
                                    />

                                </div>

                                <div className="col-md-6">
                                    <label>Locality</label>

                                    <input text="text"
                                        className="form-control"
                                        placeholder="Locality"
                                        name="eLocality"
                                        value={this.state.eLocality}
                                        onChange={this.handleChangeAll}
                                    />

                                </div>

                            </div>



                            <div className="row updateModel">

                                <div className="col-md-6">

                                    <label>Landmard</label>
                                    <input text="text"
                                        className="form-control"
                                        placeholder="Landmark"
                                        name="eLandmark"
                                        value={this.state.eLandmark}
                                        onChange={this.handleChangeAll}
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label>City</label>
                                    <input text="text"
                                        className="form-control"
                                        placeholder="City"
                                        name="eCity"
                                        value={this.state.eCity}
                                        onChange={this.handleChangeAll}
                                    />
                                </div>

                            </div>

                            <div className="row updateModel">

                                <div className="col-md-6">
                                    <label>State</label>
                                    <input text="text"
                                        className="form-control"
                                        placeholder="State"
                                        name="eState"
                                        value={this.state.eState}
                                        onChange={this.handleChangeAll}
                                    />

                                </div>

                                <div className="col-md-6">


                                    <div className="marginClass">
                                        <label>Pincode</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Pincode"
                                            name="ePincode"
                                            value={this.state.ePincode}
                                            onChange={this.handleChangeAll}
                                        />
                                    </div>
                                </div>


                                <div className="col-md-6">
                                    <div className="marginClass">
                                        <label>Mobile</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Mobile"
                                            name="eMobile"
                                            value={this.state.eMobile}
                                            onChange={this.handleChangeAll}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="marginClass">

                                        <label>Alt mobile</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Alt mobile"
                                            name="eAltMobile"
                                            value={this.state.eAltMobile}
                                            onChange={this.handleChangeAll}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>


                    </Modal.Body>
                    <Modal.Footer>

                        <button className="modelCancelButton" onClick={this.handleCloseModel}>
                            Cancel
                        </button>

                        <button className="modelSaveButton" onClick={this.saveEditDeliverAddress}>
                            Save
                        </button>

                    </Modal.Footer>
                </Modal>
 
 
             
              <ToastContainer />
            </div>
        )
    }
}


export default BuyNowCheckOut;
