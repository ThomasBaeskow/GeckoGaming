import React, { useState } from "react";
import "./navbar.css";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState([false, "Anupama"]);
  const [cartQuantity, setCartQuantity] = useState(1);

  return (
    <div className="landingNavbar">
      <div className="landingUl">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          {user[0] ? (
            <>
              <li>
                --Welcome{user[1]}--<Link to="/">Log out </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Log in </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="landingSearch">
        <input type="search" placeholder=" 🔍 Search ..." />
      </div>
      <div className="landingCart">
        <Link to="/myAccount"><FontAwesomeIcon icon={faUser} /></Link>
       <Link to="/cart"> <FontAwesomeIcon icon={faShoppingCart}/></Link>
        {cartQuantity > 0 ? <h6>{cartQuantity}</h6> : ""}
      </div>
    </div>
  );
};

export default Navbar;
