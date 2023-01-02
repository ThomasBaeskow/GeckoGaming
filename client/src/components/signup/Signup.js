import "./signup.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



const Signup = () => {
  const [registerUser, setRegisterUser] = useState();
  const[msg, setMsg] = useState()
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setRegisterUser((values) => ({ ...registerUser, [name]: value }));
  };

  const clear = ()=>{
  setRegisterUser({name:"", email:"", password:"", confirmPassword:""});
  //{name:"", email:"", password:"", confirmPassword:""}
  navigate("/signup")
  console.log("i clear", registerUser)
  }

   //function to check the validation of the email
   function isValidEmail(email) {
    const valChar =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return valChar.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(registerUser);

    if (!registerUser || !registerUser.email || !registerUser.name || !registerUser.password || !registerUser.confirmPassword) {
      setMsg("Password or email fields cannot be empty");
    } else if (registerUser.password.length < 8) {
      setMsg("Password must be at least 8 chars long");
    }else if(registerUser.password !== registerUser.confirmPassword){
      setMsg("password does not match")
    }
    else if (!isValidEmail(registerUser.email)) {
      setMsg("Email is invalid, please enter correct email id");
    } else {
      setMsg("")
     try{
    await axios
      .post("/api/v1/user/signup", registerUser)
      .then((res) => 
             
      //setMsg("you have successfully registered")        
     navigate("/login"))
    
    }catch(e){
      setMsg("registration failed, user exits")
      clear();
    }
  }
  };

  return (
    <div className="registerContainer">
      <h1>User Registration</h1>
      <div className="userForm">
        <form onSubmit={handleSubmit} id="regForm">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="name"
            name="name"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
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
          <label htmlFor="password">Confirm Password:</label>
          <input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            onChange={handleChange}
          />
          <br /> <button type="submit" className="social-media-btn">Sign up</button>
          <br />
          
        </form>
        <br/>

        <div>
          
           <h3 className="errorMsg">{msg ? msg: ""} </h3>
          
            
          </div>
      </div>

      <br />
      <p className="signedUp-text">
       💗 Already signed up? <Link to="/login">Login</Link> 💗
      </p>
      <br />
      <button className="social-media-btn facebook-btn">
        Sign up with Facebook <FontAwesomeIcon icon={faFacebook} />
      </button>
      <button className="social-media-btn google-btn">
        Sign up with Google <FontAwesomeIcon icon={faGoogle} />
      </button>
    </div>
  );
};
export default Signup;