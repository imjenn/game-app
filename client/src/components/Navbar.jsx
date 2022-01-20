import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import logo from './images/logo.png'
import styles from './Navbar.module.css';
import axios from "axios";
import {useEffect} from "react";

const Navbar = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const history = useHistory();

    useEffect(() => {
        isLogedin();
    }, []);

    const logout = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/logout")
            .then(res => {
                if (res.status === 200) {
                    localStorage.removeItem("isAuthenticated");
                    history.push('/'); //Will redirect the user after login is successful
                    window.location.reload();
                } else {
                    console.log(res.status);
                }
            })
            .catch(err => console.log(err))
    }

    const isLogedin = () =>{
        if (isAuthenticated === "true"){
            document.getElementById('navLinks').hidden = true;
            document.getElementById('navLinks2').hidden = false;
        }else {
            document.getElementById('navLinks').hidden = false;
            document.getElementById('navLinks2').hidden = true;
        }
    }

    return (
        <div className={styles.navbar_container}>
            <Link to="/"><img src={logo} alt="Player 1 Logo" width="300" height="55" /></Link>
            <ul className={styles.navlinks_1}>
                <li>
                    <Link className={styles.nav_links}>
                        ABOUT
                    </Link>
                </li>
                <li>
                    <Link className={styles.nav_links} to="/games">
                        GAMES
                    </Link>
                </li>
                <li>
                    <Link className={styles.nav_links}>
                        NEWS
                    </Link>
                </li>
            </ul>
            <div id={"navLinks"} className={styles.navlinks_2}>
                <Link to="/register" className={styles.register_btn}>
                    SIGN UP
                </Link>
                <Link to="/login" className={styles.login_btn}>
                    LOG IN
                </Link>
            </div>

            <div id={"navLinks2"} className={styles.navlinks_2}>
                <Link onClick={logout} className={styles.register_btn}>
                    Logout
                </Link>
            </div>
        </div>
    )
}

export default Navbar;