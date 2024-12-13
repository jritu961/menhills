import React from 'react';
import { HeroContainer, HeroImage, HeroText, ShopButton } from '../styles/heroSection';
import shoes from "../assets/shoes.jpg";

const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroImage src={shoes} alt="Men's Fashion" />
      <HeroText>Discover the Latest in Men's Fashion</HeroText>
      <ShopButton>Shop Now</ShopButton>
    </HeroContainer>
  );
};

export default HeroSection;
