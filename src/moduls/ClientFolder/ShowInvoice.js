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
import { Button, Card, Modal } from 'react-bootstrap';
import companyLogo from './Images/rainbow.png';
import './css/Header.css';
import SideBarMobile from './sidebar/Sidebar';
import WSppiner from '../../common/WSppiner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { getDateFormat } from '../sharedModuls/Utils/Utils';


class ShowInvoice extends Component {
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
            show: false,
            afterDiscount: 0,
            totalQunatity: 0,

            invoiceData: this.props.match.params.invoiceData,
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

            todayData: "",
            productIDS: [],

            invoiceNumber: "",
            pTable: '',
            isLoading: false,
            backButtonStatus: false



        }

        let token = sessionStorage.getItem("emailID");

        if (token == null || token == undefined || token == "") {

            this.state.checkLoginStatus = false;
        }
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
    updatesellerinventory() {
        let ID = sessionStorage.getItem("shopID");

        let productTable = ID + "producttable";
        this.setState({ isLoading: true });
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/updatesellerinventory`, { productTable: productTable, data: this.state.data }
            , { headers: { 'x-access-token': localStorage.getItem("accessToken") } })

            .then(response => {
                this.setState({ isLoading: false });
                if (response.data === "SellerDatabaseUpdated") {
                    console.log("Seller Database Updated");
                }
            })
            .catch(error => {
                this.setState({ isLoading: false });
                console.log(error)
            })




    }
    componentDidMount() {

        if (this.state.checkLoginStatus == true) {
            this.state.productIDS = [];

            const d = new Date();

            const tod = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

            this.setState({ todayData: tod });

            let invoiceDateTimeFormat = d.getDate() + "" + (d.getMonth() + 1) + "" + d.getFullYear() + "-" + d.getHours() + "" + d.getMinutes() + "" + d.getSeconds() + "" + d.getMilliseconds();
            // console.log(this.state.invoiceData)

            let arrD = this.state.invoiceData.split("pro");

            this.setState({
                delAddressID: arrD[0], customerID: arrD[1]
            });

            this.setState({ invoiceNumber: `Inv${arrD[1]}${arrD[0]}${invoiceDateTimeFormat}`, isLoading: true });

            let ID = sessionStorage.getItem("shopID");

            let productTable = ID + "producttable";

            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/newOrderDetails`, { productTable: productTable, customerID: arrD[1], orderID: arrD[2] }
                , { headers: { 'x-access-token': localStorage.getItem("accessToken") } })
                .then(response => {
                    this.setState({ isLoading: false });
                    console.log(response.data)
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

                    for (let i = 0; i < response.data.length; i++) {
                        this.state.productIDS.push(response.data[i].proID);
                    }


                    let taxSale = afterDiscountPrice * (12 / 100);
                    this.setState({
                        data: response.data,
                        totalAmt: sum,
                        afterDiscount: afterDiscountPrice,
                        totalQunatity: totalQunatity,
                        saleTax: taxSale,
                        orderID: orderIDCheck
                    });


                    this.getCustomerInfoAddress();
                    this.getShopDetails();

                })
                .catch(error => {
                    this.setState({ isLoading: false });
                    console.log(error)
                })

        }
    }



    downloadInvoice = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);
        doc.addImage(companyLogo, 40, 20, 150, 40);
        doc.setFontSize(20);
        doc.text("Invoice", 400, 50);

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
        doc.text(`Invoice Data: ${this.state.todayData}`, 400, 80);
        doc.text(`Due Data: 24/07/2021`, 400, 90);
        doc.text(`Invoice No: ${this.state.invoiceNumber}`, 400, 100);
        doc.setFontSize(12);
        doc.text(`Sub Total: ${this.state.afterDiscount}`, 40, 170);
        doc.text(`Sale Tax 12%: ${this.state.saleTax}`, 40, 190);
        doc.setFontSize(14);
        doc.text(`Total : ${this.state.afterDiscount + this.state.saleTax}`, 40, 210);

        const headers = [["S.no", "C Name", "Product", "Category", "Size", "Price"]];

        let tableData = this.state.data.map((user, index) => (


            [index + 1, user.pCompanyName, user.productName, user.pColor, user.pSize, user.pPrice]

        ))


        let content = {
            startY: 230,
            head: headers,
            body: tableData
        };


        doc.autoTable(content);
        doc.save("report.pdf")



    }

    getCustomerInfoAddress = () => {
        this.setState({ isLoading: true });
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/getCustomerInfoAddress`, { customerID: this.state.customerID, dileveryID: this.state.delAddressID }
            , { headers: { 'x-access-token': localStorage.getItem("accessToken") } }).
            then(response => {


                console.log(response.data)

                this.setState({
                    customerID: response.data[0].customerID,
                    cusName: response.data[0].cName,
                    cusMobile: response.data[0].cMobile,
                    delLocality: response.data[0].locality,
                    delLandmark: response.data[0].landmark,
                    delCity: response.data[0].city,
                    delState: response.data[0].state,
                    delPincode: response.data[0].pincode,
                    delCountry: response.data[0].country,
                    delMobileF: response.data[0].mobile,
                    delMobileS: response.data[0].altmobile,
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

    getShopDetails = () => {
        this.setState({ isLoading: true });
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/getShopDetails`, { userID: sessionStorage.getItem("shopID") }
            , { headers: { 'x-access-token': localStorage.getItem("accessToken") } }).
            then(response => {


                this.setState({
                    isLoading: false,
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


    storeInvoice = () => {
        // let email = sessionStorage.getItem("emailID");
        // let mobile = sessionStorage.getItem("mobileNo");
        // let em = email.split("@");
        // let invoiceTable = em[0] + "invoice" + mobile;
        // let formData = new FormData();
        // formData.append("customerID", this.state.customerID);
        // formData.append("delAddressID", this.state.delAddressID);
        // formData.append("productsId", this.state.productIDS);
        // formData.append("invoiceTable", invoiceTable);
        // formData.append("invoiceNumber", this.state.invoiceNumber);
        // formData.append("orderID", this.state.orderID);
        // this.setState({ isLoading: true });
        // axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/storeInvoice`, formData
        //     , { headers: { 'x-access-token': localStorage.getItem("accessToken") } })
        //     .then(response => {
        //         this.setState({ isLoading: false });
        //         console.log("Reponse printed is ", response.data)
        this.setState({
            backButtonStatus: true
        })
        document.getElementById('confirmOrder').disabled = true;
        document.getElementById('confirmOrder').style.backgroundColor = 'gray';
        toast.success("Order Confirmed !!!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        // if (response.data === "invoiceCreated") {
        //     toast.success("Order Confirmed !!!", {
        //         position: "top-right",
        //         autoClose: 3000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });


    }




    // }).catch(error => {
    //     this.setState({ isLoading: false });
    //     console.log("Error =>   ", error)
    // })
// }
handleCloseModel = () => {

    this.setState({ show: !this.state.show })
}
confirmOrder = () => {
    this.handleCloseModel();
    this.setState({ isLoading: true });
    axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/confirmOrder`, { customerID: this.state.customerID, orderID: this.state.orderID }
        , { headers: { 'x-access-token': localStorage.getItem("accessToken") } })
        .then(response => {
            this.setState({ isLoading: false });
            if (response.data === "orderConfirm") {
                this.updatesellerinventory();
                this.storeInvoice();

            }
        })
        .catch(error => {
            this.setState({ isLoading: false });
            console.log(error)
        })
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

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12" style={{ backgroundColor: "white" }}>

                                    <div className="row">

                                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2">

                                            <div>
                                                <h3><img src={companyLogo} className="LogoImageInvoicePage" /></h3><br />
                                            </div>
                                            <br />


                                        </div>


                                        <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10">

                                            <div className="row">
                                                <div className="col-xl-2 col-lg-2">
                                                    <h2 style={{ marginTop: "5%" }}>Invoice  </h2>
                                                </div>

                                                <div className="col-xl-2 col-lg-2" style={{ marginTop: "2%" }}>
                                                    <button className="OrderButtionsInvoice" style={{ color: "white" }} onClick={this.confirmOrder}>Deliver boy</button>
                                                </div>


                                                <div className="col-xl-2 col-lg-2" style={{ marginTop: "2%" }}>
                                                    <button className="OrderButtionsInvoice" id='confirmOrder' style={{ color: "white" }} onClick={this.handleCloseModel}>Confirm Order</button>
                                                </div>



                                                <div className="col-xl-2 col-lg-2" style={{ marginTop: "2%" }}>
                                                    <button className="OrderButtionsInvoice" style={{ color: "white" }} onClick={this.downloadInvoice}>Download </button>
                                                </div>



                                                <div className="col-xl-2 col-lg-2">

                                                    <div style={{ marginTop: "15%" }}>
                                                        <Link to={`/GenrateInvoice/${this.state.delAddressID}pro${this.state.customerID}pro${this.state.orderID}`} target={"_blank"} rel="noreferrer" className="OrderButtionsInvoice" style={{ textDecoration: "none", color: "white", padding: "2px", paddingLeft: "5px", paddingRight: "5px" }}>Print Invoice</Link>
                                                    </div>
                                                </div>


                                                <div className="col-xl-2 col-lg-2">

                                                    <div style={{ marginTop: "25px" }}>
                                                        {!this.state.backButtonStatus ?
                                                            (<Link className="OrderButtions" style={{ textDecoration: "none", color: "white", padding: "2px", paddingLeft: "5px", paddingRight: "5px" }} to={`/NewOrderDetails/${this.state.delAddressID}pro${this.state.customerID}pro${this.state.orderID}`} > Back </Link>)
                                                            : (<Link className="OrderButtions" style={{ textDecoration: "none", color: "white", padding: "2px", paddingLeft: "5px", paddingRight: "5px" }} to="/NewOrder" > Back </Link>)}
                                                    </div>

                                                </div>


                                            </div>



                                        </div>


                                    </div>


                                    <div className="row">

                                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                                            <h5 className="paraGraphPadding"><b>From</b></h5>
                                            <p className="paraGraphPadding">{this.state.shopOwerName}</p>
                                            <p className="paraGraphPadding">{this.state.shopName}</p>
                                            <p className="paraGraphPadding">{this.state.shopAddress1}</p>
                                            <p className="paraGraphPadding">{this.state.shopAddress2}</p>
                                        </div>

                                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">

                                            <h5 className="paraGraphPadding"><b>Bill To</b></h5>
                                            <p className="paraGraphPadding">{this.state.cusName}</p>
                                            <p className="paraGraphPadding">{this.state.cusMobile}</p>

                                        </div>


                                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">

                                            <h5 className="paraGraphPadding"><b>Reciver</b></h5>
                                            <p className="paraGraphPadding">{this.state.delMobileF}</p>
                                            <p className="paraGraphPadding">{this.state.delMobileS}</p>
                                            <p className="paraGraphPadding">{this.state.delLocality} {this.state.delLandmark} {this.state.delCity}</p>
                                            <p className="paraGraphPadding">{this.state.delState} {this.state.delCountry} {this.state.delPincode} </p>

                                        </div>



                                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                                            <h5 className="paraGraphPadding">Invoice Data : {getDateFormat(Date.now())} </h5>
                                            <h5 className="paraGraphPadding">Due Data : 24/07/2021</h5>
                                            <p className="paraGraphPadding">Invoice No : {this.state.invoiceNumber}</p>


                                        </div>




                                    </div>

                                    <div className="tableDivInvoice">

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
                                                            <td> &#8377; {user.pPrice}</td>
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


                                    <div className="row">

                                        <div className="col-xl-6 col-lg-6">

                                            <div className="notesAndTerm">

                                                <h6 className="paraGraphPadding">Notes </h6>

                                                <p className="paraGraphPadding">It was great doing business with you.</p>

                                                <h6 className="paraGraphPadding">Terms & Conditions </h6>

                                                <p className="paraGraphPadding">Please make the payment by the due date.</p>
                                            </div>

                                        </div>


                                        <div className="col-xl-6 col-lg-6">

                                            <div className="totalAmountTab">
                                                <h6 className="printItem">Sub Total : {this.state.afterDiscount}</h6>
                                                <h6 className="printItem">Sale Tax 12% : {this.state.saleTax}</h6>

                                                <div>
                                                    <h5 className="printItem">Total : &#8377; {this.state.afterDiscount + this.state.saleTax}</h5>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>


                        </div>

                    </div>


                </div>
            </div>


            <ToastContainer />
            <Modal size="md" show={this.state.show} onHide={this.handleCloseModel}>
                <Modal.Header closeButton>
                    <Modal.Title> Confirm Order </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            Do you want to Confirm this Order?
                        </div>
                    </div>


                </Modal.Body>
                <Modal.Footer>

                    <button className="modelSaveButton" variant="primary" onClick={this.confirmOrder}>
                        Confirm
                    </button>
                    <button className="modelCancelButton" variant="primary" onClick={this.handleCloseModel}>
                        Cancel
                    </button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}
}



export default ShowInvoice;