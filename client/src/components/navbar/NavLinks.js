import React from "react";
import {NavLink} from "react-router-dom"

export default function NavLinks() {
  return (
    <div>
      <div className="landingUl">
        <ul>
         <NavLink to="/"><li>Home</li></NavLink>
          <NavLink to="/about"><li>About Us</li></NavLink>          
          <NavLink to="/products"><li>Product</li></NavLink>
          <NavLink to="/login"><li>Log in </li></NavLink>
        </ul>
      </div>
      </div>
  );
}
