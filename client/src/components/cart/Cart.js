import "./cart.css";
import React, { useState } from "react";
import cartImg from "../../images/product-Img/product-img2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";

function Cart() {
  const [product, setProduct] = useState([
    {
      productName: "bag",
      cartQty: 0,
      productPrice: 20,
      product_id: 1,
      availableQty: 2,
    },
    {
      productName: "bag",
      cartQty: 0,
      productPrice: 20,
      product_id: 2,
      availableQty: 25,
    },
    {
      productName: "shoe",
      cartQty: 0,
      productPrice: 10,
      product_id: 3,
      availableQty: 5,
    },
    {
      productName: "cloth",
      cartQty: 0,
      productPrice: 30,
      product_id: 4,
      availableQty: 8,
    },
    {
      productName: "cloth",
      cartQty: 0,
      productPrice: 30,
      product_id: 5,
      availableQty: 5,
    },
  ]);

  const decrease = (product_id) => {
    setProduct((product) =>
      product.map((item) =>
        product_id === item.product_id
          ? { ...item, cartQty: item.cartQty -(item.cartQty > 1 ? 1: 0)  }
          : item
      )
    );
  };

  const increase = (product_id) => {
    setProduct((product) =>
      product.map((item) =>
        product_id === item.product_id
          ? { ...item, cartQty: item.cartQty + (item.cartQty < item.availableQty ? 1: 0) }
          : item
      )
    );
  };

  const totalQtyCart = () => {
    const totalQty = product.reduce(
      (accumulator, currentValue) => accumulator + currentValue.cartQty,
      0
    );
    return totalQty;
  };
  const totalCostCart = () => {
    const totalCost = product.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.cartQty * currentValue.productPrice,
      0
    );
    return totalCost;
  };

 const removeItem =(product_id)=>{
  setProduct(product.filter(item=>item.product_id !== product_id))
} 





  return (
    <div className="yourCart">
      <h1>Your Cart</h1>

      <div className="cartContainer">
        <div className="cartLeft">
          {product.map((item, index) => {
            return (
              <>
                <div key={index} className="cartLeft-items">
                  <img src={cartImg} alt="" className="cart-img" />

                  <div className="">
                    <p>
                      {item.productName} {item.product_id}
                    </p>
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
                    <p>{item.productPrice}</p>
                    {/*       <p>{item.product.sellingPrice * item.product.cartQty}</p> */}
                  </div>
                  <FontAwesomeIcon className="deleteBtn" icon={faXmarkCircle} onClick= {()=>removeItem(item.product_id)} />
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
