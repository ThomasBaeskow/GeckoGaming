import React,{useContext} from "react";
import {useNavigate,NavLink} from "react-router-dom"
import {MyContext} from "../../context/Context"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";


export default function NavLinks() {
  const navigate = useNavigate()
const{userData,setUserData} = useContext(MyContext);



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
         <NavLink to="/"><li>Home</li></NavLink>
          <NavLink to="/about"><li>About Us</li></NavLink>          
          <NavLink to="/products"><li>Product</li></NavLink>
          {
            userData 
            ?  (<><NavLink to="/"><li  onClick={()=>{logOut()}}>Log out </li></NavLink> </> ) 
             :(<NavLink to="/login"><li>Log In </li></NavLink>)

          }   
        
        </ul>
      </div>
      </div>
  );
}
