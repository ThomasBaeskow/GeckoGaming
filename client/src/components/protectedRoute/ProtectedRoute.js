import React, { useContext } from "react";
import { MyContext } from "../../context/Context";
import Dialog from "../dialog/Dialog";

function ProtectedRoutes({ children, userAccess }) {
  const { userData, setMsg, setShowDialog, setChangePage } =
    useContext(MyContext);

  if (userAccess === "non-authenticated") {
    if (!userData) {
      return children;
    }
  } else if (userAccess === "authenticated") {
    if (userData) {
      return children;
    } else {
      setMsg("You have not logged in, Please login");
      setChangePage("/login");
      setShowDialog(true);
      return (
        <div>
          <Dialog />
        </div>
      );
    }
  }
}

export default ProtectedRoutes;
