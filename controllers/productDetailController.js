import ProductDetail from "../models/productDetail.js";
import { catchAsync } from "../utils/catchAsync.js";
import User from "../models/user.js";


export const getAllProductsDetail = catchAsync(async (req, res, next) => {

    const allProducts = await ProductDetail.find()
  
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      result: allProducts.length,
      data: {
        allProducts
      }
    });
  });
  
export const getProductDetail = catchAsync(async (req, res, next) => {
    const product = await ProductDetail.findById(req.params.id);
  
    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });
  });
  
//   exports.createTour = catchAsync(async (req, res, next) => {
//     const newTour = await Tour.create(req.body);
  
//     res.status(201).json({
//       status: 'success',
//       data: {
//         tour: newTour
//       }
//     });
//   });
  
//   exports.updateTour = catchAsync(async (req, res, next) => {
//     const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true
//     });
  
//     if (!tour) {
//       return next(new AppError('No tour found with that ID', 404));
//     }
  
//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour
//       }
//     });
//   });
  
//   exports.deleteTour = catchAsync(async (req, res, next) => {
//     const tour = await Tour.findByIdAndDelete(req.params.id);
  
//     if (!tour) {
//       return next(new AppError('No tour found with that ID', 404));
//     }
  
//     res.status(204).json({
//       status: 'success',
//       data: null
//     });
//   });

export const addToWishList = catchAsync(async (req, res,) => {
  const {_id} = req.user;
  console.log(_id);
  const {productId} = req.body;
  console.log(productId);
  try {
    const user= await User.findById(_id);
    const alreadyAdded= user.wishlist.find((id) =>id.toString() === productId);
    if (alreadyAdded) {
      let user= await User.findByIdAndUpdate(_id,{
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