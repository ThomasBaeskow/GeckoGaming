import express from "express"
import { getAllProducts, getProduct, addToWishList, getWishList } from "../controllers/productController.js"
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

router.use(protect)

router
.route("/wishlist")
.put(addToWishList)
// .get(getWishList)

router
.route("/wishlist/:id")
.get(getWishList)




export default router