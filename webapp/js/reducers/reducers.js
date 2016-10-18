import { combineReducers } from 'redux';
import api from './apiReducer';
import data from './apiReducer';

const reducers = combineReducers({
  api, data
});

export default reducers;
