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
    const token=localStorage.getItem("authToken")
    if(!token){
      navigate("/login"); // Redirect to the login page

    }
    navigate("/my-info"); // Redirect to the login page

  };

  const handleLogout = () => {
    // Clear authentication tokens or session
    localStorage.clear(); // Removes all items from localStorage

    
    navigate("/login");
  };
  const handlecartClick = () => {
    // Clear authentication tokens or session    
    // Redirect to login page
    navigate("/cart");
  };
  return (
    <Navbar>
      <NavbarMainContainer>
        {/* <NavbarLogo>MENHILLS</NavbarLogo> */}
        <NavbarRight>
          <UserAddOutlined className="icon" onClick={handleUserClick} />
          <ShoppingCartOutlined className="icon" onClick={handlecartClick}/>
          <SearchOutlined className="icon" />
        </NavbarRight>
        <NavbarRight>          <LogoutOutlined className="icon" onClick={handleLogout} />
        </NavbarRight>
      </NavbarMainContainer>
   
    </Navbar>
  );
};
