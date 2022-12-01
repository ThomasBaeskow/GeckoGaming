import React from 'react'
import "./banner.css"
import images from "../../images/pic-landing.jpg";
import {Link} from "react-router-dom";


const Banner = () => {
  return (
    <div className='bannerBackground'>      
        <div className='bannerContainer'>
            <div className='banner-left'>
            <h1 className='bannerText'><span>Lorem ipsum</span> dolor sit amet consectetur adipisicing elit. Impedit, inventore.</h1>
            <hr />
            <button><Link to="/products">Shop now</Link> <span className='spanArrow'>   ➡️ </span></button>
            </div>

        <div className='banner-right'>
        <img src={images} alt="pic"/>
        </div>
    </div>      
 

    
    </div>
  )
}

export default Banner