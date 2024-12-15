import React, { useState } from 'react';
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

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both fields are required!');
    } else {
      setError('');
      console.log('Logged in with', { email, password });
      // You can handle the login logic here (e.g., API request)
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <NavbarComponentData />

        <Container>
          <FormWrapper onSubmit={handleLogin}>
            <Title>Login for MenHills</Title>
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
