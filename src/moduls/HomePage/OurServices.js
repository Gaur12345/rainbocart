import QualityAss from './Images/QualityAss.jpg';
import fastDeliver from './Images/fastDelivery.jpg'
import accuratePrice from './Images/rupees.jpg';
import trust from './Images/Trust.jpg';
import easyToUse from './Images/easyToUse.jpg';
import serviceSupport from './Images/servicesSupport.jpg';
import './css/HomePage.css';

const OurServices = (props)=>
{
    return (
        <div className="row showCardDiv">

        <div className="col-xl-2 col-lg-2 col-ms-12 col-sm-12">

        <div className="ourServicesDiv" >
        <img className="card-img-top" src={QualityAss} alt="Card image cap" className="ourServiceImage" />
        <div className="card-body">
        <h5 className="card-title">Quality assurance</h5>
        <p className="card-text" style={{textAlign: "left",fontSize : "90%"}}>Quality is our responsibility and we never have to stop getting better.</p>
        
        </div>
        </div>

        </div>

        <div className="col-xl-2 col-lg-2 col-ms-12 col-sm-12">

        <div className="ourServicesDiv" >
        <img className="card-img-top" src={accuratePrice} alt="Card image cap" className="ourServiceImage" />
        <div className="card-body">
        <h5 className="card-title">Best price</h5>
        <p className="card-text" style={{textAlign: "left",fontSize : "90%"}}>The price which you pay is value of what we sell.</p>
        
        </div>
        </div>


        </div>




        <div className="col-xl-2 col-lg-2 col-ms-12 col-sm-12">

        <div className="ourServicesDiv" >
        <img className="card-img-top" src={trust} alt="Card image cap" className="ourServiceImage" />
        <div className="card-body">
        <h5 className="card-title">Customer trust</h5>
        <p className="card-text" style={{textAlign: "left",fontSize : "90%"}}>Rainbow cart is for service.To give real service we add something which cannot be bought or measured with money, and these are sincerity, integrity and compassion.</p>
        
        </div>
        </div>


        </div>

        <div className="col-xl-2 col-lg-2 col-ms-12 col-sm-12">

        <div className="ourServicesDiv" >
        <img className="card-img-top" src={fastDeliver} alt="Card image cap" className="ourServiceImage" />
        <div className="card-body">
        <h5 className="card-title">Fast delivery</h5>
        <p className="card-text" style={{textAlign: "left",fontSize : "90%"}}>We give our clients the earliest delivery consistent with quality - whatever the inconvenience to us.</p>

        </div>
        </div>


        </div>

        <div className="col-xl-2 col-lg-2 col-ms-12 col-sm-12">

        <div className="ourServicesDiv" >
        <img className="card-img-top" src={easyToUse} alt="Card image cap"  className="ourServiceImage" />
        <div className="card-body">
        <h5 className="card-title">Easy to use</h5>
        <p className="card-text" style={{textAlign: "left",fontSize : "90%"}}>We have made it simple for you. All complexities are behind on which work to make our platform simpler.</p>
        
        </div>
        </div>


        </div>

        <div className="col-xl-2 col-lg-2 col-ms-12 col-sm-12">

        <div className="ourServicesDiv" >
        <img className="card-img-top" src={serviceSupport} alt="Card image cap" className="ourServiceImage" />
        <div className="card-body">
        <h5 className="card-title">Services & support</h5>
        <p className="card-text" style={{textAlign: "left",fontSize : "90%"}}>You expect good service and we are willing to give it. We are always available to resolve your quaries.</p>
        
        </div>
        </div>

        </div>

        </div>
    )
}

export default OurServices;