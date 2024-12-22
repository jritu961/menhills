// LoginApp.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const RedirectText = styled.p`
  margin-top: 20px;
  color: #666;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #333;
  }
`;

const LoginApp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Add actual authentication logic here
    if (email && password) {
      // Simulating successful login
      navigate('/dashboard');
    } else {
      alert('Please enter valid email and password');
    }
  };
  

  const handleRedirect = () => {
    navigate('/signup');
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
      <RedirectText onClick={handleRedirect}>Don't have an account? Sign up here.</RedirectText>
    </LoginContainer>
  );
};

export default LoginApp;