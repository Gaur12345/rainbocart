import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import './css/HomeCustomer.css';
import './css/AddToCart.css';
import Select from 'react-select';
import HeaderNavBar from './Header';
import SideBar from './sidebar/Sidebar';
import WSppiner from '../../common/WSppiner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FooterBar from './FooterBar';
import minus from './Images/minus.png';
import plus from './Images/plus.png';
import CheckOut from './CheckOut';
import ReactStars from "react-rating-stars-component";

let deliveryDate = new Date();

const firstExample = {
    size: 18,
    value: 4.5,
    edit: false
};

let dataArray = [];
let totalAmount = 0;
let priceStoredObj = [];
const quentity = [

    { name: "quentity", value: "1", label: "1" },
    { name: "quentity", value: "2", label: "2" },
    { name: "quentity", value: "3", label: "3" },
    { name: "quentity", value: "4", label: "4" },
    { name: "quentity", value: "5", label: "5" },
    { name: "quentity", value: "6", label: "6" },
    { name: "quentity", value: "7", label: "7" },
    { name: "quentity", value: "8", label: "8" },
    { name: "quentity", value: "9", label: "9" },
    { name: "quentity", value: "10", label: "10" },
]

class CustomerCart extends Component {
    constructor(props) {
        super(props);

        this.state = {

            productTableName: this.props.match.params.customerProductData,
            data: [],
            shopName: "",
            shopAddress: "",
            shopOwnerName: "",
            checkLoginStatus: true,
            productTable: "",
            totalAmt: 0,
            quentityValue: 1,
            totalItemPrice: 0,
            placeOrderCheck: false,
            totalQuatity: 0,
            totalDiscountAmount: 0,
            totalPrice: 0,
            totalOffer: 0,
            isLoading: false,
            cartItemStatus:true,
            deliveryCharges: 60
        }


        let token = sessionStorage.getItem("customerEmail");

        if (token == null || token == undefined || token == "") {

            this.state.checkLoginStatus = false;
        }

        // sessionStorage.setItem("customerID","123");
    }



    componentDidMount = () => {
        deliveryDate.setDate(deliveryDate.getDate() + 1);
        let formData = new FormData();
        let customerID = sessionStorage.getItem("customerID");
        this.setState({ isLoading: true });

        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/showCartItem`, { customerID: customerID }
            , { headers: { 'x-access-token': localStorage.getItem("accessToken") } })
            .then(response => {
                if (response.data.length == 0) {
                    document.getElementById("placeOrder").disabled = true;
                    // document.getElementById("priceAddToCartBox").style.height = 'auto';
                    priceStoredObj =response.data;
                    this.setState(
                        {
                            data: response.data,
                            isLoading: false,
                            totalAmt: 0,
                            totalQuatity: 0,
                            totalDiscountAmount: 0,
                            totalOffer: 0,
                            totalPrice: 0,
                            cartItemStatus:false,
                            deliveryCharges: 0
                        }
                    );


                }
                else {
                    this.setState({ data: response.data, isLoading: false });
                    priceStoredObj= response.data;
                    this.calculatePricesAndDiscount(response.data);
                }
            })
            .catch(error => {
                this.setState({ isLoading: false });

            })
    }

    /// Add to cart function start here 

    removeFormCart = (cid) => {
        if (sessionStorage.getItem("customerEmail") == null || sessionStorage.getItem("customerEmail") == undefined || sessionStorage.getItem("customerEmail") == "") {
            this.setState({ checkLoginStatus: false });
        }
        else {
            this.setState({ isLoading: true });
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/removeFormCart`, { rCid: cid }
                , { headers: { 'x-access-token': localStorage.getItem("accessToken") } })
                .then(response => {

                    if (response.data == "removeSuccssfully") {
                        this.setState({ isLoading: false });
                        toast.success('🦄 Item remove from the cart !!!', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }

                    this.componentDidMount();

                })
                .catch(error => {
                    this.setState({ isLoading: false });
                })
        }
    }


    // buynow function start here 

    buyNow = () => {

    }

    calculatePricesAndDiscount = (data)=>
    {
        let price = 0;
        let quantity = 0;
        let priceAfterDiscount = 0;
        let totalOffer = 0;
        for (let i = 0; i < data.length; i++) {
            price = price + (parseInt(data[i].pPrice) * parseInt(data[i].quantity));
            quantity = quantity + parseInt(data[i].quantity);
            priceAfterDiscount = priceAfterDiscount + ((parseInt(data[i].pPrice) * parseInt(data[i].quantity) - (parseInt(data[i].pPrice) * parseInt(data[i].quantity)   * (data[i].offer / 100))));
        // sum3 = sum3 + (parseInt(response.data[i].pPrice - (parseInt(response.data[i].pPrice) * (response.data[i].offer / 100))));
        }
       
        totalOffer = ((price - priceAfterDiscount) / price) * 100;
        this.setState({
                totalAmt: priceAfterDiscount,
                totalQuatity: quantity,
                totalDiscountAmount: price - priceAfterDiscount,
                totalOffer: totalOffer.toFixed(2),
                totalPrice: price,
                cartItemStatus:true,
                deliveryCharges: 60
            });
    }


    minusDrc = (tagID, cid, price) => {
        let val = document.getElementById(`${tagID}`).value;
        val = parseInt(val);
        if (val > 1) {
            let val = document.getElementById(`${tagID}`).value;
            val--;
            let fData = new FormData();
            fData.append("cid", cid);
            fData.append("quantity", val);
            this.setState({ isLoading: true });
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/incrementDecrementItem`, fData
                , { headers: { 'x-access-token': localStorage.getItem("accessToken") } })
                .then(response => {

                    if (response.data == "updateItems") {
                        this.setState({ isLoading: false });

                        for(let i=0;i<priceStoredObj.length;i++)
                        {
                            if(priceStoredObj[i].cid == cid)
                            {
                                priceStoredObj[i].quantity = `${val}`;
                            }
                        }

                        this.calculatePricesAndDiscount(priceStoredObj);
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
                })
        }
    }

    plusIncr = (tagID, cid, price) => {

        let val = document.getElementById(`${tagID}`).value;
        val++;
        let fData = new FormData();
        fData.append("cid", cid);
        fData.append("quantity", val);
        this.setState({ isLoading: true });
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/incrementDecrementItem`, fData
            , { headers: { 'x-access-token': localStorage.getItem("accessToken") } })
            .then(response => {

                if (response.data == "updateItems") {
                    this.setState({ 
                    isLoading: false
                    });
                    for(let i=0;i<priceStoredObj.length;i++)
                    {
                        if(priceStoredObj[i].cid == cid)
                        {
                            priceStoredObj[i].quantity = `${val}`;
                        }
                    }
                    this.calculatePricesAndDiscount(priceStoredObj);
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
            })

    }
    updatePriceOnChange = (tagID, cid, price) => {
        let val = document.getElementById(`${tagID}`).value;
        if (parseInt(val) > 0) {
            let fData = new FormData();
            fData.append("cid", cid);
            fData.append("quantity", val);
            this.setState({ isLoading: true });
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/incrementDecrementItem`, fData
                , { headers: { 'x-access-token': localStorage.getItem("accessToken") } })
                .then(response => {

                    if (response.data == "updateItems") {
                        this.setState({isLoading: false });
                        for(let i=0;i<priceStoredObj.length;i++)
                        {
                            if(priceStoredObj[i].cid == cid)
                            {
                                priceStoredObj[i].quantity = `${val}`;
                            }
                        }
                        this.calculatePricesAndDiscount(priceStoredObj);

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
                })
        }
        else {
            this.setState({ isLoading: false });
            document.getElementById(`${tagID}`).value = 1;
        }

    }

    placeOrder = () => {
        this.setState({ placeOrderCheck: true });
    }


    render() {

        if (this.state.checkLoginStatus === false) {
            return <Redirect to="/CustomerLogin" />
        }

        if (this.state.placeOrderCheck == true) {
            return <Redirect to="/CheckOut" />
            // return <CheckOut dataPass = {this.state.data} priceAmt = {this.state.totalAmt} deliveryDate ={"10/10/2021"} />
        }
        const { selectedOption } = this.state;

        return (
            <div className>
                {this.state.isLoading && <WSppiner isLoading={this.state.isLoading} />}
                <HeaderNavBar />

                <SideBar />

                <u><h5 className="titleHeadning">My Cart</h5></u>


                <div className="row">

                    <div className="col-xl-1 col-lg-1 col-md-12 col-sm-12">


                    </div>
                    {this.state.data.length == 0 ? <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 priceDetailsDIV">

                        <div className="addToCartBox"><h4>Cart Is Empty</h4></div> </div>
                            :
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 priceDetailsDIV">

                                <div className="addToCartBox">


                                    {this.state.data.map((user, index) => (

                                        <div className="row addToCartCart" key={index}>

                                            <div className="col-xl-3 col-lg-3 col-md-7 col-sm-7 imageCartMobile">
                                                <img className="imageOnCart" src={user.imagePath} alt="Card image cap" />


                                                <div className="divMinusPlus">
                                                    <input type="hidden" id={`hiddenID${index}`} name="custId" value={user.pPrice} />
                                                    <p><img src={minus} onClick={() => this.minusDrc(`idIndex${index}`, user.cid, user.pPrice)} className="minusPlus" />
                                                        <input type="text" className="incrementDecrement" id={`idIndex${index}`} defaultValue={user.quantity} onBlur={() => this.updatePriceOnChange(`idIndex${index}`, user.cid, user.pPrice)} />
                                                        <img src={plus} className="minusPlus" onClick={() => this.plusIncr(`idIndex${index}`, user.cid, user.pPrice)} />
                                                    </p>
                                                </div>

                                            </div>



                                            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 informationCartMobile">
                                                <div className="">
                                                    <p className="text-left shopInformation2"><b>{user.pCompanyName} {user.productName}</b></p>
                                                    <p className="text-left shopInformation2">Color: {user.pCategory}, Size: {user.pSize}</p>
                                                    <p className="text-left shopInformation2">Price: <b> &#8377;{parseInt(user.pPrice) - (parseInt(user.pPrice) * (user.offer / 100))} </b> &#8377;<s>{user.pPrice}</s> <span style={{ color: "green", fontSize: "90%" }} >{user.offer}% off</span> </p>
                                                    <p className="text-left shopInformation2">About Product: {user.pDescription}</p>
                                                    <p className="text-left shopInformation2">Shop: {user.uShopName}</p>
                                                    <p className="text-left shopInformation2">Shop Owner: {user.uname}</p>
                                                    <p className="text-left shopInformation2">Address: {user.uAddress} {user.uArea} {user.uCity}</p>
                                                    <ReactStars {...firstExample} />
                                                    <button className="addAddress" style={{ width: "50%", float: "left", marginBottom: "2%" }} onClick={() => this.removeFormCart(user.cid)} >Remove</button>
                                                </div>

                                            </div>

                                        </div>



                                    ))}

                                </div>

                            </div>}


                            <div className="col-xl-1 col-lg-1 col-md-12 col-sm-12">


                            </div>

                            <div id='priceAddToCartBox' className="col-xl-3 col-lg-3 col-md-12 col-sm-12 priceAddToCartBox ">


                                <div className="priceCartItem">

                                    <h3 className="text-center">Price Details</h3>

                                </div>

                                <hr />

                                <div className="priceDivDisDel">

                                    <p className="text-left">Price :  <span>{this.state.totalPrice}</span></p>
                                    <p className="text-left">Discount : <span>{this.state.totalOffer}%</span></p>
                                    <p className="text-left">Quantity : <span>{this.state.totalQuatity}</span></p>
                                    <p className="text-left">Delivery Charges :  <span>{this.state.deliveryCharges}</span> </p>
                                    { this.state.cartItemStatus?
                                    (<p className="text-left" >Delivery Date :  <span>{deliveryDate.toDateString()}</span></p>) 
                                    :(<p className="text-left" >Delivery Date :  <span> </span></p>)}

                                </div>

                                <hr />

                                <div className="priceDivDisDel">
                                    <h3 className="text-left">Total Amount : {parseInt(this.state.totalAmt) + this.state.deliveryCharges}</h3>

                                </div>
                                <hr />
                                <p style={{ color: "green", textAlign: "left" }} className="offerText">You will save ₹{`${this.state.totalDiscountAmount}`} on this order</p>

                                        {this.state.cartItemStatus ?
                                        (<button className="placeOrder" id="placeOrder" onClick={this.placeOrder}>Place Order</button>)
                                    : ('') }
                                

                            </div>


                            <div className="col-xl-1 col-lg-1 col-md-12 col-sm-12">


                            </div>



                        </div>

                        <div className="row">
                            <div className="col-xl-1 col-lg-1 col-md-12 col-sm-12">

                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">


                            </div>

                            <div className="col-xl-1 col-lg-1 col-md-12 col-sm-12">
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">

                            </div>


                            <div className="col-xl-1 col-lg-1 col-md-12 col-sm-12">

                            </div>

                        </div>
                        <ToastContainer />
                    </div>
        )
    }
}


export const sendData = () => {
    return {
                        data: dataArray,
                    totalAmount: totalAmount,
                    deliveryData: "10/10/2021"
    }
                    ;
}
                    export default CustomerCart; 
