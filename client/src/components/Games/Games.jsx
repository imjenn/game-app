import React, { useState, useEffect } from 'react';
import Pagination from "./Pagination";
import axios from 'axios';
import styles from "./Games.module.css";
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faList12, faClipboardList, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import Dropdown from "./Dropdown";


const Games = (props) => {
    const user = JSON.parse(localStorage.getItem("User"));
    const [games, setGames] = useState([]);
    const [category, setCategory] = useState('title');
    const [gameFavorites,setGameFavorites] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPagination, setPagination] = useState('multiple');
    const [postsPerPage,setPostsPerPage] = useState(10);
    const [sortOptionValue, setSortOptionValue] = useState("Sort Randomize");
    const [genre, setGenre] = useState();
    const [studio, setStudio] = useState();



    const { id } = useParams();

    // Search result
    const [foundGames, setFoundGames] = useState(games);

    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        axios.get("http://localhost:8000/games")
            .then(res => {
                console.log(res.data);
                setGames(res.data);
                setFoundGames(res.data)
            })
            .catch(err => console.log(err));

        axios.get(`http://localhost:8000/findUser/${user}`)
            .then(res => {
                console.log(res.data)
                setGameFavorites(res.data)
            })
            .catch(err => console.log(err));
    }, [])


    useEffect( () =>{
        console.log(currentPagination)
        if(currentPagination === 'multiple'){
            setPostsPerPage(10);
        }else {
            setPostsPerPage(games.length);
            setFoundGames(games)
        }

    }, [currentPagination])

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

    // Get current posts
    let indexOfLastPost = currentPage * postsPerPage;
    let indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = foundGames.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    let paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className={styles.games_container}>
            <div className={styles.gameBody}>
                <div className={styles.games_side_nav}>
                    <br/><br/><br/><br/><ul>
                        <h5><FontAwesomeIcon className={styles.fontAwsome} icon={faServer}/> My Game Server</h5>
                        {gameFavorites ? gameFavorites.map((games, idx) => {
                            return (
                                <Link className={styles.game} to={`/chatroom`}>
                                    <span className={styles.gameServerTitle}>{games.roomName}</span>
                                </Link>
                            )
                        }) : null}

                        <br/><br/>
                        <h5><FontAwesomeIcon className={styles.fontAwsome} icon={faList12}/> Game Favorites</h5>

                    </ul>
                </div>


                <div className={styles.games_section}>
                    <div className={styles.games_header}>
                        <h1>Games</h1>
                        <div className={styles.games_search}>
                            <input className={styles.search_bar}
                                type="text"
                                onChange={filter}
                                   placeholder="Search for a game"/>
                            <FontAwesomeIcon className={styles.search_bar_icon} icon={faMagnifyingGlass}/>
                            <input type={'button'} onClick={togglePopup} className={styles.advanceSearchBttn} value="Advanced Search" />
                        </div>
                    </div>

                    <div className={styles.dropDownComp}>
                        {isOpen && <Dropdown games={games} handleClose={togglePopup} setPagination={setPagination}/>}
                    </div>

                    <div className={styles.display_games}>
                        {currentPosts ? currentPosts.map((games, idx) => {
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
                    <div className={styles.paginationListNumber}>
                        <Pagination postsPerPage={postsPerPage} totalPosts={foundGames.length} paginate={paginate} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Games;