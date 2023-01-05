import "./myAccount.css";
import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import image from "../../images/profile-pic.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faCartPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../context/Context";
import axios from "axios";
import Dialog from "../dialog/Dialog";

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
    showDialog,setShowDialog,
    msg,setMsg
  } = useContext(MyContext);

  const navigate = useNavigate();

  useEffect(()=>{
    setMsg("")
    setShowDialog(false)
  },[])

 

  useEffect(() => {
    navigate("/myAccount");
  }, []);

  useEffect(() => {
    getWishList();
  }, []);

  //adding items to cart
  const addToCart = async (id) => {
    //console.log("product front", product);
    const prodExists = product.filter((item) => item.id === id);
    //console.log("single product", prodExists.length);

    if (prodExists.length === 0) {
      const response = await axios.get(`/api/v1/products/${id}`);
      const prod_result = response.data.data.product;

      let cartNewItem = {
        product_id: prod_result.product_detail_url.slice(-10),
        cartQty: 1,
        product_title: prod_result.product_title,
        app_sale_price: prod_result.app_sale_price,
        product_main_image_url: prod_result.product_main_image_url,
      };

      //console.log("data for cart from wishlist", cartNewItem);
      await axios.post("/api/v1/cart", cartNewItem, { withCredentials: true });
      setShowDialog(true)
      setMsg("successfully added")
    } else {
      let cartNewItem = {
        product_id: prodExists[0].product_detail_url.slice(-10),
        cartQty: 1,
        product_title: prodExists[0].product_title,
        app_sale_price: prodExists[0].app_sale_price,
        product_main_image_url: prodExists[0].product_main_image_url,
      };
  
      //console.log("data for cart from wishlist", cartNewItem);
      await axios.post("/api/v1/cart", cartNewItem, { withCredentials: true });
      setShowDialog(true)
       setMsg("successfully added")
    }
  };

  //remove product from wishlist
  const removeItem = async (itemId) => {
    await axios.put(
      "/api/v1/user/wishlist",
      { productId: itemId },
      { withCredentials: true }
    );
    setShowDialog(true)
    setMsg("successfully removed")
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
      //setShowDialog(true)
      //setMsg("successfully logged out")
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
        <Dialog msg={msg} />
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
                {/* <h1>{item.id}</h1> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
