import React from "react";
import { 
  FooterContainer, 
  FooterSection, 
  FooterTitle, 
  FooterLink, 
  FooterData, 
  FooterSocialIcons, 
  FooterCopyright 
} from "../styles/footer";

export const Footer = () => {
  return (
    <FooterContainer>
      {/* Section 1: About Us */}
      <FooterSection>
        <FooterTitle>About Us</FooterTitle>
        <FooterData>
          <p>Discover premium men’s fashion with a blend of style and quality. Shop the latest trends here.</p>
        </FooterData>
      </FooterSection>

      {/* Section 2: Customer Service */}
      <FooterSection>
        <FooterTitle>Customer Service</FooterTitle>
        <FooterLink href="#">Contact Us</FooterLink>
        <FooterLink href="#">FAQs</FooterLink>
        <FooterLink href="#">Shipping & Returns</FooterLink>
        <FooterLink href="#">Size Guide</FooterLink>
      </FooterSection>

      {/* Section 3: Quick Links */}
      <FooterSection>
        <FooterTitle>Quick Links</FooterTitle>
        <FooterLink href="#">New Arrivals</FooterLink>
        <FooterLink href="#">Best Sellers</FooterLink>
        <FooterLink href="#">Sale</FooterLink>
        <FooterLink href="#">Gift Cards</FooterLink>
      </FooterSection>

      {/* Section 4: Follow Us */}
      <FooterSection>
        <FooterTitle>Follow Us</FooterTitle>
        <FooterSocialIcons>
          <a href="#"><img src="/icons/facebook-icon.svg" alt="Facebook" /></a>
          <a href="#"><img src="/icons/instagram-icon.svg" alt="Instagram" /></a>
          <a href="#"><img src="/icons/twitter-icon.svg" alt="Twitter" /></a>
        </FooterSocialIcons>
      </FooterSection>

      {/* Section 5: Copyright */}
      <FooterCopyright>
        &copy; {new Date().getFullYear()} Men’s Fashion. All rights reserved.
      </FooterCopyright>
    </FooterContainer>
  );
};