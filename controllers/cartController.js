import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Cart from "../models/cart.js";



  export const addToCart = catchAsync(async (req, res, next) => {

    const { product_id, product_title, app_sale_price, cartQty, product_main_image_url} = req.body;

    // console.log(product_id);

    const userId = req.user.id
    // console.log(userId);
  
    try {
      let cart = await Cart.findOne({ userId });
  
      if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p.product_id == product_id);

        console.log(itemIndex);
  
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.cartQty = cartQty;
          cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item
          cart.products.push({ product_id, cartQty, product_title, app_sale_price, product_main_image_url});
        }

        cart = await cart.save();

        return res.status(201).json({
            status: "success",
            data: {
                cart
            }
        });

      } else {
        //no cart for user, create new cart
        const newCart = await Cart.create({
          userId,
          products: [{ product_id, cartQty, product_title, app_sale_price, product_main_image_url}]
        });
  
        return res.status(201).json({
            status: "success",
            data: {
                newCart
            }
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  });


  export const getCart = catchAsync(async(req, res, next) => {

    const userId = req.user.id
  
      let cart = await Cart.findOne({ userId });

      if (!cart) { // if tour is false. means tour value "null" is not a truthy value. --> false
        return next(new AppError("No document found with that ID", 404)) // we need return, because we want to end the circle and not res.status(responding) the tour with false ID to the client. (user)
      }


    res.status(201).json({
        status: "success",
        data: {
            cart
        }
    });
  });

  export const deleteFromCard = catchAsync(async(req, res, next) => {

    const userId = req.user.id

    const product_id = req.params.product_id

    console.log(product_id);
  
    let cart = await Cart.findOne({ userId });

    cart.products = cart.products.filter(item=> item.product_id != product_id);

    cart.save()

    if (!cart) { // if tour is false. means tour value "null" is not a truthy value. --> false
        return next(new AppError("No document found with that ID", 404)) // we need return, because we want to end the circle and not res.status(responding) the tour with false ID to the client. (user)
    }


    res.status(201).json({
        status: "success",
        data: {
            cart
        }
    });
  });