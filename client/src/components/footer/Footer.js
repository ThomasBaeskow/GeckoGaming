import React from 'react'
import "./footer.css"
import { faTwitter,faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <div className="footer">         
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem">Countries</li>
          <li className="fListItem">Regions</li>
          <li className="fListItem">Cities</li>
          <li className="fListItem">Districts</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Countries</li>
          <li className="fListItem">Regions</li>
          <li className="fListItem">Cities</li>
          <li className="fListItem">Districts</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Countries</li>
          <li className="fListItem">Regions</li>
          <li className="fListItem">Cities</li>
          <li className="fListItem">Districts</li>
        </ul>
        <div className='fIcons'>
        <FontAwesomeIcon icon={faTwitter}/>
         <FontAwesomeIcon icon={faFacebook}/>
         <FontAwesomeIcon icon={faInstagram}/>
        </div>
        </div>
        

        </div>
       
      
        
  )
}

export default Footer