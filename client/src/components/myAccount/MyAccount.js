import "./myAccount.css";
import React, { useState, useEffect, useContext } from "react";
import { useLocation,useNavigate,NavLink } from "react-router-dom";
import image from "../../images/profile-pic.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit} from "@fortawesome/free-regular-svg-icons";
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
    setChecked
  } = useContext(MyContext);

  const navigate = useNavigate();    

  useEffect(() => {
    navigate("/myAccount");
  }, []);

  useEffect(() => {
    getWishList();
  }, []);


  //adding items to cart
  const addToCart = (prod_id) => {
    const result = cartList.find(({ id }) => prod_id === id);
    const prod_result = product.find(
      ({ id }) => id === prod_id
    );
    
    if (!result) {
      let cartNewItem = {
        productName: prod_result.product_title.slice(0,20),
        cartQty: 1,
        productPrice: prod_result.app_sale_price,
        productImage:prod_result.product_main_image_url,
        id: prod_result.id,
        availableQty:3
   /*      product_id:prod_id.result.product_detail_url.slice(-10) */
      /*   availableQty: prod_result.availableQty, */
      };
      setCartList([...cartList, cartNewItem]);
    } else {
      result.cartQty++;
      /* if (result.cartQty < prod_result.availableQty) {
        result.cartQty++;
      } else {
        alert(
          `out of stock cannot add more in the list ${result.cartQty} qty available${prod_result.availableQty}`
        ); 
      }*/
    }
    /*    navigate("/products") */
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

  const logOut = async () => {
    const res = await axios
      .get("/api/v1/user/logout", {
        withCredentials: true,
      })
      .then((res) => setUserData("")); 
    navigate("/");
  };

  const getWishList = async () => {
    const res1 = await axios.get("/api/v1/user/seeWishlist", {
      withCredentials: true,
    });
    setWishList(res1.data.data.data);
    console.log("i am wish",wishList)
  };



  return (
    <div> 
      <div className="myAccountContainer">
        <h1 className="myaccount-title">My Account</h1>
        <div className="accountDetail">
          <p className="userName"> Hi,{userData.user.name}</p>

          <div className="myAccountImg">
            <FontAwesomeIcon className="editIcon" icon={faEdit} />

            <img src={image} alt="" />
          </div>
        </div>
        <div className="orderDetail">
          <p>My orders</p>
          <button
          className="viewAll"
          onClick={() => {
            navigate("/viewAll");
          }}
        ><p>View all → </p>
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
                  onClick={() => addToCart(item.id)}
                />

                <NavLink to={`/products/${item}`} state={item}>
                  <img src={item.product_main_image_url} alt="" />
                </NavLink>

                <div className="wishlistItems">
                  <p>{item.product_title && item.product_title.slice(0,10)}</p>
                  <p>{item.app_sale_price}</p>
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
