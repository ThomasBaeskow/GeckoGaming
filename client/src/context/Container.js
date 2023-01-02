import React, { useState} from "react";


import { MyContext } from "./Context";

export default function Container({ children }) {
  const [userData, setUserData] = useState();  
  const [product, setProduct] = useState([]);
  const [categoryList, setCategoryList] = useState([
    "VideoGames",
    "Pc",
    "Consoles",
    "Accessories",
  ]);

  const [cartList, setCartList] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [orderList, setOrderList] = useState();
  const[searchOption,setSearchOption] = useState("");
  const[checked,setChecked] = useState(false);

  const [productDetails,setProductDetails] = useState([]);
  

 
  return (
    <MyContext.Provider
      value={{
        product,
        setProduct,
        cartList,
        setCartList,
        userData,
        setUserData,
        wishList,
        setWishList,
        orderList,
        setOrderList,
        categoryList,
        setCategoryList,
        checked,setChecked,
        searchOption,setSearchOption,
        productDetails,setProductDetails
      }}
    >
      {children}
    </MyContext.Provider>
  );
}


