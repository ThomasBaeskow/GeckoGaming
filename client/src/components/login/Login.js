import "./login.css"
import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle,faFacebook } from "@fortawesome/free-brands-svg-icons";
import {Link} from "react-router-dom";

const Login = () => {
  const [loginData,setLoginData] = useState();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLoginData((values) => ({ ...loginData, [name]: value }));
  };
const handleSubmit = (e) =>{
  e.preventDefault();
  console.log(loginData);
/*   await axios
  .post("http://localhost:4000/user/registerAccount", userDetails)
  .then((res) => {
    setFailMessage(res.data.status);
    setUserInfo(res.data);
    
  }); */
}


  return (
    <div className="loginContainer">
        <h1>Login</h1>
        <div className="loginForm">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Email/username:</label>
                <input type="text" placeholder="username" name="username" onChange={handleChange}/><br />
            
                <label htmlFor="password">Password:</label>
                <input type="password" placeholder="password" name="password" onChange={handleChange}/><br />
                <br />   <button type="submit">Log in</button><br />
               
            </form>
          
        </div>
        <br />   <p>Not registered? <Link to="/signup">Sign up</Link></p><br />
        <button>Login with Facebook <FontAwesomeIcon icon={faFacebook}/></button><br /><br />
        <button>Login with Google <FontAwesomeIcon icon={faGoogle}/></button><br />
    </div>
  )
}

export default Login