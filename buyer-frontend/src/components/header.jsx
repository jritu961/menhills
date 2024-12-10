import React from "react";
import { HeaderMainContainer, ScrollingTextWrapper, ScrollingText, StaticText } from "../styles/header";

export const Header = () => {
  return (
    <HeaderMainContainer>
      <ScrollingTextWrapper>
        {/* Use CSS for conditional animation */}
        <StaticText className="static-text">
          10% OFF on UPI upto ₹ 70 | Late Friday Sale live Now | Pay Via Mobikwik
          and Get Upto ₹150 Cashback
        </StaticText>
        <ScrollingText className="scrolling-text">
          10% OFF on UPI upto ₹ 70 | Late Friday Sale live Now | Pay Via Mobikwik
          and Get Upto ₹150 Cashback
        </ScrollingText>
        <ScrollingText className="scrolling-text">
          10% OFF on UPI upto ₹ 70 | Late Friday Sale live Now | Pay Via Mobikwik
          and Get Upto ₹150 Cashback
        </ScrollingText>
        
      </ScrollingTextWrapper>
    </HeaderMainContainer>
  );
};
