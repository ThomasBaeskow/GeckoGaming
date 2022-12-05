import React from "react";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import "./navbar.css";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";

const Navbar = () => {
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
      </div>
    </div>
  );
};

export default Navbar;
