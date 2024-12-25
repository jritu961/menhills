import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

import axios from "axios";

const ItemDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [isInWishlist, setIsInWishlist] = useState(false); // State for wishlist
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(''); // Color state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL_Seller}/products/${id}`);
        console.log("Fetched Product:", result.data.product);
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

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleImageClick = (image) => {
    setMainImage(image); // Set the clicked image as the main image
  };

  const handleWishlistToggle = () => {
    setIsInWishlist(!isInWishlist); // Toggle the wishlist status
  };

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
          {product.sizes?.length > 0 && (
            <>
              <SectionTitle>Select Size (UK Size)</SectionTitle>
              <SizeSelect
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    Size {size}
                  </option>
                ))}
              </SizeSelect>
            </>
          )}

          {/* Color Selection */}
          {product.colors?.length > 0 && (
            <>
              <SectionTitle>Select Color</SectionTitle>
              <ColorSelect
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                {product.colors.map((color, index) => (
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

          {/* Stock Status */}
          <StockStatus>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</StockStatus>

          {/* Add to Bag Button */}
          <Button>Add to Bag</Button>

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
