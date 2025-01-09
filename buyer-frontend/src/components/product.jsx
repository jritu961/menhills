import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom v6
import {
  ProductContainer,
  ProductCard,
  ProductImage,
  ProductName,
  ProductPrice,
  SizeSelect,
} from "../styles/product"; // Ensure you have styles for SizeSelect
import axios from "axios";

const ProductSection = () => {
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [products, setProducts] = useState([]); // State to hold the fetched products
  const [selectedSize, setSelectedSize] = useState({}); // State to track selected sizes for each product

  const handleClick = (productId) => {
    // Redirect to the item details page with the product id
    navigate(`/item-details/${productId}`);
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSize((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL_Seller}/products`
        );
        setProducts(result.data.products); // Update the state with the fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run once when component mounts

  return (
    <ProductContainer>
      {products.slice(0, 20).map((product) => {
        const imageSrc = product.images[0]; // Build the image URL
        return (
          <ProductCard key={product._id}>
            <ProductImage
              src={imageSrc}
              alt={product.name}
              onClick={() => handleClick(product._id)} // Trigger redirect on image click
            />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price}</ProductPrice>

            {/* Size dropdown */}
            <SizeSelect
              value={selectedSize[product._id] || ""}
              onChange={(e) => handleSizeChange(product._id, e.target.value)}
            >
              <option value="" disabled>
                Select Size
              </option>
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </SizeSelect>
          </ProductCard>
        );
      })}
    </ProductContainer>
  );
};

export default ProductSection;
