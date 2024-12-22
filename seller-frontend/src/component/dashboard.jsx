import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';

const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 2rem;
    color: #333;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    navigate('/add-product');
  };

  return (
    <DashboardContainer>
      <Navbar />
      <Header>
        <h2>Seller Dashboard</h2>
        <button onClick={handleAddProductClick}>Add Product</button>
      </Header>
    </DashboardContainer>
  );
};

export default Dashboard;
