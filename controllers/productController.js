import Product from "../models/product.js";
import { catchAsync } from "../utils/catchAsync.js";
import User from "../models/user.js";
import AppError from "../utils/appError.js";




export const getAllProducts = catchAsync(async (req, res, next) => {

    const allProducts = await Product.find()
  
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      result: allProducts.length,
      data: {
        allProducts
      }
    });
  });
  
export const getProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });
  });


  export const addToWishList = catchAsync(async (req, res, next) => {
    const {id} = req.user;
    const {productId} = req.body;

    try {
      const user= await User.findById(id);

      let alreadyAdded = false

      for(let x in user.wishlist) {
        if (user.wishlist[x].id === productId) {
          alreadyAdded = true
        }
      }

      if (alreadyAdded) {
        let user = await User.findByIdAndUpdate(id,{
          $pull: {wishlist: productId},
        }, {
          new: true
        });
        res.status(200).json({
          status: "success",
          user
        });
        
      }else {
        let user= await User.findByIdAndUpdate(id,{
          $push: {wishlist: productId},
        }, {
          new: true
        });

        // await user.save()
        res.status(200).json({
          status: "success",
          user
        });
      }
  
    }catch(error){
      return next(new AppError("There was an error adding or deleting a product from your wishlist. Try again later!", 500))
    }
    
  });


  export const getWishList = catchAsync(async(req, res, next) => {

    try {
      let query = User.findById(req.params.id)
    // if (popOptions) query = query.populate(popOptions)
      const doc = await query
  
      if (!doc) { // if tour is false. means tour value "null" is not a truthy value. --> false
        return next(new AppError("No document found with that ID", 404)) // we need return, because we want to end the circle and not res.status(responding) the tour with false ID to the client. (user)
      }

    // we read this object with the fitting id to the client.
      res.status(200).json({
      status: 'success',
      data: {
        data: doc.wishlist
      },
  });




      // const user = await User.findById(_id, {wishlist:1})

      // res.status(200).json({
      //   user
      // })
  
    }catch(error){
      return next(new AppError("There was an error getting your wishlist. Try again later!", 500));
    }

  })

  // {
  //   _id: new ObjectId("5c8a1dfa2f8fb814b56fa181"),
  //   name: 'Lourdes Browning',
  //   email: 'louloutest@example.com',
  //   photo: 'user-2.jpg',
  //   role: 'user',
  //   __v: 0,
  //   wishlist: [
  //     {
  //       _id: new ObjectId("6387214a7ad5d1c314218155"),
  //       productType: 'videogames',
  //       brand: 'ps5',
  //       isBestSeller: false,
  //       product_title: 'Gotham Knights (PS5)',
  //       product_main_image_url: 'https://m.media-amazon.com/images/I/91ClDMOrAwL._AC_UY218_.jpg',
  //       app_sale_price: '56.80',
  //       app_sale_price_currency: '$',
  //       evaluate_rate: '4.0 out of 5 stars',
  //       id: '6387214a7ad5d1c314218155'
  //     }
  //   ],
  //   id: '5c8a1dfa2f8fb814b56fa181'
  // }