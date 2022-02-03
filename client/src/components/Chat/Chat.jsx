import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {useState} from "react";
import style from './Chat.module.css'
import io from "socket.io-client";
import axios from "axios";
import { useHistory } from 'react-router-dom';

const Chat = (props) =>{
    const user = JSON.parse(localStorage.getItem("User"));
    const [roomURL, setRoomURL] = useState("");
    const [roomID, setRoomID] = useState("");
    const [error, setError] = useState("");

    const joinRoom = (e) => {
        if (roomURL !== ""){
            joinRoomURL(e,roomURL)
            return;
        }
        let chatInfo ={
            user: user,
            roomID: roomID
        };

        // e.preventDefault();
        axios.post("http://localhost:8000/joinchat", chatInfo, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                window.location.reload();
            })
            .catch(err => {
                console.log(err.response.data);
                setError(err.response.data.msg);
            })
    }

    const joinRoomURL = (e, url) => {
        let chatInfo ={user: user};
        e.preventDefault();
        axios.post(url, chatInfo, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err.response.data)
                setError(err.response.data.msg);
            })

    }


    return(
        <div>
            <Modal.Dialog>
                <Modal.Header onClick={props.handleClose} closeButton>
                    <Modal.Title style={{color: 'black', marginLeft:'36%'}}>Join A Chat</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className={style.joinChatContainer}>
                        <div className={style.JoinChatBox}>
                            { error && <p style={{color: "red"}}>{error}</p>}
                                <input
                                    type="text"
                                    name={'url'}
                                    placeholder="URL...."
                                    onChange={(e) => {
                                        setRoomURL(e.target.value);
                                    }}
                                /><br/>
                                <span>OR</span><br/>
                                <input
                                    type="text"
                                    placeholder="Room ID..."
                                    onChange={(e) => {
                                        setRoomID(e.target.value);
                                    }}
                                />
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Close</Button>
                    <Button variant="primary" onClick={joinRoom}>Join Room</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}

export default Chat;