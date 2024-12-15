import React, { useState } from 'react';
import { Container, FormWrapper, Title, Input, Button, Terms, ErrorMessage } from '../styles/signup';
import { Header } from "../components/header"
import { NavbarComponentData } from "../components/navbarContent"
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement registration logic here
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required.');
    } else {
      // Successful registration logic
      setError('');
      console.log('Registered successfully', formData);
    }
  };

  return (
    <Container>
        <div>
        <Header/>
        <NavbarComponentData/>
        </div>
        <div style={{display:"flex",justifyContent:"center"}}>
      <FormWrapper onSubmit={handleSubmit}>
        <Title>Register for MenHills</Title>
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
        <Terms>
          By registering, you agree to our <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.
        </Terms>
        <Button type="submit">Register</Button>
      </FormWrapper>
      </div>
    </Container>
  );
};

export default RegisterPage;
