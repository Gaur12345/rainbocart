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
class TotalDeliveryBoy extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
          checkLoginStatus : true, 
          show : false,

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
          tableHeader:[
            "S.no",
            "Name",
            "Adhaar No.",
            "Email",
            "Gender",
            "Mobile",
           "PAN No.",
           "City",
            "State",
            "Country", 
            "Address",
            "Pin Code",
            "Registation Date"
           ],
           searchData:"",



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


    accessCompany = ()=>
    {

        this.state.companyFilter = [];

        axios.post('https://rainbowbackendapi.dev-gnnxtech.com/ShowAllCompany')
        .then((response)=>{

          
        for(let i=0;i<response.data.length;i++)
        {
            this.state.companyFilter.push({ name:"company" ,value: response.data[i].companyName, label: response.data[i].companyName});
        }


        }).catch(function (error){

            alert(error);
        })

    }



    accessColor = () =>
    {

      this.state.colorFilter = [];


      axios.post('https://rainbowbackendapi.dev-gnnxtech.com/allRegColors')
      .then((response)=>{

        
          for(let i=0;i<response.data.length;i++)
          {
              this.state.colorFilter.push({ name:"colors",value: response.data[i].colorName, label: response.data[i].colorName});
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


    componentDidMount =()=>
    {
      
        axios.post('http://localhost:4000/totalDeliveryBoyInfo')
        .then((response)=>{
          console.log(response.data);
            this.setState({data : response.data},this.method);
    
        }).catch(function (error){

            alert(error);
        })

    }
    


  submitModal = () =>
  {
           
    let com = "";
    let pro = "";
    let col = ""; 
    let cate = "";
    let siz = "";

    if(this.state.categorySet !=null && this.state.categorySet !="")
    {
      cate = this.state.categorySet.value;
    }
    else
    {
      cate = this.state.categotyDefault[0].value;
    }

    if(this.state.companyNameE !=null && this.state.companyNameE !="")
    {
      com = this.state.companyNameE.value;
    }
    else
    {
      com = this.state.companyDefault[0].value;
    }


    if(this.state.productNameE !=null && this.state.productNameE !="")
    {
      pro = this.state.productNameE.value;
    }
    else
    {
      pro = this.state.productDefault[0].value;
    }


    if(this.state.colorSet !=null && this.state.colorSet !="")
    {
      col = this.state.colorSet.value;
    }
    else
    {
      col = this.state.colorDefault[0].value;
    }


    if(this.state.sizeName !=null && this.state.sizeName !="")
    {
      siz = this.state.sizeName.value;
    }
    else
    {
      siz = this.state.sizeDefault[0].value;
    }




        let formData = new FormData();
        formData.append("emailID",sessionStorage.getItem("emailID"));
        formData.append("mobileNo",sessionStorage.getItem("mobileNo"));
        
        formData.append("proID",this.state.proID);
        formData.append("companyName",com);
        formData.append("productName",pro);
        formData.append("categorySet",cate);
        formData.append("colorSet",col);
        formData.append("sizeName",siz);
        formData.append("quantity",this.state.quantity);
        formData.append("mrp",this.state.mrp);
        formData.append("price",this.state.price);
        formData.append("descryption",this.state.description);
        
        axios.post('https://rainbowbackendapi.dev-gnnxtech.com/updateProduct',formData)
        .then((response)=>{

           
          if(response.data=== "updateSuccess")
          {

              this.setState({show : !this.state.show});


              toast.success("Product updated !!!", {
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


           this.componentDidMount();

        }).catch(function (error){

            alert(error);
        })

 
  }
  
  handleModalGetData = (userID) =>
  {             
               

      this.state.colorDefault = [];
      this.state.categotyDefault = [];
      this.state.sizeDefault =[];
      this.state.productDefault = [];
      this.state.companyDefault = [];


      let formData = new FormData();

      formData.append("emailID",sessionStorage.getItem("emailID"));
      formData.append("mobileNo",sessionStorage.getItem("mobileNo"));
      formData.append("proID",userID);
      
      axios.post('https://rainbowbackendapi.dev-gnnxtech.com/getProductInfo',formData)
      .then((response)=>{
    
         console.log(response.data)

          this.setState({
            proID : response.data[0].proID,
            quantity : response.data[0].pQuantity,
            mrp : response.data[0].pMrp,
            price : response.data[0].pPrice,
            description : response.data[0].pDescription
          });


          this.state.colorDefault.push({ name:"colors",value: response.data[0].pColor, label: response.data[0].pColor});

          this.state.companyDefault.push({ name:"company" ,value: response.data[0].pCompanyName, label: response.data[0].pCompanyName});

          this.state.productDefault.push({ name:"product",value: response.data[0].productName, label: response.data[0].productName});

          this.state.categotyDefault.push({name : "category",value : response.data[0].pCategory ,label :response.data[0].pCategory });

          this.state.sizeDefault.push({name : "size",value : response.data[0].pSize  ,label : response.data[0].pSize});

          this.setState({show: !this.state.show});  


      }).catch(function (error){

          alert(error);
      })


                    
              
              
      
  }


  handleModalProImage = () =>
  {
    this.setState({proImgShow : !this.state.proImgShow});
  }



  getProductImages = (proID) =>
  {
      let formData = new FormData();

     formData.append("emailID",sessionStorage.getItem("emailID"));
     formData.append("mobileNo",sessionStorage.getItem("mobileNo"));
     formData.append("proID",proID);
     axios.post('https://rainbowbackendapi.dev-gnnxtech.com/getProductImage',formData)
     .then(response=>{

        this.setState({productImage : response.data});
      
        this.setState({proImgShow : !this.state.proImgShow});


     }).
     catch(error=>{

      alert(error)
     })

  }

    handleModal = () =>{

        this.setState({show: !this.state.show});
    }

    render(){

      if(this.state.checkLoginStatus ===  false)
      {
          return <Redirect  to="/adminLogin" />
      }
      let tableBodyData= this.state.data.filter((val)=>{
        if(this.state.searchData == "")
        {
          return val
        } else if (val.dName.toLowerCase().includes(this.state.searchData.toLowerCase()))
        {
          return val
        } else if (val.demail.toLowerCase().includes(this.state.searchData.toLowerCase()))
        {
          return val
        } else if (val.dmobile.toLowerCase().includes(this.state.searchData.toLowerCase()))
        {
          return val
        }
       
        
      }).map((user,index)=>{
        return <tr key={user.proID}>
        <td>{index + 1}</td>
         <td>{user.dName}</td>
         <td>{user.daadhaarNo}</td>
         <td>{user.demail}</td>
         <td>{user.dgender}</td>
         <td>{user.dmobile}</td>
         <td>{user.dpanNo}</td>
         <td>{user.dcity}</td>
         <td>{user.dstate}</td>
         <td>{user.dcountry}</td>
         <td><textarea className="descriptionBox">{user.daddress}</textarea></td>
         <td>{user.dpincode}</td>
          <td>{user.regDate}</td> 
         </tr>
       })


      const { selectedOption } = this.state;


      let imageAllData = this.state.productImage.map((user,index)=>{

        return   <img src={process.env.PUBLIC_URL+`${user.imgPath}`} className="productImage" />

      })

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
              <h2 style={{marginTop: "10px"}}>Total Delivery Boy</h2>

              <div className="row  filterBarOK">

              
                  <div className="col-xl-2 col-md-12 col-sm-12 inMobileViewButton">

                    {/* <Select isSearchable isMulti value={selectedOption}  onChange={this.handleChange1}  options={this.state.companyFilter} placeholder="Name"/> */}
                    <input className='input_search' type="text" value={this.state.searchData} onChange={(e)=>this.setState({searchData:e.target.value})} placeholder='Search Delivery Boy'/>
                  </div>

                  <div className="col-xl-2 col-md-12 col-sm-12 inMobileViewButton">

                     {/* <Select isSearchable isMulti value={selectedOption} onChange={this.handleChange2}  options={this.state.productFilter} placeholder="Mobile" /> */}

                  </div>


                  <div className="col-xl-2 col-md-12 col-sm-12 inMobileViewButton">

                  {/* <Select isSearchable isMulti  value={selectedOption}  onChange={this.handleChange3}  options={category} placeholder="Email" /> */}
                  </div>


                  <div className="col-xl-2 col-md-12 col-sm-12 inMobileViewButton">

                  {/* <Select isSearchable isMulti value={selectedOption}  onChange={this.handleChange5} options={allSize}  placeholder="City" /> */}
                  </div>


{/* 
                  <div className="col-xl-2 col-md-12 col-sm-12 inMobileViewButton">
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

                {/*  Edit Start Model */}

          <div id="exampleModal">
          <Modal size="md" show={this.state.show} onHide={()=>this.handleModal()}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Product Details  </Modal.Title>
               </Modal.Header>
              <Modal.Body>
              <div className="container">

                <div className="row">
                  <div className="col-md-6">

                  <label>Company Name</label>

                  <Select isSearchable  value={selectedOption}  options={this.state.companyFilter} defaultValue={this.state.companyDefault[0]} onChange={(e)=>{this.setState({companyNameE : e})}} placeholder="Company"/>

                  </div>

                  <div className="col-md-6">
                  <label>Product Name</label>
                  <Select isSearchable  value={selectedOption}  options={this.state.productFilter} defaultValue={this.state.productDefault[0]}  onChange={(e)=>{this.setState({productNameE : e})}}  placeholder="Product" />
                  </div>

                </div>



                <div className="row updateModel">
                  <div className="col-md-6">

                  <label>Category</label>
                  {/* <Select isSearchable   value={selectedOption}   options={category} defaultValue={this.state.categotyDefault[0]}  onChange={(e)=>{this.setState({categorySet : e})}} placeholder="Category" /> */}

                  </div>

                  <div className="col-md-6">
                  <label>Size</label>
                  {/* <Select isSearchable  value={selectedOption} options={allSize} defaultValue={this.state.sizeDefault[0]} onChange={(e)=>{this.setState({sizeName : e})}}  placeholder="Size" /> */}
                  </div>

                </div>

                <div className="row updateModel">
  
                <div className="col-md-6">

                <label>Color</label>
                <Select isSearchable   value={selectedOption}  options={this.state.colorFilter} defaultValue={this.state.colorDefault[0]} onChange={(e)=>{this.setState({colorSet : e})}} placeholder="Color" />
                </div>

                <div className="col-md-6">


                    <div className="marginClass">
                      <label>Quantity</label>
                      <input
                      type="text"
                      className="form-control"
                      placeholder="Quantity"
                      name="quantity"
                      value={this.state.quantity}   
                      onChange={this.handleChangeAll}                    
                   />
                  </div>
                </div>


                <div className="col-md-6">
                    <div className="marginClass">
                      <label>MRP</label>
                      <input
                      type="text"
                      className="form-control"
                      placeholder="MRP"
                      name="mrp"
                      value={this.state.mrp}   
                      onChange={this.handleChangeAll}                     
                   />
                  </div>
                </div>

                <div className="col-md-6">
                    <div className="marginClass">

                      <label>Price</label>
                      <input
                      type="text"
                      className="form-control"
                      placeholder="Price"
                      name="price"
                      value={this.state.price}   
                      onChange={this.handleChangeAll}                      
                   />
                  </div>
                </div>


                <div className="col-md-12">
                    <div className="marginClass">

                      <label>Description</label>
                      <textarea
                      
                      className="form-control"
                      placeholder="Description"
                      name="description"
                      value={this.state.description}  
                      onChange={this.handleChangeAll}                      
                   ></textarea>
                  </div>
                </div>
              
  
            </div>
            </div>
                         
            
            </Modal.Body>
            <Modal.Footer>
              
              <Button variant="primary" onClick={()=>this.submitModal()}>
                Save Changes
              </Button>
              <Button onClick={()=>this.handleModal()} variant="secondary">Close</Button>
            </Modal.Footer>
          </Modal>
          </div>  
   {/*  End Edit Model */}


   
   <div id="">
          <Modal size="lg" show={this.state.proImgShow} onHide={()=>this.handleModalProImage()}>
                <Modal.Header closeButton>
                  <Modal.Title>Product Images  </Modal.Title>
               </Modal.Header>
              <Modal.Body>
              <div className="container">

                <div className="row">
              
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">


                  {imageAllData}

                
                  </div>
  
            </div>
            </div>
                         
            
            </Modal.Body>
            <Modal.Footer>
              
              
              <Button onClick={()=>this.handleModalProImage()} variant="secondary">Close</Button>
            </Modal.Footer>
          </Modal>
          </div>  



   <ToastContainer />


   
            </div>
        )
    }
}



export default TotalDeliveryBoy;