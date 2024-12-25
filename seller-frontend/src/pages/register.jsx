import React, { useState } from 'react';
import { Container, FormWrapper, Title, Label, Input, Button, ErrorMessage } from '../style/register';
import axios from 'axios'; // Import axios for API calls

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',  // Default role as 'user'
  });

  const [error, setError] = useState('');

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error message when user starts typing
    setError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent form from submitting and page reload

    const { name, email, password, role } = formData;

    // Basic validation
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const base_url = process.env.REACT_APP_BASE_URL_Seller;
      console.log("base_url>>>>>>>>>",base_url)
      // Make API call to register the user
      const response = await axios.post(`${base_url}/signup`, { name, email, password, role });

      console.log("🚀 ~ handleSubmit ~ response:", response);
      
      if (response.status === 201) {
        alert('User registered successfully');
        setFormData({ name: '', email: '', password: '', role: 'user' });  // Clear form
        setError('');  // Clear any errors
      }
    } catch (e) {
      console.log("Error during registration:", e);

      // Check if the error is due to the backend response
      if (e.response) {
        // Extract and set the error message from the backend response
        setError(e.response.data.message || 'There was an error registering the user');
      } else {
        // If there's no response (e.g., network error), set a default error message
        setError('There was an error with the registration request');
      }
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

          <Button type="submit">Sign Up</Button>
        </form>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormWrapper>
    </Container>
  );
};

export default SignupPage;
