import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom v6
import { ProductContainer, ProductCard, ProductImage, ProductName, ProductPrice } from '../styles/product';
import axios from "axios";

const ProductSection = () => {
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [products, setProducts] = useState([]); // State to hold the fetched products

  const handleClick = (productId) => {
    // Redirect to the item details page with the product id
    navigate(`/item-details/${productId}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("🚀 ~ fetchProducts ~ process.env.REACT_APP_BASE_URL_Seller:", process.env.REACT_APP_BASE_URL_Seller);
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL_Seller}/products`);
        console.log("Fetched Products:", result.data.products);
        setProducts(result.data.products); // Update the state with the fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run once when component mounts

  return (
    <ProductContainer>
      {products.slice(0, 20).map((product) => {  // Limit to first 20 products
        const imageSrc = `${process.env.REACT_APP_BASE_Seller}/${product.images[0]}`; // Build the image URL
        console.log("Image Source URL:", imageSrc); // Log the image source URL
        return (
          <ProductCard key={product.id}>
            <ProductImage
              src={imageSrc}
              alt={product.name}
              onClick={() => handleClick(product._id)} // Trigger redirect on image click
            />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price}</ProductPrice>
          </ProductCard>
        );
      })}
    </ProductContainer>
  );
};

export default ProductSection;
