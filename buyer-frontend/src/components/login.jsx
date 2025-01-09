import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import toast styles
import {
  Container,
  FormWrapper,
  Input,
  Button,
  Title,
  SignupPrompt,
  ErrorMessage,
} from '../styles/login'; // Import the styles

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Both fields are required!'); // Show toast if any field is missing
      return;
    }

    setError(''); // Clear previous error
    setLoading(true); // Set loading to true

    try {
      // Make an API call to the login endpoint
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL_Buyer}/login`, {
        email,
        password,
      });

      
      // Handle the response (e.g., store the token, navigate to another page)
      const { token } = response.data;
      localStorage.setItem('authToken', token); // Save token to local storage
      localStorage.setItem('userId', response.data.user.id);

      navigate('/'); // Redirect to the dashboard or home page

      toast.success('Login successful!'); // Show success toast after login

    } catch (error) {
      setLoading(false); // Set loading to false after the API call

      if (error.response && error.response.status === 401) {
        toast.error('Invalid credentials. Please try again.'); // Show toast for invalid credentials
      } else {
        toast.error('Something went wrong. Please try again later.'); // Show general error toast
      }

      console.error('Login error:', error);
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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
            <Button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <SignupPrompt>
              Don't have an account? <a href="/signup">Sign up</a>
            </SignupPrompt>
          </FormWrapper>
        </Container>

        {/* Include toast container */}
        <ToastContainer />
      </div>
    </>
  );
};

export default LoginPage;
