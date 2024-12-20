import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Router,Routes,Route} from "react-router-dom"
import SignupPage from "./pages/register.jsx"
function App() {
  return (
    <div className="App">
      {/* <Router>
        <Routes>
          <Route path='/' element={<SignupPage/>} />
        </Routes>
      </Router> */}
      <SignupPage/>       
    </div>
  );
}

export default App;
