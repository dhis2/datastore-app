import * as actions from '../constants/actions';

export function changeWindow(window) {
    return {
        type: actions.CHANGE_WINDOW,
        window,
    };
}
