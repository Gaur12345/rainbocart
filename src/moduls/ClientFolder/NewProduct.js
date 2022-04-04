import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './Header';
import SideBar from './SideBar';
import SideBarMobile from './sidebar/Sidebar';
import { Redirect, Link } from 'react-router-dom';
import Select from 'react-select';
import WSppiner from '../../common/WSppiner';
import SearchbarProduct from '../sharedModuls/searchbar/SearchbarProduct';

class NewProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkLoginStatus: true,
            data: [],
            companySelect: [],
            productName: "",
            companyID: "",
            resultShow : true,
            isLoading : false
        }

        let token = sessionStorage.getItem("emailID");

        if (token == null || token == undefined || token == "") {

            this.state.checkLoginStatus = false;
        }
    }


    handleChangeAll = (event) => {

        this.setState({ [event.target.name]: event.target.value });

    }

    // Submit function start here 

    handleSubmit = (event) => {

        event.preventDefault();

        if (this.state.productName.length != 0) {

            let formData = new FormData();

            formData.append("productName", this.state.productName);
            // formData.append("companyID",this.state.companyID);
            this.setState({isLoading:true});
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/addNewProduct`, formData
            ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
                .then((response) => {
                    this.setState({isLoading:false});
                    if (response.data === "ProductAdded") {
                        document.getElementById('para').innerHTML = "Product Added Successfully Added => Done !!!";
                        document.getElementById('para').style.color = "green";

                        this.componentDidMount();

                    }
                    else {
                        let errorMsg = response.data.sqlMessage.split(" ");

                        document.getElementById('para').innerHTML = errorMsg[2] + " already exist !!!";
                        document.getElementById('para').style.color = "red";
                    }


                }).catch(function (error) {
                    this.setState({isLoading:false});
                    alert(error);
                })


        }
        else {
            alert("Please Enter the Company and Product Name ");
        }


    }

    companyFunctio = (selectedOptions) => {


        this.state.companyID = selectedOptions.empID;


    }

    accessAllProduct = () => {
        this.setState({isLoading:true});
        axios.post('http://localhost/JaswalJee/ShowAllDisPro.php'
        ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then((response) => {


                this.setState({ data: response.data ,isLoading:false});

                this.setState({ demo: "kol" });


            }).catch(function (error) {
                this.setState({isLoading:false});
                alert(error);
            })

    }

    componentDidMount() {
        this.setState({isLoading:true});
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/allRegProduct`
        ,{},{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then((response) => {
                // for(let i=0;i<response.data.length;i++)
                // {
                //     this.state.companySelect.push({ name:"company",empID : response.data[i].companyCode ,value: response.data[i].companyName, label: response.data[i].companyName});
                // }
                // this.accessAllProduct();

                this.setState({ data: response.data ,isLoading:false});

            }).catch(function (error) {
                this.setState({isLoading:false});
                alert(error);
            })

    }

    render() {

        if (this.state.checkLoginStatus === false) {
            return <Redirect to="/userLogin" />
        }


        const { selectedOption } = this.state;
        return (

            <div>
{this.state.isLoading&& <WSppiner isLoading={this.state.isLoading}/>}
                <div className="headerBarTop">

                    <Header />
                </div>

                <div className="mobileViewSidebar">
                    <SideBarMobile />
                </div>

                <div className="container-fluid ">
                    <div className="row ">
                        <div className="col-xl-2 col-md-12 col-sm-12 sideBARColor">

                            <SideBar />

                        </div>

                        <div className="col-xl-10 col-md-12 col-sm-12  mainBar" >

                            <h3>Product Details</h3>
                            <div className="row companyPro">

                                <div className="col-xl-6 col-md-12 col-sm-12 Headsearch">


                                    <h3>Total Registered Product</h3>

                                    <SearchbarProduct key={this.state.data} data={this.state.data} resultShow={this.state.resultShow}/>

                                </div>

                                <div className="col-xl-6 col-md-12 col-sm-12">

                                    <h4>Add New Company Product</h4>

                                    <div>

                                        <div className="">

                                            <form className="formComPro" onSubmit={this.handleSubmit} >



                                                <h5>Enter the New Product Name</h5><input type="text" className="form-control" name="productName" value={this.state.productName} onChange={this.handleChangeAll} required /><br />
                                                <input className="OrderButtions" type="submit" />
                                            </form>


                                            <h6 id="para"></h6>


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



export default NewProduct;