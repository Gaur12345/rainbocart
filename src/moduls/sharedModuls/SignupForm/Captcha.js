import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import capcha from '../../ClientFolder/Images/captcha.png';
import { getCaptcha } from '../../sharedModuls/Utils/Utils';
import './signupformcss.css';
export default class ExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        console.log(this.props)
        const { changed ,pageName} = this.props
        this.handleCaptcha();
        document.getElementById("captchaError").style.display = "none";
        document.getElementById("otpError").style.display = "none";
        if(pageName != 'sellerregistration'){
            document.getElementById('otpDiv').style.display = 'none';
        }
        else{
            document.getElementById('otpDiv').style.display = 'block';
        }
    }
    componentDidUpdate() {
        if(this.props.pageName != 'sellerregistration'){
            document.getElementById('otpDiv').style.display = 'none';
        }
        else{
            document.getElementById('otpDiv').style.display = 'block';
        }
        if (this.props.capchaInfo.showCaptchCode != this.props.capchaInfo.captchaCode && this.props.capchaInfo.captchaCode!= '' ) {
            document.getElementById("captchaError").style.display = "block";
            document.getElementById("captchaError").style.color = "red";
        }
        else {
            document.getElementById("captchaError").style.display = "none";
        }
        if (this.props.capchaInfo.confirmOtp != this.props.capchaInfo.otp && this.props.capchaInfo.confirmOtp!= '' ) {
            document.getElementById("otpError").style.display = "block";
            document.getElementById("otpError").style.color = "red";
        }
        else {
            document.getElementById("otpError").style.display = "none";
        }
    }
    handleCaptcha = () => {
        const { changed } = this.props
        let capctchaCode = getCaptcha()
        changed(capctchaCode, "showCaptchCode");
    }
    handleChange = (event) => {
        const { changed } = this.props
        const { captchaCode, termConn } = this.props.capchaInfo
        changed(event, [event.target.name]);
    }
    render() {
        
        const { captchaCode } = this.props.capchaInfo
        return <div>
            <div className="">
                <div className="title">Captcha:</div>
                <div className="field">
                    <div className="row">
                        <div className="col-xl-12 ">
                            <img src={capcha} className="captchaImage" />
                            <h4 className="catchaCode">{this.props.capchaInfo.showCaptchCode}</h4>
                        </div>
                        <div className="form-group col-xl-12">
                            <img onClick={this.handleCaptcha} className="reFressCaptcha" src="https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/64/000000/external-refresh-arrow-kmg-design-detailed-outline-kmg-design.png" />
                        </div>
                        <div className=" form-group col-xl-12 " style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <input type="text" name="captchaCode" value={captchaCode} onChange={this.handleChange} required placeholder="Enter CAPTCHA code" className="form-control-input form-control form-controlcaptcha-form" autoComplete="off" />
                        </div>
                        <p className='form-group col-xl-12' id='captchaError'>Invalid captcha</p>
                        <div id='otpDiv' className=" form-group col-xl-12 " style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <input type="text" name="confirmOtp"  onChange={this.handleChange} required placeholder="Enter OTP from email" className="form-control-input form-control form-controlcaptcha-form" autoComplete="off" />
                        </div>
                        <p className='form-group col-xl-12' id='otpError'>Invalid OTP</p>
                    </div>
                    
                </div>

                <div className="field">
                    <input className="form-check-input" type="checkbox" name="termConn" value={this.props.termConn}  onChange={this.handleChange} required />
                    <label className="form-check-label" htmlFor="gridCheck">
                        <Link onClick={() => window.open("/termCondition", "_blank")}>I accept Terms & Condition</Link>
                    </label>
                </div>
            </div>
        </div>;
    }
}
