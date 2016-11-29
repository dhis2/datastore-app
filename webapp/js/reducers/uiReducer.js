import * as actions from '../constants/actionTypes';

const fetchedState = { fetching: false, fetched: true, error: false };
const fetchingState = { fetching: true, fetched: false, error: false };
const errorState = { fetching: false, fetched: false, error: true };
const emptyDialog = { dialogType: null, dialogprops: {} };
const emptySnackbar = { snackbarMessage: { message: '' } };

const ui = (state = { dialog: { ...emptyDialog } }, action) => {
    switch (action.type) {
        case actions.SET_WINDOW_VIEW:
        {
            return {
                ...state,
            };
        }
        case actions.LOAD_VALUE: {
            return {
                ...state,
                ...emptySnackbar
            }
        }
        case actions.SELECT_NAMESPACE:
        {
            const {selectedNamespace} = action;
            return {
                ...state,
                selectedNamespace,
            };
        }
        case actions.SELECT_KEY:
        {
            const {namespace, key, value} = action;
            return {
                ...state,
                ...fetchedState,
                namespace,
                key,
                value,
                ...emptySnackbar,
                editedValue: {},
            };
        }

        case actions.FETCH_VALUE_PENDING:
        {
            return {
                ...state,
                ...fetchingState,
            };
        }

        case actions.UPDATE_VALUE_FULFILLED:
        {
            const {value} = action;
            return {
                ...state,
                value,
                snackbarMessage: {
                    message: 'Value saved.'
                },
            };
        }

        case actions.UPDATE_VALUE_REJECTED:
        {
            return {
                ...state,
                snackbarMessage: {
                    message: 'Failed to save.'
                },
            };
        }
        case actions.FETCH_HISTORY_REJECTED: {
            return {
                ...state,
                snackbarMessage: {
                    message: 'Failed to get history.'
                }
            }
        }
        case actions.OPEN_DIALOG:
        {
            return {
                ...state,
                dialog: {
                    dialogType: action.dialogType,
                    dialogprops: action.dialogprops,
                },
            };
        }
        case actions.CLOSE_DIALOG:
        {
            return {
                ...state,
                dialog: {
                    ...emptyDialog,
                },
            };
        }

        case actions.CREATE_NAMESPACE:
        {
            const {namespace, key} = action;
            return {
                ...state,
                namespaceToBeCreated: {
                    namespace,
                    key,
                },
            };
        }
        case actions.VALUE_CHANGE:
        {
            const {namespace, key, value} = action;
            return {
                ...state,
                namespace,
                key,
                editedValue: value,
            };
        }
        case actions.FETCH_KEYS_REJECTED:
        {
            return {
                ...state,
                ...errorState,
                snakbarMessage: action.error
            }
        }
        case actions.FETCH_NAMESPACES_REJECTED:
        {
            return {
                ...state,
                ...errorState,
                snackbarMessage: action.error,
            };
        }
        case actions.DELETE_KEY_FULFILLED: {
            return {
                ...state,
                snackbarMessage: {
                    message: 'Key deleted.'
                }
            }
        }
        case actions.DELETE_NAMESPACE_FULFILLED: {
            return {
                ...state,
                snackbarMessage: {
                    message: 'Namespace deleted.'
                }
            }
        }
        case actions.CREATE_VALUE_PENDING: {
            return {
                ...state,
                ...fetchingState
            }
        }
        case actions.CREATE_VALUE_FULFILLED: {
            return {
                ...state,
                ...fetchedState
            }
        }
        case actions.CREATE_VALUE_REJECTED: {
            return {
                ...state,
                snackbarMessage: {
                    message: 'Failed to create.'
                }
            }
        }
        default:
        {
            return {
                ...state,
                ...emptySnackbar
            }
        }
    }
};

export default ui;
