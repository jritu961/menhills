

import './App.css';

import { HomePage } from './pages/home.jsx';

// function App() {
//   return (
//   <>
//   <HomePage/>
  
//   </>
//   );
// }

// export default App;
// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login.jsx"; // Path to LoginPage
import RegisterPage from "./components/sighnup.jsx"
const App = () => {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />

      </Routes>
    </Router>
  );
};

export default App;
