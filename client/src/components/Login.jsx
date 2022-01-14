import React, { useState } from 'react';
import axios from 'axios';

const Index = () => {

    const [registerState, setRegisterState] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [loginState, setLoginState] = useState({
        email: "",
        password: ""
    })

    const [errorState, setErrorState] = useState({})

    const registerSubmit = (e) => {
        console.log(registerState, "somethingsomething")
        e.preventDefault();
        axios.post("http://localhost:8000/signup", registerState, { withCredentials: true })
            .then(res => console.log(res))
            .catch(err => {
                console.log(err.response);
                console.log(err.response.data)
                const { errors } = err.response.data;
                console.log(errors);
                const errObj = {}

                for (const [key, value] of Object.entries(errors)) {
                    console.log(errors[key])
                    errObj[key] = value;
                }
                setErrorState(errObj);
                console.log(errObj);
            })
    }

    const getAllUsers = () => {
        axios.get("http://localhost:8000/users", { withCredentials: true })
            .then(res => console.log(res))
            .catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    console.log("UNAUTHORIZED");
                } else if (err.response.status === 400) {
                    console.log("BAD REQUEST")
                }
            })
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/login", loginState, { withCredentials: true })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const loginChangeHandler = (e) => {
        setLoginState({
            ...loginState,
            [e.target.name]: e.target.value
        })
    }

    const registerChangeHandler = (e) => {
        setRegisterState({
            ...registerState,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <div>
                <h1>Register</h1>
                <form onSubmit={registerSubmit}>
                    <div>
                        <label>Username</label>
                        <input type="text" name={"username"} onChange={registerChangeHandler} />
                        {(errorState.username) ? <small>Invalid Username</small> : null}
                        <label>email</label>
                        <input type="text" name={"email"} onChange={registerChangeHandler} />
                        {(errorState.email) ? <small>Invalid Username</small> : null}
                        <label>password</label>
                        <input type="text" name={"password"} onChange={registerChangeHandler} />
                        {(errorState.password) ? <small>Invalid Username</small> : null}
                        <label>confirm password</label>
                        <input type="text" name={"confirmPassword"} onChange={registerChangeHandler} />
                        {(errorState.confirmPassword) ? <small>Invalid Username</small> : null}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                <h1>Login</h1>
                <form onSubmit={loginSubmit}>
                    <div>
                        <label>Email: </label>
                        <input type="text" name="email" onChange={loginChangeHandler}/>
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password" name="password" onChange={loginChangeHandler}/>
                    </div>
                    <input type="submit" value="Log in"/>
                </form>
            </div>
        </>
    )
}

export default Index;