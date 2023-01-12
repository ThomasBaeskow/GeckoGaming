import "./products.css";
import React, { useEffect, useContext, useState } from "react";
import { MyContext } from "../../context/Context";
import ProductCard from "../productCard/ProductCard";
import axios from "axios";

const Products = () => {
  // getting product and category data using context
  const {
    product,
    setProduct,
    categoryList,
    pageNum,
    setPageNum,
    searchOption,
    setSearchOption,
  } = useContext(MyContext);
  const [titleText, setTitleText] = useState("All Products");
  let queryText;

  const [checked, setChecked] = useState([]);
  const [brandSelect, setBrandSelect] = useState([]);
  const [bs, setBs] = useState({
    videogames: false,
    pc: false,
    consoles: false,
    accessories: false,
  });

  const customizedProducts = [];
  const [filteredProducts, setFilteredProducts] = useState([]);

  let brandList = {
    videogames: ["ps5", "pc", "ps4", "switch", "xbox-one", "xbox-x-s"],
    pc: ["desktop", "laptop"],
    consoles: ["ps4", "ps5", "switch", "xbox-one", "xbox-x-s"],
    accessories: [
      "headset",
      "keyboard",
      "mouse",
      "ps4-controller",
      "ps5-controller",
      "switch-controller",
      "xbox-x/s-controller",
    ],
  };

  /*  We should do it inside use effect  */
  useEffect(() => {
    for (let key in brandList) {
      customizedProducts.push(...brandList[key]);
    }
    setFilteredProducts(customizedProducts);
  }, []);

  //-------brand selected function ------//
  const handleBrandSelect = (event) => {
    for (let key in bs) {
      if (key === checked[0]) {
        bs[key] = false;
      } else {
        bs[key] = true;
      }
    }
    let updatedList = [...brandSelect];
    if (!brandSelect.includes(event.target.value)) {
      updatedList = [...brandSelect, event.target.value];
     
    } else {
      updatedList.splice(brandSelect.indexOf(event.target.value), 1);
    }
    setBrandSelect(updatedList);

    console.log("brand selected", updatedList);
  }; //-------brand selected function end------
  //-------category selected function start------
  const categorySelector = (event) => {
    if (brandSelect.length === 0) {
      let updatedList = [...checked];
      if (event.target.checked) {
        updatedList = [...checked, event.target.value.toLowerCase()];
      } else {
        updatedList.splice(
          checked.indexOf(event.target.value.toLowerCase()),
          1
        );
      }
      setChecked(updatedList);
      console.log("checked brandSelect", checked);
    } else {
      if (checked.includes(event.target.name.toLowerCase())) {
        setChecked([]);
        setBrandSelect([]);
        setBs({
          videogames: false,
          pc: false,
          consoles: false,
          accessories: false,
        });
      }
    }
  };
  //-------category selected function start------

  //intiating pagenumber to paginate from backend
  if (pageNum === 0) {
    setPageNum(1);
  }

  // function to fetch data from database based on search criteria
  const fetchAllProducts = async () => {
    //searchOption is coming from home page selections and checked is coming from products page
    if (!searchOption) {
      if (checked.length === 0) {
        queryText = `/api/v1/products/?page=${pageNum}`;
        setTitleText("All-Products");
      } else {
        if (brandSelect.length === 0) {
          queryText = `/api/v1/products/?productType=${checked.join(
            "&productType="
          )}&page=${pageNum}`;
        } /*  else if((checked.length === 0) && (brandSelect.length > 0)){
          queryText = `/api/v1/products/?brand=${brandSelect.join("&brand=")}&page=${pageNum}`
        } */ else {
          queryText = `/api/v1/products/?productType=${
            checked[0]
          }&brand=${brandSelect.join("&brand=")}&page=${pageNum}`;
        }
      }
    } else if (searchOption === "isBestSeller") {
      setTitleText("Best Sellers");
      queryText = `/api/v1/products/?isBestSeller=true&page=${pageNum}`;
    } else {
      setTitleText(searchOption);
      queryText = `/api/v1/products/?productType=${searchOption}&page=${pageNum}`;
    }

    const getProducts = await axios.get(queryText);
    setProduct(getProducts.data.data.allProducts);
    //console.log(getProducts)
  }; //end of fetch function

  //fetching for all products list from brandList[checked[0]]products database
  //pageNum is put in dependencies to see changes in click
  // checked is put in dependencies to see changes checked
  useEffect(() => {
    fetchAllProducts();
  }, [pageNum, checked, brandSelect]);

  return (
    <div className="productContainer">
      <div className="selectionCriteria">
        <div className="selectionCheckbox">
          <div className="categories">
            <h4>Category → </h4>

            {categoryList.map((item, index) => {
              return (
                <>
                  <label key={index}>
                    <input
                      name={item}
                      type="checkbox"
                      className="checkbox"
                      value={item}
                      onChange={categorySelector}
                      disabled={bs[item.toLowerCase()]}
                    />
                    {item}
                  </label>
                  <br />
                </>
              );
            })}
          </div>
        </div>
        <div className="selectionCategory">
          <label htmlFor="brands" className="brands">
            Brands:
          </label>
          <select name="brands" id="brands" multiple>
            {!checked[0]
              ? filteredProducts.map((item, index) => {
                  return (
                    <option                                     
                      key={index}
                      value={item}
                      onClick={handleBrandSelect}
                    >
                      {item}
                    </option>
                  );
                })
              : brandList[checked[0]]?.map((item, index) => {
                  return (
                    <option
                      key={index}
                      value={item}
                      onClick={handleBrandSelect}
                      style={{backgroundColor:brandSelect.includes(item)&&`blue`}}
                    >
                      {item}
                    </option>
                  );
                })}
          </select>
          <br />
          <select>
            <option>Price</option>
            <option>50-100</option>
            <option>Above 100</option>
          </select>
        </div>
      </div>

      <div className="productDisplay">
        <div className="productDisplayScroll">
          <button
            className="btn-Product"
            onClick={() => pageNum > 1 && setPageNum(pageNum - 1)}
          >
            ⬅️ Previous
          </button>
          <h4 className="best">{titleText}</h4>
          <button
            className="btn-Product"
            onClick={() =>
              product.length === 0
                ? setPageNum(pageNum - 1)
                : setPageNum(pageNum + 1)
            }
          >
            Next ➡️
          </button>
        </div>

        <ProductCard product={product} />
      </div>
    </div>
  );
};

export default Products;
