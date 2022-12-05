import mongoose from "mongoose"
import Product from "./product.js"


const categorySchema = mongoose.Schema({
    productType: {
        type: String,
        default: "console"
    },
    brand: {
        type: String,
        default: "ps5"
    },
    // product_id: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Product"
    // },
    product_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Product"
    },
    isBestSeller: {
        type: Boolean,
    },
    product_title: {
        type: String,
        trim: true
    },
    product_main_image_url: String,
    app_sale_price: String,
    app_sale_price_currency: String,
    product_detail_url: String,
    evaluate_rate: String,
    original_price: String,
    createAt: {
        type: Date,
        default: Date.now(),
        select: false // we can exclude fields in the model Schema like this
    },
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
}
)

categorySchema.virtual("productDetails", {
    ref: "Product",
    foreignField: "category", // "tour" is the field in Review model where we implemented the Parent Referencing to the Tour model
    localField: "_id" // "_id" is called "tour" in the Review model. Thats how we build the connection between Review and Tour
})


// middleware for manipulating query before find() executes.
categorySchema.pre(/^find/, function(next) {
    this.populate({ // populate(fieldName) // we fill the field guide with the actual data instead of just showing the id of the users. we replace the id with the users data.
      path: "product_id", // field we want to update
      select: "-__v" // which fields we want to exclude
    })
    next()
  })

// creating a Model out of it: Model variables always wih capital Letter.
const Category = mongoose.model("Category",categorySchema)

export default Category