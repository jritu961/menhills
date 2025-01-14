import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ProductContainer,
  ProductCard,
  ProductImage,
  ProductName,
  ProductPrice,
  SizeSelect,
} from "../styles/product"; // Ensure you have styles for these components
import axios from "axios";
import { useMyContext } from "../context/categoryContext";

const ProductSection = () => {
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [products, setProducts] = useState([]); // State to hold the fetched products
  const [selectedSize, setSelectedSize] = useState({}); // State to track selected sizes for each product
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const { category } = useMyContext();

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
      setLoading(true);
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL_Seller}/products`
        );
        console.log("Fetched products:", result.data.products);
        setProducts(result.data.products || []); // Fallback to an empty array
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]); // Re-fetch products if the category changes

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (products.length === 0) {
    return <p>No products available at the moment.</p>;
  }

  return (
    <ProductContainer>
      {products.slice(0, 20).map((product, index) => {
        // Safeguard against null or undefined product
        if (!product) return null;

        const imageSrc = product.images?.[0] || "placeholder.jpg"; // Fallback image
        const name = product.name || "Unnamed Product";
        const price = product.price ? `$${product.price}` : "Price Unavailable";
        const sizes = product.sizes || [];

        return (
          <ProductCard key={product._id || index}>
            <ProductImage
              src={imageSrc}
              alt={name}
              onClick={() => handleClick(product._id)}
            />
            <ProductName>{name}</ProductName>
            <ProductPrice>{price}</ProductPrice>

            {/* Size dropdown */}
            {sizes.length > 0 && (
              <SizeSelect
                value={selectedSize[product._id] || ""}
                onChange={(e) => handleSizeChange(product._id, e.target.value)}
              >
                <option value="" disabled>
                  Select Size
                </option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </SizeSelect>
            )}
          </ProductCard>
        );
      })}
    </ProductContainer>
  );
};

export default ProductSection;
