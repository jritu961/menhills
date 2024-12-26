import React from "react";
import {
  NavbarMainContainer,
  NavbarLogo,
  NavbarRight,
  Navbar,
} from "../styles/navbar";
import {
  UserAddOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const NavbarComponent = () => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate("/login"); // Redirect to the login page
  };

  const handleLogout = () => {
    // Clear authentication tokens or session
    localStorage.removeItem("authToken"); // Example if you're using localStorage
    sessionStorage.removeItem("authToken"); // Example if you're using sessionStorage
    // Redirect to login page
    navigate("/login");
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
        <NavbarRight>          <LogoutOutlined className="icon" onClick={handleLogout} />
        </NavbarRight>
      </NavbarMainContainer>
   
    </Navbar>
  );
};
