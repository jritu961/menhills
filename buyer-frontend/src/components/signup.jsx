import React, { useState } from 'react';
import { Container, FormWrapper, Title, Input, Button, Terms, ErrorMessage } from '../styles/signup';
import { Header } from './header';
import { NavbarComponentData } from './navbarContent';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    isDefault: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, password, phone, street, city, state, pincode } = formData;
    if (!name || !email || !password || !phone || !street || !city || !state || !pincode) {
      return 'All fields are required.';
    }
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    // Password validation
    if (password.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    // Phone number validation (10-digit number)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return 'Please enter a valid 10-digit phone number.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true); // Set loading to true while submitting

    try {
      // Implement registration logic here (e.g., API call)
      // Simulate registration success for now
      console.log('Registered successfully', formData);
      setError('');
      // You can redirect to another page after successful registration
      // e.g., history.push('/login') or window.location.replace('/login')
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  return (
    <Container>
      <div>
        <Header />
        <NavbarComponentData />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px' }}>
        <FormWrapper onSubmit={handleSubmit}>
          <Title>Register for Data</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="street"
            placeholder="Street Address"
            value={formData.street}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleInputChange}
          />
          <Terms>
            By registering, you agree to our <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.
          </Terms>
          <Button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </FormWrapper>
      </div>
    </Container>
  );
};

export default RegisterPage;
