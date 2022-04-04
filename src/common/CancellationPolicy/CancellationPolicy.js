import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import HeaderNavBar from '../../moduls/Customer/Header.js';
import FooterBar from '../../moduls/Customer/FooterBar';
import SideBar from '../../moduls/Customer/sidebar/Sidebar';

class CancellationPolicy extends Component
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
                <h3>Cancellation Policy</h3>

                <p style={{textAlign:"left"}}>Cancellation is a scheme provided by respective sellers directly under this policy in terms of which the option of Cancellation is offered by the respective sellers to you. All products listed under a particular category may not have the same Cancellation policy. For all products, the Cancellation policy provided on the product page shall prevail over the general Cancellation policy. Do refer the respective item's applicable Cancellation policy on the product page for any exceptions to this Cancellation policy and the table below</p>
                <p style={{textAlign:"left"}}>The Cancellation policy is divided into three parts; Do read all sections carefully to understand the conditions and cases under which Cancellation will be accepted.</p>
          
                

                <table className="table returnPolicTable">
                    <tr>
                        <td>Category</td>
                        <td>Cancellation</td>
                    </tr>

                    <tr>
                        <td>Lifestyle: T-Shirt, Footwear, Sari, Short, Dress, Kid’s (Capri, Shorts & Tops), Men’s (Ethnic Wear, Shirt, Formals, Jeans, Clothing Accessory), Women’s (Ethnic Wear, Fabric, Blouse, Jean, Skirt, Trousers, Bra), Bags, Raincoat, Sunglass, Belt, Frame, Backpack, Suitcase, Luggage, etc...</td>
                        <td>7 days

                        Cancellation</td>
                    </tr>
                </table>
            </div>
            
</div>
            <FooterBar />
        </div>
       )
    }
}

export default CancellationPolicy;