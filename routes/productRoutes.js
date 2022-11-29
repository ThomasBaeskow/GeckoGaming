import express from "express"
import { getAllProducts } from "../controllers/productController.js"


const router = express.Router()


router
.route("/")
.get(getAllProducts)
// .post(createProduct)

// router
// .route("/:id")
// .get(getTour)
// .patch()
// .delete()



export default router