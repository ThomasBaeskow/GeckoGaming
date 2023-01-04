import React, { useEffect, useState } from "react";
import axios from "axios";

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

  const [productDetails, setProductDetails] = useState([]);
  const [open, setOpen] = useState(false);

  /*  const fetchAllProductDetail = async () => {
     await axios.get("/api/v1/product/")
     .then((res)=>{
      //res=res.data  
      //console.log("i am value",res.data.data)
      const res2 = res.data.data.data
      setProductDetails(res2)
      //console.log("updated productDetails",productDetails)
      }).catch(err => console.log(err))

  
    //productDetails.push(value[0])
    
   // setProductDetailsIds(getProducts.data.data.allProducts.map((item)=>({_id:item._id, product_id:item.product_id})))
  }

  const test1 = async () =>{
    const res = await axios.get(`/api/v1/product/?product_id=B0B12R84W3`)
    //console.log("RES: ",res);
    setProductDetails(res.data.data.data[0])
   
    return ""
  }
  
 

  useEffect(()=>{
    //fetchAllProductDetail();
    test1()
  },[])

  //console.log("Updated?: ", productDetails.available_quantity);
 
  //console.log(productDetails) */

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
        open,setOpen
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
