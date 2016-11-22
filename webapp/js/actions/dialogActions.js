import * as actions from '../constants/actionTypes';


export function openNamespaceDialog(dialogprops) {
    return openDialog('NEW_NAMESPACE',dialogprops);
}

export function closeNamespaceDialog(dialogprops) {
    return closeDialog('NEW_NAMESPACE',dialogprops);
}

export function openKeyDialog(dialogprops) {
    return openDialog('NEW_KEY',dialogprops);
}

export function closeKeyDialog(dialogprops) {
    return closeDialog('NEW_KEY',dialogprops);
}

/* Open a modal with given props, if no props are given
 * dialogprops will be an empty object.*/
function openDialog(dialogType,dialogprops) {
    return {
        type: actions.OPEN_DIALOG,
        dialogType,
        dialogprops: { ...dialogprops}
    }
}

function closeDialog(dialogType,dialogprops) {
    return {
        type: actions.CLOSE_DIALOG,
        dialogType: dialogType,
        dialogprops: {...dialogprops} //ensure empty object
    }
}
