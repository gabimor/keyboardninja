import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"

const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
}

export const actionTypes = {
  ADD_SHORTCUT: "ADD_SHORTCUT",
  ADD_APP: "ADD_APP",
  SET_OVERLAY: "SET_OVERLAY",
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_SHORTCUT:
      return { ...state, addShortcut: true }
    case actionTypes.ADD_APP:
      return { ...state, addApp: action.name }
    case actionTypes.SET_OVERLAY:
      return { ...state, overlay: action.value }
    default:
      return state
  }
}

// ACTIONS
export const serverRenderClock = isServer => dispatch => {
  return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() })
}

export const startClock = dispatch => {
  return setInterval(() => {
    // Dispatch `TICK` every 1 second
    dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() })
  }, 1000)
}

export const incrementCount = () => dispatch => {
  return dispatch({ type: actionTypes.INCREMENT })
}

export const decrementCount = () => dispatch => {
  return dispatch({ type: actionTypes.DECREMENT })
}

export const resetCount = () => dispatch => {
  return dispatch({ type: actionTypes.RESET })
}

export function initializeStore(initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
