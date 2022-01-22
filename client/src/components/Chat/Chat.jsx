import io from "socket.io-client";
import {useState} from "react";
import ChatCom from "./ChatCom";
import axios from "axios";
import style from './Chat.module.css';

const socket = io.connect("http://localhost:8000");

const Chat = () =>{
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [messageList, setMessageList] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () =>{
        if(username !== "" && room !== ""){
            socket.emit("join_room", room);
            setShowChat(true);
        }
    }

    const createRoom = (e) => {
        const newChat = {
            owner: "email@email",
            roomName: room
        }

        if (username === "" && room === "") {
            alert("Please Fill in the input fields");
        } else {

            e.preventDefault();
            axios.post("http://localhost:8000/newchat", newChat, { withCredentials: true })
                .then(res => {
                    console.log(res.data)
                    socket.emit("join_room", room);
                    setShowChat(true);
                })
                .catch(err => {
                    console.log(err.response);
                    console.log(err.response.data)
                })
        }
    }

    return (
        <div className="Chat">
            {!showChat ? (
                <div className={style.joinChatContainer}>
                    <div className={style.JoinChatBox}>
                        <div className={style.JoinChat}>
                            <h3>Join A Chat</h3>
                            <input
                                type="text"
                                placeholder="John..."
                                onChange={(event) => {
                                    setUsername(event.target.value);
                                }}
                            /><br/>
                            <input
                                type="text"
                                placeholder="Room ID..."
                                onChange={(event) => {
                                    setRoom(event.target.value);
                                }}
                            /><br/><br/>
                            <button onClick={createRoom}>Join A Room</button>
                        </div>
                    </div>
                </div>
                ) : (
                    <ChatCom socket={socket} username={username} room={room} />
                )}
        </div>
    );
}

export default Chat;