import * as paypal from "../utils/paypal.js";

// // Create Order:
export const createOrder = async (req, res) => {
    const order = await paypal.createOrder(req, res);
    // console.log(req.user.id);
    res.json(order);
}


// // Capture Order
export const capturePayment = async (req, res) => {
    const { orderId } = req.params;
    const captureData = await paypal.capturePayment(orderId);
    res.json(captureData);
}


