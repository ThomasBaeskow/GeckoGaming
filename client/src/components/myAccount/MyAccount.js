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
  const navigate = useNavigate();

  const {
    userData,
    cartList,
    setCartList,
    setUserData,
    wishList,
    setWishList,
    product,
    getCart,
    setLogged,
    logged,
  } = useContext(MyContext);

  const [profile, setProfile] = useState(" ");
  const [newImage, setNewImage] = useState({
    photo: "",
  });

  useEffect(() => {
    uploadProfile();
  }, []);

  useEffect(() => {
    getWishList();
  }, []);

  async function uploadProfile() {
    try {
      const response = await axios.get("/api/v1/user/me");
      setProfile(response.data.data.data.photo);
      // console.log(response.data.data.data);
    } catch (err) {
      console.log(err);
    }
  }

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
    getWishList();
  };

  const getWishList = async () => {
    const res1 = await axios.get("/api/v1/user/seeWishlist", {
      withCredentials: true,
    });
    setWishList(res1.data.data.data);
  };

  const logOut = async () => {
    const res = await axios.get("/api/v1/user/logout", {
      withCredentials: true,
    });

    setUserData("");
    localStorage.removeItem("logged");
    setCartList([]);
    alert("successfully logged out");
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", newImage.photo);

    const response = await axios
      .patch("/api/v1/user/updateMe", formData)
      .then((res) => {
        console.log("hi im the response", res.data.data.user.photo);
        setProfile(res.data.data.user.photo);
      })
      .catch((err) => {
        console.log("im the error", err);
      });

    console.log("hi im the userData", userData);
    console.log("hi im the image file", newImage.photo);
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
          <p className="userName">
            {" "}
            Hi,{JSON.parse(localStorage.getItem("logged"))}
          </p>

          <div className="myAccountImg">
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              name="photo"
            >
              <label>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="photo"
                  onChange={handlePhoto}
                />
              </label>
              <input type="submit" />
            </form>
            {/* {console.log(profile)} */}
            <img
              src={`http://localhost:5000/images/${profile}`}
              alt=""
              className="img-profile"
            />
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
        <div className="btn-container">
          <button
            className="btn"
            onClick={() => {
              logOut();
            }}
          >
            Log out
          </button>
          <button className="btn" onClick={() => navigate("/UpdatePassword")}>
            {" "}
            Change Password
          </button>{" "}
        </div>
      </div>
      <div>
        <h2>My Wish List</h2>
        <div className="wishlistContainer">
          {wishList.map((items, index) => {
            //changes from item to items to get product_id in single product page from wishlist at it has system product id
            return (
              <div key={index} className="wishlistImg">
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
                  <p>${items.app_sale_price}</p>
                  <p>{items.product_detail_url}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
