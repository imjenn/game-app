import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./Forum.module.css";
import { Link, useParams } from 'react-router-dom';
// import gameController from '../../../../server/controllers/game.controller';

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

    console.log(game);
    console.log(posts);

    // const sortedPosts = posts.sort((a, b) => b.createdAt - a.createdAt);
    // console.log(sortedPosts)

    return (
        <div className={styles.forum_container}>
            <div className={styles.forum_header}>
                {/* {JSON.stringify(forum)} */}
                <img src={game.image} alt="" height="50%" />
                <h1>{game.title} Forum</h1>
                <div className={styles.forum_side_nav}>
                    <ul>
                        <li>This</li>
                        <li>side</li>
                        <li>nav</li>
                    </ul>
                </div>
            </div>
            <div className={styles.forum_body}>
                <form className={styles.forum_create_post} action="">
                    <p>User pfp</p>
                    <Link to="/post/new"><input className={styles.forum_create_post_input}type="text" placeholder="Create Post" /></Link>
                </form>
                {/* {JSON.stringify(posts)} */}
                {loaded ? posts.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((p, idx) => {
                    return (
                        <div key={idx} className={styles.forum_post}>
                            {p.title}<br/>
                            {p.body}<br/>
                            {p.createdAt}
                        </div>
                    )
                }) : null}
            </div>
        </div>
    )
}

export default Forum;

