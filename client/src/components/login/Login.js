import "./login.css";
import React, { useContext, useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../../context/Context";



const Login = () => {
  const [loginData, setLoginData] = useState();
  const {  setUserData,msg,setMsg,userData } = useContext(MyContext); //using context to store user data
  
  const navigate = useNavigate();
  
  



  // function to get values from input fields.
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLoginData((values) => ({ ...loginData, [name]: value }));
  };

  //function to check the validation of the email
  function isValidEmail(email) {
    const valChar =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return valChar.test(email);
  }

 
   
  

  //function to send data to backend for login and get userdata after login success using axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginData.email.length <= 0 || loginData.password.length <= 0) {
      setMsg("Password or email fields cannot be empty");
    } else if (!isValidEmail(loginData.email)) {
      setMsg("Email is invalid, please enter correct email id");
    } else if (loginData.password.length < 8) {
      setMsg("Password must be at least 8 chars long");
    } else {
      try {
        const response = await axios
          .post("/api/v1/user/login", loginData, {
            withCredentials: true, // The 'login' API call for user authentication on the success of the login API sends us an HTTPonly cookie.
            //Here for every API call, we have to pass configuration to API call like 'withCredentials' with 'true' because our client application and API application runs under different ports or domains so to store the login cookie into the browser or attach the cookie for every secured API endpoint request we need those configurations.
          })
          .then((res) =>  setUserData(res.data.data) )
         
          console.log(userData.user.name)
          alert("Successfully logged in");
       //navigate("/")
      } catch (e) {
        setMsg("Invalid credentials,try again");
      }
    }
  };
 

  return (
    <>
      <div className="loginContainer contactContainer">
        <h1>Login</h1>
        <div className="loginForm">
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Email:</label>
            <input
              type="text"
              placeholder="email"
              name="email"
              onChange={handleChange}
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            <br />
            <br /> <button type="submit">Log in</button>
            <br />
            <p onClick={()=>navigate("/forgotPassword")} className="forgotP"> Forgot Password? .. Click to reset</p>

          </form>
         
          <br />         
          <div>
          
            <h3 className="errorMsg">{msg ? msg : ""} </h3>
          </div>
          <p className="signup-text">
            🎮 Not registered? <Link to="/signup">Sign up</Link> 🎮
          </p>
        </div>
      </div>
      <div>
        <button className="social-media-btn facebook-btn">
          Login with Facebook
          <FontAwesomeIcon icon={faFacebook} className="face" />
        </button>
        <button className="social-media-btn google-btn">
          Login with Google
          <FontAwesomeIcon icon={faGoogle} className="googleicon" />
        </button>
        <br />
      </div>
    </>
  );
};

export default Login;