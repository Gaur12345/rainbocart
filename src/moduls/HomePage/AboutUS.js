import React, { Component } from "react";
import AboutUSComponent from "../../common/AboutUS/AboutUs.js";


class AboutUS extends Component
{
    constructor(props)
    {
        super(props);

        this.state={
            name:"",
            nameErrorMsg:null,
            email:"",
            phone:"",
            phoneErrorMsg:null,
            subject : "",
            message:""
        }
    }

    handleAllChange=(event)=>
    {
        if([event.target.name]=="name")
        {
            const errorObj=this.validateName(event.target.value)
            if(errorObj.errorStatus==true)
            {
                this.setState({[event.target.name]:event.target.value,
                nameErrorMsg:errorObj.errorMessage})  
            }
            else
            {
                this.setState({[event.target.name]:event.target.value,
                    nameErrorMsg:errorObj.errorMessage})  
            }
        }

        if([event.target.name]=="phone")
        {
            const errorObj=this.validatePhone(event.target.value)
            if(errorObj.errorPhoneStatus==true)
            {
                this.setState({[event.target.name]:event.target.value,
                phoneErrorMsg:errorObj.errorPhoneMsg})  
            }
            else
            {
                this.setState({[event.target.name]:event.target.value,
                    phoneErrorMsg:errorObj.errorPhoneMsg})  
            }
        } 

        if([event.target.name]=="email")
        {
          this.setState({[event.target.name]:event.target.value})
        }

        if([event.target.name]=="message")
        {
          this.setState({[event.target.name]:event.target.value})
        }
    }

    handleSubmit=(event)=>
    {
        event.preventDefault();
        console.log(this.state);
    }

    validateName=(name)=>
    {
        let returnObj={
            errorMessage:null,
            errorStatus:false
        }
        if(name.match(/\d+/g)==null)
        {
            console.log("correct")
        }
        else
        {
            returnObj.errorMessage="Name should only contain letters";
            returnObj.errorStatus=true;
        }
        return returnObj;
    }

    validatePhone=(phone)=>
    {
        let returnObj={
            errorPhoneMsg:null,
            errorPhoneStatus:false
        }

       

        if(phone.length!=10)
        {
          returnObj.errorPhoneMsg="Mobile number should be of 10 digits";
          returnObj.errorPhoneStatus=true;
        }

        if(parseInt(phone.substring(0,1))<6)
        {
          returnObj.errorPhoneMsg="First digit must be between 6 to 9";
          returnObj.errorPhoneStatus=true;
        }
          return returnObj;
    }
    render() {
        return(
            <div>
                <AboutUSComponent />
            </div>
        )
    }

}

export default AboutUS;