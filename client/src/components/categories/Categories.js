import "./categories.css";
import React, { useContext } from "react";
import { MyContext } from "../../context/Context";

function Categories() {
  const { categoryList } = useContext(MyContext);
  return (
    <div className="categoryContainer">
      <hr className="hr-categories" />
      <h1 className="catH1">Categories:</h1>
      <div className="categoryList-left">
        <div className="left pink">{categoryList[0]}</div>
        <div className="right orange">{categoryList[1]}</div>
      </div>
      <div className="categoryList-right">
        <div className="right green">{categoryList[2]}</div>
        <div className="left purple">{categoryList[3]}</div>
      </div>

      {/* <div className="btn-container">
    <button>More... ➡️</button>
    </div> */}
      <hr className="hr-categories" />
    </div>
  );
}

export default Categories;
