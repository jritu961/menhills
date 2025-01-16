import React from 'react';
import PrivateRoute from '../src/routes/private.jsx'; // Import the PrivateRoute component
import { HomePage } from './pages/home.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login.jsx"; // Path to LoginPage
import RegisterPage from "./components/signup.jsx"
import ItemDetails from "./components/ItemDetails.jsx"
import MensWearPage from "./pages/menswear.jsx"
import AddToCart from "./pages/cart.jsx"
import AddressPage from "./pages/address.jsx"
import CheckoutPage from "./pages/checkout.jsx"
// import RazorPayPaymentPage from './pages/razorpayPayment.jsx';
import OrderHistoryPage from "./pages/orderHistory.jsx"
import UserProfile from "./pages/profile.jsx"
import Wishlist from "./components/wishlist.jsx"
import { MyProvider } from './context/categoryContext.jsx'; // Use MyProvider instead of MyContext

function App() {
    return (
        <Router>
            <MyProvider> {/* Wrap the Routes with MyProvider */}
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cart" element={<AddToCart />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<RegisterPage />} />
                    <Route path="/item-details/:id" element={<ItemDetails />} />
                    <Route path="/menswear" element={<MensWearPage />} />

                    {/* Private Routes */}
                    <Route
                        path="/address"
                        element={
                            <PrivateRoute>
                                <AddressPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <PrivateRoute>
                                <CheckoutPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/payment"
                        element={
                            <PrivateRoute>
                                {/* <RazorPayPaymentPage /> */}
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/order"
                        element={
                            <PrivateRoute>
                                <OrderHistoryPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/my-info"
                        element={
                            <PrivateRoute>
                                <UserProfile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/wishlist"
                        element={
                            <PrivateRoute>
                                <Wishlist />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </MyProvider>
        </Router>
    );
}

export default App;
