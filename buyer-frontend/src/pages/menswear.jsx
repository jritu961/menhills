// MensWearPage.js
import React from 'react';
import { MensWearContainer, PageTitle, ProductGrid, ProductCard } from '../styles/menswear';
import { Header } from "../components/header"
import { NavbarComponentData } from "../components/navbarContent"
import {NavbarComponent} from "../components/navbar"
import sitingmen from "../assets/sitingmen.jpg";
import watch from "../assets/watch.jpg";
import menpose from "../assets/menpose.jpg";
import {Footer} from "../components/footer"

import mensiting from "../assets/mensiting.jpg";
import sidemen from "../assets/sidemen.jpg";
import lookmen from "../assets/lookmen.jpg";
import shoes from "../assets/shoes.jpg";
import shoes2 from "../assets/shoes2.jpg";
import shoes3 from "../assets/shoes.jpg";
import shoespose from "../assets/shoespose.jpg";
import tie from "../assets/tie.jpg";
const products = [
  { id: 1, name: "Classic T-Shirt", price: "$20", image: sitingmen },
  { id: 2, name: "Denim Jacket", price: "$60", image: watch },
  { id: 3, name: "Slim Fit Jeans", price: "$40", image: menpose },
  { id: 4, name: "Sports Shoes", price: "$80", image: mensiting },
  { id: 1, name: "Classic T-Shirt", price: "$20", image: sitingmen },
  { id: 2, name: "Denim Jacket", price: "$60", image: watch },
  { id: 3, name: "Slim Fit Jeans", price: "$40", image: menpose },
  { id: 4, name: "Sports Shoes", price: "$80", image: mensiting },
  { id: 1, name: "Classic T-Shirt", price: "$20", image: sitingmen },
  { id: 2, name: "Denim Jacket", price: "$60", image: watch },
  { id: 3, name: "Slim Fit Jeans", price: "$40", image: menpose },
  { id: 4, name: "Sports Shoes", price: "$80", image: mensiting },
  { id: 3, name: "Slim Fit Jeans", price: "$40", image: menpose },
  { id: 4, name: "Sports Shoes", price: "$80", image: mensiting },
];

const MensWearPage = () => {
  return (
    <MensWearContainer>
        <Header/>
        <NavbarComponent/>
        <NavbarComponentData/>
      <PageTitle>Men's Wear Collection</PageTitle>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </ProductCard>
        ))}
      </ProductGrid>
      <Footer/>
    </MensWearContainer>
  );
};

export default MensWearPage;
