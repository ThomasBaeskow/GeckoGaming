import "./signup.css"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle,faFacebook } from "@fortawesome/free-brands-svg-icons";
 const Signup = () => {
  return (
    <div>
        <h1>User Registration</h1>
        <div>
            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" placeholder="name"/><br />
                <label htmlFor="email">Email:</label>
                <input type="email" placeholder="email"/><br />
                <label htmlFor="password">Password:</label>
                <input type="password" placeholder="password"/><br />
                <button type="submit">Sign up</button>
            </form>
        </div>
        <p>Already signed up? Login</p>
        <button>Sign up with Facebook <FontAwesomeIcon icon={faFacebook}/></button>
        <button>Sign up with Google <FontAwesomeIcon icon={faGoogle}/></button>
    </div>
  )
}
export default Signup;