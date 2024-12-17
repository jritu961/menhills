import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

import { HeroContainer, HeroImage, HeroText, ShopButton } from '../styles/heroSection';
import shoes from "../assets/shoes.jpg";

const HeroSection = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleShopNowClick = () => {
    navigate('/menswear'); // Redirect to the 'menswear' page
  };
  return (
    <HeroContainer>
      <HeroImage src={shoes} alt="Men's Fashion" />
      <HeroText>Discover the Latest in Men's Fashion</HeroText>
      <ShopButton onClick={handleShopNowClick}>Shop Now</ShopButton>
    </HeroContainer>
  );
};

export default HeroSection;
