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
  Button,
  SectionTitle,
  Offer,
  Description,
  WishlistButton,  // New button styling
} from '../styles/itemDetails';  // Importing styled components
import shoes from "../assets/shoes.jpg";
import shoes2 from "../assets/shoes2.jpg";
import shoes3 from "../assets/shoes3.jpg";  // Added this image
import shoespose from "../assets/shoespose.jpg";  // Added this image

const ItemDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [isInWishlist, setIsInWishlist] = useState(false);  // State for wishlist

  useEffect(() => {
    const products = [
      {
        id: 1,
        name: 'HRX by Hrithik Roshan Unisex Back To School Shoes',
        price: '₹813',
        mrp: '₹3699',
        discount: '78% OFF',
        ratings: 4.2,
        ratingsCount: 540,
        images: [shoes, shoes2, shoespose],  // Multiple images
        description:
          'A pair of round toe black sneakers with regular styling, lace-ups detail, mesh upper, cushioned footbed, and textured outsole.',
        sizes: [3, 4, 5, 6, 7, 8, 9, 10, 11],
        offers: [
          'Best Price: Rs. 569. Applicable on: Orders above Rs. 198 (only on first purchase). Coupon code: SAVE30. 30% off up to Rs. 300.',
          '10% Discount on Axis Bank Credit Card. Min Spend ₹3500, Max Discount ₹1000.',
          '10% Discount on Kotak Credit and Debit Cards. Min Spend ₹3500, Max Discount ₹1000.',
          '10% Discount on SBI Debit Cards. Min Spend ₹3500, Max Discount ₹1000.',
        ],
        warranty: '1 Month Warranty provided by the brand/manufacturer.',
      },
      // Add other products similarly...
    ];

    const productData = products.find((product) => product.id === parseInt(id));

    if (productData) {
      setProduct(productData);
      setMainImage(productData.images[0]);  // Set the first image as the main image
    }
  }, [id]);

  useEffect(() => {
    console.log('Main Image:', mainImage);  // Debugging the main image state
  }, [mainImage]);  // Log the mainImage state whenever it changes

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleImageClick = (image) => {
    console.log('Clicked Image:', image);  // Log the clicked image to ensure it's the correct one
    setMainImage(image);  // Set the clicked image as the main image
  };

  const handleWishlistToggle = () => {
    setIsInWishlist(!isInWishlist);  // Toggle the wishlist status
  };

  return (
    <div>  
      <Header />
      <NavbarComponent />
      <NavbarComponentData />
      
      <Container>
        {/* Image Section */}
        <ImageSection>
          {/* <ProductImage src={mainImage} alt={product.name} /> */}
          <ThumbnailSection>
            {product.images.map((image, index) => (
              <Thumbnail
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </ThumbnailSection>
        </ImageSection>

        {/* Details Section */}
        <DetailsSection>
          {/* Title and Price */}
          <Title>{product.name}</Title>
          <Price>
            {product.price} <MRP>{product.mrp}</MRP> <Discount>{product.discount}</Discount>
          </Price>

          {/* Ratings */}
          <Ratings>
            {product.ratings} | {product.ratingsCount} Ratings
          </Ratings>

          {/* Size Selection */}
          <SectionTitle>Select Size (UK Size)</SectionTitle>
          <SizeSelect>
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                Size {size}
              </option>
            ))}
          </SizeSelect>

          {/* Add to Bag Button */}
          <Button>Add to Bag</Button>

          {/* Add to Wishlist Button */}
          <WishlistButton onClick={handleWishlistToggle}>
            {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </WishlistButton>

          {/* Offers */}
          <SectionTitle>Best Offers</SectionTitle>
          {product.offers.map((offer, index) => (
            <Offer key={index}>{offer}</Offer>
          ))}

          {/* Warranty */}
          <SectionTitle>Warranty</SectionTitle>
          <p>{product.warranty}</p>

          {/* Product Description */}
          <SectionTitle>Product Details</SectionTitle>
          <Description>{product.description}</Description>
        </DetailsSection>
      </Container>
    </div>
  );
};

export default ItemDetails;
