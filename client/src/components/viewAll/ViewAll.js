import React from "react";
import "./ViewAll.css";

const ViewAll = () => {
  console.log("view all");
  return (
    <div>
      <div className="history"><br></br><br></br>
        <h1 className="purchased">Purchased History</h1><hr/><br></br>
        <ul className="orderplaced">
            <li>Order Placed</li>
            <li>Total</li>
            <li>Dispatch To</li>  
            <li>Order #</li>
        </ul>
      </div>
    </div>
  );
};


export default ViewAll;

