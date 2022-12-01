import React from "react";
import "./footer.css";
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <div className="footer">
      <p className="footer-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi impedit asperiores consequuntur minus ipsum! Eaque debitis delectus laudantium quis, magni quidem ea ad dignissimos incidunt voluptas, quos nostrum sed sequi.
      </p>
        <div className="vertical-line"></div>
        <div className="fIcons">
          <FontAwesomeIcon icon={faTwitter} className='twitter' />
          <FontAwesomeIcon icon={faFacebook} className='facebook' />
          <FontAwesomeIcon icon={faInstagram} className='instagram' />
        </div>
    </div>
  );
};

export default Footer;
