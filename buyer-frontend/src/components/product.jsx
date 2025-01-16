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
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useMyContext(); // Get category from context

  const handleClick = (productId) => {
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
        const categoryQuery = category ? `?category=${category}` : '';
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL_Seller}/products${categoryQuery}`
        );
        setProducts(result.data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]); // Re-fetch products when category changes

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
        if (!product) return null;

        const imageSrc = product.images?.[0] || "placeholder.jpg"; // Fallback image
        const name = product.name || "Unnamed Product";
        const price = product.price ? `₹${product.price}` : "Price Unavailable";
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
          </ProductCard>
        );
      })}
    </ProductContainer>
  );
};

export default ProductSection;


