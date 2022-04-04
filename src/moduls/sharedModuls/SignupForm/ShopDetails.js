import React, { Component } from 'react';
import './signupformcss.css';
import Select from 'react-select';
import { Redirect, Link } from 'react-router-dom';
const allShop = [

    { name: "shopcategory", value: "Cloth", label: "Cloth" },
    { name: "shopcategory", value: "Sport", label: "Sport" },
    { name: "shopcategory", value: "Paint", label: "Paint" }
]


export default class ShopDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        document.getElementById('gsterror').style.display = 'none';


    }
    componentDidUpdate() {
        const { shopdetails } = this.props;
        if (shopdetails.gstno != '' && shopdetails.gstError == false) {
            document.getElementById('gsterror').style.display = 'none';
        }
        else {
            document.getElementById('gsterror').style.display = 'block';
            document.getElementById("gsterror").style.color = "red";
        }
    }
    handleChange = (event) => {

        const { changed } = this.props

        changed(event, [event.target.name]);


    }
    handleDropdown = (event) => {
        const { changed, dropDownChanged } = this.props;
        dropDownChanged(event);
    }
    imageHandler=(event)=>{
        const { imageHandler } = this.props
        imageHandler(event);
    }

    render() {
        const { shopdetails } = this.props;
        const { selectedOption } = this.state;
        return <div>
            <div className="">
                <div className="title">Shop Details:</div>
                <div className="field">
                    <div className="label">Shop Name</div>
                    <input type="text" name='shopname' value={shopdetails.shopname} disabled={true} className='form-control-input form-control' />
                </div>
                <div className="field">
                    <div className="label">GST No</div>
                    <input type="text" value={shopdetails.gstno} onChange={this.handleChange} name='gstno' className='form-control-input form-control' />
                    <Link onClick={() => window.open("https://www.knowyourgst.com/gst-number-search/by-name-pan/", "_blank")}>Click Here to find your GST Number</Link>
                    <p id='gsterror'>Invalid GST No</p>
                </div>
                <div className="field mt-3">
                    <div className="label">Shop Category</div>
                    <Select isSearchable value={selectedOption} defaultValue={{ name: "shopcategory", value: shopdetails.shopcategory, label: shopdetails.shopcategory }} options={allShop} name='shopcategory' onChange={this.handleDropdown} placeholder="Shop Category" />
                </div>
                <div className="field">
                    <div className="label">Shop Description</div>
                    <textarea name='shopdescription' value={shopdetails.shopdescription} className='form-control-input form-control' onChange={this.handleChange} />
                </div>
                <div className="field mb-2">
                    <div className="label">Upload Shop Image</div>
                    <input type="file" className="placeOrder" onChange={this.imageHandler} accept=".jpg , .jpge , .png" />
                </div>
                
            </div>
        </div>;
    }
}
