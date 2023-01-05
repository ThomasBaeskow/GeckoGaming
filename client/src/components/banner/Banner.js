import React,{ useContext}from "react";
import "./banner.css";
import images from "../../images/pic-landing.jpg";
import {NavLink,useNavigate} from "react-router-dom";
import { MyContext } from "../../context/Context";



const Banner = () => {
  const{setSearchOption,setPageNum} = useContext(MyContext);
  const navigate = useNavigate()

  return (
    <div className="bannerBackground">
      <div className="bannerContainer">
        <div className="banner-left">
          <h1 className="bannerText">
            <span>Lorem ipsum</span> dolor sit amet consectetur...
          </h1>

          <hr />
        <NavLink to="/products">  <button onClick={()=>{setSearchOption("");setPageNum(1)}}>
            Shop now <span className="spanArrow"> ➡️ </span>
          </button></NavLink>
        </div>

        <div className="banner-right" onClick={()=>{setSearchOption("isBestSeller");setPageNum(1);navigate("/products")}}>
          <img className="banner-img" src={images} alt="pic" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
