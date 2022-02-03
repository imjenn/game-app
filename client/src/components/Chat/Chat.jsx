import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {useState} from "react";
import style from './Chat.module.css'
import io from "socket.io-client";
import axios from "axios";

const Chat = (props) =>{
    const user = JSON.parse(localStorage.getItem("User"));
    const [roomURL, setRoomURL] = useState("");
    const [roomID, setRoomID] = useState("");

    const joinRoom = (e) => {
        if (roomURL !== ""){
            joinRoomURL(e,roomURL)
            return;
        }

        console.log("hit hit")
        let chatInfo ={
            user: user,
            roomID: roomID
        };

        e.preventDefault();
        axios.post("http://localhost:8000/joinchat", chatInfo, { withCredentials: true })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.response);
                console.log(err.response.data)
            })

    }

    const joinRoomURL = (e,url) => {
        let chatInfo ={user: user};
        e.preventDefault();
        axios.post(url, chatInfo, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                console.log("ney")
            })
            .catch(err => {
                console.log(err.response);
                console.log(err.response.data)
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
                                <input
                                    type="text"
                                    name={'url'}
                                    placeholder="URL...."
                                    onChange={(event) => {
                                        setRoomURL(event.target.value);
                                    }}
                                /><br/>
                                <span>OR</span><br/>
                                <input
                                    type="text"
                                    placeholder="Room ID..."
                                    onChange={(event) => {
                                        setRoomID(event.target.value);
                                    }}
                                /><br/><br/>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Close</Button>
                    <Button variant="primary" onClick={joinRoom}>Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}

export default Chat;