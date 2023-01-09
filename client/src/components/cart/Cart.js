import "./cart.css";
import React, { useContext, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { MyContext } from "../../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartList, setCartList, totalQtyCart, setTotalQtyCart } =
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
    let cartNewItem = {
      product_id: item.product_id,
      cartQty: item.cartQty >= 1 && item.cartQty - 1,
      product_title: item.product_title,
      app_sale_price: item.app_sale_price,
      product_main_image_url: item.product_main_image_url,
    };
    // console.log("data for cart",cartNewItem)
    //objects  updated  in cart database, through  axios
    await axios.post("/api/v1/cart", cartNewItem, { withCredentials: true });
    //console.log("data for update cart")
    getCart();
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
    await axios.post("/api/v1/cart", cartNewItem, { withCredentials: true });
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
    await axios.delete(`/api/v1/cart/${id}`, {
      withCredentials: true,
    });
    //console.log({product_id:id});
    //getCart will update the cart after deleting
    getCart();
  };

  const getCart = async () => {
    const res1 = await axios.get("/api/v1/cart", {
      withCredentials: true,
    });
    setCartList(res1.data.data.cart.products);
    //console.log("cartlist",cartList)
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

                  <div className="">
                    <p>
                      {item.product_title}
                      {/* <h6> Available quantity: </h6> */}
                    </p>
                    <h5>Product Id: {item.product_id}</h5>
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
                    </div>
                    <p>{item.app_sale_price}</p>
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
          <h4>Quantity of Goods : {totalQtyCart}</h4>
          <p>Promotion code</p>
          <h4>Total:{totalCostCart()} </h4>
          <button>Checkout</button>
          <br />{" "}
          <button
            className="back"
            onClick={() => {
              navigate("/");
            }}
          >
            <p> ← Back to home</p>
          </button>
          {/*   <button >Checkout</button>  */}
          <div id="paypal-button-container">Paypal</div>
          <br /> <p> ← Back to home</p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
