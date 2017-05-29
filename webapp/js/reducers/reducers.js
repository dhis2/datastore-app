import { combineReducers } from 'redux';
import display from './displayReducer';
import sidebar from './sidebarReducer';
import snackbar from './snackbarReducer';
import dialog from './dialogReducer';
import jsonEditor from './jsonEditorReducer';
import navigation from './navigationReducer';

const reducers = combineReducers({
    display,
    sidebar,
    snackbar,
    dialog,
    jsonEditor,
    navigation
});

export default reducers;
