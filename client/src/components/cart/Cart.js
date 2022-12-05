import "./cart.css";
import React, { useState } from "react";
import cartImg from "../../images/product-Img/product-img2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";

function Cart() {
  const [product, setProduct] = useState([
    { productName: "bag", productQty: 8, productPrice: 20 },
    { productName: "bag", productQty: 9, productPrice: 20 },
    { productName: "shoe", productQty: 8, productPrice: 10 },
    { productName: "cloth", productQty: 6, productPrice: 30 },
    { productName: "cloth", productQty: 5, productPrice: 30 },
  ]);

  const [quantity, setQuantity] = useState(0);

  const decrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };
  return (
    <div className="yourCart">
      <h1>Your Cart</h1>

      <div className="cartContainer">
        <div className="cartLeft">
          {product.map((item) => {
            return (
              <>
                <div className="cartLeft-items">
                  <img src={cartImg} alt="" />

                  <div className="">
                    <p>{item.productName}</p>
                    <div className="cartQuantityContainer">
                      <button className="decrease cartBtn" onClick={decrease}>
                        
                        -
                      </button>
                      <button className="itemQuantity cartBtn">
                        {quantity}
                      </button>
                      <button className="increase cartBtn" onClick={increase}>
                        
                        +
                      </button>
                    </div>
                    <p>{item.productPrice}</p>
                  </div>
                  <FontAwesomeIcon className="deleteBtn" icon={faXmarkCircle} />
                </div>
              </>
            );
          })}
        </div>
        <div className="cartRight">
          <h3>Order</h3>
          <p>Quantity of Goods : </p>
          <p>Promotion code</p>
          <h4>Total: </h4>
          <button>Checkout</button>
          <br /> <p> ← Back to home</p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
