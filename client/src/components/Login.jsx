import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';
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
        <div>
            <div>
                <img className={styles.jinx_login} src={jinx} alt="" />
                <h1>Login <i className="fa fa-gamepad" aria-hidden="true"></i></h1>
                <form onSubmit={loginSubmit}>
                    <div>
                        <label>Email: </label>
                        <input type="text" name="email" onChange={loginChangeHandler} />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password" name="password" onChange={loginChangeHandler}/>
                    </div>
                    <input type="submit" value="Log in" />
                    <p>Don't have an account? <a href="/register">Sign Up</a></p>
                </form>
            </div>
        </div>
    )
}

export default Login;