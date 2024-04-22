import { Col, Layout } from "antd"
import { useState, useRef } from "react"
import ChatControl from "./chat-control/ChatControl"
import ChatMessage from "./chat-message/ChatMessage"
import { useAuth } from "@clerk/clerk-react"

const { Content } = Layout

const Chat = () => {
    const [messages, setMessages] = useState([])
    const scroll = useRef(null)
    const { isSignedIn } = useAuth()

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
