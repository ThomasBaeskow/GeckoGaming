import mongoose from "mongoose"


const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A Cart must belong to a user"]
    },
    products: [
      {
        product_id: String,
        cartQty: Number,
        product_title: String,
        app_sale_price: Number,
        product_main_image_url: String
      }
    ],
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);


// creating a Model out of it: Model variables always wih capital Letter.
const Cart = mongoose.model("Cart",cartSchema)

export default Cart