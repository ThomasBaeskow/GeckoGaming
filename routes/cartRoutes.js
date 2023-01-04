import express from "express"
import {protect} from "../controllers/authController.js"
import { addToCart, getCart, deleteFromCard } from "../controllers/cartController.js"



const router = express.Router()


router.use(protect)

router
.route("/")
.post(addToCart)
.get(getCart)
// .delete(deleteFromCard)


router
.route("/:product_id")
.delete(deleteFromCard)






export default router