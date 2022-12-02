import React from "react";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import "./navbar.css";
import {
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
 
  return (
    <div className="landingNavbar">
      <div className="landingUl">
        <Navigation />
        <MobileNavigation/>
      </div>
      <div className="landingSearch">
    {/*     "&#xF002; search"/>
        <FontAwesomeIcon icon={faSearch} /> */}
      

      <input type="search" placeholder=" 🔍 Search ..."/>
   
     



      </div>
      <div className="landingCart">
        <FontAwesomeIcon icon={faUser} className='user' />
        <FontAwesomeIcon icon={faShoppingCart} className='cart' />
      </div>
    </div>
  );
};

export default Navbar;
