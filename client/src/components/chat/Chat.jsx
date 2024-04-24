import { Col, Layout } from "antd"
import {  useEffect, useContext } from "react"
import ChatControl from "./chat-control/ChatControl"
import ChatMessage from "./chat-message/ChatMessage"
import { useAuth } from "@clerk/clerk-react"
import { SocketContext } from '../../context/socketContext'
import { useChat } from "../../hooks/useChat"

const { Content } = Layout

const Chat = () => {
    
    
    const { isSignedIn } = useAuth()
    const socket = useContext(SocketContext)
    const { messages, setMessages } = useChat()

    useEffect(() => {

        const handleNewMessage = (data) => {
            console.log(`${data.username} a écrit ${data.message}`)
            setMessages(prevMessages => [...prevMessages, data.message])
        }

        socket.on("new message", handleNewMessage)

        return () => {
            socket.off("new message", handleNewMessage)
        }
    }, [socket, setMessages])

    return (
        <>
            <Col className="chat">
                <Content className="chat-messages">
                    {
                        messages.length !== 0 ? messages.map((message, index) => (
                            <ChatMessage key={index} message={message} />

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
