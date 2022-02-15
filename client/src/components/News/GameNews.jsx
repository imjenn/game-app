import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './GameNews.module.css';

const GameNews = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/articles`)
            .then(res => {
                console.log(res.data);
                setArticles(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className={styles.news_container}>
            <div className={styles.news_body}>
                {
                    articles ?
                        articles.map((article, index) => {
                            return (
                                <a href={article.link} key={index} className={styles.article_card}>
                                    <img src={article.image} alt="" />
                                    <div className={styles.article_card_text}>
                                        <span>
                                            <h3>{article.title}</h3>
                                            <p>{article.author}</p>   
                                        </span>
                                        <p>{article.description}</p>
                                    </div>
                                </a>
                            )
                        }) 
                    : null
                }
            </div>
        </div>
    )
}

export default GameNews;