// StyledComponents.js
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f8f8f8;
`;

export const ImageSection = styled.div`
  flex: 0 0 40%;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

export const ThumbnailSection = styled.div`
  display: flex;
  flex-direction:column;
  margin-top: 20px;
`;

export const Thumbnail = styled.img`
  width: 100%;;
  height: auto;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
margin-top:10px;
  &:hover {
    opacity: 0.7;
  }
`;

export const WishlistButton = styled.button`
  background-color: #c3c3c3;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: #c3c3c3;
  }
`;

export const DetailsSection = styled.div`
  flex: 1;
  padding: 20px;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
`;

export const Price = styled.p`
  font-size: 1.5rem;
  color: #ff3b3f;
  margin-top: 20px;
`;

export const MRP = styled.span`
  text-decoration: line-through;
  color: #888;
`;

export const Discount = styled.span`
  color: #28a745;
  font-weight: bold;
`;

export const Ratings = styled.p`
  color: #ff9900;
`;

export const SizeSelect = styled.select`
  padding: 10px;
  margin-top: 10px;
`;

export const Button = styled.button`
  padding: 12px 20px;
  background-color: #dc6f00;  ;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
`;

export const SectionTitle = styled.h3`
  margin-top: 30px;
  color: #333;
`;

export const Offer = styled.p`
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 5px;
  margin-top: 10px;
  border: 1px solid #ccc;
`;

export const Description = styled.p`
  color: #666;
  margin-top: 20px;
`;
