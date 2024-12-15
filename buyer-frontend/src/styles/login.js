import styled, { keyframes } from 'styled-components';

// Background animation for gradient transition
const gradientMove = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Container with professional gradient background
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ensure it takes at least the height of the screen */
  background: linear-gradient(45deg, #4e5d6b, #2c3e50); /* Dark Blue/Gray Gradient */
  background-size: 400% 400%;
  animation: ${gradientMove} 10s ease infinite;
  position: relative;
  overflow: hidden;
  padding: 0 20px; /* Added some padding to ensure no content overflows */
  box-sizing: border-box;
`;

// Hero text with a modern effect and lighter color for professional look
export const HeroText = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  z-index: 1;
  letter-spacing: 5px;

  span {
    display: block;
    margin-top: 20px;
    color: #b0bec5; /* Light Gray for professional tone */
  }
`;

// FormWrapper with semi-transparent background and slight blur
export const FormWrapper = styled.form`
  background: rgba(255, 255, 255, 0.15); /* Lighter background */
  backdrop-filter: blur(12px);
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  width: 100%;
  max-width: 450px;
  z-index: 2;
  position:relative;
`;

// Title with gradient text effect and professional colors
export const Title = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 2.5rem;
  font-family: 'Poppins', sans-serif;
  color: transparent;
  background:rgb(220, 111, 0); /* Blue Gradient */
  background-clip: text;
  -webkit-background-clip: text;
`;

// Styled input fields with more professional styling
export const Input = styled.input`
  padding: 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 6px;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-family: 'Poppins', sans-serif;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #5c6bc0; /* Professional blue color on focus */
    box-shadow: 0 0 12px rgba(92, 107, 192, 0.5);
  }

  &::placeholder {
    color: #ddd;
  }
`;

// Button with subtle hover and active effects
export const Button = styled.button`
  padding: 1.2rem;
  border: none;
  background:rgb(220, 111, 0); /* Blue color */
  color: #fff;
  font-size: 1.1rem;
  font-family: 'Poppins', sans-serif;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;

  &:hover {
    background: linear-gradient(90deg, #3f51b5, #5c6bc0);
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(92, 107, 192, 0.3);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 4px 10px rgba(92, 107, 192, 0.2);
  }
`;

// Signup prompt with professional style
export const SignupPrompt = styled.p`
  text-align: center;
  color: #fff;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;

  a {
    color: rgb(220, 111, 0);
    text-decoration: none;
    font-weight: bold;

    &:hover {
      color: rgb(220, 111, 0);
      text-decoration: underline;
    }
  }
`;

// Error message with fading effect and color adjustment for professional look
export const ErrorMessage = styled.div`
  color: #ff4d4d;
  font-size: 0.9rem;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  animation: 0.5s ease-in-out;
`;

