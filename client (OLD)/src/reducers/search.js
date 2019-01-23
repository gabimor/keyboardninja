export default (state = {}, action) => {
  switch (action.type) {
    case 'SEARCH':
      return {
        text: action.payload
      }
    default:
      return state
  }
}