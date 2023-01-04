import React from "react";
import "./footer.css";
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from "../../images/logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="logo">
        <img src={image} alt="" className="logopicture" />
      </div>
     
        <p className="footer-text">
          {" "}
          We exist to provide people with access to better products{" "}
        </p>
   
     
        <span className="copy">Copyright
          &copy;
          {new Date().getFullYear()} Gecko Gaming. All rights Reserved.
        </span>

        <div className="vertical-line"></div>
        <div className="fIcons">
          <FontAwesomeIcon icon={faTwitter} className="twitter" />
          <FontAwesomeIcon icon={faFacebook} className="facebook" />
          <FontAwesomeIcon icon={faInstagram} className="instagram" />
        </div>
      </div>
  );
};

export default Footer;
