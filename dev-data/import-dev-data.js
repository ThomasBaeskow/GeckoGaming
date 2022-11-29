import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"
import Product from "../models/productModel.js"
import axios from "axios"



dotenv.config({path: "./.env"})

const __dirname = path.resolve()

const DB = process.env.DATABASE

// connection to hosted ATLAS database again. This time not listening to our port.
mongoose.connect(DB, {
  useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
  useUnifiedTopology: true
})
.then(() => 
 console.log(`DB connected successfully`))
.catch((err) => {
  console.log(`${err} dit not connect...`);
})


const options = {
    method: 'GET',
    url: 'https://amazon24.p.rapidapi.com/api/product',
    params: {
      categoryID: '20972781011',
      keyword: 'Video Games',
      country: 'US',
      page: '1',
      refinementID: 'n:468642,n:20972781011,n:20972797011'
    },
    headers: {
      'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
      'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
    }
  };
  
// const products = async () => {
//     try {
//         const products = await axios.request(options) {
//             console.log(response.data);
//     }
//   } catch((error) {
//     console.error(error);
// }};

console.log(options);
  
// const products = async (options) => {
//     try {
//         const result = await axios.request(options)
//     }catch (err) {
//         console.error(err);
//     }
// }


const products = await axios.request(options).then(function (response) {
    //   console.log(response.data);
    return response.data.docs
  }).catch(function (error) {
      console.error(error);
  });

console.log(products);


// READ JSON FILE
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`, "utf-8")) // reading tours
// const users = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/users.json`, "utf-8")) // reading user
// const reviews = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/reviews.json`, "utf-8")) // reading reviews
// const productsUpload = JSON.parse(products.docs)

// console.log(productsUpload);

// IMPORT DATA INTO DB
// Before we import the data, we need to comment out our pre save middleware in our User model.
const importData = async () => {
    try {
        await Product.create(products) // accepts the array of objects "tours", which is our json data "tors-simple.json". And creates for every object an object in our db collection
        // await User.create(users, {validateBeforeSave: false}) // we do the same for users. here we need to set validation to false because when we are importing all the user Data according to our model, we need to provide "confirmPassword" field. Now we turn off the validation for importing our user data.
        // await Review.create(reviews) // and we reviews
        console.log("Data successfully loaded");
    } catch (error) {
        console.log(error);
    }
    process.exit()
}

// DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
    try {
        await Product.deleteMany() // deleting all the tours
        // await User.deleteMany() // all the users
        // await Review.deleteMany() // all the reviews
        console.log("Data successfully deleted");
    } catch (error) {
        console.log(error);
    }
    process.exit()
}

// conditioning for import and delete
if (process.argv[2] === "--import") {
    importData()
} else if (process.argv[2] === "--delete") {
    deleteData()
}

console.log(process.argv);

// run "node dev-data/import-dev-data.js" to start DB. in Terminal to see the console.log(process.argv)
// node dev-data/import-dev-data.js --import (for creating option String "--import" into the process.argv array, on the index 2 is "--import") --> imports the json file converted to js objects into tours collection.
// node dev-data/import-dev-data.js --delete (for creating option String "--delete" into the process.argv array, on the index 2 is "--delete") --> deletes all documents inside the collection tours
//