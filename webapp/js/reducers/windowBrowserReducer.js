
import * as actions from '../constants/actionTypes';

const browser = (state = {}, action) => {
    switch (action.type) {
    case actions.SET_BROWSER_LIST: {
        const { payload } = action;
        return {
            ...state,
            browserList: payload,
        };
    }

    default: {
        return state;
    }}
};

export default browser;
