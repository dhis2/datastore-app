import { combineReducers } from 'redux';
import api from './apiReducer';
import ui from './uiReducer';

const reducers = combineReducers({
  api,
  ui
});

export default reducers;
