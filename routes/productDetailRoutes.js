import express from "express"
import {getAllProductsDetail, getProductDetail } from "../controllers/productDetailController.js"


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



export default router