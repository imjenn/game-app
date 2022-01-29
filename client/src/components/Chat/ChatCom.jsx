import io from "socket.io-client";
import { Row, Container, Col } from 'react-bootstrap'
import style from './Chat.module.css'
import axios from "axios";
import React, { useEffect, useState } from "react";

const socket = io.connect("http://localhost:8000");

const ChatCom = () => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [chatRooms, setChatRooms] = useState([]);
    const [room, setRoom] = useState("");
    const [currentChatRoom, setCurrentChatRoom] = useState('');
    const [isRoomSelected, setIsRoomSelected] = useState(false);
    const user = JSON.parse(localStorage.getItem("User"));

    useEffect(() => {
        getRoom()
    }, []);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data)
            setMessageList((list) => [...list, data]);
            getRoom()
        });

    }, [messageList]);


    function updateScroll() {
        var myDiv = document.getElementById("chatwindow");
        myDiv.scrollTop = myDiv.scrollHeight;
    }

    const joinRoom = async (e, idx) => {
        setCurrentChatRoom(idx);
        await getMessage(idx)
        updateScroll()

        if (chatRooms[idx].roomName !== "") {
            console.log(chatRooms[idx].roomName)
            let room = chatRooms[idx].roomName;
            socket.emit("join_room", room);
        }
    }


    const sendMessage = async () => {
        document.getElementById('chatSendButton').value = "";

        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: user,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            await saveMessage(messageData);
            updateScroll()
        }
    };


    const saveMessage = (message) => {
        axios.post("http://localhost:8000/saveMessage", message, { withCredentials: true })
            .then(res => {
                console.log(res.status)
            })
            .catch(err => {
                console.log(err.response);
                console.log(err.response.data)
            })

    }

    const getMessage = (idx) => {
        setMessageList([])
        console.log(chatRooms[idx]);

        let room = chatRooms[idx].roomName;
        setRoom(room);

        for (let i = 0; i < chatRooms[idx].messageHistory.length; i++) {
            let data = {
                room: room,
                author: chatRooms[idx].messageHistory[i].username,
                message: chatRooms[idx].messageHistory[i].msg,
                time: chatRooms[idx].messageHistory[i].timestamp,
            }


            setMessageList((list) => [...list, data]);
        }
    }

    const getRoom = () => {
        if (isRoomSelected) {
            getMessage(currentChatRoom);
        }

        console.log("This is the user:", user);
        axios.get(`http://localhost:8000/chatRooms/${user}`)
            .then(res => {
                setChatRooms(res.data);
                // console.log(res.data);
            })
            .catch(err => console.log(err));
    }


    return (
        <Container fluid={true}>
            <Row>
                <Col>
                    <div className={style.chatRoomName}>
                        <h4>Chat Rooms</h4>
                        <div className={style.chatNameText}>
                            {chatRooms ? chatRooms.map((rooms, idx) => {
                                return (
                                    <div key={idx}>
                                        <h6 className={style.roomNameText} onClick={(e) => joinRoom(e, idx)}>{rooms.roomName}</h6><br />
                                    </div>
                                )
                            }) : null}
                        </div>
                    </div>
                </Col>
                <Col xs={9}>
                    <div id={'chatwindow'} className={style.chatwindow}>
                        <div className={style.chatbody}>
                            {messageList.map((messageContent) => {
                                return (
                                    <div
                                        className={style.message}
                                    >
                                        <div className={style.container}>
                                            <div className={style.author}>
                                                <img src={'https://images-platform.99static.com//uTAtZgMS24eD2FMF2X_927B24y0=/449x2030:1344x2925/fit-in/500x500/99designs-contests-attachments/92/92601/attachment_92601493'} />
                                                <span>{messageContent.author} </span>
                                            </div>
                                            <div>
                                                <p className={style.bodyText}>{messageContent.message}</p><br /><br />
                                                <span className={style.timeright}>{messageContent.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={'chat-footer'}>
                        <div>
                            <input className={style.inputMessage}
                                type="text"
                                id={'chatSendButton'}
                                placeholder="Hey..."
                                onChange={(event) => {
                                    setCurrentMessage(event.target.value);
                                }}
                            />
                            <button onClick={sendMessage}>&#9658;</button>
                        </div>
                    </div>
                </Col>
            </Row><br /><br /><br /><br />
        </Container>
    )

}

export default ChatCom;