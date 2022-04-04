import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './Header';
import SideBar from './SideBar';
import './css/Home.css';
import ReactPaginate from 'react-paginate';
import { Redirect, Link } from 'react-router-dom';
import filters from './Filters';
import moreDatails from './Images/moreDatails.png';
import check from './Images/check.png';
import addresImage from './Images/site.png';
import customerImage from './Images/user.png';
import close from './Images/close.png';
import WSppiner from '../../common/WSppiner';
import { Button, Card, Modal } from 'react-bootstrap';
import SideBarMobile from './sidebar/Sidebar';
import companyLogo from './Images/rainbow.png';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';




class HistoryMoreDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkLoginStatus: true,
            data: [],
            data2: [],
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 10,
            currentPage: 0,
            orderID: 0,
            afterDiscount: 0,
            totalQunatity: 0,

            usrData: this.props.match.params.userData,
            totalAmt: 0,
            saleTax: 0,
            addressTab: false,
            customerTab: false,
            customerID: 0,
            delAddressID: 0,

            delLocality: "",
            delLandmark: "",
            delCity: "",
            delState: "",
            delCountry: "",
            delPincode: "",
            delMobileF: "",
            delMobileS: "",


            cusName: "",
            cusEmail: "",
            cusAddress: "",
            cusCity: "",
            cusState: "",
            cusCountry: "",
            cusPincode: "",
            cusMobile: "",
            cusGender: "",

            shopOwerName: "",
            shopName: "",
            shopMobile: "",
            shopAddress1: "",
            shopAddress2: "",
            isLoading: false


        }

        let token = sessionStorage.getItem("emailID");

        if (token == null || token == undefined || token == "") {

            this.state.checkLoginStatus = false;
        }
    }


    getShopDetails = () => {
        this.setState({ isLoading: true });
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/getShopDetails`, { userID: sessionStorage.getItem("shopID") }
            , { headers: { 'x-access-token': localStorage.getItem("accessToken") } }).
            then(response => {
                this.setState({ isLoading: false });

                this.setState({
                    shopOwerName: response.data[0].uname,
                    shopName: response.data[0].uShopName,
                    shopAddress1: `${response.data[0].uAddress},${response.data[0].uArea},${response.data[0].uCity} `,
                    shopAddress2: ` ${response.data[0].uState},${response.data[0].uCountry},${response.data[0].uPinCode}`
                });



            })
            .catch(error => {
                this.setState({ isLoading: false });
                console.log(error)
            })
    }



    // method = ()=>
    // {
    //     let p = [...this.state.data];
    //    // let user = filters(this.state.f,p);

    //   //this.setState({data2 : user});


    //   var tdata = this.state.data;
    // 		var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
    //   this.setState({
    //    pageCount: Math.ceil(tdata.length / this.state.perPage),
    //    orgtableData : tdata,
    //    tableData:slice
    //   });
    // }

    componentDidMount() {

        if (this.state.checkLoginStatus == true) {

            let arrD = this.state.usrData.split("pro");
            const d = new Date();

            const tod = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

            this.setState({ todayData: tod });

            let invoiceDateTimeFormat = d.getDate() + "" + (d.getMonth() + 1) + "" + d.getFullYear() + "-" + d.getHours() + "" + d.getMinutes() + "" + d.getSeconds() + "" + d.getMilliseconds();


            this.setState({
                delAddressID: arrD[0], customerID: arrD[1],
                isLoading: true
            });

            this.setState({ invoiceNumber: `Inv${arrD[1]}${arrD[0]}${invoiceDateTimeFormat}` });
            let ID = sessionStorage.getItem("shopID");

            let productTable = ID + "producttable";
            let sum = 0;
            let totalQunatity = 0;
            let afterDiscountPrice = 0;
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/HistoryOrderDetails`, { productTable: productTable, customerID: arrD[1], orderID: arrD[2] }
                , { headers: { 'x-access-token': localStorage.getItem("accessToken") } })
                .then(response => {
                    this.setState({ isLoading: false });
                    let sum = 0;
                    let totalQunatity = 0;
                    let afterDiscountPrice = 0;
                    let orderIDCheck = 0;

                    for (let i = 0; i < response.data.length; i++) {
                        sum = sum + parseInt(response.data[i].pPrice) * parseInt(response.data[i].quantity);
                        afterDiscountPrice = afterDiscountPrice + ((parseInt(response.data[i].pPrice - (parseInt(response.data[i].pPrice) * (response.data[i].offer / 100))))) * parseInt(response.data[i].quantity);
                        totalQunatity = totalQunatity + parseInt(response.data[i].quantity);
                        if (i == 0) {
                            orderIDCheck = response.data[i].orderID;
                        }

                    }
                    let taxSale = afterDiscountPrice * (12 / 100);
                    this.setState({
                        data: response.data,
                        totalAmt: sum,
                        afterDiscount: afterDiscountPrice,
                        totalQunatity: totalQunatity,
                        saleTax: taxSale.toFixed(2),
                        orderID: orderIDCheck
                    });

                    console.log(response.data);


                    this.getShopDetails();

                })
                .catch(error => {
                    this.setState({ isLoading: false });
                    console.log(error)
                })
            this.setState({ isLoading: true });
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/getCustomerAddress`, { delAddress: arrD[0] }
                , { headers: { 'x-access-token': localStorage.getItem("accessToken") } }).
                then(response => {


                    this.setState({
                        delMobileF: response.data[0].mobile,
                        delMobileS: response.data[0].altmobile,
                        delLocality: response.data[0].locality,
                        delLandmark: response.data[0].landmark,
                        delCity: response.data[0].city,
                        delState: response.data[0].state,
                        delPincode: response.data[0].pincode,
                        delCountry: response.data[0].country,
                        isLoading: false
                    });
                })
                .catch(error => {
                    this.setState({ isLoading: false });
                    console.log(error)
                })
        }

    }

    // 

    handleModalAddressTab = () => {
        this.setState({ addressTab: !this.state.addressTab });
    }

    handleModalCustomerTab = () => {
        this.setState({ customerTab: !this.state.customerTab });
    }



    getCustomerAddress = () => {
        console.log(this.state.delAddressID);
        this.setState({ isLoading: true });
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/getCustomerAddress`, { delAddress: this.state.delAddressID }
            , { headers: { 'x-access-token': localStorage.getItem("accessToken") } }).
            then(response => {
                this.setState({
                    delMobileF: response.data[0].mobile,
                    delMobileS: response.data[0].altmobile,
                    delLocality: response.data[0].locality,
                    delLandmark: response.data[0].landmark,
                    delCity: response.data[0].city,
                    delState: response.data[0].state,
                    delPincode: response.data[0].pincode,
                    delCountry: response.data[0].country,
                    addressTab: true,
                    isLoading: false
                });
            })
            .catch(error => {
                this.setState({ isLoading: false });
                console.log(error)
            })
    }


    // getCustomerDetails 

    getCustomerDetails = () => {
        this.setState({ isLoading: true });
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/getCustomerDetails1`, { customerID: this.state.customerID }
            , { headers: { 'x-access-token': localStorage.getItem("accessToken") } }).
            then(response => {



                this.setState({
                    cusName: response.data[0].cName,
                    cusMobile: response.data[0].cMobile,
                    cusEmail: response.data[0].cEmail,
                    cusAddress: response.data[0].cAddress,
                    cusCity: response.data[0].cCity,
                    cusState: response.data[0].cState,
                    cusPincode: response.data[0].cPincode,
                    cusCountry: response.data[0].cCountry,
                    cusGender: response.data[0].cGender,
                    customerTab: true,
                    isLoading: false
                });
            })
            .catch(error => {
                this.setState({ isLoading: false });
                console.log(error)
            })
    }

    downloadInvoice = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);
        //doc.addImage(companyLogo,40,20,150,40);
        doc.setFontSize(20);
        doc.text("Invoice", 250, 50);

        doc.setFontSize(12);
        doc.text("From", 40, 80);
        doc.setFontSize(10);
        doc.text(`${this.state.shopOwerName}`, 40, 100);
        doc.text(`${this.state.shopName}`, 40, 110);
        doc.text(this.state.shopAddress1, 40, 120);
        doc.text(`${this.state.shopAddress2}`, 40, 130);

        doc.setFontSize(12);
        doc.text("Bill To", 180, 80);
        doc.setFontSize(10);
        doc.text(this.state.shopOwerName, 180, 100);
        doc.text(this.state.shopName, 180, 110);

        doc.setFontSize(12);
        doc.text("Reciver", 300, 80);
        doc.setFontSize(10);
        doc.text(this.state.delMobileF, 300, 100);
        doc.text(this.state.delMobileS, 300, 110);
        doc.text(`${this.state.delLocality} ${this.state.delLandmark} ${this.state.delCity}`, 300, 120);
        doc.text(this.state.shopAddress2, 300, 130);

        doc.setFontSize(10);
        doc.text(`Invoice Date: ${this.state.todayData}`, 400, 80);
        doc.text(`Due Data: 24/07/2021`, 400, 90);
        doc.text(`Invoice No: ${this.state.invoiceNumber}`, 400, 100);
        // doc.setFontSize(12);
        // doc.text(`Sub Total: ${this.state.afterDiscount}`, 40, 170);
        // doc.text(`Sale Tax 12%: ${this.state.saleTax}`, 40, 190);
        // doc.setFontSize(14);
        // doc.text(`Total : ${this.state.afterDiscount + this.state.saleTax}`, 40, 210);

        const headers = [["S.no", "C Name", "Product", "Category", "Size", "Price", "Sell", "Quantity", "Offer", "Total"]];

        let tableData = this.state.data.map((user, index) => (


            [index + 1, user.pCompanyName, user.productName, user.pColor, user.pSize, user.pPrice, parseInt(user.pPrice) - (parseInt(user.pPrice) * (parseInt(user.offer) / 100)), user.quantity, user.offer, (parseInt(user.pPrice) - (parseInt(user.pPrice) * (parseInt(user.offer) / 100))) * parseInt(user.quantity)]

        ))


        let content = {
            startY: 230,
            head: headers,
            body: tableData
        };


        doc.autoTable(content);
        let finalY = doc.lastAutoTable.finalY;

        let pageCount = doc.internal.getNumberOfPages();

        if ((finalY + 200) < doc.getPageHeight()) {
            doc.setPage(pageCount)
            doc.setFontSize(12);
            doc.text(`Total Quantity: ${this.state.data.length},`, 400, finalY + 30);
            doc.text(`Sub Total: ${this.state.afterDiscount}`, 400, finalY + 42);
            doc.text(`Sale Tax 12%: ${this.state.saleTax},`, 400, finalY + 64);
            doc.text(`Total Amount: ${this.state.afterDiscount + this.state.saleTax}`, 400, finalY + 76);
        }
        else {
            doc.addPage();
            doc.setFontSize(12);
            doc.text(`Total Quantity: ${this.state.data.length},`, 400, finalY + 30);
            doc.text(`Sub Total: ${this.state.afterDiscount}`, 400, finalY + 42);
            doc.text(`Sale Tax 12%: ${this.state.saleTax},`, 400, finalY + 64);
            doc.text(`Total Amount: ${this.state.afterDiscount + this.state.saleTax}`, 400, finalY + 76);
        }
        doc.save("report.pdf")



    }



    render() {
        if (this.state.checkLoginStatus === false) {
            return <Redirect to="/userLogin" />
        }


        return (

            <div>
                {this.state.isLoading && <WSppiner isLoading={this.state.isLoading} />}
                <div className="headerBarTop">

                    <Header />
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

                                        <h5>History Orders Details </h5>

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
                                                        this.state.data.map((user, index) => (

                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{user.pCompanyName}</td>
                                                                <td>{user.productName}</td>
                                                                <td>{user.pColor}</td>
                                                                <td>{user.pSize}</td>
                                                                <td>&#8377;{user.pPrice}</td>
                                                                <td>&#8377;{parseInt(user.pPrice) - (parseInt(user.pPrice) * (parseInt(user.offer) / 100))}</td>
                                                                <td>{user.quantity}</td>
                                                                <td>{user.offer}%</td>
                                                                <td> &#8377;{(parseInt(user.pPrice) - (parseInt(user.pPrice) * (parseInt(user.offer) / 100))) * parseInt(user.quantity)}</td>
                                                            </tr>

                                                        ))
                                                    }

                                                </tbody>

                                            </table>

                                        </div>

                                    </div>

                                </div>


                                <div className="row inMobileView">

                                    <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12" style={{ backgroundColor: "#24a0ed", marginTop: "2%", border: "2px solid white", paddingTop: "0.5%" }}>
                                        <h6>Total amount: <span style={{ color: "white" }}>&#8377;{this.state.totalAmt}</span></h6>

                                    </div>

                                    <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12" style={{ backgroundColor: "#24a0ed", marginTop: "2%", border: "2px solid white", paddingTop: "0.5%" }}>
                                        <h6>After discount: <span style={{ color: "white" }}>&#8377;{this.state.afterDiscount}</span></h6>

                                    </div>


                                    <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 " style={{ marginTop: "2%" }}>

                                        <button className="OrderButtions" style={{ color: "white" }} onClick={this.downloadInvoice}>Download </button>
                                    </div>

                                    <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12" style={{ marginTop: "2%" }}>
                                        <h6 className="OrderButtions " onClick={this.getCustomerAddress}>Delivery Address</h6>
                                    </div>

                                    <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12" style={{ marginTop: "2%" }}>
                                        <h6 className="OrderButtions " onClick={this.getCustomerDetails}>Customer Details</h6>
                                    </div>

                                    <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 " style={{ marginTop: "3.7%" }}>
                                        <Link className="  back" style={{ textDecoration: "none", color: "white" }} to="/OrderHistory"> Back </Link>
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



export default HistoryMoreDetail;