import * as actions from '../constants/actionTypes.js'

/**
 * openDialog - Action creator helper method for creating dialogs
 *
 * @param  {string} dialogType  The type of dialog to open
 * @param  {object} dialogprops The props passed to the dialog
 * @return {object}             Dialog action
 */
export function openDialog(dialogType, dialogprops = {}) {
    return {
        type: actions.OPEN_DIALOG,
        dialogprops,
        dialogType,
    }
}

/**
 * closeDialog - Action creator helper method for handling dialogs
 *
 * @param  {string} dialogType  The type of dialog to close
 * @param  {object} dialogprops The props passed to the dialog
 * @return {object}             Dialog action
 */
export function closeDialog() {
    return {
        type: actions.CLOSE_DIALOG,
    }
}
