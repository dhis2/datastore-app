import { combineReducers } from 'redux';
import display from './displayReducer';
import sidebar from './sidebarReducer';
import snackbar from './snackbarReducer';
import dialog from './dialogReducer';

const reducers = combineReducers({
    display,
    sidebar,
    snackbar,
    dialog,
});

export default reducers;
