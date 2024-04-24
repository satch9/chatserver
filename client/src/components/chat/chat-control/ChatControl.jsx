import { useState, useContext } from 'react'
import { RightCircleTwoTone } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { SocketContext } from '../../../context/socketContext'
import { useUser } from '@clerk/clerk-react'


const ChatControl = ({ setMessages, messages }) => {
    const [content, setContent] = useState('')
    const socket = useContext(SocketContext)
    const { user } = useUser()


    const handleChange = (e) => {
        e.preventDefault()
        setContent(e.target.value)
    }

    const handleSubmit = () => {

        if (content.trim() !== '') {
            setMessages([...messages, content])
            console.log("messages", messages)
            socket.emit("new message", { username: user.username, message: content })
            setContent('')
        }
    }
    return (
        <div className="chat-control">
            <div id="scroll" ref={scroll} />
            <form onSubmit={handleSubmit}>
                <textarea
                    className="inputMessage"
                    placeholder="votre message"
                    value={content}
                    onChange={handleChange}
                ></textarea>
                <RightCircleTwoTone onClick={handleSubmit} twoToneColor="#292C7A" style={{ fontSize: "33px", }} />
            </form>
        </div>
    )
}

ChatControl.propTypes = {
    setMessages: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
}

export default ChatControl
