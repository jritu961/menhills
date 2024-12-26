import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  FormWrapper,
  Input,
  Button,
  Title,
  SignupPrompt,
  ErrorMessage,
  HeroText,
} from '../styles/login'; // Import the styles
import { NavbarComponentData } from './navbarContent';
import { Header } from "../components/header";
import { NavbarComponent } from "../components/navbar"; // Import the NavbarComponent
import { use } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');

  const navigate=useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both fields are required!');
    } else {
      setError('');
      setLoading(true); // Set loading to true

      // Make an API call to the login endpoint
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL_Buyer}/login`, {
        email,
        password,
      });

      console.log('Login successful:', response.data);
      
      // Handle the response (e.g., store the token, navigate to another page)
      const { token } = response.data;
      localStorage.setItem('authToken', token); // Save token to local storage
      navigate('/'); // Redirect to the dashboard or home page
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <NavbarComponentData />

        <Container>
          <FormWrapper onSubmit={handleLogin}>
            <Title>Login for Data</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Login</Button>
            <SignupPrompt>
              Don't have an account? <a href="/signup">Sign up</a>
            </SignupPrompt>
          </FormWrapper>
        </Container>
      </div>
    </>
  );
};

export default LoginPage;
