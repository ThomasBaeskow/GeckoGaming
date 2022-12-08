import mongoose from "mongoose"


const productSchema = mongoose.Schema({
    productType: String,
    brand: String,
    product_detail_url: String,
    isBestSeller: {
        type: Boolean,
    },
    product_title: String,
    product_main_image_url: String,
    app_sale_price: String,
    app_sale_price_currency: String,
    product_id: String,
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

// creating a Model out of it: Model variables always wih capital Letter.
const Product = mongoose.model("Product",productSchema)

export default Product