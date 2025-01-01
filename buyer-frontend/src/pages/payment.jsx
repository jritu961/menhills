// PaymentPage.js
import React, { useState } from 'react';
import styled from 'styled-components';

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background: #f9fafc;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 30px;
`;

const PaymentForm = styled.div`
  background: #ffffff;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #34495e;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  font-size: 1rem;
  border: 1px solid #bdc3c7;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3498db;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 15px;
  font-size: 1rem;
  border: 1px solid #bdc3c7;
  border-radius: 10px;
  outline: none;
  background: #ffffff;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3498db;
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  color: #ffffff;
  background: linear-gradient(90deg, #27ae60, #2ecc71);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s, background 0.3s;

  &:hover {
    background: linear-gradient(90deg, #2ecc71, #27ae60);
    transform: scale(1.05);
  }
`;

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment Details:', { paymentMethod, cardDetails });
    alert('Payment Successful!');
  };

  return (
    <PaymentContainer>
      <Title>Complete Your Payment</Title>
      <PaymentForm onSubmit={handleSubmit}>
        <Label htmlFor="payment-method">Payment Method</Label>
        <Select
          id="payment-method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="credit_card">Credit Card</option>
          <option value="debit_card">Debit Card</option>
          <option value="upi">UPI</option>
          <option value="net_banking">Net Banking</option>
        </Select>

        {paymentMethod === 'credit_card' || paymentMethod === 'debit_card' ? (
          <>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
            />

            <Label htmlFor="expiry">Expiry Date</Label>
            <Input
              type="text"
              id="expiry"
              name="expiry"
              value={cardDetails.expiry}
              onChange={handleInputChange}
              placeholder="MM/YY"
            />

            <Label htmlFor="cvv">CVV</Label>
            <Input
              type="password"
              id="cvv"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleInputChange}
              placeholder="123"
            />
          </>
        ) : null}

        <Button type="submit">Pay Now</Button>
      </PaymentForm>
    </PaymentContainer>
  );
};

export default PaymentPage;
