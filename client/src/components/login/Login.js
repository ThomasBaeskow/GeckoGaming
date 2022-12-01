import "./login.css"
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle,faFacebook } from "@fortawesome/free-brands-svg-icons";
import {Link} from "react-router-dom";

const Login = () => {
  return (
    <div>
        <h1>Login</h1>
        <div>
            <form>
                <label htmlFor="username">Email/username:</label>
                <input type="text" placeholder="username"/><br />
                <label htmlFor="password">Password:</label>
                <input type="password" placeholder="password"/><br />
                <button type="submit">Log in</button><br />
            </form>
        </div>
        <p>Not registered? <Link to="/signup">Sign up</Link></p><br />
        <button>Login with Facebook <FontAwesomeIcon icon={faFacebook}/></button><br />
        <button>Login with Google <FontAwesomeIcon icon={faGoogle}/></button><br />
    </div>
  )
}

export default Login