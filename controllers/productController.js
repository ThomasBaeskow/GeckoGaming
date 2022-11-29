import { catchAsync } from "../utils/catchAsync.js";
// const Tour = require('./../models/tourModel');
// const APIFeatures = require('./../utils/apiFeatures');
// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');





export const getAllProducts = catchAsync(async (req, res, next) => {
    // const features = new APIFeatures(Tour.find(), req.query)
    //   .filter()
    //   .sort()
    //   .limitFields()
    //   .paginate();
    const products = "test"
  
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
    //   results: tours.length,
      data: {
        products
      }
    });
  });
  
//   exports.getTour = catchAsync(async (req, res, next) => {
//     const tour = await Tour.findById(req.params.id);
//     // Tour.findOne({ _id: req.params.id })
  
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