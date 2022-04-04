import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './css/ReturnTerms.css';
import FooterBar from './FooterBar';
import HeaderNavBar from './Header';
import SideBar from './sidebar/Sidebar';

class TermCondition extends Component
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
            <div className="col-xl-12 termConditionPara">
                <h3>Rainbocart Terms & condition</h3>

                <p style={{textAlign:"left"}}>This document is an electronic record in terms of Information Technology Act, 2000 and rules there under as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This electronic record is generated by a computer system and does not require any physical or digital signatures.</p>
                <p style={{textAlign:"left"}}>This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of domain name [www.Rainbocart.com][www.Rainbocart.com] (“Website”), including the related mobile site and mobile application (hereinafter referred to as “Platform”)</p>
          
                
                <p>Your use of the Platform and services and tools are governed by the following terms and conditions ("Terms of Use") as applicable to the Platform including the applicable policies which are incorporated herein by way of reference. If You transact on the Platform, You shall be subject to the policies that are applicable to the Platform for such transaction. By mere use of the Platform, You shall be contracting with Rainbo Cart Internet Private Limited and these terms and conditions including the policies constitute Your binding obligations, with Rainbo Cart.</p>

                <p>For the purpose of these Terms of Use, wherever the context so requires "You" or "User" shall mean any natural or legal person who has agreed to become a buyer on the Platform by providing Registration Data while registering on the Platform as Registered User using the computer systems. Rainbo Cart allows the User to surf the Platform or making purchases without registering on the Platform. The term "We", "Us", "Our" shall mean Rainbo Cart Internet Private Limited.</p>

                <p>When You use any of the services provided by Us through the Platform, including but not limited to, (e.g. Product Reviews, Seller Reviews), You will be subject to the rules, guidelines, policies, terms, and conditions applicable to such service, and they shall be deemed to be incorporated into this Terms of Use and shall be considered as part and parcel of this Terms of Use. We reserve the right, at Our sole discretion, to change, modify, add or remove portions of these Terms of Use, at any time without any prior written notice to You. It is Your responsibility to review these Terms of Use periodically for updates / changes. Your continued use of the Platform following the posting of changes will mean that You accept and agree to the revisions. As long as You comply with these Terms of Use, We grant You a personal, non-exclusive, non-transferable, limited privilege to enter and use the Platform.</p>

                <p><b>ACCESSING, BROWSING OR OTHERWISE USING THE SITE INDICATES YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS OF USE, SO PLEASE READ THE TERMS OF USE CAREFULLY BEFORE PROCEEDING.</b>
                By impliedly or expressly accepting these Terms of Use, You also accept and agree to be bound by Rainbo Cart Policies ((including but not limited to Privacy Policy available at Privacy) as amended from time to time.</p>

               <p><b>Membership Eligibility</b></p>

               <p>Transaction on the Platform is available only to persons who can form legally binding contracts under Indian Contract Act, 1872. Persons who are "incompetent to contract" within the meaning of the Indian Contract Act, 1872 including un-discharged insolvents etc. are not eligible to use the Platform. If you are a minor i.e. under the age of 18 years, you may use the Platform or access content on the Platform only under the supervision and prior consent/ permission of a parent ormlegal guardian.</p>
               <p>As a minor if you wish to transact on the Platform, such transaction on the Platform may be made by your legal guardian or parents. Rainbo Cart reserves the right to terminate your membership and / or refuse to provide you with access to the Platform if it is brought to Rainbo Cart's notice or if it is discovered that You are under the age of 18 years and transacting on the Platform.</p>

               <p><b>Your Account and Registration Obligations</b></p>

               <p>If You use the Platform, You shall be responsible for maintaining the confidentiality of your Display Name and Password and You shall be responsible for all activities that occur under your Display Name and Password. You agree that if You provide any information that is untrue, inaccurate, not current or incomplete or We have reasonable grounds to suspect that such information is untrue, inaccurate, not current or incomplete, or not in accordance with the this Terms of Use, We shall have the right to indefinitely suspend or terminate or block access of your membership on the Platform and refuse to provide You with access to the Platform.</p>

               <p>Your mobile phone number and/or e-mail address is treated as Your primary identifier on the Platform. It is your responsibility to ensure that Your mobile phone number and your email address is up to date on the Platform at all times. You agree to notify Us promptly if your mobile phone number or e-mail address changes by updating the same on the Platform through a onetime password verification.</p>

               <p>You agree that Rainbo Cart shall not be liable or responsible for the activities or consequences of use or misuse of any information that occurs under your Account in cases, including, where You have failed to update Your revised mobile phone number and/or e-mail address on the Website Platform.</p>

               <p>If You share or allow others to have access to Your account on the Platform (“Account”), by creating separate profiles under Your Account, or otherwise, they will be able to view and access Your Account information. You shall be solely liable and responsible for all the activities undertaken under Your Account, and any consequences therefrom.</p>


            </div>
            
</div>
            <FooterBar />
        </div>
       )
    }
}

export default TermCondition;