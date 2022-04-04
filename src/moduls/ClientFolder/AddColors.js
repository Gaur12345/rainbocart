import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './Header';
import SideBar from './SideBar';
import WSppiner from '../../common/WSppiner';
import SideBarMobile from './sidebar/Sidebar';
import { Redirect, Link } from 'react-router-dom';
import SearchbarColor from '../sharedModuls/searchbar/SearchbarColor';



class AddColors extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkLoginStatus: true,
            data: [],
            colorName: "",
            resultShow: true,
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


    componentDidMount() {
        this.setState({isLoading:true});
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/allRegColors`,[],{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then((response) => {

                this.setState({ data: response.data ,isLoading:false});

            }).catch(function (error) {
                this.setState({isLoading:false});
                alert(error);
            })

    }

    // Submit function start here 

    handleSubmit = (event) => {

        event.preventDefault();

        if (this.state.colorName.length != 0 && this.state.colorName != " ") {

            let formData = new FormData();
            formData.append("colorName", this.state.colorName);

            this.setState({isLoading:true});
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/AddColor`, formData
            ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
                .then((response) => {

                    this.setState({isLoading:false});
                    if (response.data === "ColorAdded") {
                        document.getElementById('para').innerHTML = "Color Successfully Added => Done !!!";
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

                            <h3>Colors Details</h3>


                            <div className="container-fluid colorClass">
                                <div className="row">

                                    <div className="col-xl-6 col-md-12 col-sm-12 Headsearch">

                                        <h3>Total Registered Color</h3>

                                        <SearchbarColor key={this.state.data} data={this.state.data} resultShow={this.state.resultShow}/>
                                    </div>


                                    <div className="col-xl-6 col-md-12 col-sm-12">


                                        <div className="">

                                            <form className="formComPro" onSubmit={this.handleSubmit} >


                                                <h5>Enter the New Color Name</h5><input type="text" className="form-control" name="colorName" value={this.state.colorName} onChange={this.handleChangeAll} required /><br />

                                                <input className="OrderButtions" type="submit" />
                                            </form>


                                            <h6 id="para"></h6>


                                        </div>

                                    </div>


                                </div>


                            </div>

                            <div>




                            </div>



                        </div>


                    </div>
                </div>



            </div>
        )
    }
}



export default AddColors;