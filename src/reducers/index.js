import { combineReducers } from 'redux'
import dialog from './dialogReducer.js'
import display from './displayReducer.js'
import jsonEditor from './jsonEditorReducer.js'
import navigation from './navigationReducer.js'
import sidebar from './sidebarReducer.js'
import snackbar from './snackbarReducer.js'

export default combineReducers({
    display,
    sidebar,
    snackbar,
    dialog,
    jsonEditor,
    navigation,
})
