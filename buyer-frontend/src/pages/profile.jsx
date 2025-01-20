import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Sidebar from "../components/sideBar.jsx";
import axios from "axios";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const UserProfileContainer = styled.div`
  margin-left: 270px;
  display: flex;
  justify-content: center;
  gap: 10px;
  background: #f9f9f9;
  min-height: 100vh;
  overflow-x: hidden;
  flex-direction: row;

  @media (max-width: 900px) {
    margin-left: 0px;
  }
`;

const MainContent = styled.div`
  display: flex;
  margin-top: 100px;
  padding: 40px;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
  }
`;

const ProfileHeader = styled.div`
  animation: ${fadeIn} 0.6s ease-in-out;
  color: #000;
  padding: 40px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #000;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
  transform: scale(1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const UserName = styled.h1`
  font-size: 28px;
  margin: 0;
  color: #000;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const EditButton = styled.button`
  padding: 12px 30px;
  font-size: 16px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #444;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
    font-size: 14px;
  }
`;

const Section = styled.div`
  animation: ${fadeIn} 0.8s ease-in-out;
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 20px;
  }
`;

const InfoHeader = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #000;
  border-bottom: 2px solid #000;
  padding-bottom: 10px;
`;

const InfoItem = styled.div`
  font-size: 18px;
  color: #333;

  span {
    font-weight: bold;
    color: #000;
  }
`;

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token=localStorage.getItem("authToken")
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_Buyer}/user/details`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );
        setUserData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <p>No user data found.</p>;
  }

  return (
    <UserProfileContainer>
      <Sidebar />
      <MainContent>
        <ProfileHeader>
          <UserDetails>
            <UserImage src="https://via.placeholder.com/100" alt="User Avatar" />
            <UserName>{userData.name}</UserName>
          </UserDetails>
          <EditButton>Edit Profile</EditButton>
        </ProfileHeader>

        <Section>
          <InfoHeader>Profile Information</InfoHeader>
          <InfoItem>
            Email: <span>{userData.email}</span>
          </InfoItem>
          <InfoItem>
            Phone: <span>{userData.phone}</span>
          </InfoItem>
          <InfoItem>
  Address: <span>
    {userData.addresses.length > 0 
      ? `${userData.addresses[0].street}, ${userData.addresses[0].city}, ${userData.addresses[0].state} - ${userData.addresses[0].pincode}, ${userData.addresses[0].country}`
      : "No Address Added"}
  </span>
</InfoItem>

        </Section>
      </MainContent>
    </UserProfileContainer>
  );
};

export default UserProfile;
