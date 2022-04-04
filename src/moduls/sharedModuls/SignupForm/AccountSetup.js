import React, { Component } from 'react';
import './signupformcss.css';

import { checkPasswordGuidelines } from '../Utils/GuidLines';
import PasswordGuidLines from '../PasswordGuidLines/PasswordGuidLines';

export default class AccountSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: '',

            passwordGuidLinesObj: ''
        }
    }
    componentDidMount() {
        const { changed,disableField } = this.props
        document.getElementById("enteredPasswordFirst").style.display = "none";
        document.getElementById("passwordNotMatched").style.display = "none";
        document.getElementById("passwordMatched").style.display = "none";
        document.getElementById("pass").style.display = "none";
        document.getElementById("emailExist").style.display = "none";
        if(disableField == true){
            document.getElementById("email").disabled = 'true';
            document.getElementById("password").disabled = 'true';
            document.getElementById("confirmpassword").disabled = 'true';
            document.getElementById('passwordMatched').style.display = 'none';
        }
    }
    componentDidUpdate(){
            if (this.props.accountInfo.password == this.props.accountInfo.confirmPassword && this.props.accountInfo.password != '') {
                document.getElementById("passwordMatched").style.display = "block";
                document.getElementById("passwordMatched").style.color = "green";
                document.getElementById("enteredPasswordFirst").style.display = "none";
                document.getElementById("passwordNotMatched").style.display = "none";
            }
            else if (this.props.accountInfo.confirmPassword == '') {
                document.getElementById("passwordMatched").style.display = "none";
                document.getElementById("enteredPasswordFirst").style.display = "none";
                document.getElementById("passwordNotMatched").style.display = "none";
            }
            else if(this.props.accountInfo.password =='' && this.props.accountInfo.confirmPassword!=''){
                document.getElementById("enteredPasswordFirst").style.display = "block";
            }
            else {
                document.getElementById("passwordMatched").style.display = "none";
                document.getElementById("passwordNotMatched").style.display = "block";
                document.getElementById("passwordNotMatched").style.color = "red";
            }
            if(this.props.accountInfo.emailStatus == 'exist' && this.props.accountInfo.email !='' ){
                document.getElementById("emailExist").style.display = "block";
                document.getElementById("emailExist").style.color = "red";
            }
            else{
                document.getElementById("emailExist").style.display = "none";
            }
        }
        

    handleChange = (event) => {
        let msg = this.props.accountInfo.confirmPasswordErrorMsg;
        const { changed } = this.props
        changed(event, [event.target.name]);
        if (event.target.name == 'password') {
            document.getElementById("pass").style.display = "block";
        }
        else if(this.props.accountInfo.passwordError == false) {
            document.getElementById("pass").style.display = "none";

        }  
    }
    render() {
       
        const { name,shopName, email, password, confirmPassword } = this.props.accountInfo

        return <div>
            <div className="slide-page">
                <div className="title">Account Setup:</div>
                <div className="field">
                    <div className="label">{this.props.name}</div>
                    <input type="text" name='name' value={name==null?shopName:name} onChange={this.handleChange} className='form-control-input form-control' />
                </div>
                <div className="field">
                    <div className="label">Email address</div>
                    <input type="email" id='email' name='email' value={email} onChange={this.handleChange} className='form-control-input form-control' />
                    <p className='passwordDivLineComponent' id='emailExist'>This email address is already being used</p>
                </div>
                <div className="field">
                    <div className="label">Password</div>
                    <input type="password" id='password' name='password' value={password} onChange={this.handleChange} className='form-control-input form-control' />
                    <div id='pass'>
                        <PasswordGuidLines passwordGuidLines={checkPasswordGuidelines(password)} />
                    </div>
                </div>
                <div className="field">
                    <div className="label">Confirm password</div>
                    <input type="password" id='confirmpassword' name='confirmPassword' value={confirmPassword} onChange={this.handleChange} className='form-control-input form-control' />
                    <p className='passwordDivLineComponent' id='passwordMatched'>Password matched</p>
                    <p className='passwordDivLineComponent' id='enteredPasswordFirst'>Please enter the password first</p>
                    <p className='passwordDivLineComponent' id='passwordNotMatched'>Confirm password not matched</p>
                </div>
            </div>
        </div>;
    }
}
