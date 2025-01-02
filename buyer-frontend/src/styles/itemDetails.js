import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: #f8f8f8;
  flex-wrap: wrap;
  gap: 20px; /* Add space between items */
`;

export const ImageSection = styled.div`
  flex: 0 0 45%; /* Adjusted for better responsiveness */
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
`;

export const ProductImage = styled.img`
  max-width: 100%; /* Make image responsive */
  height: auto;
  margin-bottom: 20px;
`;

export const ThumbnailSection = styled.div`
  display: flex;
  gap: 10px;
`;

export const Thumbnail = styled.img`
  max-width: 50px;
  cursor: pointer;
`;

export const DetailsSection = styled.div`
  flex: 0 0 45%; /* Adjusted for better responsiveness */
  max-width: 600px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const Price = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const MRP = styled.span`
  font-size: 16px;
  text-decoration: line-through;
  margin-left: 10px;
`;

export const Discount = styled.span`
  color: #e74c3c;
  font-size: 16px;
  margin-left: 10px;
`;

export const Ratings = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  margin-top: 20px;
`;

export const SizeSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  font-size: 16px;
`;

export const ColorSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  font-size: 16px;
`;

export const FitSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  font-size: 16px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #27ae60;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #2ecc71;
  }
`;

export const WishlistButton = styled(Button)`
  background-color: #e74c3c;

  &:hover {
    background-color: #c0392b;
  }
`;

export const StockStatus = styled.div`
  font-size: 16px;
  margin-top: 10px;
`;

export const ShippingDetails = styled.div`
  margin-top: 20px;
  font-size: 16px;
`;

export const Offer = styled.div`
  background-color: #f39c12;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  font-size: 16px;
  margin-top: 10px;
`;

