import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
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

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const SidebarContainer = styled.div`
  width: ${(props) => (props.isOpen ? "250px" : "60px")};
  height: 100vh;
  background: linear-gradient(135deg, #1f2937, #4b5563);
  padding: 20px;
  box-shadow: 3px 0px 8px rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isOpen ? "flex-start" : "center")};
  color: #fff;
  transition: width 0.4s ease;
  z-index: 1000;
  animation: ${slideIn} 0.5s ease;

  @media (max-width: 768px) {
    width: ${(props) => (props.isOpen ? "250px" : "0")};
    overflow: hidden;
  }
`;

const SidebarHeader = styled.div`
  font-size: ${(props) => (props.isOpen ? "24px" : "0")};
  font-weight: bold;
  margin-bottom: ${(props) => (props.isOpen ? "20px" : "0")};
  color: #fff;
  transition: font-size 0.3s ease, margin-bottom 0.3s ease;
  overflow: hidden;
`;

const SidebarItem = styled.div`
  display: flex;
  margin-top:40px;
  align-items: center;
  gap: ${(props) => (props.isOpen ? "15px" : "0")};
  font-size: ${(props) => (props.isOpen ? "18px" : "0")};
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  padding: ${(props) => (props.isOpen ? "12px 15px" : "12px 0")};
  border-radius: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease, font-size 0.3s ease;
  overflow: hidden;

  &:hover {
    background-color: #3b82f6;
    transform: scale(1.05);
  }

  span {
    display: ${(props) => (props.isOpen ? "inline" : "none")};
    transition: display 0.3s ease;
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
  top: 10px;
  left: 0px;
  margin-bottom:10px;
  z-index: 1100;
  cursor: pointer;
  font-size: 24px;
  background-color: #1f2937;
  padding: 7px;
  border-radius: 50%;
  color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #4b5563;
  }

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
    setIsOpen(false);
  };

  return (
    <>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </ToggleButton>
      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader isOpen={isOpen}></SidebarHeader>
        <SidebarItem isOpen={isOpen} onClick={() => handleNavigation("/order")}>
          <SidebarIcon>
            <FaShoppingBag />
          </SidebarIcon>
          <span>Order Details</span>
        </SidebarItem>
        <SidebarItem isOpen={isOpen} onClick={() => handleNavigation("/returns")}>
          <SidebarIcon>
            <FaUndo />
          </SidebarIcon>
          <span>Active Returns</span>
        </SidebarItem>
        <SidebarItem
          isOpen={isOpen}
          onClick={() => handleNavigation("/cancellations")}
        >
          <SidebarIcon>
            <FaTimesCircle />
          </SidebarIcon>
          <span>Pending Cancellations</span>
        </SidebarItem>
        <SidebarItem
          isOpen={isOpen}
          onClick={() => handleNavigation("/returned-items")}
        >
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
