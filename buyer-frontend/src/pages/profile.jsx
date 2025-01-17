import React from "react";
import styled, { keyframes } from "styled-components";
import Sidebar from "../components/sideBar.jsx";

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
  margin-left:270px;
  display: flex;
  justify-content:center;
  gap: 10px;
  background: linear-gradient(to right, #f9f9f9, #f0f0f0);
  min-height: 100vh;
  overflow-x: hidden;
  flex-direction: row;

  @media (max-width: 900px) {
    margin-left:0px;

    /* flex-direction: column;  // Stack Sidebar and MainContent on small screens */
  }
`;

const MainContent = styled.div`
  display:flex;
  margin-top: 100px;
  padding: 40px;
  /* width: 100%; */
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
  }
`;

const ProfileHeader = styled.div`
display:flex;
flex-direction:column;
gap:10px;
  animation: ${fadeIn} 0.6s ease-in-out;
  color: white;
  padding: 40px;
  border-radius: 12px;
  /* display: flex; */

  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #264653; // Background color for header

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
  border: 4px solid white;
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

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const EditButton = styled.button`
  padding: 12px 30px;
  font-size: 16px;
  background-color: #e76f51;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f4a261;
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
  /* background-color: white; */
  border-radius: 12px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* border: 2px solid red; */

  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 20px;
  }
`;

const InfoHeader = styled.h2`
  margin: 0;
  font-size: 24px;

  color: #264653;
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

const handleUser=async ()=>{
  const result = await axios.get(`${process.env.REACT_APP_BASE_URL_Seller}//${id}`);
}
const UserProfile = () => {
  return (
    <UserProfileContainer>
      <Sidebar />
      <MainContent>
        <ProfileHeader>
          <UserDetails>
            <UserImage src="https://via.placeholder.com/100" alt="User Avatar" />
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
      </MainContent>
    </UserProfileContainer>
  );
};

export default UserProfile;
