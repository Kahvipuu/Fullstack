import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  console.log('Notification selector',notification);
  if (notification.message === null) {
    return null
  }
  if (notification.style) {
    return (
      <div className='success'>
        {notification.message}
      </div>
    )
  } else {
    return (
      <div className='error'>
        {notification.message}
      </div>
    )
  }
}

export default Notification
