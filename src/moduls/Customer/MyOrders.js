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
import ReactPaginate from 'react-paginate';
import { encryptData, decryptData } from '../sharedModuls/Utils/Utils';
const crypto = require('crypto-js');
class MyOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {

            checkLoginStatus: true,
            searchItem: "",
            searchPass: false,
            data: [],
            show: false,
            localityAdd: "",
            landmarkAdd: "",
            cityAdd: "",
            stateAdd: "",
            countryAdd: "",
            pincodeAdd: "",
            mobileAdd: "",
            altmobileAdd: "",

            offset: 0,
            orderCon: 0,
            tableData: [],
            perPage: 5,
            currentPage: 0,
            isLoading: false


        }


        let token = sessionStorage.getItem("customerEmail");

        if (token == null || token == undefined || token == "") {

            this.state.checkLoginStatus = false;
        }


    }
    //for pagination
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
        let data1 = [], slice = [];
        data1 = this.state.data;

        slice = data1.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data1.length / this.state.perPage),
            tableData: slice
        })
        console.log("page", this.state.pageCount, data1.length);

    }

    componentDidMount = () => {
        this.setState({ isLoading: true });
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/MyOrders`, { customerID: sessionStorage.getItem("customerID") }
            , { headers: { 'x-access-token': localStorage.getItem("accessToken") } })
            .then(response => {

                console.log("data : ", response.data)
                this.setState({ data: response.data, isLoading: false })
                var tdata = response.data;
                var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    pageCount: Math.ceil(tdata.length / this.state.perPage),
                    orgtableData: tdata,
                    tableData: slice
                });

            })
            .catch(error => {
                this.setState({ isLoading: false });
                console.log("error")
            })
    }


    shippingDetails = (delAddress) => {
        let key = "password";
        this.setState({ isLoading: true });
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/getShippingDetails`, { delAddressID: delAddress }
            , { headers: { 'x-access-token': localStorage.getItem("accessToken") } })
            .then(response => {
                this.setState({ isLoading: false });
                
                let data = [];
                data = decryptData(response.data, key);
                data = JSON.parse(data.toString(crypto.enc.Utf8));
                
                if (data.length == 1) {
                    this.setState({

                        localityAdd: data[0].locality,
                        landmarkAdd: data[0].landmark,
                        cityAdd: data[0].city,
                        stateAdd: data[0].state,
                        pincodeAdd: data[0].pincode,
                        mobileAdd: data[0].mobile,
                        altmobileAdd: data[0].altmobile,
                        show : true
                    });
                    console.log("here",this.state.show);

                    // this.setState({ show: true });
                }

            })
            .catch(error => {
                this.setState({ isLoading: false });
                console.log(error)
            })
    }


    handleCloseModel = () => {

        this.setState({ show: !this.state.show })
    }

    render() {
        if (this.state.checkLoginStatus === false) {
            return <Redirect to="/CustomerLogin" />
        }
        console.log(this.state.show);

        return (
            <div className="">
                {this.state.isLoading && <WSppiner isLoading={this.state.isLoading} />}
            
                <HeaderNavBar />

                <SideBar />

                <div className="row pt-4">

                    <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12">

                    </div>

                    <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 mt-5 page">

                        <h5 style={{ marginTop: "1%" }}>My Orders</h5>

                        <div className='page'>
                            {
                                this.state.tableData.map((user, index) => (

                                    <div className="mailDivOrder ">



                                        <div className="row">

                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 contentDiv">


                                                <div className="row">

                                                    <div className="col-xl-4 col-md-12 col-sm-12">

                                                        <img src={cartLogo} className="ImageOrderPro" />
                                                        <p>Your orders</p>
                                                    </div>


                                                    <div className="col-xl-8 col-md-12 col-sm-12 allPara">

                                                        <p className="paraTagOrder">{user.pCompanyName} {user.productName}</p>

                                                        {/* <p className="paraTagOrderSecond">Color : {user.pColor}</p>
                                            <p className="paraTagOrderSecond">Size : {user.pSize}</p>

                                            <p className="paraTagOrderSecond">Category : {user.pCategory}</p>
                                             */}


                                                    </div>


                                                </div>
                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 contentDiv">
                                                <p className="paraTagOrderSecond" > <b>Amount: &#8377;{user.proPrice}</b></p>
                                                <p className="paraTagOrderSecond">Items: {user.items}</p>
                                                <p className="paraTagOrderSecond" >Pay Mode: {user.paymentType}</p>
                                                <p className="paraTagOrderSecond" >Order Data: {getDateFormat(user.regDate)}</p>
                                                <p className="paraTagOrderSecond" >Delivery Data: {user.deliveryDate}</p>

                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 contentDiv">


                                                {user.orderStatus ? (

                                                    <p style={{ color: "green" }}>Confirmed</p>
                                                ) : (

                                                    <p style={{ color: "orange" }}>Order Placed</p>
                                                )

                                                }

                                                <p style={{ color: "black" }} onClick={() => this.shippingDetails(user.dileveryAddId)} className="shippingDeatilsText">Shipping Details</p>
                                                <Link to={`/OrderMoreDetails/${user.orderID}pro${user.deliveryDate}pro${user.regDate}pro${user.paymentType}pro${user.orderStatus}`} style={{ color: "black" }} className="paraTagOrderSecond"><b>More details</b></Link>
                                            </div>

                                        </div>



                                    </div>

                                ))

                            }
                        </div>
                        < ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />


                    </div>

                </div>



                <FooterBar />


                <Modal size="md" show={this.state.show} onHide={this.handleCloseModel}>
                    <Modal.Header closeButton>
                        <Modal.Title> Shipping Details </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">

                                <div className="col-xl-12 col-md-12 col-sm-12">

                                    <table className="table">

                                        <tr>
                                            <td>Mobile : </td><td>{this.state.mobileAdd}</td>
                                        </tr>

                                        <tr>
                                            <td>Alt Mobile : </td><td>{this.state.altmobileAdd}</td>
                                        </tr>

                                        <tr>
                                            <td>Locality : </td><td>{this.state.localityAdd}</td>
                                        </tr>

                                        <tr>
                                            <td>Landmark : </td><td>{this.state.landmarkAdd}</td>
                                        </tr>


                                        <tr>
                                            <td>City : </td><td>{this.state.cityAdd}</td>
                                        </tr>

                                        <tr>
                                            <td>State : </td><td>{this.state.stateAdd}</td>
                                        </tr>

                                        <tr>
                                            <td>Pincode : </td><td>{this.state.pincodeAdd}</td>
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


export default MyOrders;