import "./aboutUs.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faBuilding,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";



const AboutUs = () => {
  return (
    <div>
      <br />
      <div className="contactContainer">
        <FontAwesomeIcon icon={faAddressCard} className='icon-contact' /> 
        <span className="title-contact">Get in Touch</span>
        <div className="contactCard">
          <div className="contactForm">
            <form>
              <label htmlFor="email">Email/username</label>
              <br />
              <input type="text" placeholder="email/username" />
              <p>Your message</p>
              <textarea rows="4" cols="50"></textarea>
              <br />
              <button type="submit">Send</button>
            </form>
          </div>
          <div className="contactAddress">
            <FontAwesomeIcon icon={faEnvelope} /> info@xxxx.com <br />
            <FontAwesomeIcon icon={faPhone} /> 456-5678-456
            <br />
            <p>
              *available
              <br /> Mo-Fr:- 9:00-18:00 <br /> Sa-Su:- 9:00-17:00
            </p>
            <FontAwesomeIcon icon={faBuilding} /> Dusseldorf, Germany
          </div>
        </div>
      </div>
      <div className="contactAbout">
        <h1>About us</h1>
        <p>
          We are a team of 5 that tries to supply our fellow gamers with the best technology, accessories and games that are on the market 
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
