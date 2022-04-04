import React, { Component } from 'react';
import './signupformcss.css';
import Select from 'react-select';
const allState = [

    { name: "State", value: "Bihar", label: "Bihar" }
]

const allCountry = [

    { name: "Country", value: "India", label: "India" }
]
export default class AddressInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {      
        }
    }
    componentDidMount(){
        document.getElementById("pinCodeError").style.display = "none";
    }
    componentDidUpdate(){
        if(this.props.addressInfo.pinCodeError == true){
            document.getElementById("pinCodeError").style.display = "block";
            document.getElementById("pinCodeError").style.color = "red";
        }
        else{
            document.getElementById("pinCodeError").style.display = "none";
        }
    }
    handleChange = (event) => {
        const { changed } = this.props 
            changed(event, [event.target.name]); 
    }
    handleDropdown = (event) => {
        const {changed,dropDownChanged} = this.props;
            dropDownChanged(event);
        }
    
  render() {
      const {address,landmark,city,stateIs,pinCode,country} = this.props.addressInfo
    const { selectedOption } = this.state;
    return <div>
        <div className="">
                            <div className="title">Address Details:</div>
                            <div className="field">
                                <div className="label">Locality</div>
                            <textarea value={address} name='locality' className='form-control-input form-control' onChange={this.handleChange} />
                            </div>
                            <div className="field">
                                <div className="label">Landmark</div>
                                <input type="text" value={landmark} onChange={this.handleChange}  name='landmark' className='form-control-input form-control'/>
                            </div>
                            <div className="field">
                                <div className="label">City</div>
                                <input type="text"value={city} onChange={this.handleChange}  name='city' className='form-control-input form-control'/>
                            </div>
                            <div className="field mt-3">
                            <div className="label">State</div>
                            <Select isSearchable value={selectedOption} defaultValue={{ name: "State", value: stateIs, label: stateIs }} options={allState} onChange={this.handleDropdown} placeholder="State" />
                            </div>
                            <div className="field">
                                <div className="label">Pincode</div>
                                <input type="text" value={pinCode} onChange={this.handleChange} name='pinCode' maxlength="6" className='form-control-input form-control'/>
                                <p className='passwordDivLineComponent' id='pinCodeError'>Pincode must be 6 digit</p>
                            </div>
                            <div className="field mt-3">   
                            <div className="label">Country</div>
                            <Select isSearchable value={selectedOption} defaultValue={{ name: "Country", value: country, label: country }} options={allCountry} onChange={this.handleDropdown} placeholder="Country" />
                            </div>

                          
                        </div>
    </div>;
  }
}
