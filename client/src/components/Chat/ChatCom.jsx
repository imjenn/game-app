import io from "socket.io-client";
import { Row, Container, Col } from 'react-bootstrap'
import style from './Chat.module.css'
import axios from "axios";
import React, { useEffect, useState } from "react";
import Picker from 'emoji-picker-react';
import Chat from "./Chat";

const ChatCom = () => {
    const socket = io.connect("http://localhost:8000");
    const user = JSON.parse(localStorage.getItem("User"));
    const username = JSON.parse(localStorage.getItem("Username"));

    const [room, setRoom] = useState(""); // Used to identify the current room in use
    const [chatRooms, setChatRooms] = useState([]); // contains the list of all the users current rooms
    const [joinedChatRooms, setJoinedChatRooms] = useState([]); // Keeps track of all the rooms that tbe user has opened up/joined (resolves Socket connection issue)
    const [messageList, setMessageList] = useState([]);
    const [currentMessage, setCurrentMessage] = useState(""); // is used to keep track of the most recent sent message
    const [currentChatRoom, setCurrentChatRoom] = useState(''); // Current room that the user is using
    const [currentChatRoomID, setCurrentChatRoomID] = useState('');
    const [isRoomSelected, setIsRoomSelected] = useState(false);

    const [showPicker, setShowPicker] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const onEmojiClick = (e, emojiObject) => {
        setCurrentMessage(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };


    //Socket Listener
    socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data]);
        updateScroll()
    });

    //Retrieves messages upon loading the page
    useEffect(async () => {
        await getRoom()
    }, []);

    function updateScroll() {
        let myDiv = document.getElementById("chatwindow");
        myDiv.scrollTop = myDiv.scrollHeight;
    }


    const joinRoom = async (e, idx) => {
        setCurrentChatRoomID(chatRooms[idx]._id);
        setIsRoomSelected(true);
        setCurrentChatRoom(idx);
        await getMessage(idx)
        updateScroll()

        if (chatRooms[idx].roomName !== "") {
            let room = chatRooms[idx].roomName;
            if(joinedChatRooms.includes(room) === false) {
                setJoinedChatRooms((list) => [...list, room]);
                socket.emit("join_room", room);
            }
        }

    }

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                roomID: currentChatRoomID,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            setCurrentMessage('')
            socket.emit("send_message", messageData);
            await saveMessage(messageData);
            updateScroll();
        }
    }


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
        if (isRoomSelected === true) {
            getMessage(currentChatRoom);
        }
        axios.get(`http://localhost:8000/chatRooms/${user}`)
            .then(res => {
                setChatRooms(res.data);
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }


    return (
        <Container fluid={true}>
            {/*{!showWindow ? (<Chat/>):( null)}*/}
            <div className={style.popUpBox}>
                {isOpen && <Chat handleClose={togglePopup}/>}
            </div>
            <Row>
                <Col>
                    <div className={style.chat_servers}>
                        <div className={style.header}>
                            <div>
                                <h4 style={{width: '250px'}}>Game Server</h4>
                            </div>
                            <div>
                                <button onClick={togglePopup} style={{border: 'none', background: "none", color: 'purple', fontSize: '40px', marginBottom: '8px'}}>+</button>
                            </div>
                        </div>
                        <div className={style.chat_server_names}>
                            {chatRooms ? chatRooms.map((rooms, idx) => {
                                return (
                                    <div key={idx}>
                                        <h6 onClick={(e) => joinRoom(e, idx)}>{rooms.roomName}</h6><br />
                                    </div>
                                )
                            }) : null}
                        </div>
                    </div>
                </Col>
                <Col xs={9}>
                    <div id={'chatwindow'} className={style.chat_window}>
                        <div className={style.chat_body}>
                            {messageList.map((messageContent) => {
                                return (
                                    <div className={style.message}>
                                        <div className={style.container}>
                                            <div className={style.user}>
                                                <img src={'https://images-platform.99static.com//uTAtZgMS24eD2FMF2X_927B24y0=/449x2030:1344x2925/fit-in/500x500/99designs-contests-attachments/92/92601/attachment_92601493'} />
                                                <span>{messageContent.author} </span>
                                            </div>
                                            <div>
                                                <p className={style.chat_body_message}>{messageContent.message}</p>
                                                <span className={style.chat_timestamp}>{messageContent.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={style.input_chat_section}>
                        <div className={style.searchBar}>
                            <input className={style.inputStyle}
                                type="text"
                                id={'chatSendButton'}
                                placeholder="Type your message here"
                                value={currentMessage}
                                onChange={(e) => {
                                    setCurrentMessage(e.target.value);
                                }}
                                   onKeyPress={event => {
                                       if (event.key === 'Enter') {
                                           sendMessage();
                                       }
                                   }}
                            />
                            <img
                                className={style.emojiIcon}
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/640px-Twemoji_1f600.svg.png"
                                style={{width: "35px"}}
                                onClick={() => setShowPicker(val => !val)}
                            />


                            {showPicker && <Picker
                                onEmojiClick={onEmojiClick}
                                pickerStyle={{bottom: '435px', left: '35vw', width: '50%', zIndex: 1}}/>
                            }
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )

}

export default ChatCom;