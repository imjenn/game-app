import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useEffect, useState} from "react";
import axios from "axios";
import style from './Chat.module.css'

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
            saveMessage(messageData);
            getMessage()
        }
    };

    useEffect(() => {

        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });

    }, [socket]);

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

    const getMessage = () => {

        axios.get("http://localhost:8000/getMessages")
            .then(res => {
                console.log("what happen")
                console.log(res.data.messageHistory[res.data.messageHistory.length-1].msg)

                for (let i = 0; i < res.data.messageHistory.length - 1; i++) {
                    let data = {
                        room: room,
                        author: res.data.messageHistory[i].username,
                        message: res.data.messageHistory[i].msg,
                        time: res.data.messageHistory[i].timestamp,
                    }

                    setMessageList((list) => [...list, data]);
                }

            })
            .catch(err => {
                console.log(err.response);
                console.log(err.response.data)
            })

        //setMessageList(data);

    }



    return(
        <Container fluid={true}>
            <Row>
                <Col>
                    <a></a>
                </Col>
                <Col xs={6}>
                    <div className={style.chatwindow}>
                        <div className={style.chatbody}>
                            {messageList.map((messageContent) => {
                                return (
                                    <div
                                        className={style.message}
                                        id={username === messageContent.author ? "you" : "other"}
                                    >
                                        <div>
                                            <div className={style.messagecontent}>
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