import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './css/AddToCart.css';
import axios from 'axios';
import HeaderNavBar from './Header';
import SideBar from './sidebar/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WSppiner from '../../common/WSppiner';
import ProdCarousel from '../sharedModuls/searchbar/ProdCarousel';
import { encryptData, decryptData } from '../sharedModuls/Utils/Utils';
import ReactStars from "react-rating-stars-component";
const crypto = require('crypto-js');
let buyNowData = [];
const firstExample = {
    size: 20,
    value: 4.5,
    edit: false
};
class ProductInfo extends Component {

    constructor(props) {
        
        super(props);
        this.state = {
            Product: JSON.parse(sessionStorage.getItem("productDataForAddtoCart")).productInformation ,
                ImageTable: JSON.parse(sessionStorage.getItem("productDataForAddtoCart")).imagetable,
                proID: JSON.parse(sessionStorage.getItem("productDataForAddtoCart")).proID,
                productTable: JSON.parse(sessionStorage.getItem("productDataForAddtoCart")).productTableName,
            buyNowCheck: false,
            checkLoginStatus: true,
            isLoading : false
        }
        
        console.log("test",this.state);
    }
    componentDidMount=()=>{
        if(JSON.parse(sessionStorage.getItem("productDataForAddtoCart")) == null && JSON.parse(sessionStorage.getItem("productDataForAddtoCart")) == undefined && JSON.parse(sessionStorage.getItem("productDataForAddtoCart")) =="")
        {const productInformation = {
            productInformation : this.state.Product,
            productTable : JSON.parse(sessionStorage.getItem("productDataForAddtoCart")).productTableName,
            imagetable: this.state.ImageTable,
            hash:"ProductInfo",  
        }
        console.log("test",this.state);
        sessionStorage.setItem("productDataForAddtoCart",JSON.stringify(productInformation));
    }
    if(JSON.parse(sessionStorage.getItem("productDataForAddtoCart"))  == null){
            this.setState({
                Product: JSON.parse(sessionStorage.getItem("productDataForBoyNow")).productInformation ,
                ImageTable: JSON.parse(sessionStorage.getItem("productDataForBoyNow")).imagetable,
                proID: JSON.parse(sessionStorage.getItem("productDataForBoyNow")).proID,
                productTable: JSON.parse(sessionStorage.getItem("productDataForBoyNow")).productTableName,
            })
        }
        else{
            this.setState({
                Product: JSON.parse(sessionStorage.getItem("productDataForAddtoCart")).productInformation ,
                ImageTable: JSON.parse(sessionStorage.getItem("productDataForAddtoCart")).imagetable,
                proID: JSON.parse(sessionStorage.getItem("productDataForAddtoCart")).proID,
                productTable: JSON.parse(sessionStorage.getItem("productDataForAddtoCart")).productTableName,
            })
        }
}
    addToCard = (productID) => {
        
        if (sessionStorage.getItem("customerEmail") == null || sessionStorage.getItem("customerEmail") == undefined || sessionStorage.getItem("customerEmail") == "") {

            this.setState({ checkLoginStatus: false });
        }
        else {
            console.log(this.state.productTable);
            const key = "password";
            const customerID = encryptData(sessionStorage.getItem("customerID"), key);

            //const productID = (this.state.productID);
            //const productQuantity=encryptData(("1"), key);
            // console.log("shop",this.state.shopRegNo);
            const shopRegNo = (this.state.Product.shopRegID);
            let payload = {
                customerID: customerID,
                productTable: this.state.productTable,
                productID: productID,
                productQuantity: "1",
                shopRegNo: shopRegNo
            }

            this.setState({isLoading:true});
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/addTOCart`, payload
            ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
                .then(response => {

                    if (response.data == "productAddedToCard") {
                        this.setState({isLoading:false});
                        toast.success('🦄 Item added to the !!!', {
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
                        this.setState({isLoading:true});
                        toast.error('🦄 You already riched maximum shop !!!', {
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
                    console.log(error)
                })
        }
    }


    // buynow function start here 


    buyNow = (data) => {
        data["productTable"]= this.state.productTable;
        buyNowData = [data];
        const productInformation = {
            productInformation : buyNowData,
            productTableName : this.state.productTable,
            redirectPage : "/ProductInfo"
        }

        sessionStorage.setItem("productDataForBoyNow",JSON.stringify(productInformation));
        this.setState({buyNowCheck : true});
    }

    render() {
        if (this.state.checkLoginStatus === false) {
            
            return <Redirect to={{
                pathname: "/CustomerLogin",
                hash: "ProductInfo",
                propetries:
                { ProductInfo: this.state.Product,
                productTable: this.state.productTable},
              }}/>
        }

        if(this.state.buyNowCheck === true)
        {
            return <Redirect to={{
                pathname: "/BuyNowCheckOut",
                propetries:
                { ProductInfo: this.state.Product, 
                productTable: this.state.productTable,
                afterLogin : true,
                pageName: "productInfo"},
              }}/>
        }


        return (
            <div className="">
{this.state.isLoading&& <WSppiner isLoading={this.state.isLoading}/>}
                <HeaderNavBar />

                <SideBar />

                <u><h4 className="titleHeadning ">Product Infomation</h4></u>


                <div className="row ">

                    <div className="col-xl-1 col-lg-1 col-md-12 col-sm-12">

                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 priceDetailsDIV">

                        <div className="" >

                            <ProdCarousel proID={this.state.proID} ImageTable={this.state.ImageTable} />

                        </div>

                    </div>


                    {/* <div className="col-xl-1 col-lg-1 col-md-12 col-sm-12">


                    </div> */}

                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 ">


                        <div className="priceCartItem">

                            <h3 className="text-center pt-1">Details</h3>

                        </div>

                        <hr />

                        <div className="priceDivDisDel">
                            <p className="text-left"><span>{this.state.Product.pCompanyName} {this.state.Product.productName}</span></p>
                            <p className="text-left">Discount : <span>{this.state.Product.offer}%</span></p>
                            <p className="shopInformation">Price: <b> &#8377;{this.state.Product.pPrice} </b> &#8377;<s>{parseInt(this.state.Product.pPrice) + (parseInt(this.state.Product.pPrice) * (this.state.Product.offer / 100))}</s> <span style={{ color: "green", fontSize: "90%" }} >{this.state.Product.offer}% off</span> </p>
                            <ReactStars {...firstExample} />
                            <p className="shopInformation " style={{ textAlign: "left" }} >About Product : {this.state.Product.pDescription}...<span className="">{this.state.Product.Description}</span></p>
                            

                        </div>

                        <hr />


                    </div>


                    <div className="col-xl-1 col-lg-1 col-md-12 col-sm-12">


                    </div>



                </div>

                <div className="row">
                    <div className="col-xl-1 col-lg-1 col-md-12 col-sm-12">

                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center btndiv">

                        <button className="addTocartButton  py-2 px-5" onClick={() => this.addToCard(this.state.proID)} >Add to cart</button><button className="buyNameButton  py-2 px-5" onClick={() => this.buyNow(this.state.Product)}>Buy now</button>
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

export const sendBuyNowData1 = () => {
    return buyNowData;
}

export default ProductInfo; 
