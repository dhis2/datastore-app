import * as actions from '../constants/actionTypes';

const fetchedState = { fetching: false, fetched: true, error: false };
const fetchingState = { fetching: true, fetched: false, error: false };
const errorState = { fetching: false, fetched: false, error: true };

const initialState = {

};

const sidebar = (state = initialState, action) => {
    switch (action.type) {
    case actions.FETCH_NAMESPACES_FULFILLED:
        {
            return {
                ...state,
                ...fetchedState,
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

    default:
        {
            return {
                ...state,
            };
        }
    }
};

export default sidebar;
