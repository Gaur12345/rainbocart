import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as GrDocumentStore from 'react-icons/gr';
import * as AiOutlineUsergroupAdd from 'react-icons/ai';
import * as RiLockPasswordLine from 'react-icons/ri';
import * as AiOutlineOrderedList from 'react-icons/ai';
import * as CgProfile from 'react-icons/cg';
import * as AiOutlineLogout from 'react-icons/ai';
import { faHome, faSignOutAlt, faTable, faUser, faUserPlus,faCartPlus,faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SidebarData = [
  {
    title: 'Home',
    path: '/adminHome',
    icon: <AiIcons.AiFillHome />
  },
  {
    title: 'Profile',
    path: '/AdminProfile',
    icon: <CgProfile.CgProfile />
  },
  {
    title: 'Users',
    path: '#',
    icon: <AiOutlineOrderedList.AiOutlineOrderedList />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Customers",
        path: "/TotalCustomer",
        //elemBefore: () => <FontAwesomeIcon icon={faUserPlus} />
      },
      {
        title: "Seller",
        path: "/SellerDetails",
        //elemBefore: () => <FontAwesomeIcon icon={faUserPlus} />
      },
      {
        title: "Delivery Boy",
        path: "/TotalDeliveryBoy"
      }
    ]
  },
  {
    title: "Stock",
    path: "##",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    icon : <IoIcons.IoIosPaper />,
    subNav: [
      {
        title: "New Company",
        path: "/addCompany",
        //elemBefore: () => <FontAwesomeIcon icon={faUserPlus} />
      },
      {
        title: "New Product",
        path: "/addNewProduct",
       // elemBefore: () => <FontAwesomeIcon icon={faUserPlus} />
      },
      {
        title: "Add Color",
        path: "/addColors"
      },
      // {
      //   title: "Add Size",
      //   path: "/AddSize"
      // },
      {
        title: "Add Product",
        path: "/addProduct"
      },
      {
        title: "All Product",
        path: "/ShowAllProduct"
      }
    ]
  },
  {
    title: "Total Customer",
    itemId: "/#",
    icon : <AiOutlineUsergroupAdd.AiOutlineUsergroupAdd />
  },
  {
    title: "Change Password",
    itemId: "/#",
    icon : <RiLockPasswordLine.RiLockPasswordLine />
  },
  {
    title: "Logout",
    path: "/Logout",
    icon : <AiOutlineLogout.AiOutlineLogout />
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />
  }
];
