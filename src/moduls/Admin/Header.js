import React, {Component} from 'react';
import '../ClientFolder/css/Header.css';
import companyLogo from '../ClientFolder/Images/rainbow.png';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell} from '@fortawesome/free-solid-svg-icons';



class Header extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
          loggedIn : true
      }


      // const token = window.sessionStorage.getItem("empname");

      // // let loggedIn = true

      // if(token == null)
      // {
      //     this.state.loggedIn = false;
      // }

    }


    logoutFun =() =>{

      window.sessionStorage.clear();
      this.setState({loggedIn : false});
      localStorage.clear();
      return  <Redirect to="/AdminLogin" />
   }


    render()
    {

      if(this.state.loggedIn ==false)
      {
          return <Redirect to="/" />
      }
        return(
            <div className="container-fluid">
            <div className="row">
              <div className="col-xl-2 col-md-12 col-sm-12 topSide">

                <div className="row">

                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                
                    <img src={companyLogo} className="LogoImage" />


                  </div>            
                </div>

                
              </div>

              <div className="col-xl-10 col-md-12 col-sm-12 topBar">

                <div className="row">
                  <div className="col-xl-8 col-md-12 col-sm-12">

                 

                  </div>

                  <div className="col-xl-1 col-lg-1 col-md-12 col-sm-12">
                 


                  </div>


                  <div className="col-xl-1 col-lg-1 col-md-12 col-sm-12">
                 
                  <FontAwesomeIcon icon={faBell} className="bellTab" />

                 </div>




                  <div className="col-xl-2 col-md-12 col-sm-12">
                  <button className="logout"   style={{ textDecoration: 'none' ,color:'black'}} onClick={this.logoutFun}>Logout</button>
                  </div>


                </div>
                
              </div>


            </div>



          </div>





        )
    }
}


export default Header;