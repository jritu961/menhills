// mensWearStyles.js
import styled from 'styled-components';

export const MensWearContainer = styled.div`
  padding: 40px 20px;
  background-color: #f9f9f9;
  text-align: center;
`;

export const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  justify-content: space-around;
`;

export const ProductCard = styled.div`
  background: white;
  border: 1px solid #ddd;
  display:flex;
  flex-direction:column;
  justify-content:space-evenly;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;

  img {
    max-width:100%;
    border-radius: 5px;
    margin-bottom: 10px;
    max-height:200px;;
  }

  h3 {
    font-size: 1.2rem;
    color: #555;
    margin: 10px 0;
  }

  p {
    font-size: 1rem;
    color: #007bff;
    font-weight: bold;
  }
`;
