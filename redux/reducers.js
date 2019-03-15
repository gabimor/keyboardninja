import { LOGIN, LOGOUT } from "./actions"

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: { ...action.payload } }
    case LOGOUT:
      return { ...state, user: undefined }
    default:
      return state
  }
}
