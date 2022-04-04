import React, { useState } from 'react';
import { Link , Redirect,useHistory} from 'react-router-dom';
import './css/SearchBar.css';
import ReactStars from "react-rating-stars-component";

const firstExample = {
    size: 20,
    value: 4.5,
    edit: false
};
function Displayproduct(props) {
    const [Query, setQuery] = useState(""); /* useState to get the updated search query */
    const [productStatus, setProductStatus] = useState(false);
    const [productInfomations, setProductInfomation] = useState([]);
    const history = useHistory();
    const getfilteredItems = () => {

        if (!Query) {
            return props.data;
        }
        return props.data.filter((item) => {
            const postName = item.pCompanyName.toLowerCase();
            const postprod = item.productName.toLowerCase();
            return postName.includes(Query.toLowerCase()) || postprod.includes(Query.toLowerCase());
        });
    };
    const filteredItems = getfilteredItems();
    /* to store the filtered items and display  */
    const handleEvent = (user) => {
        setProductStatus(true);
        setProductInfomation(user);
    }
    let { addToCard, buyNow } = props;
    let image = props.imageTable;
    let pTable = props.productTable;
    if (productStatus === true) {
        
        const productInformation = {
            productInformation : productInfomations,
            productTableName : pTable,
            imagetable: image,
            proID: productInfomations.proID,
            hash:"ProductInfo"
        }
        // console.log("test",productInformation);
        sessionStorage.setItem("productDataForAddtoCart",JSON.stringify(productInformation));
        history.push("/ProductInfo",{productInfomation : productInfomations,productTableName: pTable});
        return(<div>

        </div>)
        
    }
    else {


        return(
            <div>
                <input type="text" className="bar" placeholder="Search by product or company name" onChange={e => setQuery(e.target.value)} />
                {props.resultShow ? (

                    <div className="showProductImage">
                        {filteredItems.map((user, index) => (

                            <div className="row cartDivProduct">

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">

                                    <div className="card hvr-grow rescard"  script={user['imagepathtable'] = image}>
                                        
                                        <Link onClick={()=>handleEvent(user)} ><img className="card-img-top" src={user.imagePath} alt="Card image cap" />
                                        </Link>
                                        <div className="card-body">
                                            <p className="shopInformation"><b>{user.pCompanyName} {user.productName}</b></p>
                                            <p className="shopInformation">Color: {user.pCategory}, Size :{user.pSize}</p>
                                            <p className="shopInformation">Price: <b> &#8377;{user.pPrice} </b> &#8377;<s>{parseInt(user.pPrice) + (parseInt(user.pPrice) * (user.offer / 100))}</s> <span style={{ color: "green", fontSize: "90%" }} >{user.offer}% off</span> </p>
                                            <ReactStars {...firstExample} />
                                            <p className="shopInformation tooltip2" style={{ textAlign: "left" }} >About Product : {user.pDescription.substring(0, 15)}...<span className="tooltiptext">{user.pDescription}</span></p>
                                            <button className="addTocartButton" onClick={() => addToCard(user.proID)} >Add to cart</button><button className="buyNameButton" onClick={() => buyNow(user)}>Buy now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>
                ) : (

                    <div>
                        <p>Data not avalible</p>
                    </div>
                )}

            </div>
        );
    }
}

export default Displayproduct

