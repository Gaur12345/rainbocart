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
import cartLogo from '../ClientFolder/Images/logo.png';
import { getDateFormat } from '../sharedModuls/Utils/Utils';
import companyLogo from '../ClientFolder/Images/rainbow.png';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { RiPlayLine } from 'react-icons/ri';

class OrderMoreDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {

            checkLoginStatus: true,
            data: [],
            show: false,
            sName: "",
            sMobile: "",
            sEmail: "",
            sGender: "",
            sAddress: "",
            sArea: "",
            sCity: "",
            sState: "",
            sCountry: "",
            sPincode: "",
            sGST: "",
            sShopName: "",
            paymentMode: "",
            deliveryData: "",
            orderDate: "",
            totalAmount: 0,
            totalItem: 0,
            productDetailsObj: [],
            todayData: "",
            invoiceNumber:"",

            cusName: "",
            cusEmail: "",
            cusAddress: "",
            cusCity: "",
            cusState: "",
            cusCountry: "",
            cusPincode: "",
            cusMobile: "",
            cusGender: "",
            isLoading : false

        }
        let token = sessionStorage.getItem("customerEmail");

        if (token == null || token == undefined || token == "") {

            this.state.checkLoginStatus = false;
        }
    }

    getOrderStatus = (status) => {
        if (status == 0) {
            return "Order Placed";
        }
        else {
            return "Order Confirmed";
        }
    }

    componentDidMount = () => {
        
        const d = new Date();
    
            const tod = d.getDate()+"/"+(d.getMonth() +1 )+"/"+d.getFullYear();
    
            this.setState({todayData : tod});
    
            let invoiceDateTimeFormat = d.getDate()+""+(d.getMonth() + 1)+""+d.getFullYear()+"-"+d.getHours()+""+d.getMinutes()+""+d.getSeconds()+""+d.getMilliseconds();
            this.setState({invoiceNumber : `Inv${invoiceDateTimeFormat}` });
            let formData = new FormData();
        console.log(" props ", this.props.match.params.orderNumber)
        let orderDetails = this.props.match.params.orderNumber.split("pro");
        formData.append("orderID", orderDetails[0]);
        formData.append("customerID", sessionStorage.getItem("customerID"));
        this.setState({isLoading:true});
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/orderMoreDetails`, formData
        ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then(response => {
                console.log("data : ", response.data)
                this.setState({isLoading:false});
                let sum = 0;
                let item = 0;
                for (let i = 0; i < response.data.length; i++) {
                    sum = sum + (parseInt(response.data[i].pPrice) * parseInt(response.data[i].quantity));
                    item = item + parseInt(response.data[i].quantity);
                }

                this.setState({
                    data: response.data,
                    orderDate: getDateFormat(orderDetails[2]),
                    deliveryData: (orderDetails[1]),
                    paymentMode: orderDetails[3],
                    totalAmount: sum,
                    totalItem: item,
                    orderStatus: this.getOrderStatus(orderDetails[4])
                })
                this.seller();
                this.customer();

            })
            .catch(error => {
                this.setState({isLoading:false});
                console.log("error")
            })
            
    }
    seller=()=>{
        this.setState({isLoading:true});
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/getSellerDetails`, { sellerID: this.state.data[0].shopRegID }
        ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then(response => {

                if (response.data.length == 1) {
                    console.log("seller info ", response.data)
                    this.setState({
                        isLoading:false,
                        sName: response.data[0].uname,
                        sMobile: response.data[0].uMobile,
                        sEmail: response.data[0].uEmail,
                        sGender: response.data[0].uGender,
                        sAddress: response.data[0].uAddress,
                        sArea: response.data[0].uArea,
                        sCity: response.data[0].uCity,
                        sState: response.data[0].uState,
                        sCountry: response.data[0].uCountry,
                        sPincode: response.data[0].uPinCode,
                        sGST: response.data[0].uGstNo,
                        sShopName: response.data[0].uShopName

                    });
                    
                }

            })
            .catch(error => {
                this.setState({isLoading:false});
                console.log(error)
            })
    }
    customer=()=>{
        this.setState({isLoading:true});
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/getCustomerDetails`, { customerID: sessionStorage.getItem('customerID') }
        ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then(response => {



                this.setState({
                    isLoading:false,
                    cusName: response.data[0].cName,
                    cusMobile: response.data[0].cMobile,
                    cusEmail: response.data[0].cEmail,
                    cusAddress: response.data[0].cAddress,
                    cusCity: response.data[0].cCity,
                    cusState: response.data[0].cState,
                    cusPincode: response.data[0].cPincode,
                    cusCountry: response.data[0].cCountry,
                    cusGender: response.data[0].cGender,
                    
                });
            })
            .catch(error => {
                this.setState({isLoading:false});
                console.log(error)
            })
    }

    sellerDetails = (sellerID) => {
        // axios.post("http://localhost:4000/getSellerDetails", { sellerID: sellerID })
        //     .then(response => {

        //         if (response.data.length == 1) {
        //             console.log("seller info ", response.data)
        //             this.setState({

        //                 sName: response.data[0].uname,
        //                 sMobile: response.data[0].uMobile,
        //                 sEmail: response.data[0].uEmail,
        //                 sGender: response.data[0].uGender,
        //                 sAddress: response.data[0].uAddress,
        //                 sArea: response.data[0].uArea,
        //                 sCity: response.data[0].uCity,
        //                 sState: response.data[0].uState,
        //                 sCountry: response.data[0].uCountry,
        //                 sPincode: response.data[0].uPinCode,
        //                 sGST: response.data[0].uGstNo,
        //                 sShopName: response.data[0].uShopName

        //             });
                    this.setState({ show: true });
                // }

            // })
            // .catch(error => {

            //     console.log(error)
            // })
    }


    downloadInvoice = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);
        // doc.addImage(companyLogo,40,20,150,40);
        doc.setFontSize(30);
        doc.text(250, 35, "Invoice");
        doc.line(20,45,580,45);

        doc.setFontSize(12);
        doc.text("From",40,90);
        doc.setFontSize(10);
        doc.text(`${this.state.sName}`,40,100);
        doc.text(`${this.state.sShopName}`,40,110);
        doc.text(this.state.sAddress,40,120);
        doc.text(`${this.state.sCity}`,40,130); 
        doc.text(`${this.state.sState}`,40,140);
        doc.line(20,150,580,150);

        doc.setFontSize(10);
        doc.text(`Invoice Data: ${this.state.todayData}`,40,180);
        doc.text(`Due Data: 24/07/2021`,40,190);
        doc.text(`Invoice No: ${this.state.invoiceNumber}`,40,200);

        doc.setFontSize(12);
        doc.text("Bill To",250,180);
        doc.setFontSize(10);
        doc.text(this.state.cusName,250,190);
        doc.text(this.state.cusMobile,250,200);
        doc.text(this.state.cusAddress,250,210);

        doc.setFontSize(12);
        doc.text("Reciver",400,180);
        doc.setFontSize(10);
        doc.text(this.state.cusName,400,190);
        doc.text(this.state.cusMobile,400,200);
        doc.text(this.state.cusAddress,400,210);

        
        //doc.text(`${this.state.shopAddress2}`,40,130);
        doc.line(20,220,580,220);
        // doc.setFontSize(10);
        // doc.text(`Invoice Data: ${this.state.todayData}`,400,80);
        // doc.text(`Due Data: 24/07/2021`,400,90);
        // doc.text(`Invoice No: ${this.state.invoiceNumber}`,400,100);
        // doc.setFontSize(12);
        // doc.text(`Sub Total: ${this.state.afterDiscount}`,40,170);
        // doc.text(`Sale Tax 12%: ${this.state.saleTax}`,40,190);
        // doc.setFontSize(14);
        // doc.text(`Total : ${this.state.afterDiscount + this.state.saleTax}`,40,210);

        const headers = [["S.no", "Company", "Product", "Color", "Size", "Category", "Price", "Qunatity", "Total"]];
        
        let tableData = this.state.data.map((user, index) => (
            [index + 1, user.pCompanyName, user.productName, user.pColor, user.pSize, user.pCategory, user.pPrice, user.quantity, parseInt(user.pPrice) * parseInt(user.quantity)]
        ))
        doc.line(20,250,580,250);
        let content = {
            startY: 230,
            theme: 'plain',
            head: headers,
            body: tableData
        };
        doc.autoTable(content);

        let finalY = doc.lastAutoTable.finalY;

        let pageCount = doc.internal.getNumberOfPages();

        if ((finalY + 230) < doc.getPageHeight()) {
            doc.setPage(pageCount)
            doc.setFontSize(10);
            doc.setLineWidth(1);
            doc.line(20,finalY + 20,580,finalY + 20);
            doc.text(`Total Quantity: ${this.state.totalItem},`, 320, finalY + 30);
            doc.text(`Total Amount: ${this.state.totalAmount}`, 430, finalY + 30);
            doc.setLineWidth(1);
            doc.line(20,finalY + 51,580,finalY + 51);
            doc.text(`${this.state.sShopName}`,430,finalY + 50);
            doc.line(20,finalY + 150,580,finalY + 150);
            doc.text("Authorized Signatory",430,finalY + 149);
            doc.addImage(companyLogo,450,finalY + 180,70,20);
            doc.text("Thank You",450,finalY + 210);

        }
        else {
            doc.addPage();
            doc.setFontSize(10);
            doc.setLineWidth(1);
            doc.line(20,finalY + 20,580,finalY + 20);
            doc.text(`Total Quantity: ${this.state.totalItem},`, 320, finalY + 30);
            doc.text(`Total Amount: ${this.state.totalAmount}`, 430, finalY + 30);
            doc.setLineWidth(1);
            doc.line(20,finalY + 51,580,finalY + 51);
            doc.text(`${this.state.sShopName}`,430,finalY + 50);
            doc.line(20,finalY + 150,580,finalY + 150);
            doc.text("Authorized Signatory",430,finalY + 149);
            doc.addImage(companyLogo,450,finalY + 180,70,20);
            doc.text("Thank You",450,finalY + 210);
        }


        doc.save("invoice.pdf")




    }


    handleCloseModel = () => {

        this.setState({ show: !this.state.show })
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

                <h5  style={{ paddingTop: "5%",  }}>My Orders Details</h5>
                <div className="row m-2">

                    <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 border1">

                        <div className="orderDetailsPage">
                            <h5 style={{ marginTop: "10px" }}>Order Details</h5>
                            <hr />

                            <p className="paraTagOrderMoreDetails">Order Date: {this.state.orderDate}</p>
                            <p className="paraTagOrderMoreDetails">Dilevery Date: {this.state.deliveryData}</p>
                            <p className="paraTagOrderMoreDetails">Payment Mode: {this.state.paymentMode}</p>
                            <p className="paraTagOrderMoreDetails">Quantity: {this.state.totalItem}</p>
                            <p className="paraTagOrderMoreDetails">Order Status: {this.state.orderStatus}</p>
                            <hr />
                            <p className="paraTagOrderMoreDetails" style={{ marginBottom: "5%" }}><b>Total Amount: {this.state.totalAmount}</b></p>

                            <button className="addAddress" onClick={this.downloadInvoice}>Download Invoice</button>
                            <Link to="/MyOrders" style={{ textDecoration: "none", color: "white", marginTop: "10px", float: "left" }} className="addAddress " >Back</Link>

                        </div>

                    </div>

                    <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 border2">



                        {
                            this.state.data.map((user, index) => (

                                <div className="mailDivOrder">

                                    <div className="row">

                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 contentDiv">


                                            <div className="row">

                                                <div className="col-xl-4 col-md-12 col-sm-12 ">

                                                    <img src={user.imagePath} className="ImageOrderDetails " />

                                                </div>


                                                <div className="col-xl-8 col-md-12 col-sm-12 allPara">

                                                    <p className="paraTagOrder">{user.pCompanyName} {user.productName}</p>

                                                    <p className="paraTagOrderSecond">Color : {user.pColor}</p>
                                                    
                                                    <p className="paraTagOrderSecond">Size : {user.pSize}</p>

                                                    <p className="paraTagOrderSecond">Category : {user.pCategory}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 contentDiv">
                                            <p className="paraTagOrderSecond" > <b>Amount: &#8377;{user.pPrice}</b></p>
                                            <p className="paraTagOrderSecond">Quantity: {user.quantity}</p>
                                            <p className="paraTagOrderSecond" style={{ cursor: "pointer" }} onClick={() => this.sellerDetails(user.shopRegID)}>Seller Information</p>

                                        </div>

                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 contentDiv">



                                        </div>

                                    </div>



                                </div>

                            ))

                        }



                    </div>

                </div>



                <FooterBar />


                <Modal size="md" show={this.state.show} onHide={this.handleCloseModel}>
                    <Modal.Header closeButton>
                        <Modal.Title> Seller Details </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">

                                <div className="col-xl-12 col-md-12 col-sm-12">

                                    <table className="table">

                                        <tr>
                                            <td>Name : </td><td>{this.state.sName}</td>
                                        </tr>

                                        <tr>
                                            <td>Mobile : </td><td>{this.state.sMobile}</td>
                                        </tr>

                                        <tr>
                                            <td>Email : </td><td>{this.state.sEmail}</td>
                                        </tr>

                                        <tr>
                                            <td>Shop Name : </td><td>{this.state.sShopName}</td>
                                        </tr>

                                        <tr>
                                            <td>GST No : </td><td>{this.state.sGST}</td>
                                        </tr>
                                        <tr>
                                            <td>Gender : </td><td>{this.state.sGender}</td>
                                        </tr>


                                        <tr>
                                            <td>Address : </td><td>{this.state.sAddress}</td>
                                        </tr>

                                        <tr>
                                            <td>Area : </td><td>{this.state.sArea}</td>
                                        </tr>

                                        <tr>
                                            <td>City : </td><td>{this.state.sCity}</td>
                                        </tr>


                                        <tr>
                                            <td>State : </td><td>{this.state.sState}</td>
                                        </tr>

                                        <tr>
                                            <td>Country : </td><td>{this.state.sCountry}</td>
                                        </tr>

                                        <tr>
                                            <td>Pincode : </td><td>{this.state.sPincode}</td>
                                        </tr>

                                    </table>

                                </div>
                            </div>
                        </div>


                    </Modal.Body>
                    <Modal.Footer>

                        <button className="modelSaveButton" variant="primary" onClick={this.handleCloseModel}>
                            OK
                        </button>

                    </Modal.Footer>
                </Modal>



            </div>
        )
    }
}


export default OrderMoreDetails;