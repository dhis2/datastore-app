import { combineReducers } from 'redux';
import api from './apiReducer';
import ui from './uiReducer';
import window from './windowReducer';
import sidebar from './sidebarReducer';

const reducers = combineReducers({
    api,
    ui,
    window,
    sidebar,
});

export default reducers;
