import { NavbarComponentData } from "../components/navbarContent";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components
const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #f4f6f8;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 900px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const ItemName = styled.h3`
  font-size: 1.2rem;
  color: #444;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ItemPrice = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 5px 0 0;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 10px;
  }
`;

const QuantityButton = styled.button`
  background: #f0f0f0;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #ddd;
  }
`;

const RemoveButton = styled.button`
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #c0392b;
  }
`;

const TotalContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  max-width: 500px;
  margin: 20px;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #333;

  @media (max-width: 768px) {
    padding: 15px 20px;
    gap: 15px;
  }
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  color: ${(props) => (props.highlight ? '#e74c3c' : '#444')};
  font-weight: ${(props) => (props.highlight ? '600' : '400')};

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const HighlightText = styled.span`
  color: ${(props) => (props.color ? props.color : '#27ae60')};
  font-weight: bold;
`;

const CheckoutButton = styled.button`
  background: linear-gradient(90deg, #e74c3c, #c0392b);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  transition: transform 0.3s ease, background 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #27ae60, #2ecc71);
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #ddd;
  margin: 10px 0;
`;

const Badge = styled.span`
  display: inline-block;
  background: ${(props) => props.color || '#f39c12'};
  color: #fff;
  font-size: 0.9rem;
  padding: 5px 10px;
  border-radius: 5px;
  text-transform: uppercase;
  margin-left: 10px;
`;

const TotalText = styled.h3`
  font-size: 1.5rem;
  color: #333;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

// Component
const AddToCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const TAX_RATE = 0.1; // 10% tax
  const DELIVERY_CHARGE = 5;

  // Fetch cart items
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL_Buyer}/cart`);
      console.log("API Response:", response.data);
      // Ensure cartItems is always an array
      setCartItems(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Remove item from cart
  const handleRemove = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL_Buyer}/cart/remove/${id}`);
      // Remove item from local state
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Update item quantity
  const handleQuantityChange = async (id, increment) => {
    try {
      const item = cartItems.find((item) => item.id === id);
      const newQuantity = Math.max(1, item.quantity + increment);
      await axios.put(`${process.env.REACT_APP_BASE_URL_Buyer}/cart/update/${id}`, { quantity: newQuantity });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const grandTotal = subtotal + tax + DELIVERY_CHARGE;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      <NavbarComponentData />
      <CartContainer>
        <Title>Your Cart</Title>
        <CartItems>
          {cartItems.map((item) => (
            <CartItem key={item.id}>
              <ItemDetails>
                <ItemImage src={item.image} alt={item.name} />
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                </ItemInfo>
              </ItemDetails>
              <ItemActions>
                <QuantityButton onClick={() => handleQuantityChange(item.id, -1)}>-</QuantityButton>
                <span>{item.quantity}</span>
                <QuantityButton onClick={() => handleQuantityChange(item.id, 1)}>+</QuantityButton>
                <RemoveButton onClick={() => handleRemove(item.id)}>Remove</RemoveButton>
              </ItemActions>
            </CartItem>
          ))}
        </CartItems>
        <TotalContainer>
          <TotalRow>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </TotalRow>
          <Divider />
          <TotalRow>
            <span>
              Tax <Badge color="#3498db">10%</Badge>
            </span>
            <span>${tax.toFixed(2)}</span>
          </TotalRow>
          <Divider />
          <TotalRow>
            <span>Delivery Charges</span>
            <span>${DELIVERY_CHARGE.toFixed(2)}</span>
          </TotalRow>
          <Divider />
          <TotalRow highlight>
            <span>Grand Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </TotalRow>
          <CheckoutButton>Proceed to Checkout</CheckoutButton>
        </TotalContainer>
      </CartContainer>
      <Footer />
    </>
  );
};

export default AddToCartPage;
