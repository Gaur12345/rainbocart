import React, { useState } from 'react';
import './css/SearchBar.css';
import {Link} from 'react-router-dom';

function Shopcard(props) {
    const [Query, setQuery] = useState(""); /* useState to get the updated search query */
    const getfilteredItems = () => {

        if (!Query) {
            return props.data;
        }
        return props.data.filter((item) => {
            const postName = item.uShopName.toLowerCase();
            
            return postName.includes(Query.toLowerCase()) ;
        });
    };
    
    const filteredItems = getfilteredItems();
    /* to store the filtered items and display  */
    
    
    return (
        <>
            <input type="text" className="bar" placeholder="Search Shop by name" onChange={e => setQuery(e.target.value)} />
            
            {props.resultShow ? (

                <div className="shoplist">
                    {filteredItems.map((user, index) => (
                        <div className="card cardDIVPro">

                        <Link onClick={()=>{props.goNextPage(user)}} style={{textDecoration : "none",color : "black"}}>
                        <div className="row mt-2 ">
                            
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 pt-1 searchImageDiv">
                                <img src={user.uShopImagePath} className="productImage " />

                            </div>

                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 pt-1 productInfoDivH">

                                <p className="shopInformation">Shop Name : {user.uShopName}</p>
                                <p className="shopInformation">  Shop Owner : {user.uname}
                                </p>
                                <p className="shopInformation">Shop Address : {user.uAddress} {user.uArea} {user.uCity} {user.uState} {user.uCountry} {user.uPinCode}</p>

                                <p className="shopInformation">Shop Description : {user.uDescription}</p>

                            </div>
                        </div>
                        </Link>

                            
                        </div>
                    ))}


                </div>
            ) : (

                <div>
                    <p>Data not avalible</p>
                </div>
            )}

        </>
    )
}

export default Shopcard
