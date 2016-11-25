import * as actions from '../constants/actionTypes';

const window = (state = {}, action) => {
    switch (action.type) {

    case actions.CHANGE_WINDOW: {
        const { currentWindow } = action;
        return {
            ...state,
            currentWindow,
        };
    }

    default: {
        return state;
    }}
};

export default window;
