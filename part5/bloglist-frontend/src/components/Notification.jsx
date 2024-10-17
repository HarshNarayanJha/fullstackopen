import PropTypes from 'prop-types'

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }

  return <div className={messageType}>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired,
}

export default Notification
