import * as actions from '../constants/actionTypes';

const fetchedState = {fetching: false, fetched: true, error: false}
const fetchingState = {fetching: true, fetched: false, error: false}
const errorState = {fetching: false, fetched: false, error: true}

const ui = (state = {}, action) => {
    switch (action.type) {

        case actions.SET_WINDOW_VIEW: {
          return {
            ...state,
          }
        }

        case actions.SELECT_NAMESPACE: {
          const { selectedNamespace } = action;
          return {
              ...state,
              selectedNamespace
          }
        }
        case actions.SELECT_KEY: {
          const {namespace, key, value} = action;
          return {
              ...state,
              ...fetchedState,
              namespace,
              key,
              value
          }
        }
        case actions.FETCH_VALUE_PENDING: {
          return {
            ...state,
            ...fetchingState
          }
        }

        case actions.UPDATE_VALUE_FULFILLED: {
            const {namespace, key, value} = action;
            return {
                ...state,
                ...errorState,
                value
            }
        }

        case actions.UPDATE_VALUE_REJECTED: {
            return {
                ...state,
                updateError: true
            }

        }
        default:{
          return state;
        }
    }
}

export default ui
