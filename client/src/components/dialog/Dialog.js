import React, { useContext } from 'react'
import "./dialog.css"
import { useNavigate } from 'react-router-dom'
import {MyContext} from "../../context/Context"

  function Dialog() {
 const {setShowDialog,showDialog,msg,setMsg,changePage} = useContext(MyContext)
const navigate = useNavigate();
     if(!showDialog){
     return   <></>;
    }
  return (
    
    <div className='dialogBox'>      
        <p>{msg}</p>
        <button className="dialogBoxBtn" onClick={()=>{setShowDialog(false);navigate(changePage);setMsg("")}}>x</button>
    </div>

  )
}
 
export default Dialog 