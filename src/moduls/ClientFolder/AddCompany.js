import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './Header';
import SideBar from './SideBar';
import SideBarMobile from './sidebar/Sidebar';
import WSppiner from '../../common/WSppiner';
import { Redirect, Link } from 'react-router-dom';
import Searchbar from '../sharedModuls/searchbar/Searchbar';



class AddCompany extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkLoginStatus: true,
            data: [],
            companyName: "",
            resultShow : true,
            companyID: "",
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




        if (this.state.companyName.length != 0) {

            let formData = new FormData();
            formData.append("companyName", this.state.companyName);

            formData.append("companyID", this.state.companyID);
            this.setState({isLoading:true});
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/addComPro`, formData
            ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
                .then((response) => {

                    this.setState({isLoading:false});
                    console.log(response.data)
                    if (response.data === "CompanyProductAdded") {
                        document.getElementById('para').innerHTML = "Company Added Successfully => Done !!!";
                        document.getElementById('para').style.color = "green";

                        this.componentDidMount();


                    }
                    else {

                        let errorMsg = response.data.sqlMessage.split(" ");

                        document.getElementById('para').innerHTML = errorMsg[2] + " already exist !!!";
                        document.getElementById('para').style.color = "red";
                    }


                }).catch((error)=> {
                    
                    alert(error);
                    
                })


        }
        else {
            alert("Please Enter the Company and Product Name ");
        }


    }



    componentDidMount() {
        this.setState({isLoading:true});
        console.log(localStorage.getItem("accessToken"));
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/ShowAllCompany`
        ,{},{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then((response) => {
                this.setState({ data: response.data,isLoading:false });

            }).catch((error)=> {
                this.setState({isLoading:false});
                alert(error);
               
            })

    }


    render() {

        if (this.state.checkLoginStatus === false) {
            return <Redirect to="/userLogin" />
        }

        return (

            <div>
{this.state.isLoading&& <WSppiner isLoading={this.state.isLoading}/>}
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

                            <h3>Company Details</h3>
                            <div className="row companyPro">



                                <div className="col-xl-6 col-md-12 col-sm-12 Headsearch">

                                    <h3>Total Registered Company</h3>
                                    <Searchbar key={this.state.data} data={this.state.data} resultShow={this.state.resultShow}/>
                                    
                                </div>

                                <div className="col-xl-6 col-md-12 col-sm-12">

                                    <h3>Add New Company </h3>

                                    <div>

                                        <div className="addNewCompanyProduct">

                                            <form className="formComPro" onSubmit={this.handleSubmit} >


                                                <h5>Enter the New Company Name</h5><input type="text" className="form-control" name="companyName" value={this.state.companyName} onChange={this.handleChangeAll} required /><br />
                                                {/* <h3>Enter the Company ID </h3><input type="text" className="inputComPro"  name="companyID" value={this.state.companyID} onChange={this.handleChangeAll} required /><br/> */}

                                                <input class="OrderButtions" type="submit" />
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



export default AddCompany;