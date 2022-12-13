import "./products.css";
import React, { useEffect,useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  
    faHeart
  } from "@fortawesome/free-solid-svg-icons";
  import card from "../../images/product-Img/product-img-1.jpg"
import { NavLink } from "react-router-dom";
import {MyContext} from "../../context/Context"
import axios from "axios";



const Products = () => {
// getting product and category data using context
 const{product,setProduct,categoryList,setCategoryList} = useContext(MyContext)

useEffect(() => {
fetchAllProducts();
}, []); 


const fetchAllProducts = async()=>{
  const getProducts = await axios.get("http://127.0.0.1:3000/api/v1/products/")
  console.log(getProducts)
}



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
            {/* display list of products */}  
          {
            product.map((prod)=>{
                return (
                  /* displaying the individual product card */
                    <div className="cardContainer">
                       <NavLink to={`/products/${prod.product_id}`}  state={prod} ><img src="https://m.media-amazon.com/images/I/91ClDMOrAwL._AC_UY218_.jpg" alt=""/></NavLink>
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
