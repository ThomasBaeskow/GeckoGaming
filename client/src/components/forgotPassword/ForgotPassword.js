import "./forgotPassword.css";
import { MyContext } from "../../context/Context";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
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

  const setForgotPassword = async () => {
    try {
      if (!isValidEmail(loginData.email)) {
        setMsg("Email is invalid, please enter correct email id");
      } else {
        const response = await axios.post(
          "/api/v1/user/forgotPassword",
          loginData
        );

        setMsg("Reset url sent. Please check your email");
        navigate("/login");
      }
    } catch (e) {
      setMsg(e.response.data.message);
    }
  };

  return (
    <div className="pwd-container">
    <div className="forgotPwd">
      <h1 className="forgotH1">Forgot password</h1>

      <label htmlFor="email">Email:</label>
      <input
      className="email-input"
        type="text"
        placeholder="email"
        name="email"
        onChange={handleChange}
      />
      <button onClick={setForgotPassword} className='forgot-pwd'>Send Reset code </button>
      <br />
      <br />
      <h4>{msg}</h4>
    </div>
    </div>
  );
};

export default ForgotPassword;
