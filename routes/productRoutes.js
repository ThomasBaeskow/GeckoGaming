import express from "express"
import { getAllProducts, getProduct } from "../controllers/productController.js"




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



export default router