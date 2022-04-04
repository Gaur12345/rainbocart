import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './Header';
import SideBar from './SideBar';
import Select from 'react-select';
import '../ClientFolder/css/Home.css';
import {Redirect,Link} from 'react-router-dom';
import {Button, Card,Modal} from 'react-bootstrap';
import edit from '../ClientFolder/Images/pencil.svg';
import deleteImage from '../ClientFolder/Images/delete.svg';
import filters from './Filters';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBarMobile from './sidebar/Sidebar';
import ReactTable from '../../common/ReactTable';


class TotalCustomer extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
          checkLoginStatus : true, 
          show : false,
          offset: 0,
          tableData: [],
          perPage: 10,
          currentPage: 0,
          data : [],        
          f:{pCompanyName:[],productName:[],pCategory:[],pColor:[],pSize:[]},
        
          tableHeader:[
            "S.no",
            "Name",
            "Email",
            "Mobile",
            "Address",
            "City",
            "State",
            "Country",     
            "Pin Code"
          ],
          searchData:""

        }

        let token  = sessionStorage.getItem("adminEmail");

        if(token ==  null || token == undefined || token == "")
        {
            
            this.state.checkLoginStatus = false;
        }

      
    
    }
	componentDidMount =()=>
    {
      
        axios.post('http://localhost:4000/totalCustomerInfo')
        .then((response)=>{
          console.log(response.data);
            this.setState({tableData : response.data});
    
        }).catch(function (error){

            alert(error);
        })

    }


    handleChange1= (selectedOptions) => {

      let a = {...this.state.f};
      a.pCompanyName = selectedOptions;

      let b = [];
      this.setState({ f:a, filterArray:[...b], temp1:[...b], temp:[...b],category:[...b]},this.method);
    
    }



    handleChangeAll = (event) =>{

      this.setState({[event.target.name ] : event.target.value});

  }
  

    deleteData = (userID) =>
    {
        let formData = new FormData();
        formData.append("proID",userID);
       
        axios.post('https://rainbowbackendapi.dev-gnnxtech.com/deleteProduct',formData)
        .then((response)=>{
            

          if(response.data === "deleteDone")
          { 
            
            toast.success("Product deleted !!!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

            setTimeout(function(){
              
              
            },3000)

            this.componentDidMount();
            
          }          


        }).catch(function (error){

            alert(error);
        })

    }


    accessProduct = ()=>{


      this.state.productFilter = [];

      axios.post('https://rainbowbackendapi.dev-gnnxtech.com/allRegProduct')
      .then((response)=>{

          
          this.state.productName = [];
          for(let i=0;i<response.data.length;i++)
          {
              this.state.productFilter.push({ name:"product",value: response.data[i].productName, label: response.data[i].productName});
          }
  

          this.setState({demo : "kol"});


      }).catch(function (error){

          alert(error);
      })

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

     render(){

      if(this.state.checkLoginStatus ===  false)
      {
          return <Redirect  to="/adminLogin" />
      }


      let tableBodyData =  this.state.tableData.filter((val)=>{
        if(this.state.searchData == "")
        {
          return val
        } else if (val.cName.toLowerCase().includes(this.state.searchData.toLowerCase()))
        {
          return val
        } else if (val.cEmail.toLowerCase().includes(this.state.searchData.toLowerCase()))
        {
          return val
        } else if (val.cMobile.toLowerCase().includes(this.state.searchData.toLowerCase()))
        {
          return val
        }
       
        
      }).map((user,index)=>{

       return <tr key={user.proID}>
        <td>{index + 1}</td>
        <td>{user.cName}</td>
        <td>{user.cEmail}</td>
        <td>{user.cMobile}</td>
        <td><textarea className="descriptionBox">{user.cAddress}</textarea></td>
        <td>{user.cCity}</td>
        <td>{user.cState}</td>
        <td>{user.cCountry}</td>
        <td>{user.cPincode}</td>
        </tr>
      })



      const { selectedOption } = this.state;


        return(

            <div>

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
              <h2 style={{marginTop: "10px"}}>Total Customer</h2>

              <div className="row  filterBarOK">              
                  <div className="col-xl-2 col-md-12 col-sm-12 inMobileViewButton">
                   <input className='input_search' type="text" value={this.state.searchData} onChange={(e)=>this.setState({searchData:e.target.value})} placeholder='Search Customer'/>

                  </div>

                  <div className="col-xl-2 col-md-12 col-sm-12 inMobileViewButton">

                     {/* <Select isSearchable isMulti value={selectedOption} onChange={this.handleChange2}  options={this.state.productFilter} placeholder="Mobile" /> */}

                  </div>  
                 </div>               
              <div className="tableDiv inMobileViewButton ">

              <ReactTable 
                tableHeader={this.state.tableHeader} 
                tableBody={tableBodyData}
                />
        </div>     
              </div>
              </div>
              </div>   
   <ToastContainer />   
            </div>
        )
    }
}
export default TotalCustomer;