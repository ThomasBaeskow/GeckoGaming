import mongoose from "mongoose"


const productDetailSchema = mongoose.Schema({
    product_id: String,
    variantImages: {
        type: Object
    },
    product_details: {
        type: Object
    },
    feature_bullets: {
        type: Object
    },
    product_information_html: {
        type: [String]
    },
    price_information: {
        type: Object
    },
    available_quantity: Number,
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

// creating a Model out of it: Model variables always wih capital Letter.
const ProductDetail = mongoose.model("ProductDetail",productDetailSchema)

export default ProductDetail