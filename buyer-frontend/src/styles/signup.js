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

// Container with professional, clean background for men's wear theme
export const Container = styled.div`
  display: flex;
  flex-direction:column;
  
  height: 100vh;
  background: linear-gradient(45deg, #3a4d68, #4b6c7f); /* Dark Blue/Gray Gradient */
  background-size: 400% 400%;
  animation: ${gradientMove} 10s ease infinite;
  position: relative;
  overflow: hidden;
`;

// FormWrapper with stylish design for men's fashion theme
export const FormWrapper = styled.form`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  width: 100%;
  max-width: 450px;
  z-index: 2;
  margin-top:10px`;

// Title with bold and modern font, showcasing a fashion-forward look
export const Title = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 2.5rem;
  font-family: 'Poppins', sans-serif;
  color: transparent;
  background: linear-gradient(to left, #ff5733, #f1c40f); /* Orange to Yellow gradient */
  background-clip: text;
  -webkit-background-clip: text;
  font-weight: bold;
`;

// Styled input fields with a professional touch
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
    border-color: #ff5733;
    box-shadow: 0 0 12px rgba(255, 87, 51, 0.5);
  }

  &::placeholder {
    color: #ddd;
  }
`;

// Stylish button with hover effects
export const Button = styled.button`
  padding: 1.2rem;
  border: none;
  background: #ff5733; /* Bright orange */
  color: #fff;
  font-size: 1.1rem;
  font-family: 'Poppins', sans-serif;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;

  &:hover {
    background: #f1c40f; /* Yellow on hover */
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(255, 87, 51, 0.3);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 4px 10px rgba(255, 87, 51, 0.2);
  }
`;

// Terms and conditions with a clean, readable font style
export const Terms = styled.p`
  text-align: center;
  color: #fff;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;

  a {
    color: #ff5733;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      color: #f1c40f;
      text-decoration: underline;
    }
  }
`;

// Error message with a subtle red background and animation for visibility
export const ErrorMessage = styled.div`
  color: #ff4d4d;
  font-size: 0.9rem;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  animation: 0.5s ease-in-out;
  margin-bottom: 1rem;
`;
