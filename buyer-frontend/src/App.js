

import './App.css';

import { HomePage } from './pages/home.jsx';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login.jsx"; // Path to LoginPage
import RegisterPage from "./components/signup.jsx"
import ItemDetails from "./components/ItemDetails.jsx"
import MensWearPage from "./pages/menswear.jsx"
import AddToCart from "./pages/cart.jsx"
import AddressPage from "./pages/address.jsx"
import CheckoutPage from "./pages/checkout.jsx"
import RazorPayPaymentPage from './pages/razorpayPayment.jsx';
import OrderHistoryPage from "./pages/orderHistory.jsx"
import UserProfile from "./pages/profile.jsx"
import Wishlist from "./components/wishlist.jsx"
const App = () => {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<AddToCart />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/item-details/:id" element={<ItemDetails />} />
        <Route path="/menswear" element={<MensWearPage />} />
        <Route path="/address" element={<AddressPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<RazorPayPaymentPage />} />
        <Route path="/order" element={<OrderHistoryPage />} />
        <Route path="/my-info" element={<UserProfile/>}/>
        <Route path="/wishlist" element={<Wishlist />} />


      </Routes>
    </Router>
  );
};

export default App;
