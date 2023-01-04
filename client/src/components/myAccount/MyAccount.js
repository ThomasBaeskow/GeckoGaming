import "./myAccount.css";
import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import image from "../../images/profile-pic.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faCartPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../context/Context";
import axios from "axios";

function MyAccount() {
  const {
    userData,
    cartList,
    setCartList,
    setUserData,
    wishList,
    setWishList,
    product,
    setChecked,
  } = useContext(MyContext);

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/myAccount");
  }, []);

  useEffect(() => {
    getWishList();
  }, []);

  //adding items to cart
  //const productID = location.state.product_detail_url.slice(-10)

  //adding items to cart
  const addToCart = async (id) => {
    const prod_result = product.filter((item) => item.id === id);
    //console.log("prod result", prod_result[0].product_detail_url.slice(-10));

    let cartNewItem = {
      product_id: prod_result[0].product_detail_url.slice(-10),
      cartQty: 1,
      product_title: prod_result[0].product_title,
      app_sale_price: prod_result[0].app_sale_price,
      product_main_image_url: prod_result[0].product_main_image_url,
    };
   // console.log("data for cartfrom wishlist", cartNewItem);
    await axios.post("/api/v1/cart", cartNewItem, { withCredentials: true });
  };

  //remove product from wishlist
  const removeItem = async (itemId) => {
    await axios.put(
      "/api/v1/user/wishlist",
      { productId: itemId },
      { withCredentials: true }
    );
    getWishList();
  };

  const getWishList = async () => {
    const res1 = await axios.get("/api/v1/user/seeWishlist", {
      withCredentials: true,
    });
    setWishList(res1.data.data.data);
   //console.log("i am wish", wishList);
  };

  const logOut = async () => {
    const res = await axios
      .get("/api/v1/user/logout", {
        withCredentials: true,
      })
      .then((res) => setUserData(""));
    navigate("/");
  };

  return (
    <div>
      <div className="myAccountContainer">
        <h1 className="myaccount-title">My Account</h1>
        <div className="accountDetail">
          <p className="userName"> Hi,{userData.user.name}</p>

          <div className="myAccountImg">
            <FontAwesomeIcon className="editIcon" icon={faEdit} />

            <img src={image} alt="" className="img-profile" />
          </div>
        </div>
        <div className="orderDetail">
          <p>My orders</p>
          <p>View all → </p>
        </div>
        <button
          className="btn"
          onClick={() => {
            logOut();
          }}
        >
          Log out
        </button>
      </div>
      <div>
        <h2>My Wish List</h2>
        <div className="wishlistContainer">
          {wishList.map((item) => {
            return (
              <div className="wishlistImg">
                <FontAwesomeIcon
                  className="delete"
                  icon={faTrash}
                  onClick={() => removeItem(item.id)}
                />
                <FontAwesomeIcon
                  className="addTo-Cart"
                  icon={faCartPlus}
                  //item.id is a system id
                  onClick={() => addToCart(item.id)}
                />

                <NavLink to={`/products/${item}`} state={item}>
                  <img src={item.product_main_image_url} alt="" />
                </NavLink>

                <div className="wishlistItems">
                  <p>{item.product_title && item.product_title.slice(0, 10)}</p>
                  <p>{item.app_sale_price}</p>
                  <p>{item.product_detail_url}</p>
                </div>
                <h1>{item.id}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
