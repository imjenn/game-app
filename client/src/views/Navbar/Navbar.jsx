import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import'./Navbar.css';
import axios from "axios";
import { useEffect } from "react";

const Navbar = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const history = useHistory();

    useEffect(() => {
        isLoggedin();
    }, []);

    const logout = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/logout")
            .then(res => {
                if (res.status === 200) {
                    localStorage.removeItem("isAuthenticated");
                    localStorage.removeItem("User");
                    localStorage.removeItem("Username");
                    history.push('/'); //Will redirect the user after login is successful
                    window.location.reload();
                } else {
                    console.log(res.status);
                }
            })
            .catch(err => console.log(err))
    }

    const isLoggedin = () => {
        if (isAuthenticated === "true") {
            document.getElementById('navlinks').hidden = true;
            document.getElementById('navlinks2').hidden = false;
        } else {
            document.getElementById('navlinks').hidden = false;
            document.getElementById('navlinks2').hidden = true;
        }
    }

    return (
        <div>
            <div className="nav-container-1">
                <Link to="/">
                    <img src={logo} alt="Player 1 Logo" width="300" height="55" />
                </Link>
                <ul>
                    <li>
                        <Link>ABOUT</Link>
                    </li>
                    <li>
                        <Link to="/games">GAMES</Link>
                    </li>
                    <li>
                        <Link to="/news">NEWS</Link>
                    </li>
                </ul>
                <div id="navlinks" className="nav-links-1">
                    <Link to="/register" className="register-btn">SIGN UP</Link>
                    <Link to="/login" className="login-btn">LOG IN</Link>
                </div>
                <div id="navlinks2" className="nav-links-2">
                    <Link onClick={logout} className="logout-btn">LOGOUT</Link>
                </div>
            </div>
            <div className="nav-container-2">
                <p>New updates coming soon! Follow us on social media and stay tuned!</p>
            </div>
        </div>
    )
}

export default Navbar;