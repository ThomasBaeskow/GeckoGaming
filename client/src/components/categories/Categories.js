import "./categories.css"
import React from 'react'

function Categories() {
   
  return (
    <div className="categoryContainer">
      <hr/>
        <h1 className="catH1">Categories:</h1>
        <div className="categoryList">
            <div className="brands">brands</div>
            <div className="electronics">Electronics</div>
            <div className="merchandising">Merchandising</div>
            <div className="kids">Kids</div>
        </div>
        <button>More</button>
    </div>
  )
}

export default Categories