import PropTypes from 'prop-types'
import { useEffect } from 'react'

const ChatMessage = ({ message, index, scroll }) => {

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        scroll.current?.scrollIntoView({ behavior: 'smooth' })
    }, [message, scroll])

    return (
        <>
            <div key={index} className="message" ref={scroll}>
                {message}
            </div>
            <div id="scroll" ref={scroll} />
        </>
    )
}

ChatMessage.propTypes = {
    message: PropTypes.string.isRequired, // Validation du type et de l'obligatorité de la prop 'message'
    index: PropTypes.number.isRequired, // Validation du type et de l'obligatorité de la prop 'index'
    scroll: PropTypes.func.isRequired, // Validation du type et de l'obligatorité de la prop 'scroll'
};

export default ChatMessage
