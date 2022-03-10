import types from './counter/types'

const initial_state = {
  id: 1,
  username: "NARUTO",
}

const userReducer = (state = initial_state, action) => {
  if (action.type === types.INCREMENT_COUNTER) {
    return {
      ...state,
      username: "SASUKE"
    }
  }
  return state
}

export default userReducer;