import * as actions from '../constants/actionTypes';

export function loadWindow() {
    return {
        type: actions.LOAD_WINDOW,
        loading: true,
    };
}

export function changeWindow(window) {
    return {
        type: actions.CHANGE_WINDOW,
        window,
    };
}

export function setBroswerList(list) {
    return {
        type: actions.SET_BROWSER_LIST,
        list,
    };
}

export function setBrowserPath(path) {
    return {
        type: actions.SET_BROWSER_PATH,
        path,
    };
}
