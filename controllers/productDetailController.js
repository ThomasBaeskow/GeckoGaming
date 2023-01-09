import ProductDetail from "../models/productDetail.js";
import { catchAsync } from "../utils/catchAsync.js";
import { factoryGetAll } from "./handlerFactory.js";


export const getAllProductsDetail = factoryGetAll(ProductDetail)
  
export const getProductDetail = catchAsync(async (req, res, next) => {

    const {product_id} = req.params

    const product = await ProductDetail.find({product_id});

    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });
  });
  

