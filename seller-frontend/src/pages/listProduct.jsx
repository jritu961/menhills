import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {useNavigate} from "react-router-dom"
// Styled Components
const PageWrapper = styled.div`
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #333;
  color: white;
  padding: 1rem 2rem;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductName = styled.h2`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  color: #333;
  margin: 5px 0;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px 0;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const PageButton = styled.button`
  background-color: ${(props) => (props.active ? "#007bff" : "#f4f4f4")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: 1px solid #ccc;
  padding: 10px 15px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #007bff;
    color: white;
  }
`;



const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const navigate = useNavigate();

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL_Seller}/products`
        );
        setProducts(result.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <PageWrapper>
      <Header>
        <Title>Men's Wear Collection</Title>
      </Header>
      <ProductGrid>
        {currentProducts.map((product) => (
          <ProductCard
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)} // Navigate to ProductEditPage
          >
            <ProductImage src={product.images} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price}</ProductPrice>
            <Button>Edit Details</Button>
          </ProductCard>
        ))}
      </ProductGrid>
      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
    </PageWrapper>
  );
};

export default ProductListingPage;


