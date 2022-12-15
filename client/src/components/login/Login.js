import "./login.css";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../../context/Context";

const Login = () => {
  const [loginData, setLoginData] = useState();
  const { userData, setUserData } = useContext(MyContext); //using context to store user data
  const [msg, setMsg] = useState();
  const navigate = useNavigate();

  // function to get values from input fields.
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLoginData((values) => ({ ...loginData, [name]: value }));
  };

  //function to send data to backend for login and get userdata after login success using axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("i am from frontend:", loginData);
    try{
      const res = await axios.post(
        "/api/v1/user/login",
        loginData,      
       
      )
        .then((res)=>setUserData(res.data.data));  
        navigate("/products");
      console.log("i am userData", userData.user.name)

    }catch(e){
      
      setMsg(e.message);
    }
  }

  return (
    <>
      <div className="loginContainer contactContainer">
        <h1>Login</h1>
        <div className="loginForm">
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Email/username:</label>
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
          </form>
          <br /> <br />
          <div>
            <h5>{msg ? msg : ""} </h5>
          </div>
        </div>
      </div>
      <div>
        <p className="signup-text">
          🎮Not registered? <Link to="/signup">Sign up</Link>🎮
        </p>
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
