import { combineReducers } from 'redux'
import dialog from './dialogReducer'
import display from './displayReducer'
import jsonEditor from './jsonEditorReducer'
import navigation from './navigationReducer'
import sidebar from './sidebarReducer'
import snackbar from './snackbarReducer'

export default combineReducers({
    display,
    sidebar,
    snackbar,
    dialog,
    jsonEditor,
    navigation,
})
