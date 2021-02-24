import * as actions from 'constants/actionTypes'

/**
 * searchSidebarChange - signal search bar in sidebar change
 *
 * @param  {string} value Value changed
 * @return {object}       Action
 */
export function searchSidebarChange(value) {
    return {
        type: actions.SEARCH_VALUE_CHANGE,
        searchValue: value,
    }
}
