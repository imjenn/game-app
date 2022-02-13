import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./Forum.module.css";
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faMessage, faShare, faBookmark, faEllipsis, faFireFlameSimple, faStar, faChartLine } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const Forum = (props) => {

    const [loaded, setLoaded] = useState(false);
    const [forum, setForum] = useState({})
    const [game, setGame] = useState({})
    const [posts, setPosts] = useState({})
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/forum/${id}`)
            .then(res => {
                console.log(res.data);
                setForum(res.data);
                setGame(res.data[1]);
                setPosts(res.data[2]);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, []);

    // temporarily adds to likes counter
    const add = () => {
        const element = document.querySelector('#likes');
        element.innerText = parseInt(element.innerText, 10) + 1;
    }

    // temporarily subtracts to dislikes counter
    const subtract = () => {
        const element = document.querySelector('#likes');
        element.innerText = parseInt(element.innerText, 10) - 1;
    }

    return (
        <div className={styles.forum_container}>
            <div className={styles.forum_header}>
                <img src={game.image} alt="" />
                <h1>{game.title} Forum</h1>
                <p>
                    <span>About Community</span>
                    {game.description}
                </p>
                <div className={styles.forum_buttons}>
                    <Link className={styles.forum_link} to={`/post/new/${game._id}`}>Create Post</Link>
                    <Link className={styles.forum_link} to={`/chatroom`}>Server</Link>
                </div>
            </div>
            <div className={styles.forum_body}>
                <div className={styles.forum_create_post}>
                    <img src="https://pokecharms.com/data/attachment-files/2015/10/236933_Charmander_Picture.png" alt="" />
                    <Link to={`/post/new/${game._id}`}>
                        <input type="text" placeholder="Create Post" />
                    </Link>
                </div>
                <div className={styles.forum_filter}>
                    <p><FontAwesomeIcon icon={faFireFlameSimple} /> <span>Hot</span></p>
                    <p><FontAwesomeIcon icon={faStar} /> <span>New</span></p>
                    <p><FontAwesomeIcon icon={faChartLine} /> <span>Top</span></p>
                </div>
                {loaded ? posts.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((p, idx) => {
                    return (
                        <div key={idx} className={styles.forum_post}>
                            <div className={styles.forum_likes}>
                                <FontAwesomeIcon
                                    id={"like"}
                                    icon={faArrowUp}
                                    onClick={add}
                                />
                                <p id={"likes"} style={{ color: "white" }}>0</p>
                                <FontAwesomeIcon
                                    id={"dislike"}
                                    icon={faArrowDown}
                                    onClick={subtract}
                                />
                            </div>
                            <div className={styles.forum_post_body}>
                                <p>Posted by user {moment(p.createdAt).fromNow()}</p>
                                <h3>{p.title}</h3>
                                <div>{p.body}</div>
                                <div className={styles.post_icons}>
                                    <p>
                                        <FontAwesomeIcon icon={faMessage} />
                                        <span>Comments</span>
                                    </p>
                                    <p>
                                        <FontAwesomeIcon icon={faShare} />
                                        <span>Share</span>
                                    </p>
                                    <p>
                                        <FontAwesomeIcon icon={faBookmark} />
                                        <span>Save</span>
                                    </p>
                                    <p>
                                        <FontAwesomeIcon icon={faEllipsis} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                }) : null}
            </div>
        </div>
    )
}

export default Forum;

