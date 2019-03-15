import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"
import { reducer } from "./reducers"

// const exampleInitialState = { test: 1 }

// export const actionTypes = {
//   CANCEL_SUGGEST_SHORTCUT: "CANCEL_SUGGEST_SHORTCUT",
//   CANCEL_SUGGEST_APP: "CANCEL_SUGGEST_APP",
//   SUGGEST_SHORTCUT: "SUGGEST_SHORTCUT",
//   SUGGEST_APP: "SUGGEST_APP",
//   SET_OS: "SET_OS",
// }

// REDUCERS
// export const reducer = (state = exampleInitialState, action) => {
//   switch (action.type) {
//     case actionTypes.SUGGEST_SHORTCUT:
//       return { ...state, addShortcut: true, overlay: true }
//     case actionTypes.CANCEL_SUGGEST_SHORTCUT:
//       return { ...state, addShortcut: false, overlay: false }
//     case actionTypes.SUGGEST_APP:
//       return { ...state, addApp: action.name }
//     case actionTypes.CANCEL_SUGGEST_APP:
//       return { ...state, addApp: false }
//     case actionTypes.SET_OS:
//       return { ...state, os: action.os }
//     default:
//       return state
//   }
// }

export function initializeStore(initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
