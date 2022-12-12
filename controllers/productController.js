import Product from "../models/product.js";
import { catchAsync } from "../utils/catchAsync.js";



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