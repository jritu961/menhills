import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
const AddProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f9fafb;
  min-height: 100vh;
`;

const Form = styled.form`
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
  font-size: 1.8rem;
  font-weight: bold;
`;

const FieldGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

const FileUpload = styled.div`
  border: 2px dashed #ccc;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  background-color: #f1f5f9;
  color: #555;
  cursor: pointer;

  &:hover {
    background-color: #e2e8f0;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    images: [],
    sale: false,
    salePrice: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProduct({
      ...product,
      images: files,
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.category || product.images.length === 0) {
      alert('Please fill all required fields and upload images.');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('sale', product.sale);
    formData.append('salePrice', product.salePrice);
  
    // Append images to the formData
    product.images.forEach(image => {
      formData.append('images', image); // 'images' is the key you want to use on the backend
    });
  
    try {
      console.log("🚀 ~ handleAddProduct ~ process.env.REACT_APP_BASE_URL_Seller:", process.env)

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL_Seller}/products`, formData, {
        headers: {
          "Content-Type": 'multipart/form-data',
        },
      });
      console.log("🚀 ~ handleAddProduct ~ response:", response);
  
      alert('Product added successfully!');
      setProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        images: [],
        sale: false,
        salePrice: '',
      });
    } catch (error) {
      console.error("🚀 ~ handleAddProduct ~ error:", error);
      alert('Failed to add product!');
    }
  };
  

  return (
    <AddProductContainer>
      <Form onSubmit={handleAddProduct}>
        <Title>Add New Product</Title>
        <FieldGroup>
          <Label>Product Name *</Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={product.name}
            onChange={handleChange}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Description</Label>
          <Textarea
            name="description"
            placeholder="Enter product description"
            value={product.description}
            onChange={handleChange}
            rows="4"
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Price *</Label>
          <Input
            type="number"
            name="price"
            placeholder="Enter price"
            value={product.price}
            onChange={handleChange}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Category *</Label>
          <Input
            type="text"
            name="category"
            placeholder="Enter category"
            value={product.category}
            onChange={handleChange}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Upload Images *</Label>
          <FileUpload>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="file-input"
            />
            <label htmlFor="file-input">Click to upload or drag images here</label>
          </FileUpload>
        </FieldGroup>
        <CheckboxGroup>
          <input
            type="checkbox"
            name="sale"
            checked={product.sale}
            onChange={handleChange}
          />
          <Label>On Sale</Label>
        </CheckboxGroup>
        {product.sale && (
          <FieldGroup>
            <Label>Sale Price</Label>
            <Input
              type="number"
              name="salePrice"
              placeholder="Enter sale price"
              value={product.salePrice}
              onChange={handleChange}
            />
          </FieldGroup>
        )}
        <Button type="submit">Add Product</Button>
      </Form>
    </AddProductContainer>
  );
};

export default AddProduct;
