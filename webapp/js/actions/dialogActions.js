import * as actions from 'constants/actionTypes';
import * as dialogs from 'constants/dialogTypes';

/* Open a modal with given props, if no props are given
 * dialogprops will be an empty object.*/
function openDialog(dialogType, dialogprops) {
    return {
        type: actions.OPEN_DIALOG,
        dialogprops: { ...dialogprops },
        dialogType,
    };
}

function closeDialog(dialogType, dialogprops) {
    return {
        type: actions.CLOSE_DIALOG,
        dialogprops: { ...dialogprops }, // ensure empty object
        dialogType,
    };
}

export function openNamespaceDialog(dialogprops) {
    return openDialog(dialogs.NEW_NAMESPACE, dialogprops);
}

export function closeNamespaceDialog(dialogprops) {
    return closeDialog(dialogs.NEW_NAMESPACE, dialogprops);
}

export function openKeyDialog(dialogprops) {
    return openDialog(dialogs.NEW_KEY, dialogprops);
}

export function closeKeyDialog(dialogprops) {
    return closeDialog(dialogs.NEW_KEY, dialogprops);
}

export function openConfirmDeleteNamespaceDialog(dialogprops) {
    return openDialog(dialogs.CONFIRM_DELETE_NAMESPACE, dialogprops);
}

export function closeConfirmDeleteNamespaceDialog(dialogprops) {
    return closeDialog(dialogs.CONFIRM_DELETE_NAMESPACE, dialogprops);
}

export function openConfirmDeleteKeyDialog(dialogprops) {
    return openDialog(dialogs.CONFIRM_DELETE_KEY, dialogprops);
}

export function closeConfirmDeleteKeyDialog(dialogprops) {
    return closeDialog(dialogs.CONFIRM_DELETE_KEY, dialogprops);
}
