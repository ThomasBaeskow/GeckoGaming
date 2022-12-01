
import "./categories.css";
import React from "react";

function Categories() {
  return (
    <div className="categoryContainer">
      <hr className="hr-categories" />
      <h1 className="catH1">Categories:</h1>
      <div className="categoryList-left">
        <div className="left pink">brands</div>
        <div className="right orange">Electronics</div>
      </div>
      <div className="categoryList-right">
       
        <div className="right green">Merchandising</div>
        <div className="left purple">Kids</div>
      </div>

    <div className="btn-container">
    <button>More... ➡️</button>
    </div>
      
    </div>
  );
}

export default Categories;

import "./categories.css"
import React,{useState} from 'react'

function Categories() {
  const[category,setCategory] = useState(["brands","electronics","merchandising","kids","music"])
   
  return (
    <div className="categoryContainer">
      <hr/>
        <h1 className="catH1">Categories:</h1>
        <div className="categoryList">
          {
            category.map((item)=>
            <div className={item}>{item}</div>
            
            )
          }
          {/*   <div className="brands">brands</div>
            <div className="electronics">Electronics</div>
            <div className="merchandising">Merchandising</div>
            <div className="kids">Kids</div> */}
        </div>
        <button>More</button>
    </div>
  )
}

export default Categories

