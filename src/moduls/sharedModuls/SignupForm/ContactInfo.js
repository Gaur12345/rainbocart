import React, { Component } from 'react';
import Select from 'react-select';
import MobileNumberGuidLines from '../PasswordGuidLines/MobileNumberGuidLines';
import { phoneGuidLines } from '../Utils/GuidLines';
import './signupformcss.css';
const genderOption = [

  { name: "gender", value: "Male", label: "Male" },
  { name: "gender", value: "Female", label: "Female" },
  { name: "gender", value: "Transgender", label: "Transgender" },
]
export default class ContactInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
    const { changed } = this.props
    document.getElementById("phonemsg").style.display = "none";
  }
  componentDidUpdate() {

    if (this.props.contactInfo.phoneNumberError != false) {
      document.getElementById("phonemsg").style.display = "block"
      document.getElementById("phonemsg").style.color = "red";
    }
    else {
      document.getElementById("phonemsg").style.display = "none"
    }
  }
  handleDropdown = (event) => {
    const { changed, dropDownChanged } = this.props;
    dropDownChanged(event);
  }
  handleChange = (event) => {
    const { changed } = this.props
    changed(event, [event.target.name]);
  }
  render() {
    const { gender, mobileNumber } = this.props.contactInfo
    const { selectedOption } = this.state;
    return <div>
      <div className="">
        <div className="title">Contact Info:</div>
        <div className="field">
          <div className="label">Phone number</div>
          <input type="text" name='phone' value={mobileNumber} onChange={this.handleChange} className='form-control-input form-control' />
          <p className='passwordDivLineComponent' id='phonemsg'>Invalid Phone number</p>
        </div>
        <div className="field mt-2">
          <div className="label">Gender</div>
          <Select isSearchable value={selectedOption} onChange={this.handleDropdown} defaultValue={{ name: "gender", value: gender, label: gender }} name='gender' options={genderOption} placeholder="Gender" />
        </div>
      </div>
    </div>;
  }
}


