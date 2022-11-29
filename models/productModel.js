import mongoose from "mongoose"
// import slugify from "slugify"
// import validator from "validator"
// import User from "./user.js"

const productSchema = mongoose.Schema({
    productType: {
        type: String,
        default: "videogames"
    },
    brand: {
        type: String,
        default: "ps5"
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

// // tourSchema.index({price: 1}) // 1 stands for ascending order -1 for descending order. This helps our reading performance and our application has a better performance. for fields like name or id, mongoose is creating an index on default. You can see it in compass (index). You put Indexes on fields, where you think the most users will query for. Your application doesnt have to read all the data because of the descending/ascending order from the index.
// tourSchema.index({price: 1, ratingsAverage: -1})
// tourSchema.index({slug: 1})
// tourSchema.index({startLocation: "2dsphere"}) // startLocation is indexed now to a "2dsphere"
// // defining virtual properties which are not stored in the Database.
// tourSchema.virtual("durationWeeks").get(function() {
//   return this.duration / 7 
// })

// VIRTUAL POPULATE
// We are implementing a kind of child referencing with creating virtual fields. Thats how we not store the Array of reviews in our DB,but still have the connection to it.
// tourSchema.virtual("reviews", {
//   ref: "Review",
//   foreignField: "tour", // "tour" is the field in Review model where we implemented the Parent Referencing to the Tour model
//   localField: "_id" // "_id" is called "tour" in the Review model. Thats how we build the connection between Review and Tour
// })

// Mongoose Middleware (1.Document middleware, 2.Query middleware, 3.Aggregate middleware)
// DOCUMENT MIDDLEWARE: this function will be called before a document will be saved to the Database (.save() .create())
// in "this" we have access to the current document which is processed
// "save" is called "hook" and the whole middleware is called "pre save hook"
// tourSchema.pre("save", function(next) {
//   // console.log(this);
//   this.slug = slugify(this.name, {lower: true}) // slug creates a string based of the current processed documents "name" field. We use this in our pug template "overview.pug" for rendering a tour page for specific tour. The slug is integrated in our route ==> a.btn.btn--green.btn--small(href=`/tours/${item.slug}`) Details. Looks in url like ==> http://127.0.0.1:3000/tours/the-sea-explorer
//   next()
// })

// pre save middleware for updating the field guides, which is an Array in tour models subfield guides (embedded)
// tourSchema.pre("save", async function(next) {
//   const guidesPromises = this.guides.map(async item => await User.findById(item)) // guides = [id, id, id, ...]
//   this.guides = await Promise.all(guidesPromises) // Promise.all(guidesPromises) convert the Promises
//   next()
// })

// QUERY MIDDLEWARE: "pre find hook". Middleware which runs before any "find()" query is executed. Here we have access to the current query-object and not the current document with using "this"!
// tourSchema.pre(/^find/, function(next) { // this regular expression targets all strings which are start with "find". We do this because in our middleware, where we want to findByID we use the "findOne" method. When we use this we dont want to find our secret Tour. This regular expression includes the findOn method.
//   // tourSchema.pre("find", function(next) {
//   this.find({secretTour: {$ne: true}})
//   this.start = Date.now()
//   next()
// })

// middleware for manipulating query before find() executes.
// tourSchema.pre(/^find/, function(next) {
//   this.populate({ // populate(fieldName) // we fill the field guide with the actual data instead of just showing the id of the users. we replace the id with the users data.
//     path: "guides", // field we want to update
//     select: "-__v -passwordChangedAt" // which fields we want to exclude
//   })
//   next()
// })

// the post query (find) middleware runs after the query is executed. thats why it has access to the processed documents of the query
// tourSchema.post(/^find/, function(docs, next) {
//   console.log(`Query took ${Date.now() - this.start} milliseconds`);
//   // console.log(docs);
//   next()
// })

// AGGREGATION MIDDLEWARE -  "this" points to the current aggregation-object -  We get rid of this middleware because our "$geoNear" has to be he first stage in aggregation pipeline!
// tourSchema.pre("aggregate", function(next) {
//   this.pipeline().unshift({$match: {secretTour: {$ne: true}}}) // unshift is adding an element at the beginning of an array. We add another stage (condition)'$match': { secretTour: [Object] } to our aggregate-object which you can see in console.log(this.pipeline).  {$match: {secretTour: {$ne: true}}} removes all the documents where secretTour is set to "true". This means it excludes our secretTour in our aggregation pipeline.
//   console.log(this.pipeline());
//   next()
// })

// creating a Model out of it: Model variables always wih capital Letter.
const Product = mongoose.model("Product",productSchema)

export default Product