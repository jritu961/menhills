import React, { useState } from 'react';
import styled from 'styled-components';

const AddProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Form = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`;

const Title = styled.h3`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    brand: '',
    category: '',
    price: '',
    discount: 0,
    sizes: '',
    fit: '',
    colors: '',
    material: '',
    careInstructions: '',
    stock: '',
    available: true,
    weight: '',
    dimensions: '',
    shippingWeight: '',
    shippingDuration: '',
    images: '',
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

  const handleAddProduct = () => {
    console.log('Product Details:', product);
    alert('Product added successfully!');
    setProduct({
      name: '',
      description: '',
      brand: '',
      category: '',
      price: '',
      discount: 0,
      sizes: '',
      fit: '',
      colors: '',
      material: '',
      careInstructions: '',
      stock: '',
      available: true,
      weight: '',
      dimensions: '',
      shippingWeight: '',
      shippingDuration: '',
      images: '',
      sale: false,
      salePrice: '',
    });
  };

  return (
    <AddProductContainer>
      <Form>
        <Title>Add New Product</Title>
        <Input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
        />
        <Textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="brand"
          placeholder="Brand"
          value={product.brand}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="discount"
          placeholder="Discount (%)"
          value={product.discount}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="sizes"
          placeholder="Sizes (comma-separated)"
          value={product.sizes}
          onChange={handleChange}
        />
        <Select name="fit" value={product.fit} onChange={handleChange}>
          <option value="">Select Fit</option>
          <option value="Slim">Slim</option>
          <option value="Regular">Regular</option>
          <option value="Loose">Loose</option>
        </Select>
        <Input
          type="text"
          name="colors"
          placeholder="Colors (comma-separated)"
          value={product.colors}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="material"
          placeholder="Material"
          value={product.material}
          onChange={handleChange}
        />
        <Textarea
          name="careInstructions"
          placeholder="Care Instructions"
          value={product.careInstructions}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="weight"
          placeholder="Weight"
          value={product.weight}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="dimensions"
          placeholder="Dimensions"
          value={product.dimensions}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="shippingWeight"
          placeholder="Shipping Weight"
          value={product.shippingWeight}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="shippingDuration"
          placeholder="Shipping Duration"
          value={product.shippingDuration}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="images"
          placeholder="Image URLs (comma-separated)"
          value={product.images}
          onChange={handleChange}
        />
        <label>
          <input
            type="checkbox"
            name="sale"
            checked={product.sale}
            onChange={handleChange}
          />
          On Sale
        </label>
        {product.sale && (
          <Input
            type="number"
            name="salePrice"
            placeholder="Sale Price"
            value={product.salePrice}
            onChange={handleChange}
          />
        )}
        <Button onClick={handleAddProduct}>Add Product</Button>
      </Form>
    </AddProductContainer>
  );
};

export default AddProduct;
