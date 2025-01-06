import React from "react";
import styled from "styled-components";
import Sidebar from "../components/sideBar.jsx";

const UserProfileContainer = styled.div`
  display: flex;
  gap:10px;
  border:2px solid blue;
  font-family: "Arial", sans-serif;
  background: linear-gradient(to right, #f9f9f9, #f0f0f0);
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  margin-left: 320px;
  padding: 40px;
  width: 100%;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
  }
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #f4a261, #e76f51);
  color: white;
  padding: 30px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const UserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const UserName = styled.h1`
  font-size: 26px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const EditButton = styled.button`
  padding: 10px 25px;
  font-size: 16px;
  background-color: #264653;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2a9d8f;
    transform: scale(1.05);
  }
`;

const Section = styled.div`
  margin-top: 40px;
  padding: 25px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const InfoHeader = styled.h2`
  margin: 0;
  font-size: 22px;
  color: #2a9d8f;
  border-bottom: 2px solid #f4a261;
  padding-bottom: 10px;
`;

const InfoItem = styled.div`
  font-size: 18px;
  color: #6a4f4b;

  span {
    font-weight: bold;
    color: #e76f51;
  }
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const OrderImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

const OrderDetails = styled.div`
  font-size: 16px;

  p {
    margin: 0;
    line-height: 1.5;

    &:first-child {
      font-weight: bold;
      color: #264653;
    }
  }
`;

const UserProfile = () => {
  const mockOrders = [
    {
      id: 1,
      image: "https://via.placeholder.com/60",
      title: "Men's Casual Shirt",
      status: "Delivered on Jan 3, 2025",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/60",
      title: "Formal Trousers",
      status: "Shipped on Jan 4, 2025",
    },
  ];

  return (
    <UserProfileContainer>
      <Sidebar />
      <MainContent>
        <ProfileHeader>
          <UserDetails>
            <UserImage src="https://via.placeholder.com/80" alt="User Avatar" />
            <UserName>John Doe</UserName>
          </UserDetails>
          <EditButton>Edit Profile</EditButton>
        </ProfileHeader>

        <Section>
          <InfoHeader>Profile Information</InfoHeader>
          <InfoItem>
            Email: <span>johndoe@example.com</span>
          </InfoItem>
          <InfoItem>
            Phone: <span>+123 456 7890</span>
          </InfoItem>
          <InfoItem>
            Address: <span>123 Fashion Street, Style City, CA</span>
          </InfoItem>
        </Section>

        <Section>
          <InfoHeader>Recent Orders</InfoHeader>
          {mockOrders.map((order) => (
            <OrderItem key={order.id}>
              <OrderImage src={order.image} alt={order.title} />
              <OrderDetails>
                <p>{order.title}</p>
                <p>{order.status}</p>
              </OrderDetails>
            </OrderItem>
          ))}
        </Section>
      </MainContent>
    </UserProfileContainer>
  );
};

export default UserProfile;
