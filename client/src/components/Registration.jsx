import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styles from './Registration.module.css';
import 'font-awesome/css/font-awesome.min.css';

import jinx from './images/jinx-cropped.png';

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

    // const [registerState, setRegisterState] = useState({
    //     username: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: ""
    // });

    const [errorState, setErrorState] = useState({});

    const registerSubmit = (e) => {
        if (password !== confirmPassword || password.length === 0) {
            alert("Passwords don't match");
        } else {
            console.log(newUser, "********")
            e.preventDefault();
            axios.post("http://localhost:8000/signup", newUser, { withCredentials: true })
                .then(res => {
                    localStorage.setItem("isAuthenticated", "true");
                    history.push('/profile');
                    window.location.reload();   
                })
                .catch(err => {
                    console.log(err.response);
                    console.log(err.response.data)
                    const { errors } = err.response.data;
                    console.log(errors);
                    const errObj = {}

                    console.log(Object.entries(errors))
                    for (const [key, value] of Object.entries(errors)) {
                        console.log(errors[key])
                        errObj[key] = value;
                    }
                    setErrorState(errObj);
                    console.log(errObj);
                })
        }
    }

    return (
        <div className={styles.login_container}>
            <img className={styles.jinx_login} src={jinx} alt="Cutout of Jinx" />
            <div className={styles.register}>
                <h1 className={styles.reg_header}>REGISTRATION <i className="fa fa-gamepad" aria-hidden="true"></i></h1>
                <form onSubmit={registerSubmit}>
                    <div>
                        <label>Username </label><br />
                        <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                        {(errorState.username) ? <small>Invalid Username</small> : null}
                    </div>
                    <div>
                        <label>Email </label><br />
                        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        {(errorState.email) ? <small>Invalid Email</small> : null}
                    </div>
                    <div>
                        <label>Password </label><br />
                        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        {(errorState.password) ? <small>Invalid Password</small> : null}
                        {/* <i className="fa fa-eye" aria-hidden="true"></i> */}
                    </div>
                    <div>
                        <label>Confirm Password </label><br />
                        <input type="password" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" />
                        {/* <i className="fa fa-eye" aria-hidden="true"></i> */}
                        {(errorState.confirmPassword) ? <small>Invalid Password</small> : null}
                    </div>
                    <div className={styles.checkbox}>
                        <input type="checkbox" id="email" />
                        <label htmlFor="email">I would like to receive emails about updates and promotions.</label>
                    </div>
                    <input className={styles.reg_btn} type="submit" value="CREATE AN ACCOUNT" />
                    &nbsp;
                    <p>Have an account? <a href="/login">Login</a></p>
                </form>
            </div>
        </div>
    )
}

export default Login;