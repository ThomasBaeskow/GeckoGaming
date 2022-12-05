
import './App.css';
import{BrowserRouter,Route,Routes}from "react-router-dom";

import Home from './components/home/Home';
import AboutUs from "./components/aboutUs/AboutUs"
import Products from './components/products/Products';
import  Signup  from './components/signup/Signup';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Cart from './components/cart/Cart';
import MyAccount from './components/myAccount/MyAccount';





function App() {
  return (
    <div className="App">
 <BrowserRouter>
 <Navbar/>
     <Routes>
  <Route path="/"element={<Home/>}/>
  <Route path="/about" element={<AboutUs/>}/>
  <Route path="/products" element={<Products/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path="/cart" element={<Cart/>}/>
  <Route path="/myAccount" element={<MyAccount/>}/>
  </Routes> 
  <Footer/>
  </BrowserRouter> 
    </div>
  );
}

export default App;
