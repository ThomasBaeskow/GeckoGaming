
import "./navbar.css";
import React, { useContext, useEffect } from "react";


import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";

import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";
import { MyContext } from "../../context/Context";


const Navbar = () => {
const {userData,totalQtyCart,getCart,setTotalQtyCart,cartList} = useContext(MyContext);


 
/* const searchProducts = ()=>{
  return alert("products search")
}
 */



useEffect(()=>{
setTotalQtyCart()
},[cartList])

setTotalQtyCart(
  cartList.reduce(
    (accumulator, currentValue) => accumulator + currentValue.cartQty,
    0
  )
);

  return (
    <div className="landingNavbar">
      <div className="landingUl">
        <Navigation />
        <MobileNavigation />
      </div>
      <div className="landingSearch">
        <input type="search" placeholder="🔍 Search ..." /* onClick={searchProducts} */ />
      </div>
      <div className="landingCart">    
      <h5>{userData?userData.user.name:""}</h5>
     <NavLink to="/myAccount"> <FontAwesomeIcon icon={faUser} className="user" /></NavLink>

<div className="cart-div">
     <NavLink to="/cart"><FontAwesomeIcon icon={faShoppingCart} className="cart" /></NavLink>
     <span className="qty-num">{userData? totalQtyCart : ""}</span>
     </div>
        

      </div>
            
      
    </div>
  );
};

export default Navbar;
