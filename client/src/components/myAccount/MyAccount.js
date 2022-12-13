import "./myAccount.css";
import React, { useState, useEffect, useContext } from "react";
import { useLocation,useNavigate,NavLink } from "react-router-dom";
import image from "../../images/profile-pic.jpg";
import pic from "../../images/product-Img/product-img3..jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit} from "@fortawesome/free-regular-svg-icons";
import { faCartPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../context/Context";


function MyAccount() {
  const location = useLocation();

  const { userData,cartList,setCartList, setUserData,wishList,setWishList,product } = useContext(MyContext);

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/myAccount");
  }, []);

  //adding items to cart
  const addToCart = (prod_id) => {
    const result = cartList.find(({ product_id }) => product_id === prod_id)
    const prod_result = product.find(({ product_id }) => product_id === prod_id)
    if(!result){        
      let cartNewItem = 
      {
        productName: prod_result.productName,
        cartQty: 1,
        productPrice: prod_result.productPrice,
        product_id: prod_result.product_id,
        availableQty: prod_result.availableQty,
      }
      setCartList([...cartList, cartNewItem])
    }
    else{
      if(result.cartQty<prod_result.availableQty){
      result.cartQty++
        }
      else{
      alert(`out of stock cannot add more in the list ${result.cartQty} qty available${prod_result.availableQty}`)
    }}
  }

  //remove product from wishlist
  const removeItem =(product_id)=>{
    setWishList(wishList.filter(item=>item.product_id !== product_id))
  } 


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
                <FontAwesomeIcon className="delete" icon={faTrash} onClick= {()=>removeItem(item.product_id)} />
                <FontAwesomeIcon className="addTo-Cart" icon={faCartPlus} onClick={()=>addToCart(item.product_id)} />
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
