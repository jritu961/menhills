import styled from 'styled-components';

export const ProductContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 40px;
  flex-wrap: wrap;
`;

export const ProductCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-10px);
  }
`;

export const ProductImage = styled.img`
  max-width:280px;
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
