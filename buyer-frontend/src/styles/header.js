import styled, { keyframes } from "styled-components";

// Define the scrolling animation
const scrollAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

// Main container for the header
export const HeaderMainContainer = styled.strong`
  background-color: #dc6f00;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; 
  position: relative;
  color: #e4dfd8;
`;

// Wrapper for scrolling text
export const ScrollingTextWrapper = styled.div`
  white-space: nowrap; /* Prevent text wrapping */
  justify-content:center;
`;

// Scrolling text styles
export const ScrollingText = styled.div`
  animation: ${scrollAnimation} 15s linear infinite; /* Smooth scrolling animation */
  display: inline-block; /* Allow text to flow inline */
  padding-right: 50px; /* Add space between duplicates */
  font-size: 1rem;
  visibility: hidden;

  @media (max-width: 800px) {
    visibility: visible; /* Show only on smaller screens */
    animation-duration: 10s; /* Faster animation for smaller screens */
  }
`;

// Static text styles
export const StaticText = styled.div`
  
  display: flex;
  justify-content: center;
  align-items: center;
  top:8px;
  position:relative;
  @media (max-width: 800px) {
    display: none; /* Hide on smaller screens */
  }
`;
