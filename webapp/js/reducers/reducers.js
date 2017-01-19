import { combineReducers } from 'redux';
import api from './apiReducer';
import ui from './uiReducer';
import display from './displayReducer';
import sidebar from './sidebarReducer';

const reducers = combineReducers({
    api,
    ui,
    display,
    sidebar,
});

export default reducers;
