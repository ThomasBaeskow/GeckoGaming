import React,{useContext} from "react";
import {NavLink} from "react-router-dom"
import {MyContext} from "../../context/Context"
import axios from "axios";
import Dialog from "../dialog/Dialog";

export default function NavLinks() {
 
const{userData,setUserData,setOpen,open,setSearchOption,setPageNum,setChangePage,setMsg,setShowDialog} = useContext(MyContext);

// cookie is cleared once logged out
const logOut = async()=>{
  const res = await axios.get("/api/v1/user/logout",{
    withCredentials:true,
  }); setUserData("") 
   setMsg("Successfully logged out");    
  setChangePage("/")
  setShowDialog(true)  
}


  return (
    <div>
      <div className="landingUl">
        <Dialog/>
        <ul>
         <NavLink to="/"><li onClick={()=>{setOpen(!open)}}>Home</li></NavLink>
          <NavLink to="/about"><li onClick={()=>{setOpen(!open)}}>About Us</li></NavLink>          
          <NavLink to="/products"><li onClick={()=>{setOpen(!open); setPageNum(0); setSearchOption("") }}>Product</li></NavLink>
          {
            userData 
            ?  (<><NavLink to="/"><li  onClick={()=>{logOut()}}>Log out </li></NavLink> </> ) 
             :(<><li onClick={()=>{setOpen(!open)}}><NavLink to="/login">Log In</NavLink> / <NavLink to="/signup">Signup </NavLink> </li> 
            
             </>)

          }   
        
        </ul>
      </div>
      </div>
  );
}
