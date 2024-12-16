import React from "react";
import { NavbarMainContainer, NavbarLogo, NavbarRight, Navbar } from "../styles/navbar";
import { UserAddOutlined, ShoppingCartOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const NavbarComponent = () => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate("/login"); // Redirect to the login page
  };

  return (
    <Navbar>
      <NavbarMainContainer>
        {/* <NavbarLogo>MENHILLS</NavbarLogo> */}
        <NavbarRight>
          <UserAddOutlined className="icon" onClick={handleUserClick} />
          <ShoppingCartOutlined className="icon" />
          <SearchOutlined className="icon" />
        </NavbarRight>
      </NavbarMainContainer>
    </Navbar>
  );
};
