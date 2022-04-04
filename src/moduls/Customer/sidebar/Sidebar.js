import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import companyLogo from '../../ClientFolder/Images/rainbow.png';

const Nav = styled.div`
  // background: #24a0ed;
  background:#f6f5f5;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 1rem;
  font-size: 1.5rem;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
// background: #24a0ed;
background:#f6f5f5;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [logged, setLogged] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  useEffect(() => {
    let token = sessionStorage.getItem("customerEmail");
  if (token != null) {
    setLogged(true);
  }
  });

  // console.log("han", SidebarData);
  return (
    <div className="sidebarTag">
      <IconContext.Provider value={{ color: 'black' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon> &nbsp;<img src={companyLogo} className="logo" />
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'> <img src={companyLogo} className="logo" />
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {logged ? SidebarData.filter(function (data) {
              return data.show != "notlogin";
            }).map(function (item,index) {
              return <SubMenu item={item} key={index} />;
            }):SidebarData.filter(function (data) {
              return data.show != "login";
            }).map(function (item,index) {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </div>
  );
};

export default Sidebar;
