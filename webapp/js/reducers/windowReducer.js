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
        };
    }

    case actions.FETCH_HISTORY_PENDING:
    case actions.FETCH_VALUE_PENDING: {
        return {
            ...state,
            loading: true,
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
