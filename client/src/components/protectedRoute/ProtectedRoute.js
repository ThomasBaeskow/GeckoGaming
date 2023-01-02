import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/Context";


function ProtectedRoutes({ children, userAccess }) {
  const { userData } = useContext(MyContext);
  const navigate = useNavigate();

  if (userAccess === "non-authenticated") {
    if (!userData) {
      return children;
    }
  } else if (userAccess === "authenticated") {
    if (userData) {
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