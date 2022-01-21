import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styles from './Registration.module.css';
import jinx from './images/jinx-cropped.png';


const Login = () => {
    const history = useHistory();

    const [loginState, setLoginState] = useState({
        email: "",
        password: ""
    })

    const [errorState, setErrorState] = useState({})

    //Modified: will redirect the user to homepage after successful login
    const loginSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/login", loginState, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    localStorage.setItem("isAuthenticated", "true");
                    history.push('/profile', {id: res.data}); //Will redirect the user after login is successful
                    console.log('Login Successful');
                    window.location.reload();
                } else {
                    //Will redirect the user after login is successful
                    // history.push('/logout'); //Will redirect the user after login is successful
                    console.log(res.status);
                }
            })
            .catch(err => console.log(err))
    }

    const loginChangeHandler = (e) => {
        setLoginState({
            ...loginState,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className={styles.login_container}>
            <img className={styles.jinx_login} src={jinx} alt="Cutout of Jinx" />
            <div className={styles.register}>
                <h1 className={styles.reg_header}>LOGIN</h1>
                <form onSubmit={loginSubmit}>
                    <div>
                        <label>Email: </label>
                        <input type="text" name="email" onChange={loginChangeHandler} placeholder="Email"/>
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password" name="password" onChange={loginChangeHandler} placeholder="Password"/>
                    </div>
                    <input className={styles.reg_btn} type="submit" value="LOG IN" />
                    <p>Don't have an account? <a href="/register">Sign Up</a></p>
                </form>
            </div>
        </div>
    )
}

export default Login;