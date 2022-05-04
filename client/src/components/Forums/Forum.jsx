import "./Forum.css";
import axios from 'axios';
import moment from 'moment';
import { Markup } from 'interweave';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faArrowUp, 
    faArrowDown, 
    faBookmark,
    faChartLine,
    faEllipsis,
    faFireFlameSimple, 
    faMessage, 
    faShare,   
    faStar, 
} from '@fortawesome/free-solid-svg-icons';

const Forum = () => {

    const [loaded, setLoaded] = useState(false);
    const [forum, setForum] = useState({})
    const [game, setGame] = useState({})
    const [posts, setPosts] = useState({})
    const [visible, setVisible] = useState(false); // Scroll to top
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

    // Display visibility of scroll to top button
    const toggleScroll = () => {
        let scrolled = document.documentElement.scrollTop;
        if (scrolled > 400) {
            setVisible(true);
        } else if (scrolled <= 400) {
            setVisible(false);
        }
    };

    // Scroll to top on click
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleScroll);

    return (
        <>
            <div className="forum-container">
                <div className="forum-header">
                    <img src={game.image} alt="" />
                    <h1>{game.title} Forum</h1>
                    <p>
                        <span>About Community</span>
                        {game.description}
                    </p>
                    <div className="forum-buttons">
                        <Link to={`/post/new/${game._id}`}>Create Post</Link>
                        <Link to={`/chatroom`}>Server</Link>
                    </div>
                </div>
                <div className="forum-body">
                    <div className="forum-create-post">
                        <img src="https://pokecharms.com/data/attachment-files/2015/10/236933_Charmander_Picture.png" alt="" />
                        <Link to={`/post/new/${game._id}`}>
                            <input type="text" placeholder="Create Post" />
                        </Link>
                    </div>
                    <div className="forum-filter">
                        <p><FontAwesomeIcon icon={faFireFlameSimple} /> <span>Hot</span></p>
                        <p><FontAwesomeIcon icon={faStar} /> <span>New</span></p>
                        <p><FontAwesomeIcon icon={faChartLine} /> <span>Top</span></p>
                    </div>
                    {loaded ? posts.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((p, idx) => {
                        return (
                            <div key={idx} className="forum-post">
                                <div className="forum-likes">
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
                                <div className="forum-post-body">
                                    <p>Posted by user {moment(p.createdAt).fromNow()}</p>
                                    <h3>{p.title}</h3>
                                    <div><Markup content={p.body} /></div>
                                    <div className="post-icons">
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
            <button
                className="scroll-to-top"
                onClick={scrollToTop}
                style={{
                    display: visible
                        ? "inline"
                        : "none"
                }}
            >
                Scroll to top
             </button>
        </>
    )
}

export default Forum;

