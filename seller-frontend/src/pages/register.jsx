import React, { useState } from 'react';
import { Container, FormWrapper, Title, Label, Input, Button, ErrorMessage } from '../style/register';
import axios from 'axios';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    addresses: [
      {
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India', // Default country
        isDefault: false,
      },
    ],
    wishlist: [],
    cart: [],
    orders: [],
    role: 'user', // Default role
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleAddressChange = (e, index) => {
    const { name, value } = e.target;
    const updatedAddresses = [...formData.addresses];
    updatedAddresses[index][name] = value;
    setFormData({ ...formData, addresses: updatedAddresses });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, phone, addresses, wishlist, cart, orders, role } = formData;

    // Basic validation
    if (!name || !email || !password || !phone) {
      setError('Name, email, password, and phone are required');
      return;
    }

    try {
      console.log("54>>>>>>>>>>",formData)
      const base_url = process.env.REACT_APP_BASE_URL_Seller;
      const response = await axios.post(`${base_url}/signup`, {
        name,
        email,
        password,
        phone,
        addresses,
        wishlist,
        cart,
        orders,
        role,
      });

      if (response.status === 201) {
        alert('User registered successfully');
        setFormData({
          name: '',
          email: '',
          password: '',
          phone: '',
          addresses: [
            { street: '', city: '', state: '', pincode: '', country: 'India', isDefault: false },
          ],
          wishlist: [],
          cart: [],
          orders: [],
          role: 'user',
        });
        setError('');
      }
    } catch (e) {
      console.error('Error during registration:', e);
      setError(e.response?.data?.message || 'There was an error registering the user');
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Sign Up - Men's Wear Seller</Title>
        <form onSubmit={handleSubmit}>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />

          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />

          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />

          <Label>Phone</Label>
          <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
          />

          <Label>Address</Label>
          {formData.addresses.map((address, index) => (
            <div key={index}>
              <Input
                type="text"
                name="street"
                value={address.street}
                onChange={(e) => handleAddressChange(e, index)}
                placeholder="Street"
              />
              <Input
                type="text"
                name="city"
                value={address.city}
                onChange={(e) => handleAddressChange(e, index)}
                placeholder="City"
              />
              <Input
                type="text"
                name="state"
                value={address.state}
                onChange={(e) => handleAddressChange(e, index)}
                placeholder="State"
              />
              <Input
                type="text"
                name="pincode"
                value={address.pincode}
                onChange={(e) => handleAddressChange(e, index)}
                placeholder="Pincode"
              />
              <Input
                type="checkbox"
                name="isDefault"
                checked={address.isDefault}
                onChange={(e) =>
                  handleAddressChange(
                    { target: { name: 'isDefault', value: e.target.checked } },
                    index
                  )
                }
              />
              <Label>Set as Default</Label>
            </div>
          ))}

          <Button type="submit">Sign Up</Button>
        </form>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormWrapper>
    </Container>
  );
};

export default SignupPage;
