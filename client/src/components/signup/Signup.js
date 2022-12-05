import "./signup.css"
import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle,faFacebook } from "@fortawesome/free-brands-svg-icons";
import {Link} from "react-router-dom";


 const Signup = () => {
  const[registerUser,setRegisterUser] = useState();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setRegisterUser((values) => ({ ...registerUser, [name]: value }));
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(registerUser);
  }


  return (
    <div className="registerContainer">
        <h1>User Registration</h1>
        <div className="userForm">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" placeholder="name" name="name" onChange={handleChange}/><br />
                <label htmlFor="email">Email:</label>
                <input type="email" placeholder="email" name="email" onChange={handleChange}/><br />
                <label htmlFor="password">Password:</label>
                <input type="password" placeholder="password" name="password" onChange={handleChange}/><br />
                <br />  <button type="submit">Sign up</button><br />
            </form>
        </div>
        <br /> <p>Already signed up? <Link to="/login">Login</Link></p><br />
        <button>Sign up with Facebook <FontAwesomeIcon icon={faFacebook}/></button>
        <button>Sign up with Google <FontAwesomeIcon icon={faGoogle}/></button>
    </div>
  )
}
export default Signup;