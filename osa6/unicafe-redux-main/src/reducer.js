const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let int
  switch (action.type) {
    case 'GOOD':
      int = state.good + 1
      //console.log({...state, good: int})
      return {...state, good: int}
    case 'OK':
      int = state.ok + 1
      return {...state, ok: int}
    case 'BAD':
      int = state.bad + 1
      return {...state, bad: int}
    case 'ZERO':
      return initialState
    default: return state
  }

}

export default counterReducer