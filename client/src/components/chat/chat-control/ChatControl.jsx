import { useState, useContext } from 'react'
import { RightCircleTwoTone } from '@ant-design/icons'
import { SocketContext } from '../../../context/socketContext'
import { useUser } from '@clerk/clerk-react'
//import { useChat } from '../../../hooks/useChat'


const ChatControl = () => {
    const [content, setContent] = useState('')
    const socket = useContext(SocketContext)
    //const { addMessage  } = useChat()
    const { user } = useUser()


    const handleChange = (e) => {
        e.preventDefault()
        setContent(e.target.value)
    }

    const handleSubmit = () => {
        if (content.trim() !== '') {
            //addMessage(content)
            socket.emit("new message", { username: user.username, message: content })
            setContent('')
        }
    }
    return (
        <div className="chat-control">
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


export default ChatControl
