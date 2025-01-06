import React from "react";
import styled from "styled-components";
import { FaTrashAlt, FaHeart } from "react-icons/fa";


const WishlistContainer = styled.div`
  padding: 20px 40px;
  min-height: 100vh;
  background-color: #fffaf3;
  font-family: "Arial", sans-serif;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
`;

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const WishlistItem = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  height: 200px;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    max-width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    ${WishlistItem}:hover & {
      transform: scale(1.1);
    }
  }
`;

const ItemInfo = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ItemName = styled.h2`
  font-size: 18px;
  color: #333;
  margin: 0;
`;

const ItemPrice = styled.span`
  font-size: 16px;
  color: #f4a261;
  font-weight: bold;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const RemoveButton = styled.button`
  background-color: #e76f51;
  color: white;
  font-size: 14px;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #d35400;
  }
`;

const MoveToCartButton = styled.button`
  background-color: #264653;
  color: white;
  font-size: 14px;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #2a9d8f;
  }
`;

const EmptyWishlist = styled.div`
  text-align: center;
  margin-top: 100px;

  h2 {
    font-size: 24px;
    color: #aaa;
  }
`;

const Wishlist = () => {
  const wishlistItems = [
    {
      id: 1,
      name: "Men's Casual Shirt",
      price: "$49.99",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "Men's Leather Jacket",
      price: "$129.99",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      name: "Men's Sports Shoes",
      price: "$89.99",
      image: "https://via.placeholder.com/300",
    },
  ];

  const handleRemove = (id) => {
    console.log("Remove item with ID:", id);
  };

  const handleMoveToCart = (id) => {
    console.log("Move item with ID to cart:", id);
  };

  return (
    <WishlistContainer>
      <Title>My Wishlist</Title>
      {wishlistItems.length > 0 ? (
        <WishlistGrid>
          {wishlistItems.map((item) => (
            <WishlistItem key={item.id}>
              <ImageContainer>
                <img src={item.image} alt={item.name} />
              </ImageContainer>
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{item.price}</ItemPrice>
                <ActionButtons>
                  <RemoveButton onClick={() => handleRemove(item.id)}>
                    <FaTrashAlt />
                    Remove
                  </RemoveButton>
                  <MoveToCartButton onClick={() => handleMoveToCart(item.id)}>
                    <FaHeart />
                    Move to Cart
                  </MoveToCartButton>
                </ActionButtons>
              </ItemInfo>
            </WishlistItem>
          ))}
        </WishlistGrid>
      ) : (
        <EmptyWishlist>
          <h2>Your wishlist is empty!</h2>
        </EmptyWishlist>
      )}
    </WishlistContainer>
  );
};

export default Wishlist;
