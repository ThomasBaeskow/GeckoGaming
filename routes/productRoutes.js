import express from "express"
import { getAllProducts, getProduct, addToWishList } from "../controllers/productController.js"
import {protect} from "../controllers/authController.js"




const router = express.Router()


router
.route("/")
.get(getAllProducts)
// .post(createProduct)

router
.route("/:id")
.get(getProduct)
// .patch()
// .delete()

router
.route("/wishlist")
.put(protect, addToWishList)


export default router