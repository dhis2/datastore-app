import { combineReducers } from 'redux';
import api from './apiReducer';
import ui from './uiReducer';
import window from './windowReducer';
import browser from './browserReducer';

const reducers = combineReducers({
  api, ui, browser, window
});

export default reducers;
