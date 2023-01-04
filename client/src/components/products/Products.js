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
  const { product, setProduct, categoryList, setCategoryList,pageNum,setPageNum } =
    useContext(MyContext);

  //fetching for all products list from products database
  useEffect(() => {
    fetchAllProducts();
    /* fetchAllProductDetail(); */
  }, [pageNum,setPageNum]);


 
  const fetchAllProducts = async () => {
    const getProducts = await axios.get(`/api/v1/products/?productType=pc&productType=consoles&productType=""&page=${pageNum}`);
    //console.log("i am allproducts",getProducts)
    setProduct(getProducts.data.data.allProducts);
    //console.log("i am product",product)    
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
      <button onClick={()=>(pageNum >= 1) && setPageNum(pageNum - 1)}>previous</button>
        <button onClick={()=>(product.length >= 1) && setPageNum(pageNum + 1)}>Next</button>
        <ProductPagination itemsPerPage={9} />
      </div>
    </div>
  );
};

export default Products;


