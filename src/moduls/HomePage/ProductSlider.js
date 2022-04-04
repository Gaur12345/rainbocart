import React, { Component } from "react";
import Slider from "react-slick";
import easyToUse from './Images/easyToUse.jpg';
import './css/ProductSlider.css';
import shirt1 from './Images/shirt-2.jpg';
import jeans from './Images/jeans-2.jpg';
import kurti1 from './Images/kurti-1.jpg';
import kurti2 from './Images/kurti-2.jpg';
import ReactStars from "react-rating-stars-component";
const firstExample = {
  size: 15,
  value: 5,
  edit: false
};
const ProductSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };

  return (
    <>
      <h2 style={{ textAlign: "left", margin: "1%", fontSize: "130%", marginTop: "2%" }}>Best selling products</h2>

      <div className="productSliderMainDiv pt-2 ">
        <Slider {...settings}>
          <div>
            <img src={shirt1} className="productSliderImage" />
            <div className="productinformation">
              <p className=""><b>Casual shirt</b><br />Price: <b> &#8377;2000 </b> &#8377;<s>2200</s>
                <span style={{ color: "green", fontSize: "90%" }} >10% off</span> <ReactStars {...firstExample} /></p>
            </div>
          </div>
          <div>
            <img src={jeans} className="productSliderImage" />
            <div className="productinformation">
              <p className=""><b>Denim jeans</b><br />Price: <b> &#8377;2000 </b> &#8377;<s>2200</s>
                <span style={{ color: "green", fontSize: "90%" }} >10% off</span> <ReactStars {...firstExample} /></p>
            </div>
          </div>
          <div>
            <img src={kurti1} className="productSliderImage" />
            <div className="productinformation">
              <p className=""><b>Anarkali Suits</b><br />Price: <b> &#8377;2000 </b> &#8377;<s>2200</s>
                <span style={{ color: "green", fontSize: "90%" }} >10% off</span> <ReactStars {...firstExample} /></p>
            </div>
          </div>
          <div>
            <img src={kurti2} className="productSliderImage" />
            <div className="productinformation">
              <p className=""><b>Anarkali Suits</b><br />Price: <b> &#8377;2000 </b> &#8377;<s>2200</s>
                <span style={{ color: "green", fontSize: "90%" }} >10% off</span> <ReactStars {...firstExample} /></p>
            </div>
          </div>
    
      <div>
        <img src={jeans} className="productSliderImage" />
        <div className="productinformation">
          <p className=""><b>Denim jeans</b><br />Price: <b> &#8377;2000 </b> &#8377;<s>2200</s>
            <span style={{ color: "green", fontSize: "90%" }} >10% off</span> <ReactStars {...firstExample} /></p>
        </div>
      </div>
      <div>
        <img src={kurti1} className="productSliderImage" />
        <div className="productinformation">
          <p className=""><b>Anarkali Suits</b><br />Price: <b> &#8377;2000 </b> &#8377;<s>2200</s>
            <span style={{ color: "green", fontSize: "90%" }} >10% off</span> <ReactStars {...firstExample} /></p>
        </div>
      </div>
    </Slider>
      </div >
    </>
  )
}
export default ProductSlider;