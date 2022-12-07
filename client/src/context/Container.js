import React,{useState}from "react";

import { MyContext } from "./Context";

export default function Container({children}){
    const[product,setProduct] = useState([  {
        productName: "bag",
        cartQty: 0,
        productPrice: 20,
        product_id: 1,
        availableQty: 2,
        productCategory:"",
        productBrand:"",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore.",
        productDetails:" bag ---- dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore."
      },
      {
        productName: "videogame",
        cartQty: 0,
        productPrice: 20,
        product_id: 2,
        availableQty: 25,
        productCategory:"",
        productBrand:"",
        description:" VideoGame --dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore.",
        productDetails:" videoGame ----Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore."
      },
      {
        productName: "shoe",
        cartQty: 0,
        productPrice: 10,
        product_id: 3,
        availableQty: 5,
        productCategory:"",
        productBrand:"",
        description:" shoe --dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore.",
        productDetails:" shoe ----Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore."
      },
      {
        productName: "xbox",
        cartQty: 0,
        productPrice: 30,
        product_id: 4,
        availableQty: 8,
        productCategory:"",
        productBrand:"",
        description:" xbox --dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore.",
        productDetails:" xbox ----Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore."
      },
      {
        productName: "iphone",
        cartQty: 0,
        productPrice: 30,
        product_id: 5,
        availableQty: 5,
        productCategory:"",
        productBrand:"",
        description:" iphone --dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore.",
        productDetails:" iphone ----Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore."
      },]);

      const[cartList,setCartList] = useState([])


    return (
        <MyContext.Provider
          value={{
            product,setProduct,cartList,setCartList
          }}
        >
          {children}
        </MyContext.Provider>
      );
    }

