import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './Header';
import SideBar from './SideBar';
import './../Customer/css/HomeCustomer.css';
import SideBarMobile from './sidebar/Sidebar';
import {Redirect,Link} from 'react-router-dom';
import {totalCustomerApi,totalUserApi}from '../ApiFolder/AdminInformationApi';
import WSppiner from '../../common/WSppiner';


export class adminHome extends Component {


    constructor(props)
    {
        super(props);

        this.state = {
            totalCustomer:0,
            totalSeller:0,
            totalDeliveryBoy:0, 

          totalNewOder : 0,
          checkLoginStatus : true, 
          loading:false,
          totalUser:0
        }

        let token  = sessionStorage.getItem("adminEmail");

        if(token ==  null || token == undefined || token == "")
        {
            
            this.state.checkLoginStatus = false;
        }
    }

    totalSeller = ()=>{

        axios.post("http://localhost:4000/totalSeller")
        .then(response=>{
        console.log("totalSeller",response.data[0].totalSeller);
             this.setState({totalSeller : response.data[0].totalSeller,loading:false});
       })
        .catch(error=>{
            console.log(error)
        })
    }

    totalDeliveryBoy = ()=>{
        axios.post("http://localhost:4000/totalDeliveryBoy")
        .then(response=>{
        console.log(response.data);
            {
                this.setState({totalDeliveryBoy : response.data[0].totalDeliveryBoy});
            }
            

        })
        .catch(error=>{
            console.log("errpr :",error)

        })
    }
    
    componentDidMount= async()=>
    {
        this.setState({loading:true});
        const totalCustomerCount = await totalCustomerApi();
        this.totalDeliveryBoy();
        this.totalSeller();
        const totalUser= await totalUserApi();

        console.log("ddddd",totalUser)
        this.setState({
            totalCustomer:  totalCustomerCount.data[0].totalCustomer,
            totalUser:totalUser.data[0].seller+totalUser.data[0].delivery+totalUser.data[0].customer
        })       
    }


   
    render(){

    
        if(this.state.checkLoginStatus ===  false)
        {
            return <Redirect  to="/adminlogin" />
        }


        return(

            <div>
                {this.state.loading && 
                
                <WSppiner isLoading={this.state.loading}/>
                
                
                }

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
                    <div className="col-xl-3 col-md-12 col-sm-12">
                    <div className="allDiveHere">

                    <Link to="/NoOfRequest"  style={{textDecoration : "none" , color : "orange" ,fontSize : "30px",marginTop : "5px"}}>Total User</Link>
                    <h3>{this.state.totalUser}</h3>
                    </div>
                    </div>

                        <div className="col-xl-3 col-md-12 col-sm-12">

                            <div className="allDiveHere">

                            <Link to="/TotalCustomer"  style={{textDecoration : "none" , color : "orange" ,fontSize : "30px",marginTop : "5px"}}>Total Customer</Link>

                            <h3>{this.state.totalCustomer}</h3>
                            </div>
                       

                        </div>

                        <div className="col-xl-3 col-md-12 col-sm-12">


                        <div className="allDiveHere">

                        <Link to="/SellerDetails"  style={{textDecoration : "none" , color : "orange" ,fontSize : "30px",marginTop : "5px"}}>Total Sellers</Link>
                        <h3>{this.state.totalSeller}</h3>
                        </div>

                        </div>

                        <div className="col-xl-3 col-md-12 col-sm-12">


                        <div className="allDiveHere">

                            <Link to="/TotalDeliveryBoy"  style={{textDecoration : "none" , color : "orange" ,fontSize : "30px",marginTop : "5px"}}>Total Delivery Boy</Link>
                            <h3>{this.state.totalDeliveryBoy}</h3>
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



export default adminHome;
