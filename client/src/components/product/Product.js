import "./product.css"
import { useLocation } from "react-router-dom"
import React,{ useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  
    faPlus,faMinus
  } from "@fortawesome/free-solid-svg-icons";  
import ReactStars from "react-stars";


function Product() {
    const location = useLocation();
    const[rating,setRating] = useState(4.7);
   
  return (
    <div>
        <div className="productData">
        <div className="singleProductImages">
        <img src={location.image} width="200" height="200" alt="" className="img-review" />
        </div>
        <div className="singleProductDetails">
         
        <h3>productName: {location.state.productName}</h3>
        <h4>product Price:{location.state.productPrice}</h4>
        <h5>Color </h5>
        <button className="review-btn">Add to cart</button>
        <p>Description :{location.state.description}</p>

        <p>Product Details:{location.state.productDetails} <FontAwesomeIcon icon={faPlus}/></p>
        <p>Delivery <FontAwesomeIcon icon={faMinus}/></p>
        <ReactStars
              count={5}
              value={rating}
              activeColor="black"
              isHalf={true}
              size={24}
              edit={false}
            /><p>{rating}</p>
    </div>
    </div>

    <div className="productReviewContainer">
        <div className="reviewLeft">
    <h4>✨Reviews✨</h4>
    <p>Ratings (651 review)</p>
        </div>
    <div className="reviewRight">
        <button className="review-btn">Write a review</button><br />
        Maria  <ReactStars
              count={5}
              value={rating}
              activeColor="black"
              isHalf={true}
              size={24}
              edit={false}
            />
            <p>Date 01.01.2023</p>
            <p>some text</p>
    </div>
    </div>
    </div>
  )
}

export default Product