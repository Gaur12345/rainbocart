import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './Header';
import SideBar from './SideBar';
import './css/Home.css';
import WSppiner from '../../common/WSppiner';
import SideBarMobile from './sidebar/Sidebar';
import {Redirect,Link} from 'react-router-dom';
import ConfirmationModal from '../../common/ConfirmationModal';
class Dashboard extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {

          totalNewOder : 0,
          checkLoginStatus : true, 
          returnOrder:0,
          totalOrder:0,
          totalCustomer:0,
          show: false,
          redirect:false
        }

        let token  = sessionStorage.getItem("emailID");

        if(token ==  null || token == undefined || token == "")
        {
            
            this.state.checkLoginStatus = false;
        }
    }

    redirectToForm=()=>{
        
        this.setState({redirect : true});      
    }


    componentDidMount()
    {
        console.log(sessionStorage)
        if(this.state.checkLoginStatus == true)
        {
            let ID  = sessionStorage.getItem("shopID");

            let productTable = ID +"producttable";
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/formVerification`,{email : sessionStorage.getItem("emailID") }
            ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then(response=>{
                this.setState({isLoading:false});
                console.log(response.data)
                if(response.data[0].uFormVerification == 0)
                {
                    this.setState({show : true});
                }
                
    
            })
            .catch(error=>{
                this.setState({isLoading:false});
    
            })
            this.setState({isLoading:true});
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/totalNewOrder`,{productTable : productTable }
            ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then(response=>{
                this.setState({isLoading:false});
                console.log(response.data)
                if(response.data !="notFount")
                {
                    this.setState({totalNewOder : response.data[0].totalOrder});
                }
                
    
            })
            .catch(error=>{
                this.setState({isLoading:false});
    
            })
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/ReturnOrderInfo`,{productTable : productTable }
            ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then(response=>{
                console.log(response.data)
                this.setState({isLoading:false});
                if(response.data !="notFount")
                {
                    this.setState({returnOrder : response.data.length});
                }
                
    
            })
            .catch(error=>{
                this.setState({isLoading:false});
    
            })
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/viewHistoryOrderAll`,{productTable : productTable }
            ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then(response=>{
                console.log(response.data)
                this.setState({isLoading:false});
                if(response.data !="notFount")
                {
                    this.setState({totalOrder : response.data.length});
                }
                
    
            })
            .catch(error=>{
                this.setState({isLoading:false});
    
            })
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/getTotalCustomer`,{productTable : productTable }
            ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then(response=>{
                console.log(response.data)
                this.setState({isLoading:false});
                if(response.data !="notFount")
                {
                    
                    this.setState({totalCustomer : response.data[0].totalCustomer});
                }
                
    
            })
            .catch(error=>{
                this.setState({isLoading:false});
    
            })
        }
    }

    render(){

        if(this.state.checkLoginStatus ===  false)
        {
            return <Redirect  to="/userLogin" />
        }
        if(this.state.redirect ===  true)
        {
            return <Redirect  to="/ShopDetailsStepperForm" />
        }
        

        return(

            <div>
{this.state.isLoading&& <WSppiner isLoading={this.state.isLoading}/>}
                <div className="headerBarTop">
                {this.state.show &&
                    <ConfirmationModal handleProceedButton={this.redirectToForm} header={' Enter The Shop Details'} message={'You need to submit shop details to continue...'} />}
                <Header/>
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
                        <div className="col-xl-3 col-md-12 col-sm-12">

                            <div className="allDiveHere">

                            <Link to="/NewOrder"  style={{textDecoration : "none" , color : "orange" ,fontSize : "30px",marginTop : "5px"}}>New Orders</Link>

                            <h3>{this.state.totalNewOder}</h3>
                            </div>
                       

                        </div>

                        <div className="col-xl-3 col-md-12 col-sm-12">


                        <div className="allDiveHere">

                        <Link to="/AllCustomerInfo"  style={{textDecoration : "none" , color : "orange" ,fontSize : "30px",marginTop : "5px"}}>Total Customer</Link>
                        <h3>{this.state.totalCustomer}</h3>
                        </div>

                        </div>

                        <div className="col-xl-3 col-md-12 col-sm-12">


                        <div className="allDiveHere">

                            <Link to="/ReturnOrderInfo"  style={{textDecoration : "none" , color : "orange" ,fontSize : "30px",marginTop : "5px"}}>Return Order</Link>
                            <h3>{this.state.returnOrder}</h3>
                            </div>


                        </div>

                        <div className="col-xl-3 col-md-12 col-sm-12">

                        <div className="allDiveHere">

                        <Link to="/OrderHistory"  style={{textDecoration : "none" , color : "orange" ,fontSize : "30px",marginTop : "5px"}}>Order History</Link>
                        <h3>{this.state.totalOrder}</h3>
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



export default Dashboard;