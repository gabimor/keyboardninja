import { combineReducers } from 'redux';
import search from './search';
import shortcuts from './shortcuts';

export default combineReducers({
  search,
  shortcuts
});