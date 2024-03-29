import dotenv from "dotenv"
import Cart from "../models/cart.js"
import User from "../models/user.js"


dotenv.config({path:"./.env"})


const {PAYPAL_CLIENT_ID, PAYPAL_SECRET} = process.env



const base = "https://api-m.sandbox.paypal.com"


export const createOrder = async (req, res) => {

    const userId = req.user.id
    const cart = await Cart.findOne({userId})
    // const user = await User.findByIdAndUpdate(userId, user.orders.push(cart.products.product_id, {
    //   new: true, // returns the updated object instead of the old one
    //   runValidators: false
    // }))


    // console.log(user.orders);

    const initialValue = 0;
    const sumWithInitial = cart.products.reduce(
    (accumulator, currentValue) => accumulator + currentValue.app_sale_price,
    initialValue
    );

    const convertNumber = sumWithInitial.toFixed(2)

    // console.log(convertNumber);

    // console.log(sumWithInitial);
    
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: convertNumber,
            },
          },
        ],
      }),
    });
    const data = await response.json();
    console.log(data);


    // console.log(user.orders);

    return data;
  }


export async function capturePayment(orderID) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}

async function generateAccessToken() {
  const response = await fetch(base + "/v1/oauth2/token", {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization:
        "Basic " + Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_SECRET).toString("base64"),
    },
  });
  const data = await response.json();
  return data.access_token;
}