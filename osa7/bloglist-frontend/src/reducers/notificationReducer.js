const initialState = { message: null, style: true }
let timeoutId

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return { message: action.message, style: true }
    case 'FAIL':
      return { message: action.message, style: false }
    case 'REMOVE':
      return { message: null, style: false }
    default:
      return state
  }
}

export const notificationSuccess = (message) => {
  return async dispatch => {
    clearTimeout(timeoutId)
    dispatch({
      type: 'SUCCESS',
      message
    })
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
}

export const notificationFail = (message) => {
  return async dispatch => {
    clearTimeout(timeoutId)
    dispatch({
      type: 'FAIL',
      message
    })
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
}

export const removeNotification = () => {
  return { type: 'REMOVE' }
}

export default notificationReducer