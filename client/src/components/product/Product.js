import "./product.css";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import ReactStars from "react-stars";
import { MyContext } from "../../context/Context";

function Product() {
  const location = useLocation();
  const [rating, setRating] = useState(4.7);
  const { product, setCartList, cartList, setWishList, wishList } = useContext(
    MyContext
  );
  const navigate = useNavigate();

  //adding items to cart
  const addToCart = (prod_id) => {
    const result = cartList.find(({ product_id }) => product_id === prod_id);
    const prod_result = product.find(
      ({ product_id }) => product_id === prod_id
    );
    if (!result) {
      let cartNewItem = {
        productName: prod_result.productName,
        cartQty: 1,
        productPrice: prod_result.productPrice,
        product_id: prod_result.product_id,
        availableQty: prod_result.availableQty,
      };
      setCartList([...cartList, cartNewItem]);
    } else {
      if (result.cartQty < prod_result.availableQty) {
        result.cartQty++;
      } else {
        alert(
          `out of stock cannot add more in the list ${result.cartQty} qty available${prod_result.availableQty}`
        );
      }
    }
    /*    navigate("/products") */
  };

  //adding items to wishlist
  const addToWishList = (prod_id) => {
    const findWishedItem = wishList.find(
      ({ product_id }) => product_id === prod_id
    );
    const prod_result = product.find(
      ({ product_id }) => product_id === prod_id
    );
    if (findWishedItem) {
      alert("already in wishlist");
      navigate("/products");
    } else {
      let wishListNewItem = {
        productName: prod_result.productName,
        productPrice: prod_result.productPrice,
        product_id: prod_result.product_id,
      };
      setWishList([...wishList, wishListNewItem]);
      /*   navigate("/products") */
    }
  };

  return (
    <div>
      <div className="productData">
        <div className="singleProductImages">
          <img
            src={location.image}
            width="200"
            height="200"
            alt=""
            className="img-review"
          />
        </div>
        <div className="singleProductDetails">
          <h3>Product Name: {location.state.productName}</h3>
          <h4>Product Price: ${location.state.productPrice}</h4>
          <h6>Available Qty :{location.state.availableQty}</h6>
          <h5>Color: </h5>
          <button
            className="review-btn"
            onClick={() => addToCart(location.state.product_id)}
          >
            Add to cart
          </button>
          {/* can we add a wishlist button here?? do we need another button */}
          <button
            className="addToWishlist"
            onClick={() => addToWishList(location.state.product_id)}
          >
            Add to Wishlist
          </button>
          <p>Description :{location.state.description}</p>

          <p>
            Product Details:{location.state.productDetails}{" "}
            <FontAwesomeIcon icon={faPlus} />
          </p>
          <p>
            Delivery <FontAwesomeIcon icon={faMinus} />
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
