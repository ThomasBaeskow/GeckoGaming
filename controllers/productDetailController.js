import ProductDetail from "../models/productDetail.js";
import { catchAsync } from "../utils/catchAsync.js";
import User from "../models/user.js";
import { factoryGetAll } from "./handlerFactory.js";


export const getAllProductsDetail = factoryGetAll(ProductDetail)

// export const getAllProductsDetail = catchAsync(async (req, res, next) => {

//     const allProducts = await ProductDetail.find()
  
//     // SEND RESPONSE
//     res.status(200).json({
//       status: 'success',
//       result: allProducts.length,
//       data: {
//         allProducts
//       }
//     });
//   });
  
export const getProductDetail = catchAsync(async (req, res, next) => {

    const {product_id} = req.body

    const product = await ProductDetail.find({product_id});

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

