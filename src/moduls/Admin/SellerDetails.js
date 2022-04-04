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
import { getDateFormat } from '../sharedModuls/Utils/Utils';
import ReactTable from '../../common/ReactTable';


class SellerDetails extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
          checkLoginStatus : true, 
          show : false,
          tableHeader:[
            "S.no",
            "Name",
            "Mobile",
            "Email",
            "Gender",
            "Registation Date",
            "Shop Name",
            "GST No",
            "Address",
            "City",
            "State",
            "Pin Code",
            "Country"            
          ],


          offset: 0,
          tableData: [],
          orgtableData: [],
          perPage: 10,
          currentPage: 0,
          data : [],
          data2 : [],
          filterArray : [],
          temp:[],
          temp1:[],
          dol : "",
          proID : "",
          companyNameE : "",
          productNameE : "",
          categorySet : "",
          colorSet : "",
          sizeName : "",
          quantity : "",
          mrp : "",
          price : "",
          description : "",
          searchData:"",




          companyFilter : [],
          productFilter : [],
          sizeFilter : [],
          colorFilter : [],
          productImage : [],

          companyDefault : [],
          productDefault : [],
          colorDefault : [],
          categotyDefault :[],
          sizeDefault : [],



          f:{pCompanyName:[],productName:[],pCategory:[],pColor:[],pSize:[]},
        


        }

        let token  = sessionStorage.getItem("adminEmail");

        if(token ==  null || token == undefined || token == "")
        {
            
            this.state.checkLoginStatus = false;
        }

      
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.handleChange5 = this.handleChange5.bind(this);
    }


    handleChange1= (selectedOptions) => {

      let a = {...this.state.f};
      a.pCompanyName = selectedOptions;

      let b = [];
      this.setState({ f:a, filterArray:[...b], temp1:[...b], temp:[...b],category:[...b]},this.method);
    
    }

    
    handleChange2= (selectedOptions) => {

      
      let a = {...this.state.f};
      a.productName = selectedOptions;
      let b = [];
      this.setState({ f:a, filterArray:[...b], temp1:[...b], temp:[...b]},this.method);
    
    }

    handleChange3 = (selectedOptions) => {
      
      let a = {...this.state.f};
      a.pCategory = selectedOptions;
      let b = [];
      this.setState({ f:a, filterArray:[...b], temp1:[...b], temp:[...b]},this.method);
    
    }



    
    handleChange4 = (selectedOptions) => {

      
      let a = {...this.state.f};
      a.pColor = selectedOptions;
      let b = [];
      this.setState({ f:a, filterArray:[...b], temp1:[...b], temp:[...b]},this.method);
    
    }


    handleChange5= (selectedOptions) => {

      
      let a = {...this.state.f};
      a.pSize = selectedOptions;
      let b = [];
      this.setState({ f:a, filterArray:[...b], temp1:[...b], temp:[...b]},this.method);
    
    }



    handleChangeAll = (event) =>{

      this.setState({[event.target.name ] : event.target.value});

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
    

      


    method = () =>
    {
     
      let p = [...this.state.data];
      let user = filters(this.state.f,p);

      this.setState({data2 : user});


      var tdata = user;
			var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
      this.setState({
       pageCount: Math.ceil(tdata.length / this.state.perPage),
       orgtableData : tdata,
       tableData:slice
      });

    }


    componentDidMount (){
      
        axios.post('http://localhost:4000/totalSellerInfo')
        .then((response)=>{
          console.log(response.data);
            this.setState({data : response.data});
    
        }).catch(function (error){

            alert(error);
        })

    }
    


  
  
 

 
   
    render(){
      console.log("data",this.state.data);

      if(this.state.checkLoginStatus ===  false)
      {
          return <Redirect  to="/adminLogin" />
      }
      
      let tableBodyData = this.state.data.filter((val)=>{
        if(this.state.searchData == "")
        {
          return val
        } else if (val.uname.toLowerCase().includes(this.state.searchData.toLowerCase()))
        {
          return val
        } else if (val.uEmail.toLowerCase().includes(this.state.searchData.toLowerCase()))
        {
          return val
        } else if (val.uMobile.toLowerCase().includes(this.state.searchData.toLowerCase()))
        {
          return val
        }
       
        
      }).map((user,index)=>{

        return  <tr key={index}>
          <td>{index+1}</td>
          <td>{user.uname}</td>
          <td>{user.uMobile}</td>
          <td>{user.uEmail}</td>
          <td>{user.uGender}</td>
          <td>{user.uRegData}</td>
          <td>{user.uShopName}</td>
          <td>{user.uGstNo }</td>
          <td><textarea className="descriptionBox">{user.uAddress}</textarea></td>
          <td>{user.uCity}</td>
          <td>{user.uState}</td>
          <td>{user.uPinCode}</td>
          <td>{user.uCountry}</td>
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
              <h2 style={{marginTop: "10px"}}>Total Seller</h2>

              <div className="row  filterBarOK">

              
                  <div className="col-xl-2 col-md-12 col-sm-12 inMobileViewButton">

                  <input className='input_search' type="text" value={this.state.searchData} onChange={(e)=>this.setState({searchData:e.target.value})} placeholder='Search Seller'/>

                  </div>

                  <div className="col-xl-2 col-md-12 col-sm-12 inMobileViewButton">

                     {/* <Select isSearchable isMulti value={selectedOption} onChange={this.handleChange2}  options={this.state.productFilter} placeholder="Mobile" /> */}

                  </div>

                  {/* <div className="col-xl-2 col-md-12 col-sm-12 inMobileViewButton">
                  <Select isSearchable isMulti  value={selectedOption}  onChange={this.handleChange4}  options={this.state.colorFilter} placeholder="Color" />

                  </div> */}


                  <div className="col-xl-2 col-md-12 col-sm-12">
                 

                  </div>

              </div>

               
              <div className="tableDiv inMobileViewButton ">

                <ReactTable 
                tableHeader={this.state.tableHeader} 
                tableBody={tableBodyData}
                />

     

</div>

{/* <ReactPaginate
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
       activeClassName={"active"}/> */}

          </div>


              </div>
              </div>


   <ToastContainer />


   
            </div>
        )
    }
}



export default SellerDetails;