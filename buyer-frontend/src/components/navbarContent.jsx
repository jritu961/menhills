import React, { useState,useEffect } from "react";
import { BarsOutlined } from "@ant-design/icons";
import { NavbarMainContainer, NavbarHeading, Navbar } from "../styles/navbarContent.js";
import {getOrCreateDeviceId} from "../helper/device.js"
export const NavbarComponentData = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [deviceId, setDeviceId] = useState(null);  // Stores the device ID
  const [loading, setLoading] = useState(true);    // Tracks loading state

  // 3. useEffect hook to fetch deviceId when the component mounts
  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = await getOrCreateDeviceId(); // Get or create the device ID
      setDeviceId(id);  // Set the device ID in the state
      setLoading(false); // Set loading to false once data is fetched
    };

    fetchDeviceId();  // Call the async function inside useEffect
  }, []); // Empty dependency array ensures this runs only once on component mount

  // 4. Conditional rendering based on loading state
  if (loading) {
    return <div>Loading device ID...</div>;  // Show loading text until deviceId is fetched
  }


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
