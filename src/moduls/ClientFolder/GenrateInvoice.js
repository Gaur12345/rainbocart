import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './Header';
import SideBar from './SideBar';
import './css/Home.css';
import WSppiner from '../../common/WSppiner';
import ReactPaginate from 'react-paginate';
import {Redirect,Link} from 'react-router-dom';
import filters from './Filters';
import moreDatails from './Images/moreDatails.png';
import check from './Images/check.png';
import addresImage from './Images/site.png';
import customerImage from './Images/user.png';
import close from './Images/close.png';
import {Button, Card,Modal} from 'react-bootstrap';
import companyLogo from './Images/rainbow.png';
import './css/Header.css';

class GenrateInvoice extends Component
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
  
            invoiceData : this.props.match.params.invoiceData,
            totalAmt : 0,
            saleTax : 0,
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
           
            shopOwerName : "",
            shopName : "",
            shopMobile : "",
            shopAddress1 : "",
            shopAddress2 : "",
  
            todayData : "",
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
            const d = new Date();

            const tod = d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
    
            this.setState({todayData : tod});
    
            console.log(this.state.invoiceData)
    
            let arrD = this.state.invoiceData.split("pro");
    
            this.setState({
                delAddressID : arrD[0],customerID : arrD[1],
                isLoading:true
            });
    
            let email  = sessionStorage.getItem("emailID");
    
            let mobile = sessionStorage.getItem("mobileNo"); 
            
            let em = email.split("@");
    
            let productTable = 1+"producttable";
    
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/newOrderDetails`,{productTable : productTable,customerID : arrD[1],orderID:arrD[2] }
            ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then(response=>{
                this.setState({isLoading:false});
    
                console.log(response.data )
    
    
                let amt =0 ; 
                for(let i=0;i<response.data.length;i++)
                {
                    amt = amt + parseInt(response.data[i].pPrice);
    
                }   
    
                let taxSale = amt * (10/100);
    
                this.setState({saleTax : taxSale});
                
                this.setState({data : response.data,totalAmt : amt});
    
                    
                this.getCustomerInfoAddress();
                this.getShopDetails();
    
            })
            .catch(error=>{
                this.setState({isLoading:false});
                console.log(error)
            })
        }
    }

  


    getCustomerInfoAddress = () =>
    {
        this.setState({isLoading:true});
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/getCustomerInfoAddress`,{customerID : this.state.customerID ,dileveryID : this.state.delAddressID}
        ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
        .then(response=>{

            this.setState({isLoading:false});
            console.log(response.data)

            this.setState({
                cusName  : response.data[0].cName,
                cusMobile : response.data[0].cMobile,
                delLocality : response.data[0].locality,
                delLandmark : response.data[0].landmark,
                delCity : response.data[0].city,
                delState : response.data[0].state,
                delPincode : response.data[0].pincode,
                delCountry : response.data[0].country,
                delMobileF : response.data[0].mobile,
                delMobileS : response.data[0].altmobile,
                addressTab : true
            });
        })
        .catch(error=>{
            this.setState({isLoading:false});
            console.log(error)
        })
    }


    // getCustomerDetails 

    getShopDetails = () =>
    {
        this.setState({isLoading:true});
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/getShopDetails`,{userID : sessionStorage.getItem("shopID")}
        ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
        .then(response=>{

            this.setState({isLoading:false});
            this.setState({
                shopOwerName : response.data[0].uname,
                shopName : response.data[0].uShopName,
                shopAddress1 : `${response.data[0].uAddress} 
                ${response.data[0].uArea}
                ${response.data[0].uCity} `,
                shopAddress2 : ` ${response.data[0].uState}
                ${response.data[0].uCountry}
                ${response.data[0].uPinCode}`    
                 });

                 window.print();

                 
        })
        .catch(error=>{
            this.setState({isLoading:false});
            console.log(error)
        })
    }





    render(){

        if(this.state.checkLoginStatus ===  false)
        {
            return <Redirect  to="/userLogin" />
        }


        return (

            <div className="row">
{this.state.isLoading&& <WSppiner isLoading={this.state.isLoading}/>}
                <div className="col-xl-12 col-lg-12">

                    
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12" style={{backgroundColor : "white"}}>

                           


                            <div className="row">

                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">

                                <div>
                                <h3><img src={companyLogo}  className="LogoImageInvoicePage" /></h3><br/>
                                </div> 
                                <br/>
                            
                                
                                </div>


                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">

                                    <div className="row">
                                    <div className="col-xl-8 col-lg-8">
                                    <h1 style={{textAlign : "right"}}>Invoice  </h1>
                                    </div>

                                    <div className="col-xl-4 col-lg-4">
                                           
                                    </div>
                                    </div>

                                    

                                </div>


                            </div>


                            <div className="row">

                                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">





                                        <h5 className="paraGraphPadding">From</h5>
                                        <p className="paraGraphPadding">{this.state.shopOwerName}</p>
                                        <p className="paraGraphPadding">{this.state.shopName}</p>
                                        <p className="paraGraphPadding">{this.state.shopAddress1}</p>
                                        <p className="paraGraphPadding">{this.state.shopAddress2}</p>
                                </div>

                                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">

                                        <h5 className="paraGraphPadding">Bill To</h5>
                                        <p className="paraGraphPadding">{this.state.cusName}</p>
                                        <p className="paraGraphPadding">{this.state.cusMobile}</p>

                                 </div>

                                 
                                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">

                                        <h5 className="paraGraphPadding">Reciver</h5>
                                        <p className="paraGraphPadding">{this.state.delMobileF}</p>
                                        <p className="paraGraphPadding">{this.state.delMobileS}</p>
                                        <p className="paraGraphPadding">{this.state.delLocality} {this.state.delLandmark} {this.state.delCity}</p>
                                        <p className="paraGraphPadding">{this.state.delState} {this.state.delCountry} {this.state.delPincode} </p>

                                </div>


                                                                 
                                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">

                                        <h5 className="paraGraphPadding">Invoice No : INC004</h5>
                                        <h5 className="paraGraphPadding">Invoice Data : {this.state.todayData} </h5>
                                        <h5 className="paraGraphPadding">Due Data : 24/07/2021</h5>
     

                                </div>




                         </div>
                               
                               


                               

                           
                            
                            <div className="">

                        <table className="table">
                            <thead className="tableHead">
                                <tr>
                                    <th>S.no</th>
                                    <th>C Name</th>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Size</th>
                                    <th>Price</th>
                                    

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
                                            <td> &#8377; {user.pPrice}</td>
                                            

                                          
                                           
                                        </tr>

                                    ))
                                }

                            </tbody>

                        </table>

                        </div>


                        <div className="row">

                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">

                                <div className="notesAndTerm">

                                    <h6 className="paraGraphPadding">Notes </h6>

                                    <p className="paraGraphPadding">It was great doing business with you.</p>

                                    <h6 className="paraGraphPadding">Terms & Conditions </h6>

                                    <p className="paraGraphPadding">Please make the payment by the due date.</p>
                                </div>

                                </div>


                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">

                                    <div className="totalAmountTab">
                                        <h6 className="printItem">Sub Total : {this.state.totalAmt}</h6>
                                        <h6 className="printItem">Sale Tax 10% : {this.state.saleTax}</h6>

                                        <div>
                                        <h5 className="printItem">Total : &#8377; {this.state.totalAmt + this.state.saleTax}</h5> 
                                        </div>

                                    </div>
                                </div>


                        </div>

                        




                        </div>

                    </div>


                </div>



                </div>


            </div>


        )
    }
}


export default GenrateInvoice;