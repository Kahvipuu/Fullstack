
const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER_CHANGE':
      return action.data
    case 'FILTER_REMOVE':
      return ''
    default:
      return state
  }
}

export const changeFilter = (filter) => {
  const changeNotific = {
    type: 'FILTER_CHANGE',
    data: filter
  }
  return changeNotific
}

export const removeFilter = () => {
  return {type: 'FILTER_REMOVE'}
}

export default filterReducer