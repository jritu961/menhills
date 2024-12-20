

import './App.css';

import { HomePage } from './pages/home.jsx';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login.jsx"; // Path to LoginPage
import RegisterPage from "./components/sighnup.jsx"
import ItemDetails from "./components/ItemDetails.jsx"
import MensWearPage from "./pages/menswear.jsx"
const App = () => {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/item-details/:id" element={<ItemDetails />} />
        <Route path="/menswear" element={<MensWearPage />} />

      </Routes>
    </Router>
  );
};

export default App;
