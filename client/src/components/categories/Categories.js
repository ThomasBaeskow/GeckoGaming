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
