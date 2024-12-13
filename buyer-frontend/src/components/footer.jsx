import React from "react";
import {
  FooterContainer,
  FooterSection,
  FooterTitle,
  FooterLink,
  FooterData,
  FooterSocialIcons,
  FooterCopyright,
  NewsletterForm,
  NewsletterInput,
  NewsletterButton,
} from "../styles/footer";

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterSection>
        <FooterTitle>About Us</FooterTitle>
        <FooterData>
          <p>
            Discover premium men’s fashion with a blend of style and quality.
            Shop the latest trends here.
          </p>
        </FooterData>
      </FooterSection>

      <FooterSection>
        <FooterTitle>Customer Service</FooterTitle>
        <FooterLink href="#">Contact Us</FooterLink>
        <FooterLink href="#">FAQs</FooterLink>
        <FooterLink href="#">Shipping & Returns</FooterLink>
        <FooterLink href="#">Size Guide</FooterLink>
      </FooterSection>

      <FooterSection>
        <FooterTitle>Quick Links</FooterTitle>
        <FooterLink href="#">New Arrivals</FooterLink>
        <FooterLink href="#">Best Sellers</FooterLink>
        <FooterLink href="#">Sale</FooterLink>
        <FooterLink href="#">Gift Cards</FooterLink>
      </FooterSection>

      <FooterSection>
        <FooterTitle>Follow Us</FooterTitle>
        <FooterSocialIcons>
          <a href="#"><img src="/icons/facebook-icon.svg" alt="Facebook" /></a>
          <a href="#"><img src="/icons/instagram-icon.svg" alt="Instagram" /></a>
          <a href="#"><img src="/icons/twitter-icon.svg" alt="Twitter" /></a>
        </FooterSocialIcons>
      </FooterSection>

      <FooterSection>
        <FooterTitle>Newsletter</FooterTitle>
        <NewsletterForm>
          <NewsletterInput type="email" placeholder="Enter your email" />
          <NewsletterButton type="submit">Subscribe</NewsletterButton>
        </NewsletterForm>
      </FooterSection>

      <FooterCopyright>
        &copy; {new Date().getFullYear()} Men’s Fashion. All rights reserved.
      </FooterCopyright>
    </FooterContainer>
  );
};
