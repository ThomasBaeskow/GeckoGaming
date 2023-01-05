import "./cart.css";
import React, { useContext, useEffect, useState } from "react";
import cartImg from "../../images/product-Img/product-img2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import {MyContext} from "../../context/Context"
import axios from "axios";

function Cart() {
  const{cartList,setCartList,productDetails,totalQtyCart,setTotalQtyCart} = useContext(MyContext)

 

// function to decrease the quantity of the items in the cart
  const decrease = (product_id) => {
    setCartList((product) =>
      product.map((item) =>
        product_id === item.product_id
          ? { ...item, cartQty: item.cartQty -(item.cartQty > 0 ? 1: 0)  }
          : item
      )
    );
  };

// function to increase the quantity of the items in the cart  
  const increase = (product_id) => {
    setCartList((product) =>
      product.map((item) =>
        product_id === item.product_id
          ? { ...item, cartQty: item.cartQty +1}//item.cartQty < item.availableQty ? 1: 0) }
          : item
      )
    );
  };

// function to total quantity of the items in the cart

  setTotalQtyCart (cartList.reduce(
      (accumulator, currentValue) => accumulator + currentValue.cartQty,
      0
    ));




 // function to cost of items in the cart  
  const totalCostCart = () => {
    const totalCost = cartList.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.cartQty * currentValue.app_sale_price,
      0
    );
    return totalCost.toFixed(2);
  };


//remove item from the cart  
  const removeItem =async(id)=>{   
  await axios.delete(`/api/v1/cart/${id}`, {
    withCredentials: true,
  });
  //console.log({product_id:id}); 
  //getCart will update the cart after deleting 
  getCart()

}

const getCart = async()=>{
  const res1 = await axios.get("/api/v1/cart", {
    withCredentials: true,
  });
  setCartList(res1.data.data.cart.products)
  //console.log("cartlist",cartList)
}

useEffect(()=>{
  getCart()
},[cartList,setCartList])

  return (
    <div className="yourCart">
      <h1>Your Cart</h1>

      <div className="cartContainer">
        <div className="cartLeft">
          {cartList.map((item, index) => {
            return (
              <>
                <div key={index} className="cartLeft-items">
                  <img src={item.product_main_image_url} alt="" className="cart-img" />

                  <div className="">
                    <p>
                      {item.product_title}<h6>Available quantity: {/* {productDetails.availableQty} */}</h6>
                    </p>
                    <p>{item.product_id}</p>
                    <div className="cartQuantityContainer">
                      <button
                        className="decrease cartBtn"
                        onClick={() => decrease(item.product_id)}
                      >
                        -
                      </button>
                      <button className="itemQuantity cartBtn">
                        {item.cartQty}
                      </button>
                      <button
                        className="increase cartBtn"
                        onClick={() => increase(item.product_id)}
                      >
                        +
                      </button>
                    </div>
                    <p>{item.app_sale_price}</p>
                    {/*       <p>{item.product.sellingPrice * item.product.cartQty}</p> */}
                  </div>
                  <FontAwesomeIcon className="deleteBtn" icon={faXmarkCircle} onClick=  {()=>removeItem(item.product_id)}  />
                </div>
              </>
            );
          })}
        </div>
        <div className="cartRight">
          <h3>Order</h3>
          <h4>Quantity of Goods :  {totalQtyCart}</h4>
         
          <p>Promotion code</p>
          <h4>Total:{totalCostCart()} </h4>
          <button>Checkout</button>
          <br /> <p> ← Back to home</p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
