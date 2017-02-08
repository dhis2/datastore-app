import * as actions from 'constants/actionTypes';
import * as dialogs from 'constants/dialogTypes';

/**
 * openDialog - Action creator helper method for creating dialogs
 *
 * @param  {string} dialogType  The type of dialog to open
 * @param  {object} dialogprops The props passed to the dialog
 * @return {object}             Dialog action
 */
function openDialog(dialogType, dialogprops) {
    return {
        type: actions.OPEN_DIALOG,
        dialogprops: { ...dialogprops },
        dialogType,
    };
}


/**
 * closeDialog - Action creator helper method for handling dialogs
 *
 * @param  {string} dialogType  The type of dialog to close
 * @param  {object} dialogprops The props passed to the dialog
 * @return {object}             Dialog action
 */
function closeDialog(dialogType, dialogprops) {
    return {
        type: actions.CLOSE_DIALOG,
        dialogprops: { ...dialogprops }, // ensure empty object
        dialogType,
    };
}

/**
 * openNamespaceDialog - Open a create new namespace dialog
 *
 * @param  {object} dialogprops Properties passed to dialog
 * @return {object}             Dialog action
 */
export function openNamespaceDialog(dialogprops) {
    return openDialog(dialogs.NEW_NAMESPACE, dialogprops);
}


/**
 * closeNamespaceDialog - Close create new namespace dialog
 *
 * @param  {object} dialogprops Properties passed to dialog
 * @return {object}             Dialog action
 */
export function closeNamespaceDialog(dialogprops) {
    return closeDialog(dialogs.NEW_NAMESPACE, dialogprops);
}


/**
 * openKeyDialog - Open a new key dialog
 *
 * @param  {object} dialogprops Properties passed to dialog
 * @return {object}             Dialog action
 */
export function openKeyDialog(dialogprops) {
    return openDialog(dialogs.NEW_KEY, dialogprops);
}


/**
 * closeKeyDialog - Close new key dialog
 *
 * @param  {object} dialogprops Properties passed to dialog
 * @return {object}             Dialog action
 */
export function closeKeyDialog(dialogprops) {
    return closeDialog(dialogs.NEW_KEY, dialogprops);
}


/**
 * openConfirmDeleteNamespaceDialog - Open confirm delete namespace dialog
 *
 * @param  {object} dialogprops Properties passed to dialog
 * @return {object}             Dialog action
 */
export function openConfirmDeleteNamespaceDialog(dialogprops) {
    return openDialog(dialogs.CONFIRM_DELETE_NAMESPACE, dialogprops);
}


/**
 * closeConfirmDeleteNamespaceDialog - Close confirm delete namespace dialog
 *
 * @param  {object} dialogprops Properties passed to dialog
 * @return {object}             Dialog action
 */
export function closeConfirmDeleteNamespaceDialog(dialogprops) {
    return closeDialog(dialogs.CONFIRM_DELETE_NAMESPACE, dialogprops);
}


/**
 * openConfirmDeleteKeyDialog - open confirm delete key dialog
 *
 * @param  {object} dialogprops Properties passed to dialog
 * @return {object}             Dialog action
 */
export function openConfirmDeleteKeyDialog(dialogprops) {
    return openDialog(dialogs.CONFIRM_DELETE_KEY, dialogprops);
}


/**
 * closeConfirmDeleteKeyDialog - Clode confirm delete key dialog
 *
 * @param  {object} dialogprops Properties passed to dialog
 * @return {object}             Dialog action
 */
export function closeConfirmDeleteKeyDialog(dialogprops) {
    return closeDialog(dialogs.CONFIRM_DELETE_KEY, dialogprops);
}

/**
 * openErrorDialog - description
 *
 * @param  {object} openErrorDialog Properties passed to dialog
 * @return {object}                 Dialog action
 */
export function openErrorDialog(dialogprops) {
    return openDialog(dialogs.ERROR_DIALOG, dialogprops);
}

/**
 * openErrorDialog - description
 *
 * @param  {object} openErrorDialog Properties passed to dialog
 * @return {object}                 Dialog action
 */
export function closeErrorDialog(dialogprops) {
    return closeDialog(dialogs.ERROR_DIALOG, dialogprops);
}
