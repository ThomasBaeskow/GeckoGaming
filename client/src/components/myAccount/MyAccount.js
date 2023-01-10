import "./myAccount.css";
import React, { useEffect, useContext, useState } from "react";

import { useNavigate, NavLink } from "react-router-dom";

import image from "../../images/profile-pic.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faCartPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../context/Context";
import axios from "axios";
import FileBase64 from "react-file-base64";

function MyAccount() {
  const {
    userData,
    cartList,
    setUserData,
    wishList,
    setWishList,
    product,
    getCart,
  } = useContext(MyContext);

  const navigate = useNavigate();

  const [newImage, setNewImage] = useState({
    photo: "",
  });

  useEffect(() => {
    getWishList();
  }, []);

  //adding items to cart
  const addToCart = async (id) => {
    //console.log("product front", product);
    const prodExists = product.filter((item) => item.id === id);
    //console.log("single product", prodExists.length);
    // check if product is there in front end product array ---if not
    if (prodExists.length === 0) {
      const response = await axios.get(`/api/v1/products/${id}`);
      const prod_result = response.data.data.product;

      let product_id = prod_result.product_detail_url.slice(-10);
      //  console.log("producy id:", product_id)
      let itemQty = cartList.filter((val) => val.product_id === product_id);
      let cartQty = itemQty.length === 0 ? 1 : itemQty[0].cartQty + 1;
      //console.log("item", itemQty, cartQty)

      let cartNewItem = {
        product_id: product_id,
        cartQty: cartQty,
        product_title: prod_result.product_title,
        app_sale_price: prod_result.app_sale_price,
        product_main_image_url: prod_result.product_main_image_url,
      };

      //console.log("data for cart from wishlist", cartNewItem);
      await axios.post("/api/v1/cart", cartNewItem, { withCredentials: true });
      alert("successfully added");
      getCart();
    }
    // check if product is there in front end product array -- if there
    else {
      const prod_result = product.filter((item) => item.id === id);
      //console.log("prod result",prod_result[0].product_detail_url.slice(-10))
      let product_id = prod_result[0].product_detail_url.slice(-10);
      let itemQty = cartList.filter((val) => val.product_id === product_id);
      let cartQty = itemQty.length === 0 ? 1 : itemQty[0].cartQty + 1;
      //console.log("item", itemQty, cartQty)

      let cartNewItem = {
        product_id: product_id,
        cartQty: cartQty,
        product_title: prodExists[0].product_title,
        app_sale_price: prodExists[0].app_sale_price,
        product_main_image_url: prodExists[0].product_main_image_url,
      };

      //console.log("data for cart from wishlist", cartNewItem);
      await axios.post("/api/v1/cart", cartNewItem, { withCredentials: true });

      alert("successfully added");

      getCart();
    }
  };

  //remove product from wishlist
  const removeItem = async (itemId) => {
    await axios.put(
      "/api/v1/user/wishlist",
      { productId: itemId },
      { withCredentials: true }
    );

    alert("successfully removed");
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
    const res = await axios.get("/api/v1/user/logout", {
      withCredentials: true,
    });

    setUserData("");
    alert("successfully logged out");
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", newImage.photo);

    axios
      .patch("/api/v1/user/updateMe", formData)
      .then((res) => {
        console.log("hi im the response", res);
      })
      .catch((err) => {
        console.log("im the error", err);
      });

    //  const updatedUser = axios.get("/api/v1/user/me")
    //  .then(res => {
    //     console.log("hi im the response",res);
    //  })
    //  .catch(err => {
    //     console.log("im the error",err);
    //  });

    //  setUserData(updatedUser)
    console.log("hi im the userData", userData);
    console.log("hi im the image file", newImage.photo.name);
    console.log("hi im the formData", formData.get("photo"));
    console.log("hi im the image", newImage);
  };

  const handlePhoto = (e) => {
    setNewImage({ ...newImage, photo: e.target.files[0] });
  };

  return (
    <div>
      <div className="myAccountContainer">
        <h1 className="myaccount-title">My Account</h1>
        <div className="accountDetail">
          <p className="userName"> Hi,{userData.user.name}</p>

          <div className="myAccountImg">
            

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              name="photo"
            >
              <button className="upload">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className="editIcon"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handlePhoto}
              >
                <path d="M7,17.013l4.413-0.015l9.632-9.54c0.378-0.378,0.586-0.88,0.586-1.414s-0.208-1.036-0.586-1.414l-1.586-1.586	c-0.756-0.756-2.075-0.752-2.825-0.003L7,12.583V17.013z M18.045,4.458l1.589,1.583l-1.597,1.582l-1.586-1.585L18.045,4.458z M9,13.417l6.03-5.973l1.586,1.586l-6.029,5.971L9,15.006V13.417z"></path>
                <path d="M5,21h14c1.103,0,2-0.897,2-2v-8.668l-2,2V19H8.158c-0.026,0-0.053,0.01-0.079,0.01c-0.033,0-0.066-0.009-0.1-0.01H5V5	h6.847l2-2H5C3.897,3,3,3.897,3,5v14C3,20.103,3.897,21,5,21z"></path>
              </svg>
            </button>
              <label>
                <input
                 
                  name="photo"
                 
                />
              </label>
              <input type="submit" />
            </form>

            <img src={newImage} alt="" className="img-profile" />
          </div>
        </div>
        <div className="orderDetail">
          <p>My orders</p>
          <button
            className="viewAll-btn"
            onClick={() => {
              navigate("/ViewAll");
            }}
          >
            View All ➡️
          </button>
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
      <p className="reset">
        Update My Password{" "}
        <button onClick={() => navigate("/UpdatePassword")}>
          {" "}
          Click to update
        </button>{" "}
      </p>
      <div>
        <h2>My Wish List</h2>
        <div className="wishlistContainer">
          {wishList.map((items) => {
            //changes from item to items to get product_id in single product page from wishlist at it has system product id
            return (
              <div className="wishlistImg">
                <FontAwesomeIcon
                  className="delete"
                  icon={faTrash}
                  onClick={() => removeItem(items.id)}
                />
                <FontAwesomeIcon
                  className="addTo-Cart"
                  icon={faCartPlus}
                  //item.id is a system id from product database
                  onClick={() => addToCart(items.id)}
                />

                <NavLink to={`/products/${items.id}`} state={items}>
                  <img src={items.product_main_image_url} alt="" />
                </NavLink>

                <div className="wishlistItems">
                  <p>
                    {items.product_title && items.product_title.slice(0, 10)}
                  </p>
                  <p>{items.app_sale_price}</p>
                  <p>{items.product_detail_url}</p>
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
