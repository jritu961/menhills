import styled from 'styled-components';

export const HeroContainer = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  overflow: hidden;
`;

export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(70%);
`;

export const HeroText = styled.h2`
  position: absolute;
  color: #fff;
  font-size: 3rem;
  text-align: center;
  z-index: 1;
`;

export const ShopButton = styled.button`
  position: absolute;
  bottom: 50px;
  padding: 15px 30px;
  background-color: #000; /* Black background */
  color: #fff; /* White text */
  font-size: 1.2rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  z-index: 1;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #555; /* Darker gray for hover effect */
  }
`;

