import { Link } from "react-router-dom";
import './Home.css'
import phone from '../../assets/images/phone.png'
import apple from '../../assets/images/apple.svg';
import google from '../../assets/images/google-play-badge.png';
import thresh from '../../assets/images/thresh.jpg';


const Home = () => {

    return (
        <div>
            <div>
                <div className="home-container-header">
                    <h1>WELCOME, PLAYER ONE</h1>
                    <p>Join thousands of other players who are online now</p>
                    <Link className="home-container-button" to="/register">GET STARTED</Link>
                </div>
                <img src={thresh} alt="" style={{ width: "100%" }} />
            </div>

            <div className="games-container">
                <h2>GAMES</h2>
                <div className="games-container-cards">
                    <div className="card">
                        <h3>League of Legends</h3>
                        <div className="bar">
                            <div className="empty-bar"></div>
                            <div className="filled-bar"></div>
                        </div>
                    </div>
                    <div className="card">
                        <h3>Grand Theft Auto V</h3>
                        <div className="bar">
                            <div className="empty-bar"></div>
                            <div className="filled-bar"></div>
                        </div>
                    </div>
                    <div className="card">
                        <h3>Apex Legends</h3>
                        <div className="bar">
                            <div className="empty-bar"></div>
                            <div className="filled-bar"></div>
                        </div>
                    </div>
                    <div className="card">
                        <h3>Call of Duty: Warzone</h3>
                        <div className="bar">
                            <div className="empty-bar"></div>
                            <div className="filled-bar"></div>
                        </div>
                    </div>
                    <div className="card">
                        <h3>World of Warcraft</h3>
                        <div className="bar">
                            <div className="empty-bar"></div>
                            <div className="filled-bar"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-section-1">
                <div className="home-section-1-header">
                    <h2>
                        Play together, share your highlights on forums, join game servers, and meet new players in the Player 1 community!
                    </h2>
                    <div className="app-badges">
                        <a href="https://www.apple.com/app-store/">
                            <img src={apple} />
                        </a>
                        <a href="https://play.google.com/store?hl=en_US&gl=US">
                            <img src={google} />
                        </a>
                    </div>
                </div>
                <img src={phone} alt="Phone logo" />
            </div>
        </div>
    )
}

export default Home;