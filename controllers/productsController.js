import Category from "../models/category.js";
import { catchAsync } from "../utils/catchAsync.js";


export const getAllProductsWithCategory = catchAsync(async (req, res, next) => {

    const allProducts = await Category.find()
  
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      data: {
        allProducts
      }
    });
  });
  
export const getProductWithCategory = catchAsync(async (req, res, next) => {
    const product = await Category.findById(req.params.id);
  
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