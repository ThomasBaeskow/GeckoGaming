import "./myAccount.css";
import React, { useState,useEffect} from "react";
import {useNavigate } from "react-router-dom"
import image from "../../images/profile-pic.jpg";
import pic from "../../images/product-Img/product-img3..jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faHeart } from "@fortawesome/free-regular-svg-icons";
import {MyContext} from "../../context/Context"
import { useContext } from "react";


function MyAccount() {
  const [user, setUser] = useState([false]);
  const{userData,setUserData} = useContext(MyContext)

const navigate = useNavigate();

useEffect(() => {
 navigate("/myAccount")
}, [])

  const [product, setProduct] = useState([
    { productName: "bag", productQty: 8, productPrice: 20 },
    { productName: "bag", productQty: 9, productPrice: 20 },
    { productName: "shoe", productQty: 8, productPrice: 10 },
    { productName: "cloth", productQty: 6, productPrice: 30 },
    { productName: "cloth", productQty: 5, productPrice: 30 },
  ]);


 
  return (
    <div>
{
            !userData && (navigate("/login"))

          }

      <div className="myAccountContainer">
        <h1>MyAccount</h1>
        <div className="accountDetail">
          <p className="userName"> Hi,{userData.name}</p>

          <div className="myAccountImg">
            <FontAwesomeIcon className="editIcon" icon={faEdit} />

            <img src={image} alt="" />
          </div>
        </div>
        <div className="orderDetail">
          <p>My orders</p>
          <p>View all → </p>
        </div>
        <button className="btn" onClick={()=>{setUserData("");navigate("/")}}>Log out</button>
      </div>
      <div>
       <h2> Wish List</h2>
        <div className="wishlistContainer">
          {product.map((item) => {
            return (
              <div className="wishlistImg">
                <FontAwesomeIcon className="wishListIcon" icon={faHeart} />
                <img src={pic} alt="" />
                <div className="wishlistItems">
                  <p>{item.productName}</p>
                  <p>{item.productPrice}</p>
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
