export const LOGIN = "ADD_TODO"
export const LOGOUT = "TOGGLE_TODO"

export const login = user => ({
  type: LOGIN,
  payload: { ...user },
})

export const logout = id => ({
  type: LOGOUT,
})
