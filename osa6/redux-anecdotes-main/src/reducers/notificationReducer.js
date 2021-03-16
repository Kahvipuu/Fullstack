
const initialState = 'alkuarvo testaukseen'

const notificationReducer = (state = initialState, action) => {
  console.log('Notif-State', state)
  console.log('Notif-action', action)
  switch (action.type) {
    case 'CHANGE':
      return action.data
    case 'REMOVE':
      return ''
    default:
      return state
  }
}

export const changeNotification = (notification) => {
  const changeNotific = {
    type: 'CHANGE',
    data: notification
  }
  return changeNotific
}

export const removeNotification = () => {
  return { type: 'REMOVE' }
}

export const setTimedNotification = (notification, time) => {
  return async dispatch => {
    dispatch(changeNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export default notificationReducer