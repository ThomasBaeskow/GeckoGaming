import express from "express"
import {getAllProductsDetail, getProductDetail } from "../controllers/productDetailController.js"
import { protect } from "../controllers/authController.js"


const router = express.Router()


router
.route("/")
.get(getAllProductsDetail)
// .post(createProduct)

router
.route("/:product_id")
.get(getProductDetail)
// .patch()
// .delete()

// router
// .route("/wishlist")
// .put(protect, addToWishList)

export default router