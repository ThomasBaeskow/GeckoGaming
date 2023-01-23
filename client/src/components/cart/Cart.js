import "./cart.css";
import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { MyContext } from "../../context/Context";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartList, setCartList, totalQtyCart, setTotalQtyCart /* getCart */ } =
    useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    getCart();
  }, []);

  // function to decrease the quantity of the items in the cart
  const decrease = async (item) => {
    //alert("hello")
    //console.log(item)
    //objects to be updated in cart database
    if (item.cartQty <= 1) removeItem(item.product_id);
    else {
      let cartNewItem = {
        product_id: item.product_id,
        cartQty: item.cartQty - 1,
        product_title: item.product_title,
        app_sale_price: item.app_sale_price,
        product_main_image_url: item.product_main_image_url,
      };
      // console.log("data for cart",cartNewItem)
      //objects  updated  in cart database, through  axios
      await axios.post(`${process.env.REACT_APP_BE_URL?process.env.REACT_APP_BE_URL: ""}/api/v1/cart`, cartNewItem, { withCredentials: true });
      //console.log("data for update cart")
      getCart();
    }
  };

  // function to increase the quantity of the items in the cart
  const increase = async (item) => {
    //alert("hello")
    //console.log(item)
    //objects to be updated in cart database

    let cartNewItem = {
      product_id: item.product_id,
      cartQty: item.cartQty + 1,
      product_title: item.product_title,
      app_sale_price: item.app_sale_price,
      product_main_image_url: item.product_main_image_url,
    };
    // console.log("data for cart",cartNewItem)
    //objects  updated  in cart database, through  axios
    await axios.post(`${process.env.REACT_APP_BE_URL?process.env.REACT_APP_BE_URL: ""}/api/v1/cart`, cartNewItem, { withCredentials: true });
    //console.log("data for update cart")
    //getCart is called here to get updated cart list
    getCart();
  };

  // function to total quantity of the items in the cart
  setTotalQtyCart(
    cartList.reduce(
      (accumulator, currentValue) => accumulator + currentValue.cartQty,
      0
    )
  );

  // function to calculate total cost of items in the cart
  const getCart = async () => {
    const res1 = await axios.get(`${process.env.REACT_APP_BE_URL?process.env.REACT_APP_BE_URL: ""}/api/v1/cart`, {
      withCredentials: true,
    });
    setCartList(res1.data.data.cart.products);
  };
  const totalCostCart = () => {
    const totalCost = cartList.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.cartQty * currentValue.app_sale_price,
      0
    );
    return totalCost.toFixed(2);
  };

  //remove item from the cart
  const removeItem = async (id) => {
    await axios.delete(`${process.env.REACT_APP_BE_URL?process.env.REACT_APP_BE_URL: ""}/api/v1/cart/${id}`, {
      withCredentials: true,
    });

    //console.log({product_id:id});
    //getCart will update the cart after deleting
    getCart();
  };

  return (
    <div className="yourCart">
      <h1>Your Cart</h1>

      <div className="cartContainer">
        <div className="cartLeft">
          {cartList.map((item, index) => {
            return (
              <>
                <div key={index} className="cartLeft-items">
                  <img
                    src={item.product_main_image_url}
                    alt=""
                    className="cart-img"
                  />

                  <div>
                    <p>{item.product_title}</p>
                    <h5 className="product-id">
                      Product Id: {item.product_id}
                    </h5>
                    <div className="cartQuantityContainer">
                      <button
                        className="decrease cartBtn"
                        onClick={() => decrease(item)}
                      >
                        -
                      </button>
                      <button className="itemQuantity cartBtn">
                        {item.cartQty}
                      </button>

                      <button
                        className="increase cartBtn"
                        onClick={() => increase(item)}
                      >
                        +
                      </button>
                      <div className="price-div">
                        $ {item.app_sale_price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <FontAwesomeIcon
                    className="deleteBtn"
                    icon={faXmarkCircle}
                    onClick={() => removeItem(item.product_id)}
                  />
                </div>
              </>
            );
          })}
        </div>
        <div className="cartRight">
          <h3>Order</h3>

          <h4 className="total">Quantity of Goods: {totalQtyCart}</h4>

          <h4 className="total">Total: ${totalCostCart()} </h4>

          <PayPalScriptProvider
            options={{
              "client-id":
                "ASjPZXDYHNVn1687YJVcQxvQ1DooM7nEb2VN_37PqBdYcDwq-t0OL-RYHAQG__qogmhC9m8bYLls224W",
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: totalCostCart(),
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(function (details) {
                  alert(
                    "Transaction completed by " + details.payer.name.given_name
                  );
                });
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
}

export default Cart;
