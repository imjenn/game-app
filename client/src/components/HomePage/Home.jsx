import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import styles from './Home.module.css'
import phone from '../images/phone.png';
import apple from '../images/apple.svg';
import google from '../images/google-play-badge.png';
import thresh from '../images/thresh.jpg';


const Home = () => {

    return (
        <div>
            <div>
                <div className={styles.home_container_header}>
                    <h1>WELCOME, PLAYER ONE</h1>
                    <p>Join thousands of other players who are online now</p>
                    <Link className={styles.home_container_button} to="/register">GET STARTED</Link>
                </div>
                <img src={thresh} alt="" style={{ width: "100%" }} />
            </div>

            <div className={styles.games_container}>
                <h2>GAMES</h2>
                <div className={styles.games_container_cards}>
                    <div className={styles.card}>
                        <h3 className={styles.title}>League of Legends</h3>
                        <div className={styles.bar}>
                            <div className={styles.emptybar}></div>
                            <div className={styles.filledbar}></div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <h3 className={styles.title}>Grand Theft Auto V</h3>
                        <div className={styles.bar}>
                            <div className={styles.emptybar}></div>
                            <div className={styles.filledbar}></div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <h3 className={styles.title}>Apex Legends</h3>
                        <div className={styles.bar}>
                            <div className={styles.emptybar}></div>
                            <div className={styles.filledbar}></div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <h3 className={styles.title}>Call of Duty: Warzone</h3>
                        <div className={styles.bar}>
                            <div className={styles.emptybar}></div>
                            <div className={styles.filledbar}></div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <h3 className={styles.title}>World of Warcraft</h3>
                        <div className={styles.bar}>
                            <div className={styles.emptybar}></div>
                            <div className={styles.filledbar}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.home_section_1}>
                <div className={styles.home_section_1_header}>
                    <h2>
                        Play together, share your highlights on forums, join game servers, and meet new players in the Player 1 community!
                    </h2>
                    <div className={styles.app_buttons}>
                        <a href="https://www.apple.com/app-store/">
                            <img src={apple} />
                        </a>
                        <a href="https://play.google.com/store?hl=en_US&gl=US">
                            <img src={google} />
                        </a>
                    </div>
                </div>
                <img className={styles.phone_logo} src={phone} alt="Phone logo" />
            </div>
        </div>
    )
}

export default Home;