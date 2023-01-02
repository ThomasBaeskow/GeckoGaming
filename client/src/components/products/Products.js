import "./products.css";
import React, { useEffect, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import card from "../../images/product-Img/product-img-1.jpg";
import { NavLink } from "react-router-dom";
import { MyContext } from "../../context/Context";
import ProductCard from "../productCard/ProductCard";
import ProductPagination from "../productCard/ProductPagination";
import axios from "axios";

const Products = () => {
  // getting product and category data using context
  const { product, setProduct, categoryList, setCategoryList } =
    useContext(MyContext);

  //fetching for all products list from products database
  useEffect(() => {
    fetchAllProducts();
    /* fetchAllProductDetail(); */
  }, []);

  const fetchAllProducts = async () => {
    const getProducts = await axios.get("/api/v1/products/");
    setProduct(getProducts.data.data.allProducts);
  };

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
        <ProductPagination itemsPerPage={9} />
      </div>
    </div>
  );
};

export default Products;

/*  <div className="productDisplay">
        {/* display list of products */
/* button to show previous and next items */
/* {product.slice(11, 20).map((prod) => { 
         
            return ( */
/* displaying the individual product card */
/*    <ProductCard prod={prod}/>  */
/*      ); */

/* })} */
/*      </div>   */
