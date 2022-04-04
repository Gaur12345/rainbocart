import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './Header';
import SideBar from './SideBar';
import './css/Home.css';
import ReactPaginate from 'react-paginate';
import {Redirect,Link} from 'react-router-dom';
import filters from './Filters';
import moreDatails from './Images/moreDatails.png';
import check from './Images/check.png';
import WSppiner from '../../common/WSppiner';
import SideBarMobile from './sidebar/Sidebar';
import close from './Images/close.png';
import { getDateFormat } from '../sharedModuls/Utils/Utils';


class NewOrder extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
          checkLoginStatus : true, 
          data : [],
          data2 : [],
          offset: 0,
          tableData: [],
          orgtableData: [],
          perPage: 10,
          currentPage: 0,
          tableShowVar : false,
          isLoading : false
        }

        let token  = sessionStorage.getItem("emailID");

        if(token ==  null || token == undefined || token == "")
        {
            
            this.state.checkLoginStatus = false;
        }
    }



           // For pagination 

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
        const data = this.state.orgtableData;
        
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
          pageCount: Math.ceil(data.length / this.state.perPage),
          tableData:slice
        })
      
        }
    
        

    method = ()=>
    {
        let p = [...this.state.data];
      var tdata = this.state.data;
			var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
      this.setState({
       pageCount: Math.ceil(tdata.length / this.state.perPage),
       orgtableData : tdata,
       tableData:slice
      });
    }

    componentDidMount()
    {

        if(this.state.checkLoginStatus == true)
        {
            let ID  = sessionStorage.getItem("shopID");

            let productTable = ID+"producttable";
            this.setState({isLoading:true});
            axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/viewNewOrdeAll`,{productTable : productTable }
            ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
            .then(response=>{
                this.setState({isLoading:false});
                console.log(response.data)
    
                if(response.data.length > 0)
                {
                    this.setState({tableShowVar : true});
                    this.setState({data : response.data},this.method);
                    
                }
                else
                {
                    this.setState({tableShowVar : false});
                }
    
            })
            .catch(error=>{
                this.setState({isLoading:false});
                console.log(error)
            })
        }

    }



    render(){
        if(this.state.checkLoginStatus ===  false)
        {
            return <Redirect  to="/userLogin" />
        }


        return(

            <div>

{this.state.isLoading&& <WSppiner isLoading={this.state.isLoading}/>}
                <div className="headerBarTop">

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

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">

                            <h5 style={{marginTop : "2%"}}>New Orders </h5>
                            <div className="tableDiv">

                            {this.state.tableShowVar ? (



                                <table className="table">
                                    <thead className="tableHead">
                                        <tr>
                                            <th>S.no</th>
                                            <th>C Name</th>
                                            <th>C Mobile</th>
                                            <th>Dilevry Address</th>
                                            <th>Total Amt</th>
                                            <th>Payment Type</th>
                                            <th>Order Date</th>
                                            <th>More Details</th>
                                    

                                        </tr>
                                    </thead>

                                    <tbody>

                                        {
                                            this.state.tableData.map((user,index)=>(

                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{user.cName}</td>
                                                    <td>{user.cMobile}</td>
                                                    <td>{user.city } {user.state} {user.locality} {user.pincode} {}</td>
                                                    <td>{user.totalAmount}</td>
                                                    <td>{user.paymentType}</td>
                                                    <td>{getDateFormat(user.regDate)}</td>
                                                    <td><Link to={`/NewOrderDetails/${user.delID}pro${user.customerID}pro${user.orderID}`}><img src={moreDatails} className="buttonLogo" title="Edit" /></Link></td>
                                                  

                                                </tr>

                                            ))
                                        }

                                    </tbody>

                                </table>

                            ) : (


                                <div>
                                    <h6>Data Not Found</h6>
                                </div>
                            )}


                            </div>

                            <ReactPaginate
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
                                activeClassName={"active"}/>

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



export default NewOrder;