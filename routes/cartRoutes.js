import express from "express"
import {protect} from "../controllers/authController.js"
import { getMe } from "../controllers/userController.js"
import { addToCart, getCart } from "../controllers/cartController.js"



const router = express.Router()


router.use(protect)

router
.route("/")
.post(addToCart)
.get(getCart)






export default router