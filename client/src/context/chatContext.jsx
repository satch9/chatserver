import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const ChatContext = createContext()

export const ChatProvider = (props) => {
  const { children } = props
  const [messages, setMessages] = useState([])

  return (
    <ChatContext.Provider value={{ messages, setMessages }}>
      {children}
    </ChatContext.Provider>
  )
}

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
