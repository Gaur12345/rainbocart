import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import './css/HomeCustomer.css';
import HeaderNavBar from './Header';
import SideBar from './sidebar/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FooterBar from './FooterBar';
import ReactStars from "react-rating-stars-component";
import WSppiner from '../../common/WSppiner';
import DisplayProduct from '../sharedModuls/searchbar/Displayproduct';
import {encryptData,decryptData} from '../sharedModuls/Utils/Utils';
import { faUnderline } from '@fortawesome/free-solid-svg-icons';
const crypto =require('crypto-js');
const firstExample = {
  size: 20,
  value: 4.5,
  edit: false
};

let buyNowData = [];

class ShowShopProduct extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {

            // productTableName : "",
            data : [],
            shopName : "",
            shopAddress : "",
            shopOwnerName : "",
            checkLoginStatus : true,
            productTable : "",
            shopRegNo : "",
            resultShow : true,
            buyNowCheck : false,
            imagedata : [],
            imageTable:"",
            isLoading : false,
            user:[]
        }
    }



    componentDidMount = async ()=>{
        let pTable = "";
        let result1 = [];
        let productInformation= [];
        if(this.props.location.state!= undefined){
            
            this.setState({
                user: this.props.location.state.productInfomation,
                productTable : this.props.location.state.productTableName,
            });   
            productInformation = {
                "user" :this.props.location.state.productInfomation,
                "productTable":this.props.location.state.productTableName
            }
            sessionStorage.setItem("productInformation",JSON.stringify(productInformation));
            
            pTable = this.props.location.state.productTableName;
        }
        else{
            if(this.props.location.propetries != undefined){
                console.log("if block")
                this.setState({
                    user:this.props.location.propetries.productInfomation,
                    productTable : this.props.location.propetries.productTableName
                });
                pTable = this.props.location.propetries.productTableName;
                productInformation = {
                    "user" :this.props.location.propetries.productInfomation,
                    "productTable":this.props.location.propetries.productTableName
                }
                sessionStorage.setItem("productInformation",JSON.stringify(productInformation));
                {
                    sessionStorage.setItem("productDataForAddtoCart",JSON.stringify(productInformation));
                }
            }
            else if(this.props.location.propetries == undefined){
                console.log("else if block")
                const productInformation = JSON.parse(sessionStorage.getItem("productDataForAddtoCart"));
                this.setState({
                    user:productInformation.user,
                    productTable : productInformation.productTable
                });
                pTable = productInformation.productTable;
            } 
        }
        
   
        result1 = await this.getProductInformationData(pTable);
        let dat = JSON.parse(sessionStorage.getItem("productDataForAddtoCart"));
        let image = dat.user.uid+"imagepathtable" 
        this.setState({data: result1 , shopName :dat.user.uShopName,shopAddress : dat.user.uArea,
            shopOwnerName :dat.user.uname,shopRegNo : dat.user.uid,imageTable: image}); 
    }
    getProductInformationData= async(product)=>{    
       return new Promise((resolve,reject)=>{
        let key="password";
        let productTable = encryptData(product,key);
        this.setState({isLoading:true});
       axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/showAllShopProduct`,
       {productTable : productTable,
        })
       .then(response=>{
           if(response.data.length > 0)
           {
            this.setState({isLoading:false});
               return resolve(response.data);  
           }
           else
           {
            this.setState({isLoading:false});
               return resolve(response.data);
           }
       })
       .catch(error=>{
            return reject(error);
            this.setState({isLoading:false});
       })   
       })
    

        //console.log("dddd ",aar2[0].split('@')+"product"+arr[1]);
    }

    showAllShopProductImage= async(image)=>{
        return new Promise((resolve,reject)=>{
            let key = "password";
        let imageTable = encryptData(image,key);
        this.setState({isLoading:true});
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/showAllShopProductImage`,
        {imageTable : imageTable,
         })
        .then(response=>{
            let data = [];
                  
            data = decryptData(response.data,key);
            data = JSON.parse(data.toString(crypto.enc.Utf8));
            if(data.length > 0)
            {
                this.setState({isLoading:false});
                return resolve(data);
                // this.setState({imagedata : data});
            }
            else
            {
                this.setState({isLoading:false});
                return resolve(data);   
            }
        })
        .catch(error=>{
            this.setState({isLoading:false});
            return reject(error);

        }) 
        })
         
    }



    /// Add to cart function start here 

    addToCard = (productID)=>
    {
        //console.log(this.state.productTable);
       if(sessionStorage.getItem("customerEmail") == null || sessionStorage.getItem("customerEmail") == undefined ||  sessionStorage.getItem("customerEmail") == "")
       {
           
            this.setState({checkLoginStatus : false});
       }
       else
       {

        const key = "password";
        const customerID =encryptData (sessionStorage.getItem("customerID"),key);
        const productTable = (this.state.productTable);
        //const productID = (this.state.productID);
      //const productQuantity=encryptData(("1"), key);
     // console.log("shop",this.state.shopRegNo);
        const shopRegNo=(this.state.shopRegNo);
        let payload ={
            customerID:customerID,
            productTable:productTable,
            productID:productID,
            productQuantity:"1",
            shopRegNo:shopRegNo
        }
            
        this.setState({isLoading:true});
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/addTOCart`,payload
            ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then(response=>{

                    if(response.data == "productAddedToCard")     
                    {
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
                    else
                    {
                        this.setState({isLoading:false});
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
            .catch(error=>{
                this.setState({isLoading:false});
                console.log(error)
            })
       }
    }


    // buynow function start here 


    buyNow = (data)=>
    {
        data["productTable"]= this.state.productTable;
        buyNowData = [data];
        const productInformation = {
            productInformation : buyNowData,
            redirectPage : "/BuyNowCheckOut"
        }

        sessionStorage.setItem("productDataForBoyNow",JSON.stringify(productInformation));
        this.setState({buyNowCheck : true});
    }

    render()
    {

        if(this.state.checkLoginStatus === false)
        {
            return <Redirect to={{
                pathname: "/CustomerLogin",
                hash: "ShopProductInfo",
                propetries: { 
                ProductInfo: this.state.user, 
                productTable: this.state.productTable
                },
              }}/>
        }

        if(this.state.buyNowCheck === true)
        {
            console.log("This state ",this.state)
            return <Redirect to={{
                pathname: "/BuyNowCheckOut",
                propetries: {  
                ProductInfo: this.state.Product,
                afterLogin : true, 
                productTable: this.state.productTable,
                pageName: "ShowShopProduct"
                },
              }}/>
        }

        return (
          <div>

            {this.state.isLoading&& <WSppiner isLoading={this.state.isLoading}/>}
              <HeaderNavBar />

              <SideBar />
              <u><h5 className="titleShopNameAddress">Shop Address : <span className="spanTag">{this.state.shopAddress}</span> , Shop Name : <span className="spanTag">{this.state.shopName}</span>, Owner : <span className="spanTag">{this.state.shopOwnerName}</span></h5></u>
                <DisplayProduct 
                key={this.state.data.proID} 
                data={this.state.data} 
                resultShow={this.state.resultShow} 
                addToCard = {this.addToCard} 
                buyNow={this.buyNow} 
                imageTable={this.state.imageTable} 
                productTable={this.state.productTable}
                />


                

            <FooterBar />

              <ToastContainer />


             
             
            </div>
        )
    }
}


export const sendBuyNowData = ()=>
{
    return buyNowData;
}
export default ShowShopProduct;