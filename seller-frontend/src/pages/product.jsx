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
    brand: '',
    discount: '',
    material: '',
    images: [],
    sale: false,
    salePrice: '',
    sizes: [],
    fit: '',
    colors: [],
    stock: '',
    weight: '',
    dimensions: '',
    shippingWeight: '',
    shippingDuration: '',
    ratings: { averageRating: 0, totalReviews: 0 },
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
    formData.append('brand', product.brand);
    formData.append('discount', product.discount);
    formData.append('material', product.material);
    formData.append('sale', product.sale);
    formData.append('salePrice', product.salePrice);
    formData.append('sizes', product.sizes);
    formData.append('fit', product.fit);
    formData.append('colors', product.colors);
    formData.append('stock', product.stock);
    formData.append('weight', product.weight);
    formData.append('dimensions', product.dimensions);
    formData.append('shippingWeight', product.shippingWeight);
    formData.append('shippingDuration', product.shippingDuration);
    formData.append('ratings', JSON.stringify(product.ratings));

    product.images.forEach(image => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL_Seller}/products`, formData, {
        headers: {
          "Content-Type": 'multipart/form-data',
        },
      });
      alert('Product added successfully!');
      setProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        brand: '',
        discount: '',
        material: '',
        images: [],
        sale: false,
        salePrice: '',
        sizes: [],
        fit: '',
        colors: [],
        stock: '',
        weight: '',
        dimensions: '',
        shippingWeight: '',
        shippingDuration: '',
        ratings: { averageRating: 0, totalReviews: 0 },
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert('Failed to add product!');
    }
  };

  return (
    <AddProductContainer>
      <Form onSubmit={handleAddProduct}>
        <Title>Add New Product</Title>
        {/* Basic Product Fields */}
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
          <Label>Brand</Label>
          <Input
            type="text"
            name="brand"
            placeholder="Enter product brand"
            value={product.brand}
            onChange={handleChange}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Discount</Label>
          <Input
            type="number"
            name="discount"
            placeholder="Enter product discount"
            value={product.discount}
            onChange={handleChange}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Material</Label>
          <Input
            type="text"
            name="material"
            placeholder="Enter product material"
            value={product.material}
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
        {/* New Fields for Sizes, Fit, Colors */}
        <FieldGroup>
          <Label>Sizes</Label>
          <Input
            type="text"
            name="sizes"
            placeholder="Enter available sizes (comma separated)"
            value={product.sizes.join(', ')}
            onChange={(e) => handleChange({
              target: { name: 'sizes', value: e.target.value.split(',').map(size => size.trim()) },
            })}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Fit</Label>
          <Select
            name="fit"
            value={product.fit}
            onChange={handleChange}
          >
            <option value="">Select Fit</option>
            <option value="Slim">Slim</option>
            <option value="Regular">Regular</option>
            <option value="Loose">Loose</option>
          </Select>
        </FieldGroup>
        <FieldGroup>
          <Label>Colors</Label>
          <Input
            type="text"
            name="colors"
            placeholder="Enter available colors (comma separated)"
            value={product.colors.join(', ')}
            onChange={(e) => handleChange({
              target: { name: 'colors', value: e.target.value.split(',').map(color => color.trim()) },
            })}
          />
        </FieldGroup>
        {/* Other fields */}
        <FieldGroup>
          <Label>Stock</Label>
          <Input
            type="number"
            name="stock"
            placeholder="Enter stock quantity"
            value={product.stock}
            onChange={handleChange}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Weight (kg)</Label>
          <Input
            type="number"
            name="weight"
            placeholder="Enter weight"
            value={product.weight}
            onChange={handleChange}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Dimensions (cm)</Label>
          <Input
            type="text"
            name="dimensions"
            placeholder="Enter dimensions (LxWxH)"
            value={product.dimensions}
            onChange={handleChange}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Shipping Weight (kg)</Label>
          <Input
            type="number"
            name="shippingWeight"
            placeholder="Enter shipping weight"
            value={product.shippingWeight}
            onChange={handleChange}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Shipping Duration</Label>
          <Input
            type="text"
            name="shippingDuration"
            placeholder="Enter shipping duration"
            value={product.shippingDuration}
            onChange={handleChange}
          />
        </FieldGroup>
        {/* Image Upload */}
        <FieldGroup>
          <Label>Upload Product Images *</Label>
          <FileUpload>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
          </FileUpload>
        </FieldGroup>
        {/* Submit Button */}
        <Button type="submit">Add Product</Button>
      </Form>
    </AddProductContainer>
  );
};

export default AddProduct;
