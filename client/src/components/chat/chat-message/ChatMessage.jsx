import PropTypes from 'prop-types'
import { useRef, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Tag, Card, Image } from 'antd'
import { CalendarOutlined } from "@ant-design/icons"
import robot from "../../../../assets/robot.png"

// Composant de chat message
const ChatMessage = ({ message }) => {

    const { user } = useUser()
    const scroll = useRef(null)


    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        scroll.current?.scrollIntoView({ behavior: 'smooth' })
    }, [message])

    // Vérifie si message est défini
    if (!message) {
        return null; // Retourne null si message est undefined
    }

    return (
        <>
            <Tag
                color='gold'
                icon={
                    <CalendarOutlined size={20} />
                }
                style={{ marginTop: "5px" }}
            >
                23/04/2024
            </Tag>
            <Card
                bordered={false}
                className="chat-message-card-from"
            >
                <div className="message" ref={scroll}>
                    <div style={{ display: "inline", height: "60px" }}>
                        <Image
                            preview={false}
                            src={user ? user.imageUrl : robot}
                            width={30}
                            height={30}
                            style={{ borderRadius: "50%", verticalAlign: "baseLine" }}
                        />
                    </div>
                    <div className="chat-message-card-from-text">
                        {message}
                        <p
                            className="chat-message-card-from-horaire"
                        >
                            {new Date().toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                    </div>
                </div>
                <div id="scroll" ref={scroll} />
            </Card>

        </>
    )
}

ChatMessage.propTypes = {
    message: PropTypes.string.isRequired, // Validation du type et de l'obligatorité de la prop 'message'
};

export default ChatMessage
