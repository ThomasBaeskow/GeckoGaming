import React,{useContext} from "react";
import {NavLink} from "react-router-dom"
import {MyContext} from "../../context/Context"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function NavLinks() {
const{userData,setUserData} = useContext(MyContext)

  return (
    <div>
      <div className="landingUl">
        <ul>
         <NavLink to="/"><li>Home</li></NavLink>
          <NavLink to="/about"><li>About Us</li></NavLink>          
          <NavLink to="/products"><li>Product</li></NavLink>
          {
            userData ? (<><NavLink to="/"><li  onClick={()=>{setUserData("")}}>Log out </li></NavLink> </> ) :(<NavLink to="/login"><li>Log in </li></NavLink>)

          }
          
        </ul>
      </div>
      </div>
  );
}
