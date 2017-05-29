import * as actions from '../constants/actionTypes';

const initalState = {ignoreNextConfirm: false}

const navigation = (state = initalState, action) => {
    switch(action.type) {

        case actions.SET_IGNORE_NEXT_CONFIRM_NAVIGATION: {
            const { ignoreNextConfirm } = action;
            return {
                ...state,
                ignoreNextConfirm: action.ignoreNextConfirm,
            }
        }

        default: {
            return state;
        }
    }
}
export default navigation;