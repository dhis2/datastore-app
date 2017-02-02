import { combineReducers } from 'redux';
import display from './displayReducer';
import sidebar from './sidebarReducer';
import snackbar from './snackbarReducer';
import dialog from './dialogReducer';
import jsonEditor from './jsonEditorReducer';

const reducers = combineReducers({
    display,
    sidebar,
    snackbar,
    dialog,
    jsonEditor,
});

export default reducers;
