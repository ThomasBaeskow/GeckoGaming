import React from "react";
import "./ViewAll.css";

const ViewAll = () => {
  console.log("view all");
  return (
    <div>
      <div className="history">
        <h1 className="purchased">Purchased History</h1>
        <hr/>
        <ul className="orderplaced">
            <li>Order Placed:</li>
            <li>Total:</li>
            <li>Dispatch To:</li>  
            <li>Order #</li>
        </ul>
      </div>
    </div>
  );
};


export default ViewAll;

