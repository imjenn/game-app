import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./Games.module.css";
import { Link, useParams } from 'react-router-dom';

const Games = (props) => {
    const user = JSON.parse(localStorage.getItem("User"));
    const [games, setGames] = useState([]);
    const [category, setCategory] = useState('title');
    const [gameFavorites,setGameFavorites] = useState([])
    const { id } = useParams();

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

        axios.get(`http://localhost:8000/findUser/${user}`)
            .then(res => {
                console.log(res.data)
                setGameFavorites(res.data)
            })
            .catch(err => console.log(err));
    }, [])

    const filter = (e) => {
        console.log(category)
        const keyword = e.target.value;
        console.log(keyword);
        if (keyword !== '') {
            const results = games.filter((game) => {
                // Case sensitivity
                if(category === 'title'){
                    return game.title.toLowerCase().includes(keyword.toLowerCase());
                }else if (category === 'studio'){
                    return game.studio.toLowerCase().includes(keyword.toLowerCase());
                }else{
                    return game.genre.toLowerCase().includes(keyword.toLowerCase());
                }
            })
            setFoundGames(results);
        } else {
            // if field is empty, display all games
            setFoundGames(games);
        }
    }

    return (
        <div className={styles.games_container}>
            <div className={styles.games_side_nav}>
                <center>
                    <br/><br/><select onChange={(e) => {setCategory(e.target.value);}}>
                        <option value="title">Title</option>
                        <option value="genre">Genre</option>
                        <option value="studio">Studio</option>
                    </select>
                </center>

                <br/><br/><br/><br/><ul>
                    <h4>My Game Server</h4>
                    {gameFavorites ? gameFavorites.map((games, idx) => {
                        return (
                            <Link className={styles.game} to={`/chatroom`}>
                                <span className={styles.gameServerTitle}>{games.roomName}</span>
                            </Link>
                        )
                    }) : null}

                    <br/><br/>
                    <h4>Game Favorites</h4>

                </ul>
            </div>
            <div className={styles.games_section}>
                <div className={styles.games_header}>
                    <h1>Games</h1>
                    <div className={styles.games_search}>
                        <input className={styles.search_bar}
                            type="text"
                            onChange={filter}
                            placeholder="Search for a game"
                        />
                        <input type="submit" value="Search" />
                    </div>
                </div>
                <div className={styles.display_games}>
                    {foundGames ? foundGames.map((games, idx) => {
                        return (
                            <Link className={styles.game} to={`/games/${games._id}`}>
                                <div className={styles.game_card} key={idx}>
                                    <img className={'img-fluid shadow-4'} src={games.image} alt="" height="350px" width="300px" />
                                    <h2 className={styles.game_title}>{games.title}</h2>
                                </div>
                            </Link>
                        )
                    }) : null}
                </div>
            </div>
        </div>
    )
}

export default Games;