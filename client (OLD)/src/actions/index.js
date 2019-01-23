// export const simpleAction = () => dispatch => {
//   dispatch({
//     type: 'SIMPLE_ACTION',
//     payload: 'result_of_simple_action'
//   })
// }

export const doSearch = (search) => ({
  type: 'SEARCH',
  payload: search
})

// export const fetchShortcuts = (shortcuts) => ({
//   type: 'FETCH_SHORTCUTS',
//   payload: shortcuts
// })