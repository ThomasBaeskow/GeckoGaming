import "./App.css";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Cart from "./components/cart/Cart";
import MyAccount from "./components/myAccount/MyAccount";
import AboutUs from "./components/aboutUs/AboutUs";
import Products from "./components/products/Products";
import Signup from "./components/signup/Signup";
import Home from "./components/home/Home";
import Product from "./components/product/Product";
import Container from "./context/Container";

function App() {
  return (
    <div className="App">
      <Container>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myAccount" element={<MyAccount />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
