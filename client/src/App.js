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
import PageNotFound from "./components/pageNotFound/PageNotFound";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import ViewAll from "./components/viewAll/ViewAll";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import UpdatePassword from "./components/updatePassword/UpdatePassword";
import ResetPassword from "./components/resetPassword/ResetPassword";



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
          <Route path="/forgotPassword" element={<ForgotPassword />} />
{/*           <Route path="/updatePassword" element={<ProtectedRoute userAccess="authenticated"><UpdatePassword /></ProtectedRoute>} />
            {/* <Route path="/cart" element={<Cart/>  }/> */}
           <Route path="/resetPassword/:token" element={<ResetPassword/>}/>
          <Route path="/myAccount" element={<ProtectedRoute userAccess="authenticated"><MyAccount/></ProtectedRoute>} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/ViewAll" element={<ViewAll/>} />
          <Route path="/cart" element={<ProtectedRoute userAccess="authenticated"><Cart/></ProtectedRoute>} /> 

        </Routes>
        <Footer />
      </BrowserRouter>
      </Container>
    </div>
   
  );
}

export default App;
