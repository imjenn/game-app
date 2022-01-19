import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./Games.module.css";

const Games = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/games")
            .then(res => {
                console.log(res.data);
                setGames(res.data)
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div className={styles.games_container}>
            <div className={styles.games_header}>
                <h1>Games</h1>
                <div className={styles.games_search}>
                    <input className={styles.search_bar} type="text" placeholder="Search for a game"/>
                    <input type="submit" value="Search" />
                </div>
            </div>
            <div className={styles.display_games}>
                {games ? games.map((games, idx) => {
                    return (
                        <div className={styles.game_card} key={idx}>
                            <img src={games.image} alt="" height="350px" width="300px" />
                            <h2>{games.title}</h2>
                        </div>
                    )
                }) : null}
            </div>
        </div>
    )
}

export default Games;