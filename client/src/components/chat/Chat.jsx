import { Col, Layout } from "antd"
import { useState, useRef, useEffect, useContext } from "react"
import ChatControl from "./chat-control/ChatControl"
import ChatMessage from "./chat-message/ChatMessage"
import { useAuth } from "@clerk/clerk-react"
import { SocketContext } from '../../context/socketContext'

const { Content } = Layout

const Chat = () => {
    
    const scroll = useRef(null)
    const { isSignedIn } = useAuth()
    const socket = useContext(SocketContext)

    useEffect(() => {

        const handleNewMessage = (data) => {
            console.log(`${data.username} a écrit ${data.message}`)
            setMessages(prevMessages => [...prevMessages, data.message])
        }

        socket.on("new message", handleNewMessage)

        return () => {
            socket.off("new message", handleNewMessage)
        }
    }, [socket])

    return (
        <>
            <Col className="chat">
                <Content className="chat-messages">
                    {
                        messages.length !== 0 ? messages.map((message, index) => (
                            <ChatMessage key={index} message={message} scroll={scroll} />

                        )) :
                            <p className="chat-messages-no">Pas de messages</p>
                    }


                </Content>

                {
                    isSignedIn && (
                        <ChatControl setMessages={setMessages} messages={messages} scroll={scroll} />
                    )
                }

            </Col>
        </>

    )
}

export default Chat
