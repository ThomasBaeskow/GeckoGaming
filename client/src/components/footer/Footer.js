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
        <img src="logo" alt="" className="logopicture" />
      </div>
      <div className="text">
        <p className="footer-text">
          {" "}
          We exist to provide people with access to better products{" "}
        </p>
      </div>
      <div className="copy">
        <span>Copyright</span>
        <br></br>
        <span>
          {new Date().getFullYear()} Gecko Gaming. All right Reserved.
        </span>

        <div className="vertical-line"></div>
        <div className="fIcons">
          <FontAwesomeIcon icon={faTwitter} className="twitter" />
          <FontAwesomeIcon icon={faFacebook} className="facebook" />
          <FontAwesomeIcon icon={faInstagram} className="instagram" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
