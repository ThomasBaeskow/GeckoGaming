import "./products.css";
import React, { useEffect, useContext, useState } from "react";
import { MyContext } from "../../context/Context";
import ProductCard from "../productCard/ProductCard";
import axios from "axios";


const Products = () => {
  // getting product and category data using context
  const { product, setProduct, categoryList, pageNum,setPageNum,searchOption, setSearchOption} =
    useContext(MyContext);
    let queryText;
    
   //selecting deselecting check boxes 
   
   const [checked, setChecked] = useState([]);
  const handleOnChange = (event) => {    
    setSearchOption("")
    setPageNum(1)
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value.toLowerCase()];
    } else {
      updatedList.splice(checked.indexOf(event.target.value.toLowerCase()), 1);
    }
    setChecked(updatedList);
    //fetchAllProducts()
  };  
 //console.log(checked)
  queryText= `productType=${checked.join("&productType=")}`
// console.log( `productType=${checked.join("&productType=")}`)

    // end of selecting deselecting check boxes 

    if(pageNum === 0){
      setPageNum(1)
    } 
 //productType=pc&productType=consoles&productType="" 
 const fetchAllProducts = async () => {
  //console.log(searchOption)
  if(!searchOption ){
    if(checked.length === 0){     
    queryText=`/api/v1/products/?page=${pageNum}`
    }
    else{
      queryText= `/api/v1/products/?productType=${checked.join("&productType=")}&page=${pageNum}`
    }
  }
  else if(searchOption === "isBestSeller"){
    queryText=`/api/v1/products/?isBestSeller=true&page=${pageNum}`
  }else {
    queryText=`/api/v1/products/?productType=${searchOption}&page=${pageNum}`
  }

  const getProducts = await axios.get(queryText);
    setProduct(getProducts.data.data.allProducts); 
    //console.log(getProducts)
  };
    

  //fetching for all products list from products database
  //pageNum is put in dependencies to see changes in click
  // checked is put in dependencies to see changes checked
  useEffect(() => {
   fetchAllProducts(); 
  }, [pageNum,checked]);
  
//console.log(checked)

  return (
    <div className="productContainer">
      <div className="selectionCriteria">
        <div className="selectionCheckbox">
          <div className="categories">
            <h4>Category → </h4>   

            {categoryList.map((item,index) => {
              return (
                <>
                  <label key={index}>
                   <input type="checkbox" className="checkbox" value={item} onChange={handleOnChange}/> 
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
            <option>50-100</option>
            <option>Above 100</option>
          </select>
        </div>        
      </div>
           
      <div className="productDisplay">

      <div className="productDisplayScroll">  
      <button className="btn-Product" onClick={()=>(pageNum > 1) && setPageNum(pageNum - 1)}>previous</button>
      <h4>{searchOption}</h4>
      <button className="btn-Product" onClick={()=>(product.length === 0)? setPageNum(pageNum -1) :setPageNum(pageNum + 1) }>Next</button>        
   
        </div> 
       

        
        <ProductCard product={product} />
      </div>
    </div>
  );
};

export default Products;


