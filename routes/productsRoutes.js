import express from "express"
import {getAllProductsWithCategory, getProductWithCategory } from "../controllers/productsController.js"


const router = express.Router()


router
.route("/")
.get(getAllProductsWithCategory)
// .post(createProduct)

router
.route("/:id")
.get(getProductWithCategory)
// .patch()
// .delete()



export default router