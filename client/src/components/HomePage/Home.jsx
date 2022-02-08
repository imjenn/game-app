import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from './Home.module.css'
import phone from '../images/phone.png';
import apex2 from '../images/apex2.PNG';
import apex3 from '../images/apex3.PNG';
import apple from '../images/apple.png';
import google from '../images/google.png';


const Home = () => {

    return (
        <div>
            <div>
                <div className={styles.home_container_header}>
                    <h1>WELCOME, PLAYER</h1>
                    <p>Join thousands of other players who are online now</p>
                    <Link className={styles.home_container_button} to="/register">GET STARTED</Link>
                </div>
                <img src={apex3} style={{ width: "100%", position: "absolute" }} />
                <video loop muted autoPlay style={{ opacity: "0.35", width: "100%" }}>
                    <source src="http://phpcoder.tech/html-css/Smoke.mp4" tupe="video/mmp4" />
                </video>
            </div>
            <div className={styles.row}>
                <div className={styles.column}>
                    <Link className={styles.column_link}>
                        <img src="https://asset.vg247.com/ashe_league_of_legends.jpg/BROK/thumbnail/1200x900/quality/100/ashe_league_of_legends.jpg" alt="League of Legends" />
                        <p>LEAGUE OF LEGENDS</p>
                    </Link>
                    <Link className={styles.column_link}>
                        <img src="https://cdn.mos.cms.futurecdn.net/4fKdxHBkmHToXbJiYSNkyG.jpg" alt="Call of Duty" />
                        <p>RAINBOW SIX SIEGE</p>
                    </Link>
                </div>
                <div className={styles.column}>
                    <Link className={styles.column_link}>
                        <img src="https://i.guim.co.uk/img/media/b8d3d6e4c523551c80163ffc69218bec75618e8d/0_293_4399_2640/master/4399.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=62a9e0aca9981844a85fc95564ecea30" alt="Activision Blizzard" />
                        <p>GAMING NEWS</p>
                    </Link>
                    <Link className={styles.column_link}>
                        <img src="https://i0.wp.com/play3r.net/wp-content/uploads/2018/09/ZBR05528.jpg?fit=2500%2C1668&ssl=1" />
                        <p>UPCOMING TOURNAMENTS</p>
                    </Link>
                </div>
                <div className={styles.column}>
                    <Link className={styles.column_link}>
                        <img src="https://images.unsplash.com/photo-1607356296477-5454f7a7f0f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" />
                        <p>NEW RELEASES</p>
                    </Link>
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