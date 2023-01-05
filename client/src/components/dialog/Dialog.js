import React, { useContext } from 'react'
import "./dialog.css"
import {MyContext} from "../../context/Context"

function Dialog() {
const {setShowDialog,showDialog,msg} = useContext(MyContext)

    if(!showDialog){
     return   <></>;
    }
  return (
    <div className='dialogBox'>        
        <p>{msg}</p>
        <button onClick={()=>{setShowDialog(false)}} className="dialogBoxBtn">x</button>
    </div>
  )
}

export default Dialog