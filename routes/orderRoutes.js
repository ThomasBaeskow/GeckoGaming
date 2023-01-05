import express from "express"
import { capturePayment, createOrder } from "../controllers/orderController.js"
import { protect } from "../controllers/authController.js"



const router = express.Router()

router.use(protect)

router
.route("/")
.post(createOrder)



router
.route("/:orderID/capture")
.post(capturePayment)



export default router