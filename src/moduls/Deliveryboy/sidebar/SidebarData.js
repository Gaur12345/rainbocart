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
import * as MdContactPhone from 'react-icons/md';
import { faHome, faSignOutAlt, faTable, faUser, faUserPlus,faCartPlus,faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />
  },
  {
    title: 'My Account',
    path: '#',
    icon: <CgProfile.CgProfile />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "My Profile",
        path: "/CustomerProfile",
        //elemBefore: () => <FontAwesomeIcon icon={faUserPlus} />
      },
      {
        title: "My Orders",
        path: "/MyOrders",
        //elemBefore: () => <FontAwesomeIcon icon={faUserPlus} />
      }
    ]
  },
  {
    title: 'My Cart',
    path: '/CustomerCart',
    icon: <AiOutlineOrderedList.AiOutlineOrderedList />,
  },
  {
    title: "Login",
    path: "/CustomerLogin",
    icon : <AiOutlineUsergroupAdd.AiOutlineUsergroupAdd />
  },
  {
    title: "Sign up",
    path: "/CustomerRegistration",
    icon : <AiOutlineUsergroupAdd.AiOutlineUsergroupAdd />
  },
  {
    title: "Forgot Password",
    path: "/#",
    icon : <RiLockPasswordLine.RiLockPasswordLine />
  },
  {
    title: "Logout",
    path: "/Logout",
    icon : <AiOutlineLogout.AiOutlineLogout />
  },
  {
    title: 'Contact us',
    path: '/support',
    icon: <MdContactPhone.MdContactPhone />
  }
];
