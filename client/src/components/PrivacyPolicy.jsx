import styles from "./PrivacyPolicy.module.css";

const PrivacyPolicy = () => {
    return (
        <div className={styles.privacy_policy_container}>
            <h1 className={styles.privacy_policy_header}>PRIVACY POLICY</h1>
            <p className={styles.privacy_policy_header}>Last updated and effective: January 20, 2022</p>
            <div className={styles.privacy_policy_body}>
                <h2>WELCOME TO PLAYER 1</h2>
                <p>Player 1 Co. provides a social online chat platform for the gaming family.</p>
            </div>
            <div className={styles.privacy_policy_body}>
                <h2>INFORMATION WE COLLECT</h2>
                <p>When you interact with us through the Services, we may collect information from you, as further described below: </p>
                <p><span>Information You Provide: </span>We collect information from you when you voluntarily provide such information, such as when you register for access to the services or use certain services. Information we collect may include but not be limited to username, email address, and any messages, images, transient VOIP data (to enable communication delivery only) or other content you send via the chat feature.</p>
            </div>
            <div className={styles.privacy_policy_body}>
                <h2>OTHER INFORMATION</h2>
                <p><span>COOKIES: </span>We employ cookies and similar technologies to keep track of your local computer’s settings such as which account you have logged into and notification settings. Cookies are pieces of data that sites and services can set on your browser or device that can be read on future visits. We may expand our use of cookies to save additional data as new features are added to the Service. In addition, we use technologies such as web beacons and single-pixel gifs to record log data such as open rates for emails sent by the system. </p>
                <p>We may use third party web site analytic tools such as Google Analytics on our website that employ cookies to collect certain information concerning your use of our Services. However, you can disable cookies by changing your browser settings. Further information about the procedure to follow in order to disable cookies can be found on your Internet browser provider's website via your help screen.</p>
            </div>
            <div className={styles.privacy_policy_body}>
                <h2>DATA RETENTION</h2>
                <p>We generally retain personal data for so long as it may be relevant to the purposes identified herein. To dispose of personal data, we may anonymize it, delete it or take other appropriate steps. Data may persist in copies made for backup and business continuity purposes for additional time.</p>
            </div>
            <div className={styles.privacy_policy_body}>
                <h2>CHANGES TO THIS PRIVACY POLICY</h2>
                <p>We reserve the right to update or modify this Privacy Policy at any time and from time to time without prior notice. Please review this policy periodically, and especially before you provide any information. This Privacy Policy was last updated on the date indicated above. Your continued use of the Services after any changes or revisions to this Privacy Policy shall indicate your agreement with the terms of such revised Privacy Policy.</p>
            </div>
            <div className={styles.privacy_policy_body}>
                <h2>CONTACTING US</h2>
                <p>Please feel free to contact us regarding any questions about this Privacy Policy or the information practices of our services.</p>
            </div>
        </div>
    )
}

export default PrivacyPolicy;