import React from "react";
import { NavbarMainContainer, NavbarLogo, NavbarRight, Navbar } from "../styles/navbar";
import { UserAddOutlined, ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';

export const NavbarComponent = () => {
  return (
    <Navbar>
      <NavbarMainContainer>
        <NavbarLogo>MENHILLS</NavbarLogo>
        <NavbarRight>
          <UserAddOutlined className="icon" />
          <ShoppingCartOutlined className="icon" />
          <SearchOutlined className="icon" />
        </NavbarRight>
      </NavbarMainContainer>
    </Navbar>
  );
};
