import React, { useState } from 'react';
import {
  Container,
  FormWrapper,
  Title,
  Input,
  Button,
  Terms,
  ErrorMessage,
} from '../styles/signup';
import { Header } from './header';
import { NavbarComponentData } from './navbarContent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EMailOtpModal from './emailOtpModel'; // Import the OTP Modal
import { toast } from 'react-toastify'; // Import react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Toastify styles

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
    image: null, // Added image field
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [otpError, setOtpError] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
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
  
    // Create an array for the addresses field
    const addresses = [
      {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        country: formData.country, // Assuming the country is required
      },
    ];
  
    // Prepare FormData
    const data = new FormData();
    // Append other form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'street' && key !== 'city' && key !== 'state' && key !== 'pincode') {
        data.append(key, value ?? ''); // Append all form fields except the address fields
      }
    });
    // Append the address field as an array
    data.append('addresses', JSON.stringify(addresses));
    console.log("🚀 ~ handleSubmit ~ data:", data)

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL_Buyer}/register`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setError('');
      const USERId = result?.data?.data?._id;
      localStorage.setItem('userId', USERId);
      await axios.post(
        `${process.env.REACT_APP_BASE_URL_Buyer}/otp?userId=${USERId}`
      );
      setModalOpen(true); // Open OTP modal after successful registration
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleOtpSubmit = async (otp) => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.post(
        `${process.env.REACT_APP_BASE_URL_Buyer}/verify?userId=${userId}&otp=${otp}`
      );
      setOtpError('');
      setModalOpen(false);
      toast.success('Verification Successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setOtpError('Invalid OTP. Please try again.');
    }
  };

  return (
    <Container>
      <Header />
      <NavbarComponentData />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <FormWrapper onSubmit={handleSubmit} encType="multipart/form-data">
          <Title>Create Your Account</Title>
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
          <Input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <Terms>
            By registering, you agree to our <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.
          </Terms>
          <Button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </FormWrapper>
      </div>
      <EMailOtpModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleOtpSubmit} />
      <ToastContainer />
    </Container>
  );
};

export default RegisterPage;
