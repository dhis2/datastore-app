import * as actions from 'constants/actionTypes';

const fetchedState = { fetching: false, fetched: true, error: false };
const fetchingState = { fetching: true, fetched: false, error: false };
const errorState = { fetching: false, fetched: false, error: true };

const initialState = {
    history: [],
    fetching: false,
    fetched: false,
};

const display = (state = initialState, action) => {
    switch (action.type) {

    case actions.SEARCH_JSON:
        {
            return {
                ...state,
                jsonSearchValue: action.searchValue,
            };
        }

    case actions.CREATE_VALUE_PENDING:
    case actions.FETCH_NAMESPACES_PENDING:
    case actions.FETCH_HISTORY_PENDING:
    case actions.FETCH_VALUE_PENDING:
    case actions.LOAD_VALUE:
        {
            return {
                ...state,
                ...fetchingState,
            };
        }

    case actions.CREATE_VALUE_REJECTED:
    case actions.FETCH_NAMESPACES_REJECTED:
    case actions.FETCH_HISTORY_REJECTED:
    case actions.FETCH_VALUE_REJECTED:
        {
            return {
                ...state,
                ...errorState,
            };
        }

    case actions.CREATE_VALUE_FULFILLED:
    case actions.FETCH_VALUE_FULFILLED:
    case actions.FETCH_NAMESPACES_FULFILLED:
        {
            return {
                ...state,
                ...fetchedState,
            };
        }

    case actions.FETCH_HISTORY_FULFILLED:
        {
            const { history, namespace, key } = action;
            return {
                ...state,
                ...fetchedState,
                history,
                namespace,
                key,
            };
        }

    case actions.FETCH_NAMESPACE_HISTORY_FULFILLED:
        {
            const { history, namespace } = action;
            return {
                ...state,
                ...fetchedState,
                namespace,
                history,
            };
        }

    case actions.FETCH_NAMESPACE_HISTORY_REJECTED:
        {
            return {
                ...state,
                ...errorState,
                namespace: action.namespace,
            };
        }

    case actions.SELECT_KEY:
        {
            const { namespace, key, value } = action;
            return {
                ...state,
                ...fetchedState,
                namespace,
                key,
                value,
                editedValue: value,
            };
        }

    case actions.VALUE_CHANGE:
        {
            const { namespace, key, value } = action;
            return {
                ...state,
                ...fetchedState,
                namespace,
                key,
                editedValue: value,
            };
        }

    case actions.UPDATE_VALUE_FULFILLED:
        {
            return {
                ...state,
                ...fetchedState,
                value: action.value,
            };
        }

    default: {
        return state;
    }}
};

export default display;
