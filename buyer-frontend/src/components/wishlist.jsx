import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaTrashAlt, FaHeart } from "react-icons/fa";
import checkUserLoginStatus from "../helper/loggedin.js";
import { getOrCreateDeviceId } from "../helper/device";
import Sidebar from "./sideBar.jsx";
import axios from "axios";

const WishlistContainer = styled.div`
  padding: 20px 40px;
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: "Arial", sans-serif;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-top:100px;
  color: #111;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
`;

const WishlistGrid = styled.div`
  display: flex;
  justify-content:center;
  margin-left:150px;
  gap: 20px;
  @media screen and (max-width: 785px) {
    margin-left: 0px;
  }
`;

const WishlistItem = styled.div`
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ImageContainer = styled.div`
  max-height: 400px;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {

    max-width: 100%;
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
  color: #222;
  margin: 0;
`;

const ItemPrice = styled.span`
  font-size: 16px;
  color: #444;
  font-weight: bold;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const Button = styled.button`
  font-size: 14px;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &.remove {
    background-color: #444;
    color: white;

    &:hover {
      background-color: #222;
    }
  }

  &.move-to-cart {
    background-color: #000;
    color: white;

    &:hover {
      background-color: #444;
    }
  }
`;

const EmptyWishlist = styled.div`
  text-align: center;
  margin-top: 100px;

  h2 {
    font-size: 24px;
    color: #777;
  }
`;

const Wishlist = () => {
  const [wishlistItems, setWishlistItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let result;

  const fetchCartItems = async () => {
    try {
      const userId = checkUserLoginStatus();
      const deviceId = await getOrCreateDeviceId();

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL_Buyer}/wishlist/${userId}/${deviceId}`
      );
      result = response.data.data;
      setWishlistItem(Array.isArray(response.data.data) ? response.data.data : []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemove = async (id) => {
    const userId = checkUserLoginStatus();
    let deviceId = await getOrCreateDeviceId();

    await axios.delete(
      `${process.env.REACT_APP_BASE_URL_Buyer}/item/wishlist/${userId}/${deviceId}/${id}`
    );
    fetchCartItems();
  };

  const handleMoveToCart = async (id) => {
    const result = await axios.get(`${process.env.REACT_APP_BASE_URL_Seller}/products/${id}`);
    const resultData = result.data.product;
    const userId = checkUserLoginStatus();
    let deviceId = await getOrCreateDeviceId();

    await axios.post(`${process.env.REACT_APP_BASE_URL_Buyer}/cart/${userId}/${deviceId}`, resultData);
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL_Buyer}/item/wishlist/${userId}/${deviceId}/${id}`
    );
    fetchCartItems();
  };

  return (<>
   <Sidebar/>
   <WishlistContainer>
      <Title>My Wishlist</Title>
      {wishlistItems.length > 0 ? (
        <WishlistGrid>
          {wishlistItems.map((item) => (
            <WishlistItem key={item.item.item_id}>
              <ImageContainer>
                <img src={item.item.images} alt={item.item.name} />
              </ImageContainer>
              <ItemInfo>
                <ItemName>{item.item.name}</ItemName>
                <ItemPrice>{item.item.price}</ItemPrice>
                <ItemPrice>{item.item.color}</ItemPrice>
                <ItemPrice>{item.item.size}</ItemPrice>

                <ActionButtons>
                  <Button
                    className="remove"
                    onClick={() => handleRemove(item.item.item_id)}
                  >
                    <FaTrashAlt />
                    Remove
                  </Button>
                  <Button
                    className="move-to-cart"
                    onClick={() => handleMoveToCart(item.item.item_id)}
                  >
                    <FaHeart />
                    Move to Cart
                  </Button>
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
  </>
    
  );
};

export default Wishlist;
