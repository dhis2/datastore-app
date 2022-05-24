import * as actions from '../constants/actionTypes.js'
import * as jsonEditorActions from '../constants/jsonEditorTypes.js'

const fetchedState = { fetching: false, fetched: true, error: false }
const fetchingState = { fetching: true, fetched: false, error: false }
const errorState = { fetching: false, fetched: false, error: true }

const initialState = {
    fetching: false,
    fetched: false,
}

const display = (state = initialState, action) => {
    switch (action.type) {
        case jsonEditorActions.SEARCH_JSON: {
            return {
                ...state,
                jsonSearchValue: action.searchValue,
            }
        }

        case actions.FETCH_NAMESPACES_PENDING:
        case actions.FETCH_VALUE_PENDING:
        case actions.LOAD_VALUE: {
            return {
                ...state,
                ...fetchingState,
            }
        }

        case actions.FETCH_NAMESPACES_REJECTED:
        case actions.FETCH_VALUE_REJECTED: {
            return {
                ...state,
                ...errorState,
            }
        }

        case actions.FETCH_VALUE_FULFILLED:
        case actions.FETCH_NAMESPACES_FULFILLED: {
            return {
                ...state,
                ...fetchedState,
            }
        }

        case actions.SELECT_KEY: {
            const { namespace, key, value } = action
            return {
                ...state,
                ...fetchedState,
                namespace,
                key,
                value,
                editedValue: value,
            }
        }

        case actions.VALUE_CHANGE: {
            const { namespace, key, value } = action
            return {
                ...state,
                ...fetchedState,
                namespace,
                key,
                editedValue: value,
            }
        }

        case actions.UPDATE_VALUE_FULFILLED: {
            return {
                ...state,
                ...fetchedState,
                value: action.value,
            }
        }

        default: {
            return state
        }
    }
}

export default display
