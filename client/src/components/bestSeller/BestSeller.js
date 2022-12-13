import "./bestSeller.css";
import React from "react";
import chair from "../../images/img-1-chair.jpg";
import console from "../../images/img-2-console.jpg";
import console2 from "../../images/img-3-console2.jpg";
import gamingPc from "../../images/img-4-gamingpc.jpg";

const BestSeller = () => {
  return (
    <div>
      <div className="bestSellerContainer">
        <div className="bestSeller-left">
          <div className="img-3">
            <img src={console2} alt="" className="bsImg" />
          </div>
          <div className="img-4">
            <img src={gamingPc} alt="" className="bsImg" />
          </div>
        </div>

        <div className="bestSeller-right">
          <h1 className="bestsellerh1">Best Sellers</h1>
          <div className="img-1">
            <img src={chair} alt="" className="bsImg" />
          </div>
          <div className="img-2">
            <img src={console} alt="" className="bsImg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
