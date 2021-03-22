import userService from '../services/login'

const initialState = []

const allUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_NEW_USER':
      return [...state, action.data]
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAllUsers()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default allUsersReducer