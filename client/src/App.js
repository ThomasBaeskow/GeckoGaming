
import './App.css';
import Banner from './components/banner/Banner';
import BestSeller from './components/bestSeller/BestSeller';
import Categories from './components/categories/Categories';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import{BrowserRouter,Route,Router}from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import AboutUs from "./components/aboutUs/AboutUs"
import { Signup } from './components/signup/Signup';

function App() {
  return (
    <div className="App">
    <Navbar/> 
   
    <Banner/>
     <BestSeller/>
 <Categories/>
    <Footer/>   
    {/* <Signup/>   
    <Login/>  
   <Router>
  <Route path="/"element={<Navbar/>}/>
  <Route path="/about" element={<AboutUs/>}/>
  </Router> */} 
    </div>
  );
}

export default App;
