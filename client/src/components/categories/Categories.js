import "./categories.css";
import React from "react";

function Categories() {
  return (
    <div className="categoryContainer">
      <hr className="hr-categories" />
      <h1 className="catH1">Categories:</h1>
      <div className="categoryList-left">
        <div className="left pink">Brands</div>
        <div className="right orange">Accesories</div>
      </div>
      <div className="categoryList-right">
       
        <div className="right green">Computer</div>
        <div className="left purple">Videogames</div>
      </div>

    {/* <div className="btn-container">
    <button>More... ➡️</button>
    </div> */}
      <hr className="hr-categories" />
    </div>
  );
}

export default Categories;
