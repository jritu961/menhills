import React, { useState } from "react";
import { BarsOutlined } from "@ant-design/icons";
import { NavbarMainContainer, NavbarHeading, Navbar } from "../styles/navbarContent";

export const NavbarComponentData = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Navbar>
      <NavbarMainContainer isMenuOpen={isMenuOpen}>
        <BarsOutlined
          onClick={toggleMenu}
          style={{ fontSize: '2rem', color: '#fff', cursor: 'pointer' }}
        />
        {/* Desktop Menu (hidden on mobile) */}
        <div className="desktop-menu">
          <NavbarHeading>Formal Wear</NavbarHeading>
          <NavbarHeading>Casual Wear</NavbarHeading>
          
          <NavbarHeading>Sportswear</NavbarHeading>
          <NavbarHeading>Outerwear</NavbarHeading>
          <NavbarHeading>Party Wear</NavbarHeading>
          <NavbarHeading>Innerwear</NavbarHeading>
          <NavbarHeading>Sleepwear & Loungewear</NavbarHeading>
          <NavbarHeading>Footwear</NavbarHeading>
        </div>

        {/* Mobile Menu (hidden on desktop) */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <NavbarHeading>Formal Wear</NavbarHeading>
            <NavbarHeading>Casual Wear</NavbarHeading>
            <NavbarHeading>Ethnic & Traditional Wear</NavbarHeading>
            <NavbarHeading>Sportswear</NavbarHeading>
            <NavbarHeading>Outerwear</NavbarHeading>
            <NavbarHeading>Party Wear</NavbarHeading>
            <NavbarHeading>Innerwear</NavbarHeading>
            <NavbarHeading>Sleepwear & Loungewear</NavbarHeading>
            <NavbarHeading>Footwear</NavbarHeading>
          </div>
        )}
      </NavbarMainContainer>
    </Navbar>
  );
};
