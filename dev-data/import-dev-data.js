import mongoose from "mongoose"
import dotenv from "dotenv"
import ProductOld from "../models/productModelOld.js"
import axios from "axios"
import Product from "../models/product.js"
import Category from "../models/category.js"
import User from "../models/user.js"
import fs from "fs"
import path from "path"




dotenv.config({path: "./.env"})

const __dirname = path.resolve()


// const __dirname = path.resolve()


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




// PS5 GAMES
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {
//       categoryID: '20972781011',
//       keyword: 'Video Games',
//       country: 'US',
//       page: '1',
//       refinementID: 'n:468642,n:20972781011,n:20972797011'
//     },
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

// SWITCH GAMES
//   const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {
//       categoryID: '468642',
//       keyword: 'Video Games',
//       country: 'US',
//       page: '1',
//       refinementID: 'n:468642,n:16227133011'
//     },
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

// XBOX X and S
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {
//       categoryID: '20972798011',
//       keyword: 'Video Games',
//       country: 'US',
//       page: '1',
//       refinementID: 'n:468642,n:20972798011,n:20972814011'
//     },
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

// PS4 GAMES
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {
//       categoryID: '6427814011',
//       keyword: 'Video Games',
//       country: 'US',
//       page: '1',
//       refinementID: 'n:468642,n:6427814011,n:6427831011'
//     },
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

// XBOX ONE
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {
//       categoryID: '6469269011',
//       keyword: 'Video Games',
//       country: 'US',
//       page: '1',
//       refinementID: 'n:468642,n:6469269011,n:6469296011'
//     },
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

// PC GAMES
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {
//       categoryID: '8588809011',
//       keyword: 'PC Games',
//       country: 'US',
//       page: '1',
//       refinementID: 'n:229575,n:4924894011'
//     },
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

// SWITCH CONSOLES
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {
//       categoryID: '16227128011',
//       keyword: 'consoles',
//       country: 'US',
//       page: '1',
//       refinementID: 'n:16227130011,n:16227128011'
//     },
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

// PS5 CONSOLES
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {categoryID: '20972781011', keyword: 'consoles', country: 'US', page: '1'},
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

// XBOX X and S CONSOLE
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {
//       categoryID: '20972798011',
//       keyword: 'Xbox Series',
//       country: 'US',
//       page: '1',
//       refinementID: 'n:468642,n:20972798011,n:20972813011'
//     },
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

// PS4 CONSOLES
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {categoryID: '6427814011', keyword: 'consoles', country: 'US', page: '1'},
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

// XBOX ONE CONSOLES
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {categoryID: '6469269011', keyword: 'consoles', country: 'US', page: '1'},
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

// DESKTOP PC
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {categoryID: '8588809011', keyword: 'PC Gaming', country: 'US', page: '1'},
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

// LAPTOPS
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {categoryID: '8588809011', keyword: 'Laptop Gaming', country: 'US', page: '1'},
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

// Accessories PC Mouse
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {categoryID: '172456', keyword: 'Gaming Mouse', country: 'US', page: '1'},
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

// Accessories PC KEYBOARD
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {categoryID: '172456', keyword: 'Gaming Keyboard', country: 'US', page: '1'},
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

// Accessories PC HEADSET
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {categoryID: '172456', keyword: 'Gaming Headset', country: 'US', page: '1'},
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

// Accessories PS4 Controller official
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {categoryID: '6427814011', keyword: 'Sony Controller', country: 'US', page: '1'},
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

// Accessories ps5 Controller official
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {
//       categoryID: '20904928031',
//       keyword: 'DualSense wireless Controller',
//       country: 'DE',
//       page: '1',
//       refinementID: 'n:20904928031,n:20904941031'
//     },
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

// Accessories xbox-X/S Controller xbox-x/s-controller
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {
//       categoryID: '20972798011',
//       keyword: 'Xbox Core Wireless Controller',
//       country: 'US',
//       page: '1',
//       refinementID: 'n:468642,n:20972798011,n:20972799011'
//     },
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

// TEST for solo product
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product/B0BCNKKZ91',
//     params: {country: 'US'},
//     headers: {
//       'X-RapidAPI-Key': '4120ebe64bmsh944823cd010dc54p1eacf4jsn2f4049de1037',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {

//       categoryID: '20972781011',
//       keyword: 'Video Games',
//       country: 'US',
//       page: '1',
//       refinementID: 'n:468642,n:20972781011,n:20972797011'

//       categoryID: '20972798011',
//       keyword: 'Xbox Core Wireless Controller',
//       country: 'US',
//       page: '1',
//       refinementID: 'n:468642,n:20972798011,n:20972799011'

//     },
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

  
// const products = async () => {
//     try {
//         const products = await axios.request(options) {
//             console.log(response.data);
//     }
//   } catch((error) {
//     console.error(error);
// }};

  
// const products = async (options) => {
//     try {
//         const result = await axios.request(options)
//     }catch (err) {
//         console.error(err);
//     }
// }




// WITH RAPID API
// TEST for category document
// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {categoryID: '20972781011', country: 'US', page: '1'},
//     headers: {
//       'X-RapidAPI-Key': '4120ebe64bmsh944823cd010dc54p1eacf4jsn2f4049de1037',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };

// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product/B0BCNKKZ91',
//     params: {country: 'US'},
//     headers: {
//       'X-RapidAPI-Key': '4120ebe64bmsh944823cd010dc54p1eacf4jsn2f4049de1037',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };
const test = async(req, res) => {
    const data = await GeckoGaming.products.find({product_detail_url})
    res.status(200).json({
        data
    })
}

// const data = ProductOld.find()

console.log(test);
// console.log(data);
// const products = await axios.request(options).then(function (response) {
//     //   console.log(response.data);
//     return response.data
//   }).catch(function (error) {
//       console.error(error);
//   });

// console.log(options);
// console.log(products);

// WITH RAINFOREST API
// const options = {
//         method: 'GET',
//         url: 'https://api.rainforestapi.com/request',
//         params: {category_id: '6427831011', api_key:"23AF2E11AFFE4ECB9ED30C11888840AD", type: "category", amazon_domain: "amazon.com"},
//         headers: {
//           'api_key': '23AF2E11AFFE4ECB9ED30C11888840AD',
//           'Host': 'api.rainforestapi.com'
//         }
//       };
    
//     const products = await axios.request(options).then(function (response) {
//         //   console.log(response.data);
//         // return response.data
//         return response.data
//       }).catch(function (error) {
//           console.error(error);
//       });
    
//     console.log(options);
//     console.log(products);




// set up the request parameters
// const params = {
//     api_key: "23AF2E11AFFE4ECB9ED30C11888840AD",
//       domain: "amazon.com",
//       category_id: "6427831011",
//       type: "category"
//     }
    
//     // make the http GET request to Rainforest API
//     axios.get('https://api.rainforestapi.com/request', { params })
//     .then(response => {
    
//         // print the JSON response from Rainforest API
//         console.log(JSON.stringify(response.data.data, 0, 2));
    
//       }).catch(error => {
//     // catch and print the error
//     console.log(error);
// })


// console.log(options);

// console.log(products);


// READ JSON FILE
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`, "utf-8")) // reading tours
const users = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/users.json`, "utf-8")) // reading user
// const reviews = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/reviews.json`, "utf-8")) // reading reviews

// console.log(users);

// IMPORT DATA INTO DB
// Before we import the data, we need to comment out our pre save middleware in our User model.
const importData = async () => {
    try {
        // await Product.create(products) // accepts the array of objects "tours", which is our json data "tors-simple.json". And creates for every object an object in our db collection
        await User.create(users, {validateBeforeSave: false}) // we do the same for users. here we need to set validation to false because when we are importing all the user Data according to our model, we need to provide "confirmPassword" field. Now we turn off the validation for importing our user data.
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



// console.log(process.argv);

// run "node dev-data/import-dev-data.js" to start DB. in Terminal to see the console.log(process.argv)
// node dev-data/import-dev-data.js --import (for creating option String "--import" into the process.argv array, on the index 2 is "--import") --> imports the json file converted to js objects into tours collection.
// node dev-data/import-dev-data.js --delete (for creating option String "--delete" into the process.argv array, on the index 2 is "--delete") --> deletes all documents inside the collection tours
//