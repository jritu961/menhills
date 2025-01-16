// MensWearPage.js
import React, { useState, useEffect } from 'react';
import { MensWearContainer, PageTitle, ProductGrid, ProductCard } from '../styles/menswear';
import { Header } from "../components/header";
import { NavbarComponent } from "../components/navbar";
import { useNavigate } from 'react-router-dom';
import { Footer } from "../components/footer";
import axios from "axios";

const MensWearPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // Initialize state as an empty array

  const handleClick = (productId) => {
    console.log("productId",productId)
    // Redirect to the item details page with the product id
    navigate(`/item-details/${productId}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("🚀 Fetching Products:", process.env.REACT_APP_BASE_URL_Seller);
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL_Seller}/products`);
        console.log("Fetched Products:", result.data.products);
        setProducts(result.data.products); // Update the state with the fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <MensWearContainer>
      <Header />
      <NavbarComponent />
      <PageTitle>Men's Wear Collection</PageTitle>
      <ProductGrid>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} onClick={() => handleClick(product._id)}>
              <img src={product.images[0]} alt={product.name} />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </ProductCard>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </ProductGrid>
      <Footer />
    </MensWearContainer>
  );
};

export default MensWearPage;
