import "./resetPassword.css";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const [resetPwd, setResetPwd] = useState();
  const { token } = useParams();
  const navigate = useNavigate();



//   console.log(token);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setResetPwd((values) => ({ ...resetPwd, [name]: value }));
  };

  //     .route("/resetPassword/:token")
  //   .patch(resetPassword)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BE_URL?process.env.REACT_APP_BE_URL: ""}/api/v1/user/resetPassword/${token}`,
        resetPwd,
        { withCredentials: true }
      );
      console.log(response);


      alert("Your password has been changed!");
      navigate("/login")

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="pwd-container">
    <div className="resetForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">Confirm Password:</label>
        <input
          type="password"
          placeholder="password"
          name="confirmPassword"
          onChange={handleChange}
        />
        <br />
        <br /> <button type="submit">Reset Password</button>
        <br />
      </form>
    </div>
    </div>
  );
}


export default ResetPassword;


