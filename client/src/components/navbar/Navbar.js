import React, { useContext } from "react";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import "./navbar.css";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";
import { MyContext } from "../../context/Context";

const Navbar = () => {
const {cartList} = useContext(MyContext);


  const totalQtyCart = () => {
    const totalQty = cartList.reduce(
      (accumulator, currentValue) => accumulator + currentValue.cartQty,
      0
    );
    return totalQty;
  };
 


  return (
    <div className="landingNavbar">
      <div className="landingUl">
        <Navigation />
        <MobileNavigation />
      </div>
      <div className="landingSearch">
        <input type="search" placeholder=" 🔍 Search ..." />
      </div>
      <div className="landingCart">    
     
     <NavLink to="/myAccount"> <FontAwesomeIcon icon={faUser} className="user" /></NavLink>
        <NavLink to="/cart"><FontAwesomeIcon icon={faShoppingCart} className="cart" /></NavLink>
          <span>{totalQtyCart() > 0 && (totalQtyCart()) }</span>  
      </div>
    </div>
  );
};

export default Navbar;
