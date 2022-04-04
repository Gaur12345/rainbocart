import React, { Component } from 'react';
import { Carousel } from "react-bootstrap";
import axios from 'axios';
import "./css/ProdCarousel.css";
export default class ProdCarousel extends Component {
    constructor(props) {
        
        super(props);
        console.log(this.props);
        this.state = {
             imageTable : this.props.ImageTable,
            proID : this.props.proID,
            imagesData : [],
            

        }
        


    }
    componentDidMount=() =>{
        // this.showAllShopProductImage();
        
        axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/showAllShopProductImage`,
            {
                imageTable: this.state.imageTable,
                proID: this.state.proID
            })
            .then(response => {
                console.log(response.data);
                
                if (response.data.length > 0) {
                    
                    this.setState({
                        imagesData : response.data
                        
                    })
                }
                else {
                    this.setState({
                        imagesData : response.data
                    })
                }
                this.myFunction(this.state.imagesData[0].imgPath);
                this.mark(0);
            })
            .catch(error => {
                console.log("error")
            })
    }
    myFunction = (img) => {
        // console.log(img.imgPath);
        var expandImg = document.getElementById("expandedImg");
        expandImg.src =  img;
        
        expandImg.parentElement.style.display = "block";
        
    }
    mark=(el)=> {
        //el.style.border = "1px solid blue";
        var Img = document.getElementById(el);
        this.state.imagesData.map((image, index) => (
           index === el? Img.style.border="2px solid #F39C12" : document.getElementById(index).style.border="none"
        ))
        
        
        
    }
    
    render() {
        return (
            <>
            <div className='ClickShow'>
            
                <div className="column">
                    {  
                        this.state.imagesData.map((image, index) => (
                            <div className="row1" >
                                <img src={image.imgPath} style={{width:'50%'}} id={index} onClick={() => {this.myFunction(image.imgPath); this.mark(index) } } />
                            </div>
                        ))
                    }

                </div>

                <div className="column ">
                    <img id="expandedImg" style={{width:'250%'}} />
                    
                </div>
            </div>
            <div className='mobileView'>
            <Carousel>
            {  
                        this.state.imagesData.map((image, index) => (
                            <Carousel.Item>
                                <img src={image.imgPath} id={index} style={{width:'100%'}}  />
                            </Carousel.Item>
                        ))
                    }
            </Carousel>
            </div>
            </>
        )
    }
}
