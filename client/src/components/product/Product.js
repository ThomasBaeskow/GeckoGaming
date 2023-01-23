import "./product.css";
import {  useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import ReactStars from "react-stars";
import { MyContext } from "../../context/Context";
import axios from "axios";

function Product() {

  const location = useLocation();
  const [rating, setRating] = useState("");
  const {
    product,
    wishList,
    userData,
    cartList,
    singleProductDetails,
    setSingleProductDetails,
    getCart,
    logged
  } = useContext(MyContext);
const navigate = useNavigate()
  const [btnMsg, setBtnMsg] = useState(
    wishList.map((val) => val.id).includes(location.state.id) ? "Remove" : "Add"
  );

  useEffect(()=>{
    product.length === 0 && navigate('/products')
  },[])
  
 

  const [feature, setFeature] = useState([]);
  //--- Function to get product details based on product_id
  const getSingleProductDetail = async () => {
    // console.log("poduct_id",product,location.state.id)

    // console.log("while entry in product single page",location.state.id,location.state.product_detail_url,location.state,  )
    //--- Note * --- system id stored in wishlist, is not there in productDetails database. To get productDetail we need  product_id which is in productDetails database. so to get product_id based on system id of product database using axios
    const response = await axios.get(`${process.env.REACT_APP_BE_URL}/api/v1/products/${location.state.id}`);
    const product_id = response.data.data.product.product_detail_url.slice(-10);
    //console.log(product_id)

    //now get product details based on product_id to display in single page
    const getProducts1 = await axios.get(
      `${process.env.REACT_APP_BE_URL}/api/v1/product/?product_id=${product_id}`
    );
    //const getProducts1 = await axios.get(`/api/v1/product/`,{product_id });
    let res = getProducts1.data.data.data[0];
    setSingleProductDetails(res);
   // console.log(product_id, res.product_id, res);
    setRating(res.product_details.Customer_Reviews);
    setFeature(res.feature_bullets);

    // console.log(getProducts1.data.data.data[0]);
    // console.log(singleProductDetails.available_quantity)
  };
 

  const [isPlusMinus, setIsPlusMinus] = useState(false);
  const ToggleClass = () => {
    setIsPlusMinus(!isPlusMinus);
  };

  useEffect(() => {
    getSingleProductDetail();
  }, []);


  //adding items to cart
  const addToCart = async (id) => {

    !JSON.parse(localStorage.getItem("logged")) && alert("Please login to add cart"); //Cart is protected route so, need to login to use
    console.log(product)
    const prod_result = product.filter((item) => item.id === id);
   console.log("prod result",prod_result[0].product_detail_url.slice(-10))
    let product_id = prod_result[0].product_detail_url.slice(-10);
    let itemQty = cartList.filter((val) => val.product_id === product_id);
    let cartQty = itemQty.length === 0 ? 1 : itemQty[0].cartQty + 1;
    console.log("item", itemQty, cartQty)

    let cartNewItem = {
      product_id: product_id,
      cartQty: cartQty,
      product_title: prod_result[0].product_title,
      app_sale_price: prod_result[0].app_sale_price,
      product_main_image_url: prod_result[0].product_main_image_url,
    };
    //console.log("data for cart",cartNewItem)
    await axios.post(`${process.env.REACT_APP_BE_URL}/api/v1/cart`, cartNewItem, { withCredentials: true });
    alert("Successfully added in cart");
    getCart();
  };

  //adding items to wishlist in the database
  const addToWishList = async (prodId) => {
    !JSON.parse(localStorage.getItem("logged"))  && alert("Please login to add/remove from wishlist");
    try {
      await axios.put(
        `${process.env.REACT_APP_BE_URL}/api/v1/user/wishlist`,
        { productId: prodId },
        { withCredentials: true }
      );
      alert(
        `${btnMsg === "Add" ? "Added to WishList" : "Removed from WishList"}`
      );
      setBtnMsg(btnMsg === "Remove" ? "Add" : "Remove");
    } catch (e) {
      alert("failed to add");
    }
  };

  return (
    <div className="container-1">
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
          <h3 className="name-product">
            Product Name: {location.state.product_title}
          </h3>
          <h4>Product Price: ${location.state.app_sale_price}</h4>
          <h6>Available Qty :{singleProductDetails.available_quantity}</h6>

          <button
            className="review-btn"
            onClick={() => addToCart(location.state.id)}
          >
            Add to Cart
          </button>

          <button
            className="addToWishlist"
            onClick={() => addToWishList(location.state.id)}
          >
            {btnMsg} WishList
          </button>

          <p>Description :{location.state.product_title}</p>

          <p>
            Product Details:{" "}
            <FontAwesomeIcon
              icon={faPlus}
              className={isPlusMinus ? "minus" : "plus"}
              onClick={ToggleClass}
            />{" "}
            <FontAwesomeIcon
              icon={faMinus}
              className={isPlusMinus ? "plus" : "minus"}
              onClick={ToggleClass}
            />
          </p>
          <div className={isPlusMinus ? "plus" : "minus"}>           
            {feature.length > 0 ? (
              feature.map((item, key) => {
                if (key <= 0) return <li>{item}</li>;
              })
            ) : (
              <li>{location.state.product_title}</li>
            )}
          </div>

          <p>Rating </p>

          

          <p>{rating && parseFloat(rating)}</p>
          <ReactStars
            count={5}
            value={rating && parseFloat(rating)}
            activeColor="yellow"
            isHalf={true}
            size={24}
            edit={false}
          />
        </div>
      </div>

      <div className="productReviewContainer">
        <div className="reviewLeft">
        <h3 className="review">✨Reviews✨</h3>
          <p>
            Ratings (
            {rating &&
              rating.split(" ").filter((item) => item !== " " && item)[5]}{" "}
            review)
          </p>
      
      
        </div>
        <div className="reviewRight">
          <button className="review-btn">Write a review</button>
          <br />
          <p> Maria </p>

          <ReactStars
            count={5}
            value={rating}
            activeColor="black"
            isHalf={true}
            size={24}
            edit={false}
          />
          <p className="date">Date 01.01.2023</p>
          <p className="text-2">Fast Delivery. Recommended! ❤️🎮</p>
        </div>
      </div>
    </div>
  );
}

export default Product;
