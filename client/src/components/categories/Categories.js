import "./categories.css";
import React, { useContext} from "react";
import { MyContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";

function Categories() {
  const{categoryList,setSearchOption,setPageNum} =useContext(MyContext);


const navigate = useNavigate()
  return (
    <div className="categoryContainer">
      <hr className="hr-categories" />
      <h1 className="catH1">Categories:</h1>
      <div className="categoryList-left">
        <div className="left pink" onClick={()=>{setSearchOption(categoryList[0].toLowerCase());setPageNum(1);navigate("/products")}}>{categoryList[0]}</div>
        <div className="right orange" onClick={()=>{setSearchOption(categoryList[1].toLowerCase());setPageNum(1);navigate("/products")}}>{categoryList[1]}</div>
      </div>
      <div className="categoryList-right">
        <div className="right green" onClick={()=>{setSearchOption(categoryList[2].toLowerCase());setPageNum(1);navigate("/products")}}>{categoryList[2]}</div>
        <div className="left purple" onClick={()=>{setSearchOption(categoryList[3].toLowerCase());setPageNum(1);navigate("/products")}}>{categoryList[3]}</div>
      </div>

      <hr className="hr-categories" />
    </div>
  );
}

export default Categories;
