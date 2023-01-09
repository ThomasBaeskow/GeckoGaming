import React, { useContext} from "react";
import NavLinks from "./NavLinks";
import {MyContext} from "../../context/Context"
import "./navbar.css";

export default function MobileNavigation() {
  //const[open,setOpen] = useState(false)
  const {open, setOpen} = useContext(MyContext);

  return (
    <nav className="mobile-navigation">
      <svg
        onClick={() => setOpen(!open)}
        className="hamburger"
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="2em"
        width="3em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path>
      </svg>
      {open && <NavLinks /> }
    </nav>
  );
}
