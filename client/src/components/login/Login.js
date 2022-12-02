import "./login.css"
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle,faFacebook } from "@fortawesome/free-brands-svg-icons";

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
                <button type="submit">Log in</button>
            </form>
        </div>
        <p>Not registered? sign up</p>
        <button>Login with Facebook <FontAwesomeIcon icon={faFacebook}/></button>
        <button>Login with Google <FontAwesomeIcon icon={faGoogle}/></button>
    </div>
  )
}

export default Login