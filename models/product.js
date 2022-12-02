import mongoose from "mongoose"


const productSchema = mongoose.Schema({
    // product_id: {
    //     type: String
    // },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
    },
    product_details: {
        type: Object,
    },
    isBestSeller: {
        type: Boolean,
    },
    product_title: {
        type: String,
        // required: [true, "a product must have a product_title"],
        trim: true
    },
    product_information_html: [String],
    feature_bullets: [String],
    starNumber: Number,
    reviews_number: Number,
    available_quantity: Number,
    price_information: {
        type: Object
    },
    variantInformation: {
        type: Object
    },
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

// we dont want to populate the tour in the reviews, thats why we delete it from "path: user tour". Now we will just see the id of the tour. But not the whole tour populated.
productSchema.pre(/^find/, function(next) {
    this.populate({ // populate(fieldName) // we fill the field guide with the actual data instead of just showing the id of the users. we replace the id with the users data.
      path: "category", // field we want to update
      select: "-product_id" // which fields we want to include
    })
    next()
  })

// creating a Model out of it: Model variables always wih capital Letter.
const Product = mongoose.model("Product",productSchema)

export default Product