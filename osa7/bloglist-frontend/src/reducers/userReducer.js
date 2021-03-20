const initialState = null

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const userLogin = (user) => {
  return {
    type: 'LOGIN',
    data: user
  }
}

export const userLogout = () => {
  return {
    type: 'LOGOUT',
    data: null
  }
}

export default userReducer