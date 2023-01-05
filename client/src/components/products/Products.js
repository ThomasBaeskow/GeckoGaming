import "./products.css";
import React, { useEffect, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import card from "../../images/product-Img/product-img-1.jpg";
import { NavLink } from "react-router-dom";
import { MyContext } from "../../context/Context";
import ProductCard from "../productCard/ProductCard";
//import ProductPagination from "../productCard/ProductPagination";
import axios from "axios";
//import ReactPaginate from 'react-paginate'

const Products = () => {
  // getting product and category data using context
  const { product, setProduct, categoryList, pageNum,setPageNum,searchOption,setSearchOption } =
    useContext(MyContext);
    let queryText;
    if(pageNum === 0){
      setPageNum(1)
    }
 //productType=pc&productType=consoles&productType="" 
 const fetchAllProducts = async () => {
  console.log(searchOption)
  if(!searchOption){

    queryText=`/api/v1/products/?page=${pageNum}`
  }
  else if(searchOption === "isBestSeller"){
    queryText=`/api/v1/products/?isBestSeller=true&page=${pageNum}`
  }else {

    queryText=`/api/v1/products/?productType=${searchOption}&page=${pageNum}`
  }

  const getProducts = await axios.get(queryText);
    setProduct(getProducts.data.data.allProducts); };
    

  //fetching for all products list from products database
  //pageNum is put in dependencies to see changes in click
  useEffect(() => {
   fetchAllProducts(); 
  }, [pageNum,setPageNum]);

 

  return (
    <div className="productContainer">
      <div className="selectionCriteria">
        <div className="selectionCheckbox">
          <div className="categories">
            <h4>Category → </h4>
            {/* display list of categories */}

            {categoryList.map((item,index) => {
              return (
                <>
                  <label key={index}>
                    <input type="checkbox" className="checkbox" name={item} />
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
            <option>xbox-x/s-controller</option>
            <option>ps5</option>
          </select>
          <br />
          <select>
            <option>Price</option>
            <option>0-20</option>
            <option>20-50</option>
            <option>50-100</option>
            <option>Above 100</option>
          </select>
        </div>
      </div>
      <div className="productDisplay">
        <h1>{searchOption}</h1>

      <button onClick={()=>(pageNum > 1) && setPageNum(pageNum - 1)}>previous</button>
        <button onClick={()=>(product.length <= 9) && setPageNum(pageNum + 1)}>Next</button>
        {/* <ProductPagination itemsPerPage={9} /> */}
        
        <ProductCard product={product} />
      </div>
    </div>
  );
};

export default Products;


/* let queryOptions = []
let queryText =`productType=${queryOptions.join("&productType=")}`
 const selectProducts =async(e) => {
  console.log(e.target.name.toLowerCase(),queryOptions)
 if(queryOptions.includes(e.target.name.toLowerCase())){
  const x=queryOptions.filter((item)=>item!==e.target.name.toLowerCase())
  queryOptions = x;
  //alert(" now removed")
  console.log(queryOptions)
  queryText =`productType=${queryOptions.join("&productType=")}`
  const getProd =await axios.get(`/api/v1/products/?${queryText}&page=${pageNum}`);
      setProduct(getProd.data.data.allProducts)
 }
 else{ 

  queryOptions.push(e.target.name.toLowerCase())
  //alert(`now added`)
  console.log(queryOptions)
  queryText =`productType=${queryOptions.join("&productType=")}`
  const getProd =await axios.get(`/api/v1/products/?${queryText}&page=${pageNum}`);
  setProduct(getProd.data.data.allProducts)
}} */