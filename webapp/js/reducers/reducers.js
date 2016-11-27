import { combineReducers } from 'redux';
import api from './apiReducer';
import ui from './uiReducer';
import window from './windowReducer';

const reducers = combineReducers({
    api,
    ui,
    window,
});

export default reducers;
