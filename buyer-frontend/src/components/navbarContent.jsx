import React, { useState, useEffect } from "react";
import { BarsOutlined } from "@ant-design/icons";
import { NavbarMainContainer, NavbarHeading, Navbar } from "../styles/navbarContent.js";
import { getOrCreateDeviceId } from "../helper/device.js";
import { useMyContext } from "../context/categoryContext.jsx"; // Correct import
import axios from "axios"
export const NavbarComponentData = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { setcategory } = useMyContext(); // Use the custom hook to access context

  const [deviceId, setDeviceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);  // Store selected categories

  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = await getOrCreateDeviceId();
      setDeviceId(id);
      setLoading(false);
    };

    fetchDeviceId();
  }, []);

  const handleCategoryClick = async(category) => {
    setcategory(category); // Set category in context
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL_Seller}/products?category=${category}`
    );
    setSelectedCategories((prevCategories) => {
      const updatedCategories = [...prevCategories];
      if (updatedCategories.includes(category)) {
        updatedCategories.splice(updatedCategories.indexOf(category), 1);  // Remove if already selected
      } else {
        updatedCategories.push(category);  // Add the new category
      }
      return updatedCategories;
    });
  };

  if (loading) {
    return <div>Loading device ID...</div>;
  }

  return (
    <>
      <Navbar>
        <NavbarMainContainer isMenuOpen={isMenuOpen}>
          <BarsOutlined
            onClick={toggleMenu}
            style={{ fontSize: "2rem", color: "#fff", cursor: "pointer" }}
          />
          <div className="desktop-menu">
            <NavbarHeading onClick={() => handleCategoryClick("Formal Wear")}>Formal Wear</NavbarHeading>
            <NavbarHeading onClick={() => handleCategoryClick("Casual Wear")}>Casual Wear</NavbarHeading>
            <NavbarHeading onClick={() => handleCategoryClick("Shirts")}>Sportswear</NavbarHeading>
            <NavbarHeading onClick={() => handleCategoryClick("Outerwear")}>Outerwear</NavbarHeading>
            <NavbarHeading onClick={() => handleCategoryClick("Party Wear")}>Party Wear</NavbarHeading>
            <NavbarHeading onClick={() => handleCategoryClick("Innerwear")}>Innerwear</NavbarHeading>
            <NavbarHeading onClick={() => handleCategoryClick("Sleepwear & Loungewear")}>Sleepwear & Loungewear</NavbarHeading>
            <NavbarHeading onClick={() => handleCategoryClick("Footwear")}>Footwear</NavbarHeading>
          </div>

          {isMenuOpen && (
            <div className="mobile-menu">
              <NavbarHeading onClick={() => handleCategoryClick("Formal Wear")}>Formal Wear</NavbarHeading>
              <NavbarHeading onClick={() => handleCategoryClick("Casual Wear")}>Casual Wear</NavbarHeading>
              <NavbarHeading onClick={() => handleCategoryClick("Sportswear")}>Sportswear</NavbarHeading>
              <NavbarHeading onClick={() => handleCategoryClick("Outerwear")}>Outerwear</NavbarHeading>
              <NavbarHeading onClick={() => handleCategoryClick("Party Wear")}>Party Wear</NavbarHeading>
              <NavbarHeading onClick={() => handleCategoryClick("Innerwear")}>Innerwear</NavbarHeading>
              <NavbarHeading onClick={() => handleCategoryClick("Sleepwear & Loungewear")}>Sleepwear & Loungewear</NavbarHeading>
              <NavbarHeading onClick={() => handleCategoryClick("Footwear")}>Footwear</NavbarHeading>
            </div>
          )}
        </NavbarMainContainer>
      </Navbar>

      {/* Pass selected categories to ProductSection */}
      {/* <ProductSection categories={selectedCategories} /> */}
    </>
  );
};
