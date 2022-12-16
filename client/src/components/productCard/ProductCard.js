import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

function ProductCard({ currentItems }) {
  return (
    <div className="cardHolder">
      {currentItems &&
        currentItems.map((items) => (
          <div className="cardContainer">
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
