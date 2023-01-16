import React,{useContext} from "react";
import { NavLink,useNavigate} from "react-router-dom"
import {MyContext} from "../../context/Context"
import axios from "axios";


export default function NavLinks() {
 
const{userData,setLogged,logged,setCartList,setUserData,setOpen,open,setSearchOption,setPageNum} = useContext(MyContext);
const navigate = useNavigate()
// cookie is cleared once logged out
const logOut = async()=>{
  const res = await axios.get("/api/v1/user/logout",{
    withCredentials:true,
  }); setUserData("") 
setCartList([])
  localStorage.removeItem("logged")
   alert("Successfully logged out");   
   navigate("/") 
  
}


  return (
    <div>
      <div className="landingUl">        
        <ul>
         <NavLink to="/"><li onClick={()=>{setOpen(!open)}}>Home</li></NavLink>
          <NavLink to="/about"><li onClick={()=>{setOpen(!open)}}>About Us</li></NavLink>          
          <NavLink to="/products"><li onClick={()=>{setOpen(!open); setPageNum(0); setSearchOption("") }}>Product</li></NavLink>
          {
         JSON.parse(localStorage.getItem("logged")) 
            ?  (<><NavLink to="/"><li  onClick={()=>{logOut()}}>Log out </li></NavLink> </> ) 
             :(<><li onClick={()=>{setOpen(!open)}}><NavLink to="/login">Log In</NavLink> / <NavLink to="/signup">Signup </NavLink> </li> 
            
             </>)

          }   
        
        </ul>
      </div>
      </div>
  );
}
