import * as actions from '../constants/actionTypes';

const fetchedState = {
    fetching: false,
    fetched: true,
    error: false,
};
const fetchingState = {
    fetching: true,
    fetched: false,
    error: false,
};
const errorState = {
    fetching: false,
    fetched: false,
    error: true,
};

const api = (state = { fetching: false, fetched: false, namespaces: {} }, action) => {
    switch (action.type) {

    /**
     *  Namespaces
     */

    /**
     * Updates namespaces. New namespacee is added if it does
     * not exist. Note that this do not remove namespaces from the
     * state if they do not exist in the given action
     */
    case actions.FETCH_NAMESPACES_FULFILLED:
        {
            const namespaces = {};
            action.namespaces.filter(key => {
                return typeof state.namespaces[key] === 'undefined';
            }).map(key => {
                namespaces[key] = {
                    name: key,
                    open: false,
                };
            });
            return {
                ...state,
                ...fetchedState,
                namespaces: {
                    ...state.namespaces,
                    ...namespaces,
                },
            };
        }

    case actions.FETCH_NAMESPACES_PENDING:
        {
            return {
                ...state,
                ...fetchingState,
                snackbarMessage: null,
            };
        }

    case actions.FETCH_NAMESPACES_REJECTED:
        {
            return {
                ...state,
                ...errorState,
                snackbarMessage: action.error,
            };
        }

        /**
         *  Keys
         */

    case actions.FETCH_KEYS_FULFILLED:
        {
            const { namespace } = action;
            const keys = {};
            action.keys.map(key => {
                keys[key] = {
                    key,
                };
            });
            return {
                ...state,
                namespaces: {
                    ...state.namespaces,
                    [namespace]: {
                        ...state.namespaces[namespace],
                        ...fetchedState,
                        keys,
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
                snackbarMessage: null,
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
                snackbarMessage: error,
            };
        }

        /**
         *  Values
         */

    case actions.FETCH_VALUE_FULFILLED:
        {
            const { namespace, key, value } = action;
            return {
                ...state,
                ...fetchedState,
                namespaces: {
                    ...state.namespaces,
                    [namespace]: {
                        ...state.namespaces[namespace],
                        keys: {
                            ...state.namespaces[namespace].keys,
                            [key]: {
                                ...state.namespaces[namespace].keys[key],
                                value,
                            },
                        },
                    },
                },
            };
        }

    case actions.UPDATE_VALUE_FULFILLED:
        {
            const { namespace, key, value } = action;
            return {
                ...state,
                ...fetchedState,
                namespaces: {
                    ...state.namespaces,
                    [namespace]: {
                        ...state.namespaces[namespace],
                        keys: {
                            ...state.namespaces[namespace].keys,
                            [key]: {
                                ...state.namespaces[namespace].keys[key],
                                value,
                            },
                        },
                    },
                },
                snackbarMessage: {
                    message: 'Successfully updated value!',
                },
            };
        }

        /**
         *
         */
    case actions.CREATE_VALUE_FULFILLED:
        {
            const { namespace, key } = action;
            const ns = {};
            if (state.namespaces[namespace]) {
                ns[namespace] = { ...state.namespaces[namespace] };
                ns[namespace].keys = { ...state.namespaces[namespace].keys };
                ns[namespace].keys[key] = key;
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

    case actions.CREATE_NAMESPACE:
        {
            const { namespace, key, value } = action;
            return {
                ...state,
                ...fetchedState,
                namespaces: {
                    ...state.namespaces,
                    [namespace]: {
                        keys: {
                            [key]: {
                                value,
                            },
                        },
                    },
                },
            };
        }

    case actions.FETCH_VALUE_REJECTED:
        {
            const { namespace, key, error } = action;
            return {
                ...state,
                ...fetchedState,
                namespaces: {
                    ...state.namespaces,
                    [namespace]: {
                        ...state.namespaces[namespace],
                        keys: {
                            ...state.namespaces[namespace].keys,
                            [key]: {
                                ...state.namespaces[namespace].keys[key],
                                ...errorState,
                            },
                        },
                    },
                },
                snackbarMessage: error,
            };
        }

    case actions.FETCH_VALUE_PENDING:
        {
            const { namespace, key } = action;
            return {
                ...state,
                ...fetchedState,
                namespaces: {
                    ...state.namespaces,
                    [namespace]: {
                        ...state.namespaces[namespace],
                        keys: {
                            ...state.namespaces[namespace].keys,
                            [key]: {
                                ...state.namespaces[namespace].keys[key],
                                ...fetchingState,
                            },
                        },
                    },
                },
                snackbarMessage: null,
            };
        }

    case actions.FETCH_HISTORY_FULFILLED:
        {
            const { history } = action;
            return {
                ...state,
                ...fetchedState,
                history,
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
            return state;
        }
    }
};

export default api;
