import React, { useEffect,useState } from "react";
import styled from "styled-components";
import { FaTrashAlt, FaHeart } from "react-icons/fa";
import checkUserLoginStatus from "../helper/loggedin.js"
import { getOrCreateDeviceId } from "../helper/device";
import axios from 'axios';


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
   const [wishlistItems, setWishlistItem] = useState([]);
    const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      let result
  const fetchCartItems = async () => {
    try {
      const userId = checkUserLoginStatus(); 
      const deviceId = await getOrCreateDeviceId(); 
  
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL_Buyer}/wishlist/${userId}/${deviceId}`);
      result=response.data.data
      console.log("response.data.data",result)
      setWishlistItem(Array.isArray(response.data.data) ? response.data.data : []);
      setLoading(false); 
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchCartItems()
  },[])
  const handleRemove =async (id) => {
    const userId= checkUserLoginStatus()
      let deviceId=await getOrCreateDeviceId()
   
    await axios.delete(`${process.env.REACT_APP_BASE_URL_Buyer}/item/wishlist/${userId}/${deviceId}/${id}`);
    fetchCartItems()  };

  const handleMoveToCart = async(id) => {
    console.log("id",id)
    const result = await axios.get(`${process.env.REACT_APP_BASE_URL_Seller}/products/${id}`);
    const resultData=result.data.product
    const userId= checkUserLoginStatus()
      let deviceId=await getOrCreateDeviceId()

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL_Buyer}/cart/${userId}/${deviceId}`, resultData);
      await axios.delete(`${process.env.REACT_APP_BASE_URL_Buyer}/item/wishlist/${userId}/${deviceId}/${id}`);
      fetchCartItems()
  };

  return (
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
                  <RemoveButton onClick={() => handleRemove(item.item.item_id)}>
                    <FaTrashAlt />
                    Remove
                  </RemoveButton>
                  <MoveToCartButton onClick={() => handleMoveToCart(item.item.item_id)}>
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
