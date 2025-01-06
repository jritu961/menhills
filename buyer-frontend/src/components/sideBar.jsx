import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingBag,
  FaUndo,
  FaTimesCircle,
  FaBoxOpen,
  FaHeart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const SidebarContainer = styled.div`
border :2px solid red;
margin-right:5px;
  width: ${(props) => (props.isOpen ? "280px" : "300px")};
  height: 100vh;
  background: linear-gradient(135deg, #f4a261, #e76f51);
  padding: ${(props) => (props.isOpen ? "20px 10px" : "20px 5px")};
  box-shadow: 3px 0px 8px rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 25px;
  color: #fff;
  transition: width 0.3s ease;
  z-index: 1000;

  @media (max-width: 768px) {
    width: ${(props) => (props.isOpen ? "280px" : "0")};
    overflow: hidden;
    padding:unset;
  }
`;

const SidebarHeader = styled.div`
border :2px solid green;

  text-align: ${(props) => (props.isOpen ? "center" : "left")};
  font-size: ${(props) => (props.isOpen ? "24px" : "18px")};
  font-weight: bold;
  margin-bottom: ${(props) => (props.isOpen ? "10px" : "0")};
  color: #fff;
  white-space: nowrap;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.isOpen ? "15px" : "5px")};
  font-size: ${(props) => (props.isOpen ? "18px" : "16px")};
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  padding: ${(props) => (props.isOpen ? "12px 15px" : "12px 10px")};
  border-radius: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #264653;
    transform: translateX(5px);
  }

  span {
    display: ${(props) => (props.isOpen ? "inline" : "none")};
    white-space: nowrap;
  }
`;

const SidebarIcon = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleButton = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1100;
  cursor: pointer;
  font-size: 24px;
  background-color: #f4a261;
  padding: 10px;
  border-radius: 50%;
  color: white;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 900;
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close sidebar after navigation on small screens
  };

  return (
    <>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </ToggleButton>
      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader isOpen={isOpen}>My Dashboard</SidebarHeader>
        <SidebarItem isOpen={isOpen} onClick={() => handleNavigation("/order-history")}>
          <SidebarIcon>
            <FaShoppingBag />
          </SidebarIcon>
          <span>Order Details</span>
        </SidebarItem>
        <SidebarItem isOpen={isOpen} onClick={() => handleNavigation("/order-history")}>
          <SidebarIcon>
            <FaUndo />
          </SidebarIcon>
          <span>Active Returns</span>
        </SidebarItem>
        <SidebarItem isOpen={isOpen} onClick={() => handleNavigation("/pending-cancellations")}>
          <SidebarIcon>
            <FaTimesCircle />
          </SidebarIcon>
          <span>Pending Cancellations</span>
        </SidebarItem>
        <SidebarItem isOpen={isOpen} onClick={() => handleNavigation("/returned-items")}>
          <SidebarIcon>
            <FaBoxOpen />
          </SidebarIcon>
          <span>Returned</span>
        </SidebarItem>
        <SidebarItem isOpen={isOpen} onClick={() => handleNavigation("/wishlist")}>
          <SidebarIcon>
            <FaHeart />
          </SidebarIcon>
          <span>Wishlist</span>
        </SidebarItem>
        <SidebarItem isOpen={isOpen} onClick={() => handleNavigation("/my-info")}>
          <SidebarIcon>
            <FaUser />
          </SidebarIcon>
          <span>My Info</span>
        </SidebarItem>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
