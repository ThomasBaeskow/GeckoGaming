import React from "react";
import { NavLink } from "react-router-dom";


function ProductCard({ product }) { 
  return (
    <div className="cardHolder">
      {product &&
        product.map((items,index) => (
          <div key={index} className="cardContainer">
           <NavLink to={`/products/${items.id}`} state={items}>
              <img src={items.product_main_image_url} alt="" />
            </NavLink>        

            <p className="product-title">{items.product_title}</p>
            <p className="product-price">{items.app_sale_price}</p>
          </div>
        ))}
    </div>
  );
}

export default ProductCard;
