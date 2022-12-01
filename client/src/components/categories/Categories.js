
import "./categories.css"
import React,{useState} from 'react'

function Categories() {
  const[category,setCategory] = useState(["brands","electronics","merchandising","kids","music"])
   
  return (
    <div className="categoryContainer">
      <hr/>
        <h1 className="catH1">Categories:</h1>
        <div className="categoryList">
          {
            category.map((item)=>
            <div className={item}>{item}</div>
            
            )
          }
          {/*   <div className="brands">brands</div>
            <div className="electronics">Electronics</div>
            <div className="merchandising">Merchandising</div>
            <div className="kids">Kids</div> */}
        </div>
        <button>More</button>
    </div>
  )
}

export default Categories

