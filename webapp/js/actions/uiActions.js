import * as actions from '../constants/actionTypes';

export function searchSidebarChange(value) {
    return {
        type: actions.SEARCH_VALUE_CHANGE,
        searchValue: value,
    };
}
