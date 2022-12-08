import "./login.css";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link,useNavigate} from "react-router-dom";
import axios from "axios";
import {MyContext} from "../../context/Context" 
import Products from "../products/Products";

const Login = () => {
  const [loginData, setLoginData] = useState();
  const{userData,setUserData} = useContext(MyContext);
  const [msg, setMsg] = useState();
  const navigate = useNavigate()

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLoginData((values) => ({ ...loginData, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();  
    console.log("i am from frontend:",loginData);
    try{      
      await axios
      .post("http://127.0.0.1:3000/api/v1/user/login", loginData)
      .then((res) => {  
        const userInfo=res.data.data.user;      
          setUserData(userInfo);
          console.log("i am from backend",userInfo.name);
          console.log("i am userData", userData.name)  
       
         navigate("/products")  
      });
    }catch(e){
      setMsg(e.message)
      
    }
    
          
  };

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

         
                      <div>
                          <h5>{
                        msg ? msg: ""
                      } </h5>
                      </div>
                      </form>          

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
