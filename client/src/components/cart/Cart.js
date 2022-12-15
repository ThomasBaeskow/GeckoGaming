import "./cart.css";
import React, { useContext, useState } from "react";
import cartImg from "../../images/product-Img/product-img2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import {MyContext} from "../../context/Context"

function Cart() {
  const{cartList,setCartList} = useContext(MyContext)

 

// function to decrease the quantity of the items in the cart
  const decrease = (product_id) => {
    setCartList((product) =>
      product.map((item) =>
        product_id === item.id
          ? { ...item, cartQty: item.cartQty -(item.cartQty > 0 ? 1: 0)  }
          : item
      )
    );
  };

// function to increase the quantity of the items in the cart  
  const increase = (product_id) => {
    setCartList((product) =>
      product.map((item) =>
        product_id === item.id
          ? { ...item, cartQty: item.cartQty + (item.cartQty < item.availableQty ? 1: 0) }
          : item
      )
    );
  };

// function to total quantity of the items in the cart

  const totalQtyCart = () => {
    const totalQty = cartList.reduce(
      (accumulator, currentValue) => accumulator + currentValue.cartQty,
      0
    );
    return totalQty;
  };



 // function to cost of items in the cart  
  const totalCostCart = () => {
    const totalCost = cartList.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.cartQty * currentValue.productPrice,
      0
    );
    return totalCost;
  };


//remove item from the cart  
 const removeItem =(product_id)=>{
  setCartList(cartList.filter(item=>item.id !== product_id))
} 





  return (
    <div className="yourCart">
      <h1>Your Cart</h1>

      <div className="cartContainer">
        <div className="cartLeft">
          {cartList.map((item, index) => {
            return (
              <>
                <div key={index} className="cartLeft-items">
                  <img src={item.productImage} alt="" className="cart-img" />

                  <div className="">
                    <p>
                      {item.productName}<h6>Available quantity:{/*  {item.availableQty} */}</h6>
                    </p>
                    <div className="cartQuantityContainer">
                      <button
                        className="decrease cartBtn"
                        onClick={() => decrease(item.id)}
                      >
                        -
                      </button>
                      <button className="itemQuantity cartBtn">
                        {item.cartQty}
                      </button>
                      <button
                        className="increase cartBtn"
                        onClick={() => increase(item.id)}
                      >
                        +
                      </button>
                    </div>
                    <p>{item.productPrice}</p>
                    {/*       <p>{item.product.sellingPrice * item.product.cartQty}</p> */}
                  </div>
                  <FontAwesomeIcon className="deleteBtn" icon={faXmarkCircle} onClick= {()=>removeItem(item.id)} />
                </div>
              </>
            );
          })}
        </div>
        <div className="cartRight">
          <h3>Order</h3>
          <h4>Quantity of Goods :  {totalQtyCart()}</h4>
         
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
