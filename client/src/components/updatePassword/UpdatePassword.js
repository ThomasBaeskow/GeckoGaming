import "./updatePassword.css";
import { MyContext } from "../../context/Context";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdatePassword = () => {
  const { msg, setMsg } = useContext(MyContext); //using context to store user data
  const [loginData, setLoginData] = useState();
  const navigate = useNavigate();

  //function to check the validation of the email
  function isValidEmail(email) {
    const valChar =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return valChar.test(email);
  }

  // function to get values from input fields.
  const handleChange = (event) => {
    setLoginData({ email: event.target.value });
  };

  const setUpdatePassword = async (e) => {
    const passwordCurrent = e.target.passwordCurrent.value
    const password = e.target.password.value
    const confirmPassword = e.target.confirmPassword.value

        const response = await axios.patch(
          "/api/v1/user/updateMyPassword",
          {passwordCurrent,
          password,
          confirmPassword}
        );
            
        setMsg("Password changed");
        alert("hi")
        console.log("i am called")
        navigate("/myAccount");
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
        onChange={handleChange}
      />
      <label htmlFor="email">New Password:</label>
      <input
        // className="email-input"
        type="password"
        placeholder="new password"
        name="password"
        onChange={handleChange}
      />
      <label htmlFor="email">Confirm Password:</label>
      <input
        // className="email-input"
        type="password"
        placeholder="confirm new password"
        name="confirmPassword"
        onChange={handleChange}
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
