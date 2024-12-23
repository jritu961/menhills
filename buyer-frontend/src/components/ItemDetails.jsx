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
import axios from "axios"
const ItemDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [isInWishlist, setIsInWishlist] = useState(false);  // State for wishlist

  useEffect(() => {
    const fetchData=async()=>{
     const result=await axios.get(`${process.env.REACT_APP_BASE_URL_Seller}/products/${id}`)
     console.log("result>>>>>>>>>>>",result)
    }
    fetchData()

    // const productData = products.find((product) => product.id === parseInt(id));

    // if (productData) {
    //   setProduct(productData);
    //   setMainImage(productData.images[0]);  // Set the first image as the main image
    // }
  }, [id]);

  // useEffect(() => {
  //   console.log('Main Image:51>>>>>>>>>>>>>>>>', mainImage);  // Debugging the main image state
  // }, [mainImage]);  // Log the mainImage state whenever it changes

  // if (!product) {
  //   return <div>Loading...</div>;
  // }

  // const handleImageClick = (image) => {
  //   console.log('Clicked Image:', image);  // Log the clicked image to ensure it's the correct one
  //   setMainImage(image);  // Set the clicked image as the main image
  // };

  // const handleWishlistToggle = () => {
  //   setIsInWishlist(!isInWishlist);  // Toggle the wishlist status
  // };

  // return (
  //   <div>  
  //     <Header />
  //     <NavbarComponent />
  //     <NavbarComponentData />
      
  //     <Container>
  //       {/* Image Section */}
  //       <ImageSection>
  //         {/* <ProductImage src={mainImage} alt={product.name} /> */}
  //         <ThumbnailSection>
  //           {product.images.map((image, index) => (
  //             <Thumbnail
  //               key={index}
  //               src={image}
  //               alt={`Thumbnail ${index + 1}`}
  //               onClick={() => handleImageClick(image)}
  //             />
  //           ))}
  //         </ThumbnailSection>
  //       </ImageSection>

  //       {/* Details Section */}
  //       <DetailsSection>
  //         {/* Title and Price */}
  //         <Title>{product.name}</Title>
  //         <Price>
  //           {product.price} <MRP>{product.mrp}</MRP> <Discount>{product.discount}</Discount>
  //         </Price>

  //         {/* Ratings */}
  //         <Ratings>
  //           {product.ratings} | {product.ratingsCount} Ratings
  //         </Ratings>

  //         {/* Size Selection */}
  //         <SectionTitle>Select Size (UK Size)</SectionTitle>
  //         <SizeSelect>
  //           {product.sizes.map((size) => (
  //             <option key={size} value={size}>
  //               Size {size}
  //             </option>
  //           ))}
  //         </SizeSelect>

  //         {/* Add to Bag Button */}
  //         <Button>Add to Bag</Button>

  //         {/* Add to Wishlist Button */}
  //         <WishlistButton onClick={handleWishlistToggle}>
  //           {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
  //         </WishlistButton>
  //         <WishlistButton>Buy Now</WishlistButton>
  //         {/* Offers */}
  //         <SectionTitle>Best Offers</SectionTitle>
  //         {product.offers.map((offer, index) => (
  //           <Offer key={index}>{offer}</Offer>
  //         ))}

  //         {/* Warranty */}
  //         <SectionTitle>Warranty</SectionTitle>
  //         <p>{product.warranty}</p>

  //         {/* Product Description */}
  //         <SectionTitle>Product Details</SectionTitle>
  //         <Description>{product.description}</Description>
  //       </DetailsSection>
  //     </Container>
  //   </div>
  // );
};

export default ItemDetails;
