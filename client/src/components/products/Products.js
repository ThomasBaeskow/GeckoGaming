import "./products.css";
import React, { useEffect, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import card from "../../images/product-Img/product-img-1.jpg";
import { NavLink } from "react-router-dom";
import { MyContext } from "../../context/Context";

const Products = () => {
  // getting product and category data using context
  const { product, setProduct, categoryList, setCategoryList } =
    useContext(MyContext);

  /* const fetchAllProducts = async()=>{
  const getProducts = await axios.get("http://127.0.0.1:3000/api/v1/products/");
  console.log("i am getProducts",getProducts)
  setProduct(await getProducts.data.data.allProducts)
  console.log("i am product",product)
 
} */

  return (
    <div className="productContainer">
      <div className="selectionCriteria">
        <div className="selectionCheckbox">
          <div className="categories">
            <h4>Category → </h4>
            {/* display list of categories */}

            {categoryList.map((item) => {
              return (
                <>
                  <label>
                    <input type="checkbox" className="checkbox" />
                    {item}
                  </label>
                  <br />
                </>
              );
            })}
          </div>
        </div>
        <div className="selectionCategory">
          <select>
            <option>Brands</option>
            <option>Selection 1</option>
            <option>Selection 2</option>
          </select>
          <br />
          <select>
            <option>Price</option>
            <option>Selection 1</option>
            <option>Selection 2</option>
          </select>
        </div>
      </div>
      <div className="productDisplay">
        {/* display list of products */}
        {product.map((prod) => {        
         let x= prod.product_detail_url.split("/");
         let y = (x.length-1)
          if (prod.isBestSeller) {
            return (
              /* displaying the individual product card */
              <div className="cardContainer">
                <NavLink to={`/products/${prod.product_id}`} state={prod}>
                  <img src={prod.product_main_image_url} alt="" />
                </NavLink>

                <p className="product-title">{prod.product_title}</p>
                <p className="product-price">{prod.app_sale_price}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Products;
