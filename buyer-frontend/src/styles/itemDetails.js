// StyledComponents.js (or itemDetails.js)
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f8f8f8;
  flex-wrap: wrap;
`;

export const ImageSection = styled.div`
  flex: 0 0 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProductImage = styled.img`
display:flex;
flex-direction:column;
justify-content:center;
  max-width: 600px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const ThumbnailSection = styled.div`
max-width:600px;
margin-left:15px;
gap:20px;
  margin-top: 20px;
`;

export const Thumbnail = styled.img`

  max-width: 250px;
  max-height: 250px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  object-fit: cover;

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
  border-radius: 5px;

  &:hover {
    background-color: #a2a2a2;
  }
`;

export const DetailsSection = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
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
  font-size: 1.2rem;
  margin-top: 10px;
`;

export const SizeSelect = styled.select`
  padding: 10px;
  margin-top: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  padding: 12px 20px;
  background-color: #dc6f00;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  
  &:hover {
    background-color: #d45f00;
  }
`;

export const SectionTitle = styled.h3`
  margin-top: 30px;
  color: #333;
  font-size: 1.25rem;
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
  font-size: 1rem;
`;

export const ColorSelect = styled.select`
  padding: 10px;
  margin-top: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const FitSelect = styled.select`
  padding: 10px;
  margin-top: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const StockStatus = styled.p`
  font-size: 1rem;
  color: #333;
  margin-top: 15px;
`;

export const ShippingDetails = styled.p`
  font-size: 1rem;
  color: #333;
  margin-top: 15px;
`;

