import React,{useState}from "react";


import { MyContext } from "./Context";

export default function Container({children}){
  const[userData,setUserData] = useState();
  const[categoryList,setCategoryList] = useState([
    
    "brands",
    "electronics",
    "merchandising",    
    "kids"
   // consoles, videogames, pc, accessories.   
  ])
    const[product,setProduct] = useState([  {
        productName: "mobile",
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
        productName: "bag",
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
        productName: "cloth",
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
      },
    //more dummy data
    {
      productName: "videoGames",
      cartQty: 0,
      productPrice: 20,
      product_id: 6,
      availableQty: 2,
      productCategory:"",
      productBrand:"",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore.",
      productDetails:" bag ---- dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore."
    },
    /* {
      productName: "accessories",
      cartQty: 0,
      productPrice: 20,
      product_id: 7,
      availableQty: 25,
      productCategory:"",
      productBrand:"",
      description:" VideoGame --dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore.",
      productDetails:" videoGame ----Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore."
    },
    {
      productName: "nintendo",
      cartQty: 0,
      productPrice: 10,
      product_id: 8,
      availableQty: 5,
      productCategory:"",
      productBrand:"",
      description:" shoe --dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore.",
      productDetails:" shoe ----Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore."
    },
    {
      productName: "ps-5",
      cartQty: 0,
      productPrice: 30,
      product_id: 9,
      availableQty: 8,
      productCategory:"",
      productBrand:"",
      description:" xbox --dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore.",
      productDetails:" xbox ----Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore."
    },
    {
      productName: "ps-4",
      cartQty: 0,
      productPrice: 30,
      product_id: 10,
      availableQty: 5,
      productCategory:"",
      productBrand:"",
      description:" iphone --dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore.",
      productDetails:" iphone ----Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam vitae veniam doloremque eos nisi assumenda ipsam vero porro corporis tempore."
    } */
    ]);
     
      const[cartList,setCartList] = useState([
      /* 
        {
          productName: "mobile",
          cartQty: 0,
          productPrice: 20,
          product_id: 1,
          availableQty: 2,
        },
        {
          productName: "bag",
          cartQty: 0,
          productPrice: 20,
          product_id: 2,
          availableQty: 12,
        },
        {
          productName: "shoe",
          cartQty: 0,
          productPrice: 10,
          product_id: 3,
          availableQty: 5,
        },
        {
          productName: "cloth",
          cartQty: 0,
          productPrice: 30,
          product_id: 4,
          availableQty: 8,
        },
         {
          productName: "iphone",
          cartQty: 0,
          productPrice: 30,
          product_id: 5,
          availableQty: 5,
        }, */ 
      ]);
     
      const[wishList,setWishList] = useState([
         
         
          {
            productName: "bag",           
            productPrice: 20,
            product_id: 2,
           
          },
          {
            productName: "shoe",           
            productPrice: 10,
            product_id: 3,
           
          },
          {
            productName: "cloth",           
            productPrice: 30,
            product_id: 4,
           
          },
            
        ]);
      const[orderList,setOrderList] = useState();
    

    return (
        <MyContext.Provider
          value={{
            product,setProduct,cartList,setCartList,userData,setUserData,wishList,setWishList,orderList,setOrderList,categoryList,setCategoryList
          }}
        >
          {children}
        </MyContext.Provider>
      );
    }

