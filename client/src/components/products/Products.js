import "./products.css";
import React, { useState,useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  
    faHeart
  } from "@fortawesome/free-solid-svg-icons";
  import card from "../../images/product-Img/product-img-1.jpg"
import { NavLink } from "react-router-dom";
import {MyContext} from "../../context/Context"

const Products = () => {
  const [category, setCategory] = useState([
    "brands",
    "electronics",
    "merchandising",
    "kids",
    "music",
  ]);



 const{product,setProduct} = useContext(MyContext)

  return (
    <div className="productContainer">
  
      <div className="selectionCriteria">
        <div className="selectionCheckbox">
          <h4>Category → </h4>
          {category.map((item) => {
            return (
              <>
                <label>
                  <input type="checkbox" />
                  {item}
                </label>
                <br />
              </>
            );
          })}
        </div>
          <div className="selectionCategory">
            <select>               
                <option >Colors</option>
                <option >Selection 1</option>
                <option >Selection 2</option>
            </select><br />
            <select>               
                <option >Brands</option>
                <option >Selection 1</option>
                <option >Selection 2</option>
            </select><br />
            <select>               
                <option >Price</option>
                <option >Selection 1</option>
                <option >Selection 2</option>
            </select>
          </div>

      </div>
      <div className="productDisplay">

          {
            product.map((prod)=>{
                return (
                    <div className="cardContainer">
                        <FontAwesomeIcon icon={faHeart}/>
                       <NavLink to={`/products/${prod.product_id}`}  state={prod} ><img src={card} alt=""/></NavLink>
                        <p>{prod.productName}</p>
                        <p>{prod.productPrice}</p>
                    </div> 
                    

                )
            })
          }

      </div>

    </div>
  );
};

export default Products;
