import * as actions from '../constants/actionTypes';

const initialState = {
    currentWindow: 'empty',
    history: [],
};

const window = (state = initialState, action) => {
    switch (action.type) {

    case actions.CHANGE_WINDOW: {
        const { currentWindow } = action;
        return {
            ...state,
            currentWindow,
            error: null
        };
    }

    case actions.FETCH_HISTORY_PENDING:
    case actions.FETCH_VALUE_PENDING:
    case actions.LOAD_VALUE: {
        return {
            ...state,
            loading: true,
            error: null
        };
    }

    case actions.SELECT_KEY: {
        return {
            ...state,
            loading: false,
        };
    }

    case actions.FETCH_HISTORY_FULFILLED: {
        const { history, namespace, key } = action;
        return {
            ...state,
            loading: false,
            history,
            namespace,
            key,
        };
    }

    case actions.FETCH_NAMESPACE_HISTORY_FULFILLED: {
        const { history, namespace } = action;
        return {
            ...state,
            loading: false,
            namespace,
            history,
            error: null
        };
    }

    case actions.FETCH_NAMESPACE_HISTORY_REJECTED: {
        const { error, namespace } = action;
        return {
            ...state,
            loading: false,
            namespace,
            error,
        };
    }

    case actions.FETCH_HISTORY_REJECTED: {
        return {
            ...state,
            loading: false,
        };
    }

    default: {
        return state;
    }}
};

export default window;
