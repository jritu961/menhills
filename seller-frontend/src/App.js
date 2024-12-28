import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/register.jsx";
import LoginApp from "./pages/signin.jsx";
import Dashboard from "./component/dashboard.jsx"
import AddProduct from "./pages/product.jsx"
import ProductListingPage from "./pages/listProduct.jsx"
import ProductDetailPage from "./pages/productDetails.jsx"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/list-product' element={<ProductListingPage />} />
          <Route path='/' element={<LoginApp />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />

          <Route path='/signup' element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
