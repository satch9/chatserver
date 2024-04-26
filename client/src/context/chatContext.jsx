import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const ChatContext = createContext()

export const ChatProvider = (props) => {
  const { children } = props
  const [messages, setMessages] = useState([])

  const addMessage = (data) => {
    console.log(`${data.username} a écrit ${data.message}`)
    setMessages(prevMessages => [...prevMessages, data.message])
  }

  return (
    <ChatContext.Provider value={{ messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  )
}

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
