import styled from 'styled-components';

export const ProductContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 40px;
  flex-wrap: wrap; /* Enables wrapping to the next row */
`;

export const ProductCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  /* flex: 1 1 calc(25% - 20px); */
  max-width: calc(25% - 20px);

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: 768px) {
    /* flex: 1 1 calc(50% - 20px);  */
    max-width: calc(50% - 20px);
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;


export const ProductImage = styled.img`
  max-width: 100%;
  height: 300px;
  object-fit: cover;
`;

export const ProductName = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin: 10px;
`;

export const ProductPrice = styled.p`
  font-size: 1.2rem;
  color: #777;
  margin: 10px;
`;

export const SizeSelect = styled.select`
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  background-color: #fff;

  &:hover {
    border-color: #aaa;
  }
`;
