/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import { Navigation } from "react-minimal-side-navigation";
import { useHistory, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {Redirect,Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOutAlt, faTable, faUser, faUserPlus,faCartPlus,faUserAlt } from '@fortawesome/free-solid-svg-icons';
import '../ClientFolder/css/SideBar.css';
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import axios from 'axios';
import profile from '../ClientFolder/Images/profile.svg';

export const SideBar= () => {
  
  const history = useHistory();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  const [shopName , setShopName] = useState("");

  return (
   
      
      
<React.Fragment>
     

      
       <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0  border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
      >
       
    

<div className="flex items-center justify-center mt-0 text-center py-6">
          <span className="mx-2 text-2xl font-semibold text-black">
            
          </span>
        </div>
        
      

        <div className="row">
          <img src={profile}  className="profileImage" />
        </div>

        <div className="row">
        <p style={{textAlign : "center"}}>{shopName}</p>
      </div>




        <Navigation 
          activeItemId={location.pathname}
          onSelect={({ itemId }) => {
            history.push(itemId);
          }}
          items={[
            {
              title: "Home",
              itemId: "/adminHome",
              elemBefore: () => <FontAwesomeIcon icon={faHome} />
            },
            {
              title: "Profile",
              itemId: "/AdminProfile",
              elemBefore: () => <FontAwesomeIcon icon={faUserAlt} />
            },
            {
              title: "Users",
              itemId: "#",
              elemBefore: () => <FontAwesomeIcon icon={faCartPlus} />,
              subNav: [
                {
                  title: "Customers",
                  itemId: "/TotalCustomer",
                  elemBefore: () => <FontAwesomeIcon icon={faUserPlus} />
                },
                {
                  title: "Seller",
                  itemId: "/SellerDetails",
                  elemBefore: () => <FontAwesomeIcon icon={faUserPlus} />
                },
                {
                  title: "Delivery Boy",
                  itemId: "/TotalDeliveryBoy"
                }
              ]
            },
           
            {
              title: "Total Customer",
              itemId: "/#",
              elemBefore: () => <FontAwesomeIcon icon={faUserPlus} />
            },
            {
              title: "Change Password",
              itemId: "/#",
              elemBefore: () => <FontAwesomeIcon icon={faUser} />
            }
          ] }
          className="navigationBar" />

        <div >
          <Navigation
            activeItemId={location.pathname}
            items={[
              {
                title: "Log Out",
                itemId: "/",
                elemBefore: () => <FontAwesomeIcon icon={faSignOutAlt} />
              }
            ]}
            onSelect={({ itemId }) => {
              history.push(itemId);
            }}
          />
        </div>
      </div>
      </React.Fragment>
    
  );
};

export default SideBar;