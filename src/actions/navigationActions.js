import { SET_IGNORE_NEXT_CONFIRM_NAVIGATION } from '../constants/actionTypes'

export function setIgnoreNextNavigationConfirm() {
    return {
        type: SET_IGNORE_NEXT_CONFIRM_NAVIGATION,
        ignoreNextConfirm: true,
    }
}
