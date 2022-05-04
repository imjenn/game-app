import './GameNews.css';
import Card from '../../containers/Card/Card';
import { useState, useEffect } from 'react';
import useHttp from '../../hooks/use-http';


const GameNews = () => {
    const [articles, setArticles] = useState([]);
    const { data } = useHttp('articles', '')

    useEffect(() => {
        if (data !== null) setArticles(data);
    }, [data]);

    return (
        <div className="news-container">
            <div className="news-body">
                {
                    articles ?
                        articles.map((article, index) => {
                            return (
                                <a href={article.link} key={index} className="article-card">
                                    <img src={article.image} alt="" />
                                    <Card>
                                        <span>
                                            <h3>{article.title}</h3>
                                            <p>{article.author}</p>   
                                        </span>
                                        <p>{article.description}</p>
                                    </Card>
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