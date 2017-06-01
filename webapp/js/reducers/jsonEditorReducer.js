import * as actions from '../constants/jsonEditorTypes';
import * as displayActions from '../constants/actionTypes';

const initialState = {
    mode: 'tree',
    undo: false,
    redo: false,
    jsonSearchValue: '',
    saving: false
};

const jsonEditor = (state = initialState, action) => {
    switch (action.type) {

        case actions.SEARCH_JSON: {
            return {
                ...state,
                jsonSearchValue: action.searchValue,
            };
        }

        case actions.COLLAPSE_JSON: {
            return {
                ...state,
                expand: false,
                collapse: true,
            };
        }
        case actions.EXPAND_JSON: {
            return {
                ...state,
                expand: true,
                collapse: false,
            };
        }

        case actions.COMPACT_JSON: {
            return {
                ...state,
                compact: true,
                format: false,
            };
        }
        case actions.FORMAT_JSON: {
            return {
                ...state,
                compact: false,
                format: true,
            };
        }

        case actions.REDO_JSON: {
            return {
                ...state,
                redo: true,
            };
        }

        case actions.UNDO_JSON: {
            return {
                ...state,
                undo: true,
            };
        }

        case actions.CHANGE_JSON_MODE: {
            return {
                ...state,
                mode: action.mode,
            };
        }

        case actions.VALUE_CHANGE: {
            return {
                ...state,
                undo: false,
                redo: false,
            };
        }

        case displayActions.SELECT_KEY: {
            return {
                ...state,
                ...initialState
            }
        }
        case displayActions.FETCH_VALUE_FULFILLED: {
            const { length } = action.value;
            return {
                ...state,
                jsonLength: length,
            }
        }

        case displayActions.UPDATE_VALUE_PENDING: {
            return {
                ...state,
                saving: true,
            }
        }
        case displayActions.UPDATE_VALUE_REJECTED:
        case displayActions.UPDATE_VALUE_FULFILLED: {
            return {
                ...state,
                saving: false,
            }
        }
        default: {
            return {
                ...state,
            };
        }
    }
};

export default jsonEditor;
