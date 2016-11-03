import * as actions from '../constants/actionTypes';

const ui = (state = {}, action) => {
    switch(action.type) {
        case actions.SELECT_NAMESPACE:
            return {
                ...state,
                selectedNameSpace: state.payload
            };
        case actions.SELECT_KEY:
            return {
                ...state,
                selectedKey: state.payload
            };
        default:
            return state;
    }
}

export default ui