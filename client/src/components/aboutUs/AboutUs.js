import "./aboutUs.css"
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faBuilding, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const AboutUs = () => {
  return (
    <div>
        <div className="contactContainer">
        <FontAwesomeIcon icon={faAddressCard}/> Get in Touch
        <div className="contactCard">
        <div className="contactForm">
            <form>
                <label htmlFor="email">Email/username</label><br />
                <input type="text" placeholder="email/username"/>
                <p>Your message</p>
                <textarea rows="4" cols="50"></textarea><br />
                <button type="submit">Send</button>
            </form>
            </div>
            <div className="contactAddress">
                <FontAwesomeIcon icon={faEnvelope}/> info@xxxx.com <br /> 
               <FontAwesomeIcon icon={faPhone}/> 456-5678-456<br />
               <p>*available<br /> Mo-Fr:- 9:00-18:00 <br /> Sa-Su:- 9:00-17:00</p> 
                <FontAwesomeIcon icon={faBuilding}/> Dusseldorf, Germany
            </div>
       
        </div>

        </div>
        <div className="contactAbout">
            <h1>About us</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo ullam facilis eum voluptatibus voluptate nihil expedita repellat nobis! Consequuntur enim ab sed non! Nulla in ipsum natus! Ipsam fugit sunt adipisci beatae ullam expedita saepe ipsa architecto minima iusto? Nesciunt ex deleniti magni quos at nostrum aliquid omnis vero ut.</p>
        </div>
    </div>
  )
}

export default AboutUs;