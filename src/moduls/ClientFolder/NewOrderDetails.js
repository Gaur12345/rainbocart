import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './Header';
import SideBar from './SideBar';
import './css/Home.css';
import ReactPaginate from 'react-paginate';
import {Redirect,Link} from 'react-router-dom';
import filters from './Filters';
import moreDatails from './Images/moreDatails.png';
import check from './Images/check.png';
import addresImage from './Images/site.png';
import customerImage from './Images/user.png';
import close from './Images/close.png';
import {Button, Card,Modal} from 'react-bootstrap';
import SideBarMobile from './sidebar/Sidebar';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import WSppiner from '../../common/WSppiner';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import './css/NewOrderDetails.css';




class NewOrderDetails extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
          checkLoginStatus : true, 
          data : [],
          data2 : [],
          offset: 0,
          tableData: [],
          orgtableData: [],
          perPage: 10,
          currentPage: 0,
          orderID : 0,
          afterDiscount :0,
          totalQunatity : 0,

          usrData : this.props.match.params.userData,
          totalAmt : 0,
          addressTab : false,
          customerTab : false,
          customerID : 0,
          delAddressID : 0,

          delLocality : "",
          delLandmark : "",
          delCity : "",
          delState : "",
          delCountry : "",
          delPincode : "",
          delMobileF : "",
          delMobileS : "", 


          cusName : "",
          cusEmail : "",
          cusAddress : "",
          cusCity : "",
          cusState : "",
          cusCountry : "",
          cusPincode : "",
          cusMobile : "",
          cusGender : "",
          isLoading : false
         

        }

        let token  = sessionStorage.getItem("emailID");

        if(token ==  null || token == undefined || token == "")
        {
            
            this.state.checkLoginStatus = false;
        }
    }
    
    componentDidMount()
    {

        if(this.state.checkLoginStatus == true)
        {
            let arrD = this.state.usrData.split("pro");

            this.setState({
                delAddressID : arrD[0],customerID : arrD[1],
                isLoading : false
            });
    
            let ID  = sessionStorage.getItem("shopID");

            let productTable = ID+"producttable";
            let sum = 0;
            let totalQunatity = 0;
            let afterDiscountPrice = 0;
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/newOrderDetails`,{productTable : productTable,customerID : arrD[1],orderID:arrD[2] }
            ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then(response=>{
                this.setState({isLoading:false});
                let orderIDCheck = 0;
                for(let i=0;i<response.data.length;i++)
                {
                    sum = sum + parseInt(response.data[i].pPrice) * parseInt(response.data[i].quantity);
                    afterDiscountPrice = afterDiscountPrice + ((parseInt(response.data[i].pPrice - (parseInt(response.data[i].pPrice) * (response.data[i].offer/100))))) * parseInt(response.data[i].quantity);
                    totalQunatity = totalQunatity + parseInt(response.data[i].quantity);
                    if(i == 0)
                    {
                        orderIDCheck = response.data[i].orderID;
                    }
    
                }   
    
                    this.setState({data : response.data,
                    totalAmt : sum,
                    afterDiscount : afterDiscountPrice,
                    totalQunatity : totalQunatity,
                    orderID:orderIDCheck});
    
                    console.log(response.data)
    
            })
            .catch(error=>{
                this.setState({isLoading:false});
                console.log(error)
            })
        }

    }

    // 

    handleModalAddressTab = () =>
    {
        this.setState({addressTab : !this.state.addressTab});
    }

    handleModalCustomerTab = () =>
    {
        this.setState({customerTab : !this.state.customerTab});
    }



    getCustomerAddress = () =>
    {
        this.setState({isLoading:true});
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/getCustomerAddress`,{delAddress : this.state.delAddressID}
        ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}}).
        then(response=>{

            

            this.setState({
                delMobileF : response.data[0].mobile,
                delMobileS : response.data[0].altmobile,
                delLocality : response.data[0].locality,
                delLandmark : response.data[0].landmark,
                delCity : response.data[0].city,
                delState : response.data[0].state,
                delPincode : response.data[0].pincode,
                delCountry : response.data[0].country,
                addressTab : true,
                isLoading:false
            });
        })
        .catch(error=>{
            this.setState({isLoading:false});
            console.log(error)
        })
    }


    // getCustomerDetails 

    getCustomerDetails = () =>
    {
        this.setState({isLoading:true});
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/getCustomerDetails1`,{customerID : this.state.customerID}
        ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}}).
        then(response=>{

                      

            this.setState({
                cusName : response.data[0].cName,
                cusMobile : response.data[0].cMobile,
                cusEmail : response.data[0].cEmail,
                cusAddress : response.data[0].cAddress,
                cusCity : response.data[0].cCity,
                cusState : response.data[0].cState,
                cusPincode : response.data[0].cPincode,
                cusCountry : response.data[0].cCountry,
                cusGender : response.data[0].cGender,
                customerTab : true,
                isLoading:false
            });
        })
        .catch(error=>{
            this.setState({isLoading:false});
            console.log(error)
        })
    }



    downloadCSV = () =>
    {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

        const fileExtension = '.csv';

        const ws = XLSX.utils.json_to_sheet(this.state.data);

        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

        const excelBuffer = XLSX.write(wb, { bookType: 'csv', type: 'array' });

        const data = new Blob([excelBuffer], {type: fileType});

        FileSaver.saveAs(data, "report" + fileExtension);

    }

    render(){
        if(this.state.checkLoginStatus ===  false)
        {
            return <Redirect  to="/userLogin" />
        }


        return(

            <div>
            {this.state.isLoading && <WSppiner isLoading={this.state.isLoading}/>}
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


                <div className="container-fluid">
                    <div className="row">

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">

                            <h5>Orders Details </h5>

                            <div className="tableDiv">

                        <table className="table">
                            <thead className="tableHead">
                                <tr>
                                    <th>S.no</th>
                                    <th>C Name</th>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Size</th>
                                    <th>Price</th>
                                    <th>Sell</th>
                                    <th>Quantity</th>
                                    <th>Offer</th>
                                    <th>Total</th>
                                </tr>
                            </thead>

                            <tbody>

                                {
                                    this.state.data.map((user,index)=>(

                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user.pCompanyName}</td>
                                            <td>{user.productName}</td>
                                            <td>{user.pColor }</td>
                                            <td>{user.pSize}</td>
                                            <td>&#8377;{user.pPrice}</td>
                                            <td>&#8377;{parseInt(user.pPrice) - (parseInt(user.pPrice) * (parseInt(user.offer)/100))}</td>
                                            <td>{user.quantity}</td>
                                            <td>{user.offer}%</td>
                                            <td> &#8377;{(parseInt(user.pPrice) - (parseInt(user.pPrice) * (parseInt(user.offer)/100))) * parseInt(user.quantity)}</td>
                                        </tr>

                                    ))
                                }

                            </tbody>

                        </table>

                        </div>

                        </div>

                    </div>


                    <div className="row inMobileView">
                        
                        <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12" style={{backgroundColor: "#24a0ed",marginTop: "2%",border:"2px solid white",paddingTop:"0.5%"}}>
                        <h6>Total amount: <span style={{color : "white"}}>&#8377;{this.state.totalAmt}</span></h6>

                        </div>

                        <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12" style={{backgroundColor: "#24a0ed",marginTop: "2%",border:"2px solid white",paddingTop:"0.5%"}}>
                        <h6>After discount: <span style={{color : "white"}}>&#8377;{this.state.afterDiscount}</span></h6>

                        </div>

                            
                        <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12" style={{marginTop: "2.5%"}}> 
                                <Link to={`/ShowInvoice/${this.state.delAddressID}pro${this.state.customerID}pro${this.state.orderID}`} style={{textDecoration:'none',color:'white'}} className="newOrderDetailsLink" >Confirm & Genrate Bill</Link>
                        </div>
                        
                        <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12" style={{marginTop: "2%" }}>
                        <h6 className="newOrderDetailsButton " onClick={this.getCustomerAddress}>Delivery Address</h6>
                        </div>
                        
                        <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12" style={{marginTop: "2%"}}>
                        <h6 className="newOrderDetailsButton " onClick={this.getCustomerDetails}>Customer Details</h6>
                        </div>
   
                        <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 " style={{marginTop: "2%",paddingTop : "0.5%"}}> 
                            <Link className="newOrderDetailsLink  " style={{textDecoration : "none", color:"white" }} to="/NewOrder"> Back </Link>
                        </div>

                    </div>
                </div>
              </div>
              </div>
              </div>


              <div id="">
          <Modal size="md" show={this.state.addressTab} onHide={this.handleModalAddressTab}>
                <Modal.Header closeButton>
                  <Modal.Title>  Dilevry Address  </Modal.Title>
               </Modal.Header>
              <Modal.Body>
              <div className="container">

                <div className="row">
              
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        
                        <table className="table">

                            <tr>
                                <td>Mobile : </td> <td>{this.state.delMobileF}</td>

                            </tr>

                            <tr>
                                <td>Alt mobile : </td> <td>{this.state.delMobileS}</td>

                            </tr>

                            <tr>
                                <td>Locality : </td> <td>{this.state.delLocality}</td>

                            </tr>

                            <tr>
                                <td>Landmark : </td> <td>{this.state.delLandmark}</td>

                            </tr>


                            <tr>
                                <td>City : </td> <td>{this.state.delCity}</td>

                            </tr>

                            <tr>
                                <td>State : </td> <td>{this.state.delState}</td>

                            </tr>

                            <tr>
                                <td>Country : </td> <td>{this.state.delCountry}</td>

                            </tr>

                            <tr>
                                <td>Pincode : </td> <td>{this.state.delPincode}</td>

                            </tr>

                           
                        </table>

                

                
                  </div>
  
            </div>
            </div>
                         
            
            </Modal.Body>
            <Modal.Footer>
              
              
              <Button onClick={this.handleModalAddressTab} className="modelSaveButton" variant="primary">Close</Button>
            </Modal.Footer>
          </Modal>
          </div>  


          
          <div>
          <Modal size="md" show={this.state.customerTab} onHide={this.handleModalCustomerTab}>
                <Modal.Header closeButton>
                  <Modal.Title>  Customer Details  </Modal.Title>
               </Modal.Header>
              <Modal.Body>
              <div className="container">

                <div className="row">
              
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        
                        <table className="table">

                          <tr>
                                <td>Name : </td> <td>{this.state.cusName}</td>

                            </tr>



                            <tr>
                                <td>Mobile : </td> <td>{this.state.cusMobile}</td>

                            </tr>

                            <tr>
                                <td>Email : </td> <td>{this.state.cusEmail}</td>

                            </tr>

                            <tr>
                                <td>Gender : </td> <td>{this.state.cusGender}</td>

                            </tr>

                            <tr>
                                <td>Address : </td> <td>{this.state.cusAddress}</td>

                            </tr>


                            <tr>
                                <td>City : </td> <td>{this.state.cusCity}</td>

                            </tr>

                            <tr>
                                <td>State : </td> <td>{this.state.cusState}</td>

                            </tr>

                            <tr>
                                <td>Country : </td> <td>{this.state.cusCountry}</td>

                            </tr>

                            <tr>
                                <td>Pincode : </td> <td>{this.state.cusPincode}</td>

                            </tr>

                           
                        </table>

                

                
                  </div>
  
            </div>
            </div>
                         
            
            </Modal.Body>
            <Modal.Footer>
              
              
              <Button onClick={this.handleModalCustomerTab} className="modelSaveButton" variant="primary">Close</Button>
            </Modal.Footer>
          </Modal>
          </div>  




            </div>
        )
    }
}



export default NewOrderDetails;