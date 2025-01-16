import React, { useState, useEffect } from "react";
import { BarsOutlined } from "@ant-design/icons";
import { NavbarMainContainer, NavbarHeading, Navbar } from "../styles/navbarContent.js";
import { getOrCreateDeviceId } from "../helper/device.js";
import { useMyContext } from "../context/categoryContext.jsx"; 
import axios from "axios";

export const NavbarComponentData = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { setcategory } = useMyContext(); 

  const [deviceId, setDeviceId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = await getOrCreateDeviceId();
      setDeviceId(id);
      setLoading(false);
    };

    fetchDeviceId();
  }, []);

  const fetchProducts = async (category = "") => {
    try {
      const url = category
        ? `${process.env.REACT_APP_BASE_URL_Seller}/products?category=${category}`
        : `${process.env.REACT_APP_BASE_URL_Seller}/products`; // Fetch all products if no category
      const response = await axios.get(url);
      // You can handle the products from the response here
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleCategoryClick = async (category) => {
    if (category === "All") {
      setSelectedCategory(null);  // Reset selected category to show all products
      setcategory(null);  // Set category as null in context
      await fetchProducts();  // Fetch all products
    } else {
      setSelectedCategory(category);  // Update selected category
      setcategory(category); // Set category in context
      await fetchProducts(category);  // Fetch products of the selected category
    }
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
            {/* Add "All Products" button to the categories */}
            {["All", "Formal Wear", "Casual", "Sports", "Outerwear", "Party", "Innerwear", "Sleepwear", "Footwear"].map((category) => (
              <NavbarHeading
                key={category}
                onClick={() => handleCategoryClick(category)}
                isActive={selectedCategory === category}  // Highlight active category
              >
                {category}
              </NavbarHeading>
            ))}
          </div>

          {isMenuOpen && (
            <div className="mobile-menu">
              {/* Add "All Products" button to the mobile menu categories */}
              {["All", "Formal Wear", "Casual", "Sport", "Outerwear", "Party", "Innerwear", "Sleepwear", "Footwear"].map((category) => (
                <NavbarHeading
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  isActive={selectedCategory === category}  // Highlight active category
                >
                  {category}
                </NavbarHeading>
              ))}
            </div>
          )}
        </NavbarMainContainer>
      </Navbar>
    </>
  );
};
