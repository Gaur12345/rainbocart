import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import './css/ReturnTerms.css';
import FooterBar from './FooterBar';
import HeaderNavBar from './Header';
import WSppiner from '../../common/WSppiner';
import SideBar from './sidebar/Sidebar';
import axios from 'axios';
import { encryptData, decryptData } from '../sharedModuls/Utils/Utils';
const crypto = require('crypto-js');
class OrderConfirmed extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {

            data : this.props.location.state.orderData,
            shippingDetailsData : "",
            isLoading : false
        }

        console.log("pros",props)
        console.log("this.props.location.orderData ",this.props.location.state.orderData)
    }

    shippingDetails = () =>
    {
        let key = "password";
        this.setState({isLoading:true});
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/getShippingDetails`,{delAddressID  : this.state.data.delAddressID}
        ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
        .then(response=>{
            console.log(response.data);
            let data = [];
                data = decryptData(response.data, key);
                data = JSON.parse(data.toString(crypto.enc.Utf8));
            if(data.length == 1)
            {
                this.setState({
                   shippingDetailsData : data[0],
                   isLoading:false
                });
                console.log(this.state.isLoading);
            }

        })
        .catch(error=>{
            this.setState({isLoading:false});
            console.log(error)
        })
    }
    removeProductFromCart=()=>{
        this.setState({isLoading:true});
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/removeProductFromCart`,{customerID  : sessionStorage.getItem("customerID")}
        ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
        .then(response=>{
            console.log(response.data);
           
            if(response.data.result == 'true')
            {
                this.setState({
                   isLoading:false,
                });
            }

        })
        .catch(error=>{
            this.setState({isLoading:false});
            console.log(error)
        })
    }

    componentDidMount =()=>
    {
        this.shippingDetails();
        this.removeProductFromCart(); 

    }

    render()
    {
        console.log(this.state.shippingDetailsData)
       return(

        <div>
{this.state.isLoading&& <WSppiner isLoading={this.state.isLoading}/>}
        <HeaderNavBar />

        <SideBar />

        <div className="container confirmContainerDiv">
            <div className="row pt-4">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 pt-5">
                        <h3 className="titleOrderConfirm">Thank you for your order, Gaurav Kumar</h3>
                        <hr/>
                        <h4 className="titleOrderNumberText">Order number: 234-34532-234</h4>
                        <hr/>
                </div>
            </div>

                <div className="row" style={{textAlign:"left"}}>
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12" >
                        <h5 className="titleOrderNumberText"><b>Shpping Address</b></h5>
                        <p className="textShippngDetailsOrderConfirm">{this.state.shippingDetailsData.locality}</p>
                        <p className="textShippngDetailsOrderConfirm">{this.state.shippingDetailsData.city},{this.state.shippingDetailsData.state}</p>
                        <p className="textShippngDetailsOrderConfirm">{this.state.shippingDetailsData.country},{this.state.shippingDetailsData.pincode}</p>
                        <p className="textShippngDetailsOrderConfirm">Landmark:{this.state.shippingDetailsData.landmark}</p>
                        <h5 className="titleOrderNumberText"><b>Payment Method</b></h5>
                        <p className="textShippngDetailsOrderConfirm">Online</p>
                        <p className="textShippngDetailsOrderConfirm">Payment Gateway : Razorpay</p>

                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <h5 className="titleOrderNumberTextRight"><b>Total: &#8377;{this.state.data.amount}</b></h5>

                    <p className="textShippngDetailsOrderConfirmRight">Total items:{this.state.data.quantity}</p>
                    <p className="textShippngDetailsOrderConfirmRight">Tax: &#8377;10</p>
                    <h5 className="titleOrderNumberTextRight"><b>Total: &#8377;{this.state.data.amount}</b></h5>

                    </div>


                </div>


                <div className="row continueShoppingOrderConfirmDiv">
                    <div className="col-xl-12">

                        <Link to="/" style={{color:"white",textDecoration:"none"}} className="CONTINUEButtonOrderConfirm">CONTINUE SHOPPING</Link>

                    </div>

                </div>


        </div>
        
            <FooterBar />
        </div>
       )
    }
}

export default OrderConfirmed;