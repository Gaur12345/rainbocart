import React, { Component } from 'react';
import '../Customer/css/HomeCustomer.css';
import HeaderNavBar from '../Customer/Header';
import SideBar from '../Customer/sidebar/Sidebar';
import FooterBar from '../Customer/FooterBar';

import { Carousel } from "react-bootstrap";
import crousel1 from './Images/Asset 1-100.jpg';
import crousel2 from './Images/Artboard 1.jpg';
import crousel3 from './Images/Artboard 2.jpg';

import image1 from '../Customer/Images/Image1.png';
import image2 from '../Customer/Images/Image2.png';
import image3 from '../Customer/Images/Image3.png';
import image4 from '../Customer/Images/Image4.png';
import image5 from '../Customer/Images/Image5.png';
import image6 from '../Customer/Images/Image6.png';
import image7 from '../Customer/Images/Image7.png';
import image8 from '../Customer/Images/Image8.png';
import CarouselItem from './CarouselItem';
import { Redirect } from 'react-router-dom';
import OurServices from './OurServices';
import ProductSlider from './ProductSlider';
var CryptoJS = require("crypto-js");


class HomeCustomer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchItem: "",
            searchPass: false
        }
    }


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }


    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.searchItem != "") {
            this.setState({ searchPass: true });
        }


    }

    render() {

        if (this.state.searchPass === true) {
            // Encrypt
            var ciphertext = CryptoJS.AES.encrypt(this.state.searchItem, 'customerCard@@##12345!!@@23').toString();

            return <Redirect to={`/SearchShop/${this.state.searchItem}`} />
        }

        return (
            <div className="homeCustomerPage">

                <div className="setHeaderPositionFixed">
                    <HeaderNavBar />
                    <SideBar />
                </div>
                <div className="row showCardDiv pt-5 ">

                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">

                        <div className="serachBarDiv mt-2">
                            <form onSubmit={this.handleSubmit}>

                                <div class="input-group mb-4 border rounded-pill p-1">
                                    <input type="search" placeholder="Location or shop name" aria-describedby="button-addon1" class="form-control bg-none border-0" name="searchItem" value={this.state.searchItem} onChange={this.handleChange} required />
                                    <div class="input-group-prepend border-0">
                                        <button id="button-addon1" type="submit" class="btn btn-link text-primary"><i class="fa fa-search"></i></button>
                                    </div>

                                </div>
                            </form>


                        </div>

                    </div>

                    <div className="col-xl-1 col-lg-1 col-md-3 col-sm-3 imageALLL">

                        <img src={image1} className="imageBarAll" />
                    </div>

                    <div className="col-xl-1 col-lg-1 col-md-3 col-sm-3 imageALLL">

                        <img src={image2} className="imageBarAll" />

                    </div>

                    <div className="col-xl-1 col-lg-1 col-md-3 col-sm-3 imageALLL">

                        <img src={image3} className="imageBarAll" />
                    </div>

                    <div className="col-xl-1 col-lg-1 col-md-3 col-sm-3 imageALLL">

                        <img src={image4} className="imageBarAll" />
                    </div>


                    <div className="col-xl-1 col-lg-1 col-md-3 col-sm-3 imageALLL HideFormobile">

                        <img src={image5} className="imageBarAll" />
                    </div>

                    <div className="col-xl-1 col-lg-1 col-md-3 col-sm-3 imageALLL HideFormobile">

                        <img src={image6} className="imageBarAll" />
                    </div>

                    <div className="col-xl-1 col-lg-1 col-md-3 col-sm-3 imageALLL HideFormobile">
                        <img src={image7} className="imageBarAll" />
                    </div>

                    <div className="col-xl-1 col-lg-1 col-md-3 col-sm-3 imageALLL HideFormobile">

                        <img src={image8} className="imageBarAll" />
                    </div>


                </div>


                <CarouselItem />
                <Carousel>
                    <Carousel.Item>
                        <img className="d-block w-100 silderImage" src={crousel1}  alt="First slide" />
                        <Carousel.Caption>
                            {/* <h1 className="h1Silder">Reimagine Workplace with COVID-19</h1>
            <h3 className="h3Silder">High performance workforce working from Anywhere (Home, office, or remote locations) beating the market trends.</h3> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100 silderImage" src={crousel2} alt="Third slide" />

                        <Carousel.Caption>

                            {/* <h1 className="h1Silder">Reimagine Workplace with COVID-19</h1>
            <h3 className="h3Silder">High performance workforce working from Anywhere (Home, office, or remote locations) beating the market trends.</h3> */}
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img className="d-block w-100 silderImage" src={crousel3} alt="Third slide" />

                        <Carousel.Caption>

                            {/* <h1 className="h1Silder">Reimagine Workplace with COVID-19</h1>
            <h3 className="h3Silder">High performance workforce working from Anywhere (Home, office, or remote locations) beating the market trends.</h3> */}
                        </Carousel.Caption>
                    </Carousel.Item>


                </Carousel>

                <ProductSlider />
                <div className="row">
                    <div className="col-xl-12">
                        <h3 style={{ textAlign: "left", margin: "1%", fontSize: "120%", marginTop: "2%" }}>Our Services</h3>
                    </div>


                </div>
                <OurServices />
                
                <FooterBar />

            </div>
        )
    }
}


export default HomeCustomer;