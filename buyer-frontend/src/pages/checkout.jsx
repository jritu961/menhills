import React from "react";
import styled from "styled-components";
import AddressPage from "./address.jsx";
import { Header } from "../components/header"
import {NavbarComponent} from "../components/navbar"
import {Footer} from "../components/footer"
const CheckoutPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #fffaf3;
`;

const OrderSummary = styled.div`
  padding: 20px;
  border: 1px solid #f4a261;
  border-radius: 8px;
  background-color: #fff8ed;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const PaymentOptions = styled.div`
  padding: 20px;
  border: 1px solid #f4a261;
  border-radius: 8px;
  background-color: #fff8ed;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  color: #6a4f4b;
`;

const Total = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: #dc6f00;
  margin-top: 15px;
`;

const PaymentButton = styled.button`
  padding: 12px 24px;
  background-color: #dc6f00;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #bf5e00;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Heading = styled.h2`
  font-size: 24px;
  color: #dc6f00;
  border-bottom: 2px solid #f4a261;
  padding-bottom: 8px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin: 10px 0;
  font-size: 16px;
  color: #6a4f4b;

  input {
    margin-right: 10px;
  }
`;

const CheckoutPage = () => {
  const orderItems = [
    { name: "Shirt", quantity: 2, price: 1000 },
    { name: "Jeans", quantity: 1, price: 1500 },
  ];

  const totalAmount = orderItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
   <>
    <Header/>
    <CheckoutPageContainer>
      <AddressPage />

      <OrderSummary>
        <Heading>Order Summary</Heading>
        {orderItems.map((item, index) => (
          <SummaryItem key={index}>
            <span>
              {item.name} (x{item.quantity})
            </span>
            <span>₹{item.quantity * item.price}</span>
          </SummaryItem>
        ))}
        <Total>Total: ₹{totalAmount}</Total>
      </OrderSummary>

      <PaymentOptions>
        <Heading>Payment Options</Heading>
        <Label>
          <input type="radio" name="payment" value="cod" /> Cash on Delivery
        </Label>
        <Label>
          <input type="radio" name="payment" value="card" /> Credit/Debit Card
        </Label>
        <Label>
          <input type="radio" name="payment" value="upi" /> UPI
        </Label>
        <PaymentButton>Proceed to Pay</PaymentButton>
      </PaymentOptions>
    
    </CheckoutPageContainer>
    <Footer/>
    </>
  );
};

export default CheckoutPage;
