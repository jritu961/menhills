import React, { useState } from 'react';
import { Container, FormWrapper, Title, Input, Button, Terms, ErrorMessage } from '../styles/signup';
import { Header } from './header';
import { NavbarComponentData } from './navbarContent';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import EMailOtpModal from './emailOtpModel';  // Import the OTP Modal

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
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [otpError, setOtpError] = useState('');  // New state for OTP errors

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, password, phone, street, city, state, pincode } = formData;
    if (!name || !email || !password || !phone || !street || !city || !state || !pincode) {
      return 'All fields are required.';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return 'Please enter a valid 10-digit phone number.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      // Replace with your registration API logic
      const result=await axios.post(`${process.env.REACT_APP_BASE_URL_Buyer}/register`, formData);
      setError('');
      const USERId=result?.data?.data?._id
      const userIDData=localStorage.setItem("userId",USERId)
      await axios.post(`${process.env.REACT_APP_BASE_URL_Buyer}/otp?userId=${USERId}`);
      setModalOpen(true);  // Open OTP modal after successful registration
    } catch (err) {
      setError('Invalid OTP. Please try again.');
      setLoading(false); // Stop the loading indicator on error    } finally {
    }
  };
  const handleOtpSubmit = async (otp) => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.post(`${process.env.REACT_APP_BASE_URL_Buyer}/verify?userId=${userId}&otp=${otp}`);
      console.log('OTP verified successfully');
      setOtpError('');  // Reset OTP error state
      setModalOpen(false);  // Close the modal after successful OTP verification
      // navigate('/login');  // Navigate to login after OTP verification
    } catch (error) {
      setOtpError('Invalid OTP. Please try again.');  // Set OTP error state
      // Don't close the modal if OTP is invalid
    }
};

  

  return (
    <Container>
      <Header />
      <NavbarComponentData />
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

      {/* OTP Modal */}
      <EMailOtpModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleOtpSubmit} />
    </Container>
  );
};

export default RegisterPage;
