import styled from "styled-components"

export const Dashboard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const SectionOne = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    transition: opacity 0.5s ease-in-out;
  }
`;
export const SectionHeading = styled.h2`
 display:flex;
 justify-content:center;
 align-items:center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  text-transform: uppercase;
  font-family: "Arial", sans-serif;
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  background: linear-gradient(135deg, #e9ecef, #f8f9fa);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  gap:5px;
  img {
    width: 100%;
    max-width: 800px;
    height:auto;
    border-radius: 10px;
    animation: fade-in 0.5s ease-in-out;
    object-fit: cover;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
export const SectionTwo = styled.div``;
export const SectionThree = styled.div``;
export const SectionFour = styled.div``;
export const SectionFive = styled.div``;
export const SectionSix = styled.div``;
export const SectionSeven = styled.div``;
