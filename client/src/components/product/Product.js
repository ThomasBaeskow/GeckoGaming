import "./product.css";
import { useLocation } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import ReactStars from "react-stars";
import { MyContext } from "../../context/Context";
import axios from "axios";
import Dialog from "../dialog/Dialog";

function Product() {
  
  const location = useLocation();
  const [rating, setRating] = useState(4.7);
  const { 
    product,   
    wishList, cartList, singleProductDetails,changePage,setSingleProductDetails,showDialog,setChangePage,setShowDialog,setMsg,msg     
  } = useContext(MyContext);
  
  const [btnMsg, setBtnMsg] = useState(
    wishList.map((val) => val.id).includes(location.state.id) ? true : false
  );
  
  //--- Function to get product details based on product_id
  const getSingleProductDetail = async () => {
 // console.log("while entry in product single page",location.state.id,location.state.product_detail_url,location.state,  )
   //--- get product_id details based on system id of product database using axios 
 const response = await axios.get(`/api/v1/products/${location.state.id}`);
  const product_id = response.data.data.product.product_detail_url.slice(-10);
  //  console.log(product_id)

  //now get product details based on product_id to display in single page
    const getProducts1 = await axios.get(`/api/v1/product/?product_id=${product_id}`); 
    let res = getProducts1.data.data.data[0]   
    setSingleProductDetails(res)
 // console.log(getProducts1.data.data.data[0]);
 // console.log(singleProductDetails.available_quantity) 

  }

  useEffect(()=>{
    getSingleProductDetail(); 
  },[]) 
 
  //adding items to cart
  const addToCart = async (id) => {    
    const prod_result = product.filter((item) => item.id === id);
    //console.log("prod result",prod_result[0].product_detail_url.slice(-10))
    let product_id=prod_result[0].product_detail_url.slice(-10);
    let itemQty =cartList.filter((val)=>val.product_id===product_id)
    let cartQty =itemQty.length===0?1:itemQty[0].cartQty+1
    //console.log("item", itemQty, cartQty)

    let cartNewItem = {
      product_id: product_id,
      cartQty: cartQty,
      product_title: prod_result[0].product_title,
      app_sale_price: prod_result[0].app_sale_price,
      product_main_image_url: prod_result[0].product_main_image_url,
    };
    //console.log("data for cart",cartNewItem)
    await axios.post("/api/v1/cart", cartNewItem, { withCredentials: true });
    setMsg("Successfully added in cart");    
   setChangePage("/products/")
    console.log(location.state.id)
    setShowDialog(true) 
    
  };

  //adding items to wishlist in the database
  const addToWishList = async (prodId) => {
    try{
    await axios.put("/api/v1/user/wishlist",
      { productId: prodId },
      { withCredentials: true }
    );
 
    setBtnMsg(btnMsg ? false : true);
    (btnMsg) ? setMsg("Successfully added in wishlist") :setMsg("Successfully removed in wishlist");
    setChangePage("/products")
    setShowDialog(true) 
   // console.log(showDialog,msg)
    }
    catch(e){
     setMsg("failed to add")
    }
  };

  return (
    <div>
      <div className="productData">
        <div className="singleProductImages">
          <img
            src={location.state.product_main_image_url}
            width="400"
            height="400"
            alt=""
            className="img-review"
          />
        </div>
    
        <div className="singleProductDetails">
        <Dialog />
          <h3>Product Name: {location.state.product_title}</h3>
          <h4>Product Price: ${location.state.app_sale_price}</h4>          
           <h6>Available Qty :{singleProductDetails.available_quantity}</h6>    

          <button
            className="review-btn"
            onClick={() => addToCart(location.state.id)}
          >
            Add to cart
          </button>

          <button
            className="addToWishlist"
            onClick={() => addToWishList(location.state.id)}
          >
            {btnMsg ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
          <p>Description :{location.state.product_title}</p>
          
          <p >Product Details:
            {/* not able to map, even individual index works sometime, sometime not */}
          {/* {
              singleProductDetails.feature_bullets.map((items)=>{
                return (<li>{items}</li>)
              })
            }  */}
           {/*   <li>{singleProductDetails.feature_bullets[0]}</li>
            <li>{singleProductDetails.feature_bullets[1]}</li>  */}   
           
           {/*  {location.state.id} */}
            <FontAwesomeIcon icon={faPlus}  />
          </p>
          <p>Delivery <FontAwesomeIcon icon={faMinus} />
          </p>
          <ReactStars
            count={5}
            value={rating}
            activeColor="black"
            isHalf={true}
            size={24}
            edit={false}
          />
          <p>{rating}</p>
        </div>
      </div>

      <div className="productReviewContainer">
        <div className="reviewLeft">
          <h3>✨Reviews✨</h3>
          <p>Ratings (651 review)</p>
        </div>
        <div className="reviewRight">
          <button className="review-btn">Write a review</button>
          <br />
          Maria{" "}
          <ReactStars
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
  );
}

export default Product;
