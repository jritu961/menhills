import React, { useState } from "react";
import styled from "styled-components";

const AddressPageContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fffaf3;
  font-family: 'Arial', sans-serif;
`;

const AddressList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AddressCard = styled.div`
  padding: 15px;
  border: 1px solid #f4a261;
  border-radius: 8px;
  background-color: #fff8ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  color: #6a4f4b;
`;

const AddressForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #f4a261;
  border-radius: 8px;
  width: 100%;
  background-color: #fff8ed;
  color: #6a4f4b;
  font-size: 16px;
`;

const Button = styled.button`
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

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");

  const addAddress = () => {
    if (newAddress) {
      setAddresses([...addresses, newAddress]);
      setNewAddress("");
    }
  };

  const removeAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  return (
    <AddressPageContainer>
      <Heading>Manage Addresses</Heading>
      <AddressForm>
        <Input
          type="text"
          placeholder="Enter new address"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
        />
        <Button onClick={addAddress}>Add Address</Button>
      </AddressForm>
      <AddressList>
        {addresses.map((address, index) => (
          <AddressCard key={index}>
            <span>{address}</span>
            <Button onClick={() => removeAddress(index)}>Remove</Button>
          </AddressCard>
        ))}
      </AddressList>
    </AddressPageContainer>
  );
};

export default AddressPage;
