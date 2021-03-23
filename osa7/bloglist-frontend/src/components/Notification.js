import React from 'react'
import {Alert} from '@material-ui/lab'
import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => state.notifications)
  console.log('Notification selector', notification)
  if (notification.message === null) {
    return null
  }
  if (notification.style) {
    return (
      <Alert severity='success'>
        {notification.message}
      </Alert>
    )
  } else {
    return (
      <Alert severity='error'>
        {notification.message}
      </Alert>
    )
  }
}

export default Notification
