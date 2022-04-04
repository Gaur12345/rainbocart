import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './Header';
import SideBar from './SideBar';
import WSppiner from '../../common/WSppiner';
import {Redirect,Link} from 'react-router-dom';
import SideBarMobile from './sidebar/Sidebar';

class AddSize extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            checkLoginStatus : true, 
            data : [],
            sizeName : "",
            isLoading : false
        }

        let token  = sessionStorage.getItem("emailID");

        if(token ==  null || token == undefined || token == "")
        {
            
            this.state.checkLoginStatus = false;
        }
    }


    handleChangeAll = (event) =>{

        this.setState({[event.target.name ] : event.target.value});

    }


    componentDidMount ()
    {
    // {
    //     axios.post('http://localhost/JaswalJee/ShowAllSize.php')
    //     .then((response)=>{

    //         this.setState({data : response.data});

    //     }).catch(function (error){

    //         alert(error);
    //     })

    }

        // Submit function start here 

        handleSubmit = (event) =>{

            event.preventDefault();
            
            if(this.state.sizeName.length !=0 )
            {

                let formData = new FormData();
                formData.append("sizeName",this.state.sizeName);
  
                this.setState({isLoading:true});
                axios.post('http://localhost/JaswalJee/AddSize.php',formData
                ,{headers : {'x-access-token' : localStorage.getItem("accessToken")}})
                .then((response)=>{

                    this.setState({isLoading:false});
                  if(response.data === "sizeAdded")
                  {
                    document.getElementById('para').innerHTML="Size Successfully Added => Done !!!";
                    document.getElementById('para').style.color = "green";

                    this.componentDidMount();
                  }
                  else
                   { 
                       document.getElementById('para').innerHTML="Size Not addedd =>  X ";
                       document.getElementById('para').style.color = "red";
                   }


                }).catch(function (error){
                    this.setState({isLoading:false});
                    alert(error);
                })

               
            }
            else
            {
                alert("Please Enter the Company and Product Name ");
            }


    }



    render(){

        if(this.state.checkLoginStatus ===  false)
        {
            return <Redirect  to="/userLogin" />
        }


        return(

            <div>
                 <div className="headerBarTop">
                 {this.state.isLoading&& <WSppiner isLoading={this.state.isLoading}/>}
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

                <h4>Add New Size </h4>


                <div className="container-fluid colorClass">
                    <div className="row">

                        <div className="col-xl-6 col-md-12 col-sm-12">

                                <h5>Total Registered Size</h5>

                                <div className="tableDiv">
                                <table className="table">
                                    <thead  className="tableHead">
                                        <th>S.no</th>
                                        <th>Size Name</th>
                                    </thead>

                                    <tbody className="tableBody">

                                    {this.state.data.map((user,index)=>(

                                        <tr key={user.u_id}>

                                        <td>{index + 1}</td>
                                        <td>{user.sizeName}</td>
                                        </tr>
                                        ))}

                                    </tbody>
                                </table>
                            
                            </div>
                        </div>


                        <div className="col-xl-6 col-md-12 col-sm-12">


                        <div className="">

                        <form className="formComPro"  onSubmit={this.handleSubmit} >

                            
                            <h5>Enter the New Size Name</h5><input type="text" className="inputComPro"  name="sizeName" value={this.state.sizeName} onChange={this.handleChangeAll} required /><br/>
                            
                            <input type="submit" />
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



export default AddSize;