import * as actions from '../constants/actionTypes';

const fetchedState = { fetching: false, fetched: true, error: false };
const fetchingState = { fetching: true, fetched: false, error: false };
const errorState = { fetching: false, fetched: false, error: true };

const initialState = {
    searchValue: '',
    history: [],
    fetching: false,
    fetched: false,
    namespaces: {},
};

const updateNamespaces = (currentNamespaces, newNamespaces) => {
    const namespaces = {};
    currentNamespaces.filter(key => typeof newNamespaces[key] === 'undefined').forEach(key => {
        namespaces[key] = {
            name: key,
            open: false,
            keys: {},
        };
    });
    return namespaces;
};

const createKeysFromArray = (arrayOfKeys) => {
    const keys = {};
    arrayOfKeys.forEach(key => {
        keys[key] = {
            key,
        };
    });
    return keys;
};

const sidebar = (state = initialState, action) => {
    switch (action.type) {

    case actions.SEARCH_VALUE_CHANGE:
        {
            return {
                ...state,
                searchValue: action.searchValue,
            };
        }

    case actions.TOGGLE_NAMESPACE:
        {
            const { namespace } = action;
            const open = action.override || !state.namespaces[namespace].open;
            return {
                ...state,
                namespaces: {
                    ...state.namespaces,
                    [namespace]: {
                        ...state.namespaces[namespace],
                        open,
                    },
                },
            };
        }

    case actions.FETCH_NAMESPACES_FULFILLED:
        {
            return {
                ...state,
                ...fetchedState,
                namespaces: {
                    ...state.namespaces,
                    ...updateNamespaces(action.namespaces, state.namespaces),
                },
            };
        }


    case actions.FETCH_NAMESPACES_PENDING:
        {
            return {
                ...state,
                ...fetchingState,
            };
        }

    case actions.FETCH_NAMESPACES_REJECTED:
        {
            return {
                ...state,
                ...errorState,
            };
        }

    case actions.FETCH_KEYS_FULFILLED:
        {
            const { namespace } = action;
            return {
                ...state,
                namespaces: {
                    ...state.namespaces,
                    [namespace]: {
                        ...state.namespaces[namespace],
                        ...fetchedState,
                        keys: createKeysFromArray(action.keys),
                    },
                },
            };
        }

    case actions.FETCH_KEYS_PENDING:
        {
            const { namespace } = action;
            return {
                ...state,
                namespaces: {
                    ...state.namespaces,
                    [namespace]: {
                        ...state.namespaces[namespace],
                        ...fetchingState,
                    },
                },
            };
        }

    case actions.FETCH_KEYS_REJECTED:
        {
            const { namespace, error } = action;
            return {
                ...state,
                namespaces: {
                    ...state.namespaces,
                    [namespace]: {
                        ...state.namespaces[namespace],
                        ...errorState,
                        errorMessage: error,
                    },
                },
            };
        }

    case actions.FETCH_VALUE_FULFILLED:
    case actions.CREATE_VALUE_FULFILLED:
        {
            const { namespace, key, value } = action;
            const ns = {};

            if (typeof state.namespaces[namespace] !== 'undefined') {
                ns[namespace] = {
                    ...state.namespaces[namespace],
                    keys: {
                        ...state.namespaces[namespace].keys,
                        [key]: {
                            key,
                            value,
                        },
                    },
                };
            } else {
                ns[namespace] = {
                    name: namespace,
                    open: false,
                    keys: {
                        [key]: {
                            'key:': key,
                            value: {},
                        },
                    },
                };
            }

            return {
                ...state,
                ...fetchedState,
                namespaces: {
                    ...state.namespaces,
                    ...ns,
                },
            };
        }


    case actions.SELECT_KEY:
        {
            const { namespace, key, value } = action;
            return {
                ...state,
                namespace,
                key,
                value,
                editedValue: value,
            };
        }

    case actions.DELETE_NAMESPACE_FULFILLED:
        {
            const namespaces = state.namespaces;
            delete namespaces[action.namespace];
            return {
                ...state,
                namespaces: {
                    ...namespaces,
                },
            };
        }

    case actions.DELETE_KEY_FULFILLED:
        {
            const { namespace, key } = action;
            const updatedNamespace = state.namespaces[namespace];
            delete updatedNamespace.keys[key];
            return {
                ...state,
                namespaces: {
                    ...state.namespaces,
                    [updatedNamespace.name]: updatedNamespace,
                },
            };
        }

    default:
        {
            return {
                ...state,
            };
        }
    }
};

export default sidebar;
