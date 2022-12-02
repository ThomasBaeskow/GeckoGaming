import React from 'react'
import "./banner.css"
import images from "../../images/pic-landing.jpg"


const Banner = () => {
  return (
    <div className='bannerBackground'>      
        <div className='bannerContainer'>
            <div className='banner-left'>

            <h1 className='bannerText'><span>Lorem ipsum</span> dolor sit amet consectetur...</h1>


            <hr />
            <button>Shop now <span className='spanArrow'>   ➡️ </span></button>
            </div>

        <div className='banner-right'>

        <img className='banner-img' src={images} alt="pic" />


        </div>
    </div>      
 

    
    </div>
  )
}

export default Banner