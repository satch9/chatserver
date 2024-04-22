import { useState } from 'react'
import { RightCircleTwoTone } from '@ant-design/icons'
import PropTypes from 'prop-types'


const ChatControl = ({ setMessages, messages }) => {
    const [content, setContent] = useState('')

    const handleChange = (e) => {
        e.preventDefault()
        setContent(e.target.value)
    }

    const handleSubmit = () => {

        if (content.trim() !== '') {
            setMessages([...messages, content])
            console.log("messages", messages)
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
                <RightCircleTwoTone onClick={handleSubmit} twoToneColor="#52c41a" style={{ fontSize: "33px", }} />
            </form>
        </div>
    )
}

ChatControl.propTypes = {
    setMessages: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
}

export default ChatControl
