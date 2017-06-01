import { SET_IGNORE_NEXT_CONFIRM_NAVIGATION } from '../constants/actionTypes';

export function setIgnoreNextNavigationConfirm(ignoreNext = true) {
    return {
        type: SET_IGNORE_NEXT_CONFIRM_NAVIGATION,
        ignoreNextConfirm: ignoreNext
    };
}
