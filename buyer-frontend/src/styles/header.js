import styled, { keyframes } from "styled-components";

// Define the scrolling animation
const scrollAnimation = keyframes`
  0% {
    transform: translateX(100%); /* Start off-screen to the right */
  }
  100% {
    transform: translateX(-100%); /* Move off-screen to the left */
  }
`;

// Main container for the header
export const HeaderMainContainer = styled.strong`
  background-color: #dc6f00;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content:center;
  align-items: center;
  overflow: hidden; /* Hide overflowing text */
  position: relative;
  color: #e4dfd8;
`;

// Wrapper for scrolling text
export const ScrollingTextWrapper = styled.div`
  display: flex;
  white-space: nowrap; /* Prevent text wrapping */
  animation: none; /* No animation by default */

  /* Apply scrolling animation only when screen width is between 0px and 800px */
  @media (max-width: 800px) {
    animation: ${scrollAnimation} 15s linear infinite; /* Smooth scrolling animation */
  }
`;
