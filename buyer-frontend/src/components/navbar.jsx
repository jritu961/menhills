import React from "react";
import {
  NavbarMainContainer,
  NavbarRight,
  Navbar,
} from "../styles/navbar";
import {
  UserAddOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  LogoutOutlined,
  HeartOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const NavbarComponent = () => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login"); // Redirect to the login page
    } else {
      navigate("/profile"); // Redirect to the user info page
    }
  };

  const handleLogout = () => {
    // Clear authentication tokens or session
    localStorage.clear(); // Removes all items from localStorage
    navigate("/login");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleWishlistClick = () => {
    navigate("/wishlist"); // Redirect to the wishlist page
  };

  const handleHomeClick = () => {
    navigate("/"); // Redirect to the homepage
  };

  return (
    <Navbar>
      <NavbarMainContainer>
        <NavbarRight>
          <UserAddOutlined className="icon" onClick={handleUserClick} />
          <ShoppingCartOutlined className="icon" onClick={handleCartClick} />
          <SearchOutlined className="icon" />
        </NavbarRight>
        <NavbarRight>
          <HomeOutlined className="icon" onClick={handleHomeClick} />
          <LogoutOutlined className="icon" onClick={handleLogout} />
        </NavbarRight>
      </NavbarMainContainer>
    </Navbar>
  );
};
