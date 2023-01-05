import "./products.css";
import React, { useEffect, useContext } from "react";
import card from "../../images/product-Img/product-img-1.jpg";
import { MyContext } from "../../context/Context";
import ProductCard from "../productCard/ProductCard";
import axios from "axios";


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
        <button onClick={()=>(product.length === 0)? setPageNum(pageNum -1) :setPageNum(pageNum + 1) }>Next</button>        
        
        <ProductCard product={product} />
      </div>
    </div>
  );
};

export default Products;


