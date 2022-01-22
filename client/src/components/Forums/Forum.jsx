import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./Forum.module.css";
import { Link, useParams } from 'react-router-dom';

const Forum = (props) => {

    const [forum, setForum] = useState({})
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/forum/${id}`)
            .then(res => {
                console.log(res.data);
                setForum(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className={styles.forum_container}>
            <div className={styles.forum_header}>
                <p>{forum._id}</p>
                <h1>Forum</h1>
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
                    <input className={styles.forum_create_post_input} type="text" placeholder="Create Post" />
                </form>
                <div className={styles.forum_post}>
                    this is a post    
                </div>
                <div className={styles.forum_post}>
                    this is a post    
                </div>
                <div className={styles.forum_post}>
                    this is a post    
                </div>
            </div>
        </div>
    )
}

export default Forum;

