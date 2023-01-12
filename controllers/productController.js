import Product from "../models/product.js";
import { catchAsync } from "../utils/catchAsync.js";
import User from "../models/user.js";
import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";


export const getAllProducts = catchAsync(async (req, res, next) => {
  let filter = {} // we create a filter object which we pass in our find method, if we have a route with tourI in params. (create Review on tour/get reviews on tour)
  // if (req.params.userId) filter = {user: req.params.userId}


  const features = new APIFeatures(Product.find(filter).select("-wishlist"), req.query)
  .filter()
  .sort()
  .limitFields()
  .paginate()

  // const doc = await features.query.explain() // .explain() shows more infos about the query
  const allProducts = await features.query

    // const allProducts = await Product.find()
  
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

    console.log(productId);

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