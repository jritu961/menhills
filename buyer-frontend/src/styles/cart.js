import styled from 'styled-components';

// Container for product cards
export const ProductContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 40px;
  flex-wrap: wrap;
  background-color: #f5f5f5; /* Soft background color */
`;

// Individual product card
export const ProductCard = styled.div`
  background: linear-gradient(145deg, #ffffff, #e6e6e6); /* Subtle gradient for a modern look */
  border-radius: 15px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2), -5px -5px 15px rgba(255, 255, 255, 0.8);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  width: 300px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8);
  }
`;

// Product image
export const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ProductCard}:hover & {
    transform: scale(1.1);
  }
`;

// Product name
export const ProductName = styled.h3`
  font-size: 1.5rem;
  color: #2c3e50; /* Dark blue-gray for elegance */
  margin: 15px;
  text-align: center;
`;

// Product price
export const ProductPrice = styled.p`
  font-size: 1.2rem;
  color: #8e44ad; /* Stylish purple for pricing */
  margin: 10px 15px;
  text-align: center;
`;

// Add to cart button
export const AddToCartButton = styled.button`
  display: block;
  width: 80%;
  margin: 15px auto 20px;
  padding: 10px 0;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #e74c3c; /* Eye-catching red */
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b; /* Darker red for hover */
  }
`;
