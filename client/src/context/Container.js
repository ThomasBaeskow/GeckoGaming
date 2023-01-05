import React, { useState } from "react";


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
  const [searchOption, setSearchOption] = useState("");
  const [checked, setChecked] = useState(false);
  const [pageNum,setPageNum] = useState(1)
  //const [ queryOptions,setQueryOptions] = useState(["videogames"])
  //const [productDetails, setProductDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const[showDialog,setShowDialog] = useState(false)
  const[msg,setMsg] = useState("")
  const[totalQtyCart,setTotalQtyCart] = useState(0)



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
        checked,
        setChecked,
        pageNum,setPageNum,
        open,setOpen,
        showDialog,setShowDialog,
        msg,setMsg,
        searchOption, setSearchOption,
        totalQtyCart,setTotalQtyCart
      
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
