import "./myAccount.css";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate,NavLink } from "react-router-dom";
import image from "../../images/profile-pic.jpg";
import pic from "../../images/product-Img/product-img3..jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit} from "@fortawesome/free-regular-svg-icons";
import { faCartPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../context/Context";


function MyAccount() {

  const { userData, setUserData,wishList,setWishList,product } = useContext(MyContext);

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/myAccount");
  }, []);



  return (
    <div>
      {!userData ? navigate("/login") : 

      <><div className="myAccountContainer">
        <h1>My Account</h1>
        <div className="accountDetail">
          <p className="userName"> Hi,{userData.user.name}</p>

          <div className="myAccountImg">
            <FontAwesomeIcon className="editIcon" icon={faEdit} />

            <img src={image} alt="" />
          </div>
        </div>
        <div className="orderDetail">
          <p>My orders</p>
          <p>View all → </p>
        </div>
        <button
          className="btn"
          onClick={() => {
            setUserData("");
            navigate("/");
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
                {/* <FontAwesomeIcon className="heart-wish" icon={faHeart} />  */}
                <FontAwesomeIcon className="delete" icon={faTrash}/>
                
                {/* do we need to show heart in wishlist items? or just a delete icon here to remove */}
               
                <FontAwesomeIcon className="addTo-Cart" icon={faCartPlus}  />
                <NavLink to={`/products/${item.product_id}`}  state={item} ><img src={pic} alt=""/></NavLink>
                {/* <img src={pic} alt="" /> */}
                <div className="wishlistItems">
                  <p>{item.productName}</p>
                  <p>{item.productPrice}</p>
                 
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </>}
    </div>

  );
}

export default MyAccount;
