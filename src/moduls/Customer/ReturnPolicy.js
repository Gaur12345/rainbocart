import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './css/ReturnTerms.css';
import FooterBar from './FooterBar';
import HeaderNavBar from './Header';
import SideBar from './sidebar/Sidebar';
class ReturnPolicy extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
       return(

        <div>

        <HeaderNavBar />

        <SideBar />


        <div className="row returnPolicyMainDiv pt-5">
            <div className="col-xl-12">
                <h3>Returns Policy</h3>

                <p style={{textAlign:"left"}}>Returns is a scheme provided by respective sellers directly under this policy in terms of which the option of exchange, replacement and/ or refund is offered by the respective sellers to you. All products listed under a particular category may not have the same returns policy. For all products, the returns/replacement policy provided on the product page shall prevail over the general returns policy. Do refer the respective item's applicable return/replacement policy on the product page for any exceptions to this returns policy and the table below</p>
                <p style={{textAlign:"left"}}>The return policy is divided into three parts; Do read all sections carefully to understand the conditions and cases under which returns will be accepted.</p>
          
                

                <table className="table returnPolicTable">
                    <tr>
                        <td>Category</td>
                        <td>Returns Window, Actions Possible and Conditions (if any)</td>
                    </tr>

                    <tr>
                        <td>Lifestyle: T-Shirt, Footwear, Sari, Short, Dress, Kid’s (Capri, Shorts & Tops), Men’s (Ethnic Wear, Shirt, Formals, Jeans, Clothing Accessory), Women’s (Ethnic Wear, Fabric, Blouse, Jean, Skirt, Trousers, Bra), Bags, Raincoat, Sunglass, Belt, Frame, Backpack, Suitcase, Luggage, etc...</td>
                        <td>7 days

Refund, Replacement or Exchange</td>
                    </tr>
                </table>
            </div>
            
</div>
            <FooterBar />
        </div>
       )
    }
}

export default ReturnPolicy;