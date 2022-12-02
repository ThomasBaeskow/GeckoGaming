import mongoose from "mongoose"


const productOldSchema = mongoose.Schema({
    productType: {
        type: String,
        default: "accessories"
    },
    brand: {
        type: String,
        default: "xbox-x/s-controller"
    },
    isBestSeller: {
        type: Boolean,
    },
    product_title: {
        type: String,
        // required: [true, "a product must have a product_title"],
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
    // {
    //     toJSON: {virtuals: true},
    //     toObject: {virtuals: true}
    // }
})


// creating a Model out of it: Model variables always wih capital Letter.
const ProductOld = mongoose.model("ProductOld",productOldSchema)

export default ProductOld