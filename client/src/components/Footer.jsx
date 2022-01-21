import styles from './Footer.module.css';

const Footer = () => {
    return (
        <div>
            <footer>
                <h4>STAY CONNECTED</h4>
                <p className={styles.footer_copyright}>&copy; PLAYER 1 ALL RIGHTS RESERVED</p>
                <ul className={styles.stay_connected_icons}>
                    <li>
                        <a href="https://www.instagram.com" title="Instagram">
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com" title="Facebook">
                            <i className="fa fa-facebook" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.twitter.com" title="Twitter">
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.twitch.tv" title="Twitch">
                            <i className="fa fa-twitch" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.snapchat.com" title="Snapchat">
                            <i className="fa fa-snapchat-ghost" aria-hidden="true"></i>
                        </a>
                    </li>
                </ul>
                <ul className={styles.footer_links}>
                    <li>
                        <a href="#">ABOUT</a>
                    </li>
                    <li>
                        <p className={styles.triangle}>&#9653;</p>
                    </li>
                    <li>
                        <a href="#">SUPPORT</a>
                    </li>
                    <li>
                        <p className={styles.circle}>&#9711;</p>
                    </li>
                    <li>
                        <a href="/privacy">PRIVACY POLICY</a>
                    </li>
                    <li>
                        <p className={styles.x}>&#x2715;</p>
                    </li>
                    <li>
                        <a href="#contact-section">CONTACT US</a>
                    </li>
                    <li>
                       <p className={styles.square}>&#9634;</p> 
                    </li>
                    
                </ul>
            </footer>
        </div>
    )
}

export default Footer;