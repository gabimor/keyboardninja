import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"

const exampleInitialState = {
  os: "win",
}

export const actionTypes = {
  ADD_SHORTCUT: "ADD_SHORTCUT",
  ADD_APP: "ADD_APP",
  SET_OVERLAY: "SET_OVERLAY",
  SET_OS: "SET_OS",
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
    case actionTypes.SET_OS:
      return { ...state, os: action.os }
    default:
      return state
  }
}

export function initializeStore(initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
