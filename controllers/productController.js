import Product from "../models/product.js";
import { catchAsync } from "../utils/catchAsync.js";
import User from "../models/user.js";




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

  export const addToWishList = catchAsync(async (req, res,) => {
    const {_id} = req.user;
    console.log(_id);
    const {productId} = req.body;
    console.log(productId);
    try {
      const user= await User.findById(_id);
      const alreadyAdded = user.wishlist.find((id) =>id.toString() === productId);
      if (alreadyAdded) {
        let user = await User.findByIdAndUpdate(_id,{
          $pull: {wishlist: productId},
        }, {
          new: true
        });
        res.json(user);
        
      }else {
        let user= await User.findByIdAndUpdate(_id,{
          $push: {wishlist: productId},
        }, {
          new: true
        });
        res.json(user);
      }
  
    }catch(error){
      throw new Error(error);
    }
  });

