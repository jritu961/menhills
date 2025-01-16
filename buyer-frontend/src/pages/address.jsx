import React, { useState, useEffect,useContext } from "react";
import styled from "styled-components";
import axios from "axios";
// import { useMyContext } from "../context/categoryContext";
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
  const [selectedAddress, setSelectedAddress] = useState(null)
  // const { setAddress } = useMyContext(); 

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
  const token=localStorage.getItem("authToken")

  // Fetch addresses on component mount
  useEffect(() => {
    const fetchAddresses = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL_Buyer}/delivery_address`, {
          headers: { authorization: `Bearer ${token}` }
        });

        setAddresses(response.data); // Assuming the API returns an array of addresses
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    // setAddress(address)
  };

  // Add a new address
  const addAddress = async () => {
    if (newAddress.name && newAddress.city && newAddress.street) {

      const addressPayload = {
        userId: "6773abd980b28ae234a19894", 
        id: newAddress.id || "cc5e5a54-7515-4472-8ea7-cc807074763d",
        descriptor: {
          name: newAddress.name,
          phone: newAddress.phone || "",
          email: newAddress.email || "",
          code: newAddress.code || "",
          shortDesc: newAddress.shortDesc || "",
          longDesc: newAddress.longDesc || "",
          images: newAddress.images || [],
          audio: newAddress.audio || "",
          "3d_render": newAddress["3d_render"] || ""
        },
        gps: newAddress.gps,
        defaultAddress: false,
        address: {
          door: newAddress.door,
          address_name: newAddress.address_name,
          name: newAddress.name,
          building: newAddress.building,
          street: newAddress.street,
          locality: newAddress.locality,
          ward: newAddress.ward,
          city: newAddress.city,
          state: newAddress.state,
          country: newAddress.country,
          areaCode: newAddress.areaCode,
          tag: newAddress.tag,
          lat: newAddress.lat,
          lng: newAddress.lng
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0
      };

      try {
        const token = localStorage.getItem("authToken");

        const response = await axios.post(`${process.env.REACT_APP_BASE_URL_Buyer}/delivery_address`, addressPayload, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });

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
          tag: "",
          lat: "",
          lng: "",
          gps: ""
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
    const result = await axios.delete(`${process.env.REACT_APP_BASE_URL_Buyer}/delete_delivery_address/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }); // Send delete request to API

    if (result.status === 200) {
      // Ensure the address is removed from the state right after successful deletion
      setAddresses((prevAddresses) => prevAddresses.filter(address => address._id !== id)); // Filter out the deleted address
    }
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
          {/* <h3>Add New Address</h3> */}
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
              name="email"
              placeholder="Enter Email Address"
              value={newAddress.email}
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
              type="number"
              name="phone"
              placeholder="Enter Phone Number"
              value={newAddress.phone}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="gps"
              placeholder="Enter GPS coordinates"
              value={newAddress.gps}
              onChange={handleInputChange}
            />
            <div>
            <Button onClick={addAddress}>Add Address</Button>
            <ModalCloseButton onClick={() => setIsModalOpen(false)}>Close</ModalCloseButton>
            </div>
           
          </AddressForm>
        </ModalContent>
      </Modal>

      {/* <AddressList>
      {addresses.map((address) => (
  <AddressCard key={address._id}>
    <div>
      <h4>{address.address.address_name}</h4>
      <p>{address.address.name}</p>
      <p>{address.address.street}, {address.address.city}, {address.address.state}</p>
      <p>{address.address.areaCode}</p>
    </div>
    <Button onClick={() => deleteAddress(address._id)}>Delete</Button>
  </AddressCard>
))}


      </AddressList> */}
      <AddressList>
      {addresses.map((address) => (
        <AddressCard key={address._id}>
          <div>
            <h4>{address.address.address_name}</h4>
            <p>{address.address.name}</p>
            <p>
              {address.address.street}, {address.address.city},{" "}
              {address.address.state}
            </p>
            <p>{address.address.areaCode}</p>
          </div>
          <div>
            <input
              type="radio"
              name="selectedAddress"
              checked={selectedAddress?._id === address._id}
              onChange={() => handleSelectAddress(address)}
            />
            <Button onClick={() => deleteAddress(address._id)}>Delete</Button>
          </div>
        </AddressCard>
      ))}
    </AddressList>

      {selectedAddress && (
        <div>
          <Heading>Selected Address</Heading>
          <p>
            {selectedAddress.address.street}, {selectedAddress.address.city},{" "}
            {selectedAddress.address.state}, {selectedAddress.address.areaCode}
          </p>
        </div>
      )}
    </AddressPageContainer>
  );
};

export default AddressPage;
