import "./products.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  
    faHeart
  } from "@fortawesome/free-solid-svg-icons";
  import card from "../../images/product-Img/product-img-1.jpg"
import { NavLink } from "react-router-dom";

const Products = () => {
  const [category, setCategory] = useState([
    "brands",
    "electronics",
    "merchandising",
    "kids",
    "music",
  ]);
/* const[product,setProduct] = useState([{productName:"bag", productPrice:20},{productName:"shoe", productPrice:10},{productName:"cloth", productPrice:30},{productName:"cloth", productPrice:30}]) */
const [product, setProduct] = useState([
  {
    productName: "bag",
    cartQty: 0,
    productPrice: 20,
    product_id: 1,
    availableQty: 2,
  },
  {
    productName: "bag",
    cartQty: 0,
    productPrice: 20,
    product_id: 2,
    availableQty: 25,
  },
  {
    productName: "shoe",
    cartQty: 0,
    productPrice: 10,
    product_id: 3,
    availableQty: 5,
  },
  {
    productName: "cloth",
    cartQty: 0,
    productPrice: 30,
    product_id: 4,
    availableQty: 8,
  },
  {
    productName: "cloth",
    cartQty: 0,
    productPrice: 30,
    product_id: 5,
    availableQty: 5,
  },
]);


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
                       <NavLink to={`/products/${product.product_id}`}><img src={card} alt=""/></NavLink>
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
