import express from "express"
import {getAllProductsDetail, getProductDetail, addToWishList } from "../controllers/productDetailController.js"
import { protect } from "../controllers/authController.js"


const router = express.Router()


router
.route("/")
.get(getAllProductsDetail)
// .post(createProduct)

router
.route("/:id")
.get(getProductDetail)
// .patch()
// .delete()

router
.route("/wishlist")
.put(protect,addToWishList)

export default router