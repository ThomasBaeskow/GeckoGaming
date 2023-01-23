import "./updatePassword.css";
import { MyContext } from "../../context/Context";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdatePassword = () => {
  const { msg, setMsg, setCartList, setUserData } = useContext(MyContext); //using context to store user data
  const [loginData, setLoginData] = useState();
  const navigate = useNavigate();

  //function to check the validation of the email
  function isValidEmail(email) {
    const valChar =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return valChar.test(email);
  }

  // function to get values from input fields.
  /*  const handleChange = (event) => {
    setLoginData({ email: event.target.value });
  }; */

  const setUpdatePassword = async (e) => {
    e.preventDefault();
    const passwordCurrent = e.target.passwordCurrent.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    try {
      const response = await axios
        .patch(`${process.env.REACT_APP_BE_URL}/api/v1/user/updateMyPassword`, {
          passwordCurrent,
          password,
          confirmPassword,
        })
        .then((res) => {
          alert("password changed,please re-login");
        });
      setMsg("password changed,please re-login");
      logOut();
    } catch (e) {
      console.log(e);
      alert("your password is wrong! Please try again.")
    }
   
  };

  const logOut = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BE_URL}/api/v1/user/logout`, {
      withCredentials: true,
    });
    setUserData("");
    localStorage.removeItem("logged");
    setCartList([]);
    navigate("/login");
  };

  return (
    <div className="reset-pwd-container">
      <div className="resetPwd">
        <h1 className="resetH1">Update password</h1>

        <form onSubmit={setUpdatePassword}>
          <label htmlFor="email">Current Password:</label>
          <input
            // className="email-input"
            type="password"
            placeholder="current password"
            name="passwordCurrent"
            // onChange={handleChange}
          />
          <label htmlFor="email">New Password:</label>
          <input
            // className="email-input"
            type="password"
            placeholder="new password"
            name="password"
            // onChange={handleChange}
          />
          <label htmlFor="email">Confirm Password:</label>
          <input
            // className="email-input"
            type="password"
            placeholder="confirm new password"
            name="confirmPassword"
            //onChange={handleChange}
          />
          <button type="submit">Update password</button>
        </form>
        <br />
        <br />
        <h4>{msg}</h4>
      </div>
    </div>
  );
};

export default UpdatePassword;
