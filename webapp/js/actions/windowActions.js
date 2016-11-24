import * as actions from '../constants/actionTypes';


export function requestHistory() {
    return {
        type: actions.SET_EDIT_WINDOW,
        payload: { },
    };
}

export function toggleNamespace() {
    return {
        type: actions.SET_BROWSER_WINDOW,
        payload: {

        },
    };
}
