import React, { useContext } from "react";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import "./navbar.css";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";
import { MyContext } from "../../context/Context";

const Navbar = () => {
const {cartList,userData} = useContext(MyContext);

// function to calculate the total of the items in cart
  const totalQtyCart = () => {
    const totalQty = cartList.reduce(
      (accumulator, currentValue) => accumulator + currentValue.cartQty,
      0
    );
    return totalQty;
  };
 
const searchProducts = ()=>{
  return alert("products search")
}

  return (
    <div className="landingNavbar">
      <div className="landingUl">
        <Navigation />
        <MobileNavigation />
      </div>
      <div className="landingSearch">
        <input type="search" placeholder="🔍 Search ..." onClick={searchProducts} />
      </div>
      <div className="landingCart">    
      <h5>{userData?userData.user.name:""}</h5>
     <NavLink to="/myAccount"> <FontAwesomeIcon icon={faUser} className="user" /></NavLink>
        <NavLink to="/cart"><FontAwesomeIcon icon={faShoppingCart} className="cart" /></NavLink>
      </div>
          <span className="qty-num">{totalQtyCart() > 0 && (totalQtyCart()) }</span>  
      
    </div>
  );
};

export default Navbar;
