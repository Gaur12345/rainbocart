import React, { Component } from "react";
import './ContactForm.css';

class ContactForm extends Component
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
    render()
    {
        console.log(this.state)
        return(
            <div>
                <div className="container-fluid">
                <div className="row">
                <div className="col-xl-12">
                <form onSubmit={this.handleSubmit}>
      <div className="mb-3 pt-0">
        <input
          
          type="text"
          onChange={this.handleAllChange}
          name="name"
          value={this.state.name}
          className="formInputFiled"
          placeholder="Your name"
          required />
          <br/>
          {
              this.state.nameErrorMsg && <span style={{color:'red'}}>{this.state.nameErrorMsg}</span>
          }
      </div>
      <div className="mb-3 pt-0">
        <input
          type="email"
          name="email"
          onChange={this.handleAllChange}
          value={this.state.email}
          className="formInputFiled"
          placeholder="Email"
          required
        />
      </div>
      <div className="mb-3 pt-0">
        <input
          type="number"
          onChange={this.handleAllChange}
          value={this.state.phone}
          name="phone"
          className="formInputFiled"
          placeholder="Phone"
          required
        />
        <br/>
          {
              this.state.phoneErrorMsg && <span style={{color:'red'}}>{this.state.phoneErrorMsg}</span>
          }
      </div>
      <div className="mb-3 pt-0">
      <input
          
          type="text"
          onChange={this.handleAllChange}
          name="subject"
          value={this.state.subject}
          className="formInputFiled"
          placeholder="Subject"
          required />
      </div>
      <div className="mb-3 pt-0">
        <textarea
         value={this.state.message}
         onChange={this.handleAllChange}
          name="message"
          rows="4"
          className="formInputFiledMessage"
          placeholder="Your message"
          required
        />
      </div>
      <div className="mb-3 pt-0">
        <button
          className="modelSaveButton"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
                </div>
                </div>
                </div>
            </div>
        )
    }

}

export default ContactForm;