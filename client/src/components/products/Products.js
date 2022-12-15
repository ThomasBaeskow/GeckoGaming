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
        {/* button to show previous and next items */}
        {product.slice(11, 20).map((prod) => {
         
            return (
              /* displaying the individual product card */
              <div className="cardContainer">
                <NavLink to={`/products/${prod.id}`} state={prod}>
                  <img src={prod.product_main_image_url} alt="" />
                </NavLink>

                <p>{prod.product_title.slice(0, 20)}</p>
                 {/*   <p>{prod.product_detail_url.slice(-10)}</p>  */}
                 {/* doing the above we will get the product id */}
                <p>{prod.app_sale_price}</p>
              </div>
            );
          
        })}
      </div>
    </div>
  );
};

export default Products;
