import PropTypes from 'prop-types'
import {  useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Tag, Card, Image } from 'antd'
import { CalendarOutlined } from "@ant-design/icons"


// Composant de chat message
const ChatMessage = ({ message, index, scroll }) => {
    
    const { user } = useUser()
   


    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        scroll.current?.scrollIntoView({ behavior: 'smooth' })
    }, [message, scroll])

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
                <div key={index} className="message" ref={scroll}>
                    <div style={{ display: "inline", height: "60px"}}>
                        <Image
                            preview={false}
                            src={user.imageUrl}
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
    index: PropTypes.number, // Validation du type et de l'obligatorité de la prop 'index'
    scroll: PropTypes.object.isRequired, // Validation du type et de l'obligatorité de la prop 'scroll'
};

export default ChatMessage
