import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from './Home.module.css'


const Home = () => {

    const playVid = () => {
        let vid = document.getElementById("banner_video");
        let text = document.getElementById("play")
        if (vid.paused === true) {
            console.log("is paused")
            text.innerText = "PAUSE"
            vid.play();
        } else {
            vid.pause();
            text.innerText = "PLAY"
        }
    }

    return (
        <div>
            <div>
                <video id="banner_video" loop muted autoPlay>
                    <source src="https://www.leagueoflegends.com/static/hero-0632cbf2872c5cc0dffa93d2ae8a29e8.webm" type="video/webm" />
                </video>
                <button id="play" className={styles.play_button} onClick={playVid}>PLAY</button>
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
                <h2>What is Player 1?</h2>
                <p>Welcome to our platform! Here at the Player 1 community, you'll be able to play some of your favorite games while making new friends.</p>
            </div>
        </div>
    )
}

export default Home;