import "./product.css"
import { useLocation } from "react-router-dom"

import React,{useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  
    faPlus,faMinus
  } from "@fortawesome/free-solid-svg-icons";
import ReactStars from "react-stars";
function Product() {
    const location = useLocation();
    const[rating,setRating] = useState(4.7)
  return (
    <div>
        <div className="productData">
        <div className="singleProductImages">
        <img src={location.image} width="200" height="200" alt=""/>
        </div>
        <div className="singleProductDetails">
        <h3>productName</h3>
        <h4>product Price</h4>
        <h5>Color </h5>
        <button>Add to cart</button>
        <p>Description :  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore.</p>

        <p>Product Details <FontAwesomeIcon icon={faPlus}/></p>
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
    <h4>Reviews</h4>
    <p>Ratings (651 review)</p>
        </div>
    <div className="reviewRight">
        <button>Write a review</button><br />
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