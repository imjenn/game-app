import "../App.css";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import style from "./Home.module.css";
import {useEffect, useState} from "react";

const ChatCom = ({socket, username, room}) =>{
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return(
        <Container fluid={true}>
            <Row>
                <Col xs={6}>
                   <div>
                       <center><br/><h5>Chats</h5></center>
                   </div>
                   <div>
                       <button>Click</button>
                    </div>

                </Col>
                <Col xs={6}>
                    <div className={'chat-window'}>
                        <div className={'chat-body'}>
                            {messageList.map((messageContent) => {
                                return (
                                    <div
                                        className="message"
                                        id={username === messageContent.author ? "you" : "other"}
                                    >
                                        <div>
                                            <div className="message-content">
                                                <p>{messageContent.message}</p>
                                            </div>
                                            <div className="message-meta">
                                                <p id="time">{messageContent.time}</p>
                                                <p id="author">{messageContent.author}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={'chat-footer'}>
                        <div>
                            <input
                                type="text"
                                placeholder="Hey..."
                                onChange={(event) => {
                                    setCurrentMessage(event.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <button onClick={sendMessage}>&#9658;</button>
                        </div>
                    </div>
                </Col>
            </Row><br/><br/><br/><br/>
        </Container>
    )
}

export default ChatCom;