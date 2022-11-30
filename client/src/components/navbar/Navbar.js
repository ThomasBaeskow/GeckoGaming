import React from "react";
import "./navbar.css";
import {
  faSearch,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
 
  return (
    <div className="landingNavbar">
      <div className="landingUl">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Product</li>
          <li>Log in </li>
        </ul>
      </div>
      <div className="landingSearch">
    {/*     "&#xF002; search"/>
        <FontAwesomeIcon icon={faSearch} /> */}
      

      <input type="search" placeholder=" 🔍 Search ..."/>
   
     



      </div>
      <div className="landingCart">
        <FontAwesomeIcon icon={faUser} />
        <FontAwesomeIcon icon={faShoppingCart} />
      </div>
    </div>
  );
};

export default Navbar;
