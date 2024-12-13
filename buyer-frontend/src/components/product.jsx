import React from 'react';
import { ProductContainer, ProductCard, ProductImage, ProductName, ProductPrice } from '../styles/product';
import lookmen from "../assets/lookmen.jpg";
import shoes from "../assets/shoes.jpg";
import shoes2 from "../assets/shoes2.jpg";
import shoes3 from "../assets/shoes.jpg";
import shoespose from "../assets/shoespose.jpg";
import tie from "../assets/tie.jpg";


const products = [
  { id: 1, name: 'Classic Suit', price: '$199', image: shoes2 },
  { id: 2, name: 'Casual Shirt', price: '$49', image: shoes3 },
  { id: 3, name: 'Sports Jacket', price: '$129', image: tie },
  { id: 3, name: 'Sports Jacket', price: '$129', image: lookmen },
  { id: 3, name: 'Sports Jacket', price: '$129', image: shoes2 },
  { id: 3, name: 'Sports Jacket', price: '$129', image: shoes },
  { id: 1, name: 'Classic Suit', price: '$199', image: shoes2 },
  { id: 2, name: 'Casual Shirt', price: '$49', image: shoes3 },
  { id: 3, name: 'Sports Jacket', price: '$129', image: tie },
  { id: 3, name: 'Sports Jacket', price: '$129', image: lookmen },
  { id: 3, name: 'Sports Jacket', price: '$129', image: shoes2 },
  { id: 3, name: 'Sports Jacket', price: '$129', image: shoes },

];

const ProductSection = () => {
  return (
    <ProductContainer>
      {products.map((product) => (
        <ProductCard key={product.id}>
          <ProductImage src={product.image} alt={product.name} />
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{product.price}</ProductPrice>
        </ProductCard>
      ))}
    </ProductContainer>
  );
};

export default ProductSection;
