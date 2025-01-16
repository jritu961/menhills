import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from "../components/header";
import { NavbarComponentData } from "../components/navbarContent";
import { NavbarComponent } from "../components/navbar";
import {
  Container,
  ImageSection,
  ProductImage,
  ThumbnailSection,
  Thumbnail,
  DetailsSection,
  Title,
  Price,
  MRP,
  Discount,
  Ratings,
  SizeSelect,
  ColorSelect, // New color select
  Button,
  SectionTitle,
  Offer,
  Description,
  WishlistButton, // New button styling
  StockStatus, // New stock status section
  FitSelect, // New fit selection
  ShippingDetails, // New shipping section
} from '../styles/itemDetails'; // Importing styled components
import checkUserLoginStatus from "../helper/loggedin.js"
import { getOrCreateDeviceId } from "../helper/device.js";   

import axios from "axios";

const ItemDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [isInWishlist, setIsInWishlist] = useState(false); // State for wishlist
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(''); // Color state
  const [quantity, setQuantity] = useState(1); // New state for quantity
  let cartData
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL_Seller}/products/${id}`);
        setProduct(result.data.product);

        if (result.data.product.images?.length) {
          setMainImage(result.data.product.images[0]); // Set the first image as the default main image
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
  
    if (!selectedColor) {
      alert("Please select a color.");
      return;
    }
  
     cartData = {
      item_id: product._id,
      size: selectedSize,
      color: selectedColor,
      count: quantity,
      images:product.images[0],
      name:product.name,
      email:product.email,
      price:product.price
    };
  
    try {
      const deviceId=await getOrCreateDeviceId()
      const userId=checkUserLoginStatus()
      console.log("cartData>>>>>>>>>>",cartData)
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL_Buyer}/cart/${userId}/${deviceId}`, cartData);
      if (response.status === 201 || response.status === 200) {
        // let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
        // Check if the item already exists in the cart
        // const itemIndex = cart.findIndex((item) => item.item_id === cartData.item_id);
  
        // if (itemIndex !== -1) {
        //   // Update the existing item
        //   cart[itemIndex] = { ...cart[itemIndex], ...cartData };
        //   alert("Item updated in the cart successfully!");
        // } else {
        //   // Add new item to the cart
        //   cart.push(cartData);
        //   alert("Item added to cart successfully!");
        // }
  
        // // Save the updated cart to localStorage
        // localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        alert("Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("There was an issue adding the item to the cart.");
    }
  };
  
  
  if (!product) {
    return <div>Loading...</div>;
  }

  const handleImageClick = (image) => {
    setMainImage(image); // Set the clicked image as the main image
  };
 const token=localStorage.getItem("authToken")

  const handleWishlistToggle = async() => {
    const userId=  checkUserLoginStatus()
    const cartData = {
    item_id: product._id,
    size: selectedSize,
    color: selectedColor,
    count: quantity,
    images: product.images[0],
    name: product.name,
    email: product.email,
    price: product.price,
  };

   console.log("cartData112",cartData)
   const deviceId=await getOrCreateDeviceId()

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL_Buyer}/wishlist/${userId}/${deviceId}`,
      cartData, // Pass the data (cartData) as the second argument
      {
        headers: {
          authorization: `Bearer ${token}`, // Headers should be inside a `headers` object
        },
      }
    );
  }
    

  const sizesArray = product?.sizes?.[0]?.split(',') || [];  // Fallback to an empty array if undefined
  const colorsArray = product?.colors?.[0]?.split(',') || [];  // Fallback to an empty array if undefined


  return (
    <div>
      <Header />
      <NavbarComponent />
      <NavbarComponentData />

      <Container>
        {/* Image Section */}
        <ImageSection>
          <ProductImage src={mainImage} alt={product.name} />
          <ThumbnailSection>
            {product.images?.map((image, index) => {
              const imageUrl = image
              return (
                <Thumbnail
                  key={index}
                  src={imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleImageClick(imageUrl)} // Pass the imageUrl to handleImageClick
                />
              );
            })}
          </ThumbnailSection>
        </ImageSection>

        {/* Details Section */}
        <DetailsSection>
          {/* Title and Price */}
          <Title>{product.name}</Title>
          <Price>
            ₹{product.price} <MRP>₹{product.mrp}</MRP> <Discount>{product.discount}% Off</Discount>
          </Price>
          <Ratings>
            {product.brand}
          </Ratings>

          {/* Ratings */}
          <Ratings>
            {product.ratings} | {product.ratingsCount} Ratings
          </Ratings>

          {/* Size Selection */}
          {sizesArray?.length > 0 && (
            <>
              <SectionTitle>Select Size (UK Size)</SectionTitle>
              <SizeSelect
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="">Select Size</option> {/* Default empty option */}
                {sizesArray.map((size, index) => (
                  <option key={index} value={size}>
                    Size {size}
                  </option>
                ))}
              </SizeSelect>
            </>
          )}

          {/* Color Selection */}
          {colorsArray?.length > 0 && (
            <>
              <SectionTitle>Select Color</SectionTitle>
              <ColorSelect
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option value="">Select Color</option> {/* Default empty option */}
                {colorsArray.map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
              </ColorSelect>
            </>
          )}

          {/* Fit Selection */}
          {product.fit && (
            <>
              <SectionTitle>Fit</SectionTitle>
              <FitSelect>
                <option value="">{product.fit}</option>
              </FitSelect>
            </>
          )}
          <SectionTitle>Quantity</SectionTitle>
          <SizeSelect
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </SizeSelect>
          {/* Stock Status */}
          <StockStatus>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</StockStatus>

          {/* Add to Bag Button */}
          <Button onClick={handleAddToCart}>Add to Cart</Button>

          {/* Add to Wishlist Button */}
          <WishlistButton onClick={handleWishlistToggle}>
            {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </WishlistButton>

          {/* Buy Now Button */}
          <Button>Buy Now</Button>

          {/* Offers */}
          <SectionTitle>Best Offers</SectionTitle>
          {product.offers?.map((offer, index) => (
            <Offer key={index}>{offer}</Offer>
          ))}

          {/* Shipping Details */}
          <ShippingDetails>
            {product.shippingDuration && <p>Shipping Duration: {product.shippingDuration}</p>}
            {product.shippingWeight && <p>Shipping Weight: {product.shippingWeight} kg</p>}
          </ShippingDetails>

          {/* Warranty */}
          {product.warranty && (
            <>
              <SectionTitle>Warranty</SectionTitle>
              <p>{product.warranty}</p>
            </>
          )}

          {/* Product Description */}
          <SectionTitle>Product Details</SectionTitle>
          <Description>{product.description}</Description>
        </DetailsSection>
      </Container>
    </div>
  );
};

export default ItemDetails;
