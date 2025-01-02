import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

// Styled Components for styling
const AddressPageContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fffaf3;
  font-family: 'Arial', sans-serif;
`;

const AddressList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AddressCard = styled.div`
  padding: 15px;
  border: 1px solid #f4a261;
  border-radius: 8px;
  background-color: #fff8ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  color: #6a4f4b;
`;

const AddressForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #f4a261;
  border-radius: 8px;
  background-color: #fff8ed;
  color: #6a4f4b;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #dc6f00;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #bf5e00;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Heading = styled.h2`
  font-size: 24px;
  color: #dc6f00;
  border-bottom: 2px solid #f4a261;
  padding-bottom: 8px;
  margin-bottom: 16px;
`;

// Modal Styles
const Modal = styled.div`
  position: fixed;
  top: 00px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  margin:10px;

`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 100%;
`;

const ModalCloseButton = styled.button`
  background-color: #f4a261;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
`;

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    door: "",
    address_name: "",
    name: "",
    building: "",
    street: "",
    locality: "",
    ward: "",
    city: "",
    state: "",
    country: "",
    areaCode: "",
    tag: "",
    lat: "",
    lng: "",
    gps: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // Fetch addresses on component mount
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get("/v1/delivery_address"); // Replace with your API endpoint
        setAddresses(response.data); // Assuming the API returns an array of addresses
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  // Handle input changes for address fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add a new address
  const addAddress = async () => {
    if (newAddress.name && newAddress.city && newAddress.street) {
      try {
        const token = localStorage.getItem("authToken");

        const response = await axios.post(`${process.env.REACT_APP_BASE_URL_Buyer}/delivery_address`, newAddress, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }); // Send address to the API
        setAddresses([...addresses, response.data]); // Add the new address to the list
        setNewAddress({
          door: "",
          address_name: "",
          name: "",
          building: "",
          street: "",
          locality: "",
          ward: "",
          city: "",
          state: "",
          country: "",
          areaCode: "",
         
        }); // Clear input fields
        setIsModalOpen(false); // Close modal after adding address
      } catch (error) {
        console.error("Error adding address:", error);
      }
    }
  };

  // Delete an address
  const deleteAddress = async (id) => {
    try {
      await axios.delete(`/v1/delete_delivery_address/${id}`); // Send delete request to API
      setAddresses(addresses.filter(address => address.id !== id)); // Remove address from list
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <AddressPageContainer>
      <Heading>Manage Addresses</Heading>
      <Button onClick={() => setIsModalOpen(true)}>Add Address</Button>

      {/* Modal for adding new address */}
      <Modal isOpen={isModalOpen}>
        <ModalContent>
          <h3>Add New Address</h3>
          <AddressForm>
            <Input
              type="text"
              name="door"
              placeholder="Enter door number"
              value={newAddress.door}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="address_name"
              placeholder="Enter address name"
              value={newAddress.address_name}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="name"
              placeholder="Enter name"
              value={newAddress.name}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="building"
              placeholder="Enter building name"
              value={newAddress.building}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="street"
              placeholder="Enter street name"
              value={newAddress.street}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="locality"
              placeholder="Enter locality"
              value={newAddress.locality}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="ward"
              placeholder="Enter ward"
              value={newAddress.ward}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="city"
              placeholder="Enter city"
              value={newAddress.city}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="state"
              placeholder="Enter state"
              value={newAddress.state}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="country"
              placeholder="Enter country"
              value={newAddress.country}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="areaCode"
              placeholder="Enter area code"
              value={newAddress.areaCode}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="tag"
              placeholder="Enter tag"
              value={newAddress.tag}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="lat"
              placeholder="Enter latitude"
              value={newAddress.lat}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="lng"
              placeholder="Enter longitude"
              value={newAddress.lng}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="gps"
              placeholder="Enter GPS coordinates (lat,lng)"
              value={newAddress.gps}
              onChange={handleInputChange}
            />
            <Button onClick={addAddress}>Add Address</Button>
            <ModalCloseButton onClick={() => setIsModalOpen(false)}>Close</ModalCloseButton>
          </AddressForm>
        </ModalContent>
      </Modal>

      <AddressList>
        {addresses.map((address) => (
          <AddressCard key={address.id}>
            <div>
              <h4>{address.name}</h4>
              <p>{address.address_name}, {address.street}, {address.city}, {address.state}, {address.country}</p>
              <p>{address.gps}</p>
            </div>
            <Button onClick={() => deleteAddress(address.id)}>Delete</Button>
          </AddressCard>
        ))}
      </AddressList>
    </AddressPageContainer>
  );
};

export default AddressPage;
