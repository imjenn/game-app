import { useState, useEffect } from 'react';
import axios from 'axios';
import './GameNews.css';

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
        <div className="news-container">
            <div className="news-body">
                {
                    articles ?
                        articles.map((article, index) => {
                            return (
                                <a href={article.link} key={index} className="article-card">
                                    <img src={article.image} alt="" />
                                    <div>
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