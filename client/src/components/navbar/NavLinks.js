import React,{useContext} from "react";
import {useNavigate,NavLink} from "react-router-dom"
import {MyContext} from "../../context/Context"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";


export default function NavLinks() {
  const navigate = useNavigate()
const{userData,setUserData,setOpen,open} = useContext(MyContext);



// cookie is cleared once logged out
const logOut = async()=>{
  const res = await axios.get("/api/v1/user/logout",{
    withCredentials:true,
  }).then((res)=> setUserData("")) 
 
  navigate("/")
}


  return (
    <div>
      <div className="landingUl">
        <ul>
         <NavLink to="/"><li onClick={()=>{setOpen(!open)}}>Home</li></NavLink>
          <NavLink to="/about"><li onClick={()=>{setOpen(!open)}}>About Us</li></NavLink>          
          <NavLink to="/products"><li onClick={()=>{setOpen(!open)}}>Product</li></NavLink>
          {
            userData 
            ?  (<><NavLink to="/"><li  onClick={()=>{logOut()}}>Log out </li></NavLink> </> ) 
             :(<NavLink to="/login"><li onClick={()=>{setOpen(!open)}}>Log In </li></NavLink>)

          }   
        
        </ul>
      </div>
      </div>
  );
}
