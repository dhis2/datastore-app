import { combineReducers } from 'redux';
import api from './apiReducer';
import ui from './uiReducer';
import data from './dataReducer';

const reducers = combineReducers({
  api, ui, data
});

export default reducers;
