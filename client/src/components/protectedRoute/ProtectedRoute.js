import React, { useContext } from "react";
import { MyContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";


function ProtectedRoutes({ children, userAccess }) {
  const { userData,setLogged,logged } =useContext(MyContext);
const navigate = useNavigate()



  if (userAccess === "non-authenticated") {
    if (!userData) {
      return children;
    }
  } else if (userAccess === "authenticated") {
    if (JSON.parse(localStorage.getItem("logged"))) {
      return children;
    } else {    
      
      return (
        <div style={{ width: "300px", height: "60vh", margin: "150px auto" }}>
        <h3>You have not logged in,please login</h3>
        <button onClick={() => navigate("/login")}>Login please</button>
      </div>
      );
    }
  }
}

export default ProtectedRoutes;
