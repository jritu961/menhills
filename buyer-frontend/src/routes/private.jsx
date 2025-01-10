import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute
import ItemDetails from './pages/ItemDetails'; // Replace with actual paths
import MensWearPage from './pages/MensWearPage';
import AddressPage from './pages/AddressPage';
import CheckoutPage from './pages/CheckoutPage';
import RazorPayPaymentPage from './pages/RazorPayPaymentPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import UserProfile from './pages/UserProfile';
import Wishlist from './pages/Wishlist';

function App() {
    return (
        <Router>
            <Routes>
                {/* Wrap each route with PrivateRoute */}
                <Route
                    path="/item-details/:id"
                    element={
                        <PrivateRoute>
                            <ItemDetails />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/menswear"
                    element={
                        <PrivateRoute>
                            <MensWearPage />
                        </PrivateRoute>
                    }
                />
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
                            <RazorPayPaymentPage />
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
        </Router>
    );
}

export default App;
