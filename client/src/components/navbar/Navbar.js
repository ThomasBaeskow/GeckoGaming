
import "./navbar.css";
import React, { useContext, useEffect } from "react";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";
import { MyContext } from "../../context/Context";


const Navbar = () => {
const {userData,totalQtyCart,getCart,logged,setTotalQtyCart,cartList} = useContext(MyContext);

 
/* const searchProducts = ()=>{
  return alert("products search")
}
 */



 useEffect(()=>{
setTotalQtyCart();
JSON.parse(localStorage.getItem("logged"))&&JSON.parse(localStorage.getItem("logged"))
},[cartList, userData])

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
      <h5>{JSON.parse(localStorage.getItem("logged"))?JSON.parse(localStorage.getItem("logged")):""}</h5>
     <NavLink to="/myAccount"> <FontAwesomeIcon icon={faUser} className="user" /></NavLink>

    <div className="cart-div">
     <NavLink to="/cart"><FontAwesomeIcon icon={faShoppingCart} className="cart" /></NavLink>
     <span className="qty-num">{JSON.parse(localStorage.getItem("logged"))?  totalQtyCart  : ""}</span>
     </div>
        

      </div>
            
      
    </div>
  );
};

export default Navbar;
