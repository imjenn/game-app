import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./Games.module.css";

const Games = () => {
    const [games, setGames] = useState([]);
    const [keyword, setKeyword] = useState('');

    // Search field value
    const [title, setTitle] = useState('');

    // Search result
    const [foundGames, setFoundGames] = useState(games);

    useEffect(() => {
        axios.get("http://localhost:8000/games")
            .then(res => {
                console.log(res.data);
                setGames(res.data);
                setFoundGames(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    const filter = (e) => {
        const keyword = e.target.value;
        console.log(keyword);
        if (keyword !== '') {
            const results = games.filter((game) => {
                // Case sensitivity
                return game.title.toLowerCase().includes(keyword.toLowerCase());
            })
            setFoundGames(results);
        } else {
            // if field is empty, display all games
            setFoundGames(games);
            console.log(foundGames);
        }
    }

    return (
        <div className={styles.games_container}>
            <div className={styles.games_header}>
                <h1>Games</h1>
                <div className={styles.games_search}>
                    <input className={styles.search_bar}
                        type="text"
                        onChange={filter}
                        placeholder="Search for a game"
                    />
                    <input
                        type="submit"
                        value="Search"
                    />
                </div>
            </div>
            <div className={styles.display_games}>
                {foundGames ? foundGames.map((games, idx) => {
                    return (
                        <div className={styles.game_card} key={idx}>
                            <img className={'img-fluid shadow-4'} src={games.image} alt="" height="350px" width="300px" />
                            <h6>{games.title}</h6>
                        </div>
                    )
                }) : null}
            </div>
        </div>
    )
}

export default Games;