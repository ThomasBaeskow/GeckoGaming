import "./products.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  
    faHeart
  } from "@fortawesome/free-solid-svg-icons";

const Products = () => {
  const [category, setCategory] = useState([
    "brands",
    "electronics",
    "merchandising",
    "kids",
    "music",
  ]);
const[product,setProduct] = useState([{productName:"bag", productPrice:20},{productName:"shoe", productPrice:10},{productName:"cloth", productPrice:30}])

  return (
    <div>
      <h3>Our Collections</h3>
      <div className="selectionCriteria">
        <div>
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
          <div>
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
                    <div>
                        <FontAwesomeIcon icon={faHeart}/>
                        <img src="" alt=""/>
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
