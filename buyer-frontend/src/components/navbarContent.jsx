import React from "react";
import { NavbarMainContainer, NavbarHeading, Navbar } from "../styles/navbarContent";

export const NavbarComponentData = () => {
  return (
    <Navbar>
      <NavbarMainContainer>
        <NavbarHeading>Formal Wear</NavbarHeading>
        <NavbarHeading>Casual Wear</NavbarHeading>
        <NavbarHeading>Ethnic & Traditional Wear</NavbarHeading>
        <NavbarHeading>Sportswear</NavbarHeading>
        <NavbarHeading>Outerwear</NavbarHeading>
        <NavbarHeading>Party Wear</NavbarHeading>
        <NavbarHeading>Innerwear</NavbarHeading>
        <NavbarHeading>Sleepwear & Loungewear</NavbarHeading>
        <NavbarHeading>Footwear</NavbarHeading>
      </NavbarMainContainer>
    </Navbar>
  );
};
