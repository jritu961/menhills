import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh; /* Full viewport height */
  padding: 20px;
  background-color: #f4f7fc;
  position: relative; /* This is needed for absolute positioning inside it */
  border: 2px solid red;
`;

const CardContainer = styled.div`
  max-width: 600px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  position: absolute;
  left: 50%; /* Position at the center horizontally */
  transform: translate(-50%, -50%); /* Offset by half the width/height for exact centering */
  border: 2px solid green;

  @media (max-width: 768px) {
    width: 100%; /* Full width on mobile */
    position: relative;
    transform: none;
    left: auto;
  }
`;

const Title = styled.h4`
  font-weight: bold;
  color: #333;
  text-align: center;
`;

const ImagePreview = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const InputField = styled.input`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 12px;
  margin: 10px 0;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column; /* Stack buttons on mobile */
  justify-content: space-between;
  margin-top: 20px;
  
  @media (min-width: 768px) {
    flex-direction: row; /* Horizontal buttons on desktop */
  }
`;

const ButtonStyled = styled.button`
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${props => (props.primary ? "#1976d2" : "#d32f2f")};
  color: white;
  border: none;
  margin-bottom: 10px; /* Space between buttons on mobile */
  
  &:hover {
    background-color: ${props => (props.primary ? "#1565c0" : "#c62828")};
  }

  @media (min-width: 768px) {
    margin-bottom: 0; /* No margin between buttons on desktop */
  }
`;

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [newImage, setNewImage] = useState(null);

  // Fetch product details using the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL_Seller}/products/${id}`);
        setProduct(result.data.product);
        if (result.data.product.images?.length) {
          setMainImage(result.data.product.images[0]); // Set the first image as the default main image
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setMainImage(URL.createObjectURL(file)); // Update the preview
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    if (newImage) {
      formData.append("images", newImage); // Add the new image file to the request
    }

    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL_Seller}/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product details updated!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product details.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL_Seller}/products/${id}`);
      alert("Product deleted!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  if (!product) {
    return <Title>Loading product details...</Title>;
  }

  return (
    <Container>
        <Title>Edit Product Details</Title>
        {mainImage && (
          <ImagePreview>
            <Image
              src={mainImage}
              alt={product.name}
            />
          </ImagePreview>
        )}
        <InputField
          type="text"
          name="name"
          value={product.name || ""}
          onChange={handleInputChange}
          placeholder="Product Name"
        />
        <InputField
          type="number"
          name="price"
          value={product.price || ""}
          onChange={handleInputChange}
          placeholder="Price"
        />
        <InputField
          type="text"
          name="description"
          value={product.description || ""}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <ButtonStyled as="label" htmlFor="image-upload">
          Upload Image
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </ButtonStyled>
        <ButtonContainer>
          <ButtonStyled primary onClick={handleSave}>
            Save
          </ButtonStyled>
          <ButtonStyled onClick={handleDelete}>
            Delete
          </ButtonStyled>
        </ButtonContainer>
    </Container>
  );
};

export default ProductDetailPage;
