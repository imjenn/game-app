import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

import jinx from '../../../assets/images/jinx-cropped.png';

const Login = () => {

    const history = useHistory();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const newUser = {
        username,
        email,
        password,
        confirmPassword
    }

    const [errorState, setErrorState] = useState({});

    const registerSubmit = (e) => {
        if (password !== confirmPassword || password.length === 0) {
            alert("Passwords don't match");
        } else {
            e.preventDefault();
            axios.post("http://localhost:8000/signup", newUser, { withCredentials: true })
                .then(res => {
                    localStorage.setItem("isAuthenticated", "true");
                    history.push('/profile');
                    window.location.reload();   
                })
                .catch(err => {
                    const { errors } = err.response.data;
                    const errObj = {}
                    for (const [key, value] of Object.entries(errors)) {
                        errObj[key] = value;
                    }
                    setErrorState(errObj);
                })
        }
    }

    const showPassword = () => {
        let x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    return (
        <div className="login-reg-container">
            <img src={jinx} alt="Cutout of Jinx" />
            <div className="login-reg-form">
                <h1>REGISTRATION</h1>
                <form onSubmit={registerSubmit}>
                    <div>
                        <label>Username </label>
                        <br/>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            onChange={(e) => setUsername(e.target.value)} placeholder="Username" 
                        />
                        {(errorState.username) ? <small>Invalid Username</small> : null}
                    </div>
                    <div>
                        <label>Email </label>
                        <br/>
                        <input type="text" id="email" name="email" 
                            onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        {(errorState.email) ? <small>Invalid Email</small> : null}
                    </div>
                    <div>
                        <label>Password </label>
                        <br/>
                        <input type="password" name="password" id="password" 
                            onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        {(errorState.password) ? <small>Invalid Password</small> : null}
                        <i onClick={showPassword} className="fa fa-eye" aria-hidden="true"></i>
                    </div>
                    <div>
                        <label>Confirm Password </label>
                        <br/>
                        <input type="password" name="confirmPassword" id="password" 
                            onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" />
                        {(errorState.confirmPassword) ? <small>Invalid Password</small> : null}
                        <i onClick={showPassword} className="fa fa-eye" aria-hidden="true"></i> 
                    </div>
                    <div className='checkbox'>
                        <input type="checkbox" id="email" />
                        <label htmlFor="email">I would like to receive emails about updates and promotions.</label>
                    </div>
                    <input className="login-reg-button" type="submit" value="CREATE AN ACCOUNT" />
                    &nbsp;
                    <p>Have an account? <a href="/login">Login</a></p>
                </form>
            </div>
        </div>
    )
}

export default Login;