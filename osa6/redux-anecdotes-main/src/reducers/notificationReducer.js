
const initialState = 'alkuarvo testaukseen'

const notificationReducer = (state = initialState, action) => {
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
  return {type: 'REMOVE'}
}

export default notificationReducer