export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_SHORTCUTS':
      return action.payload      
    default:
      return state
  }
}